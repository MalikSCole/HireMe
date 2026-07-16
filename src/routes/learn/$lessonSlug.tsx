import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { lazy, Suspense, useState } from "react";

import { db } from "../../db";
import { LessonDiagram } from "../../components/lesson-diagram";
import { courseModules, courses, lessonProgress, lessonQuestions, lessons, quizAttempts } from "../../db/schema";
import { completeLesson, submitKnowledgeCheck } from "../../features/lessons/functions";
import { getSession } from "../../lib/auth-functions";

const ReactLessonPlayground = lazy(() => import("../../components/react-lesson-playground").then((module) => ({ default: module.ReactLessonPlayground })));

const getLesson = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const rows = await db
      .select({
        id: lessons.id,
        title: lessons.title,
        slug: lessons.slug,
        summary: lessons.summary,
        content: lessons.content,
        practiceProblemSlug: lessons.practiceProblemSlug,
        moduleTitle: courseModules.title,
        courseSlug: courses.slug,
        courseTitle: courses.title,
      })
      .from(lessons)
      .innerJoin(courseModules, eq(lessons.moduleId, courseModules.id))
      .innerJoin(courses, eq(courseModules.courseId, courses.id))
      .where(eq(lessons.slug, slug))
      .limit(1);
    if (rows.length === 0) throw notFound();

    const questionRows = await db
      .select({ id: lessonQuestions.id, prompt: lessonQuestions.prompt, options: lessonQuestions.options })
      .from(lessonQuestions)
      .where(eq(lessonQuestions.lessonId, rows[0].id))
      .limit(1);
    const question = questionRows[0]
      ? { ...questionRows[0], options: JSON.parse(questionRows[0].options) as string[] }
      : null;

    const session = await getSession();
    if (!session) return { ...rows[0], question, completed: false, signedIn: false, previousAttempt: null };
    const progress = await db.select().from(lessonProgress).where(and(eq(lessonProgress.userId, session.user.id), eq(lessonProgress.lessonId, rows[0].id))).limit(1);
    const attempts = question
      ? await db.select({ selectedIndex: quizAttempts.selectedIndex, passed: quizAttempts.passed }).from(quizAttempts).where(and(eq(quizAttempts.userId, session.user.id), eq(quizAttempts.questionId, question.id))).limit(1)
      : [];
    return { ...rows[0], question, completed: progress.length > 0, signedIn: true, previousAttempt: attempts[0] ?? null };
  });

export const Route = createFileRoute("/learn/$lessonSlug")({
  loader: ({ params }) => getLesson({ data: params.lessonSlug }),
  component: LessonPage,
});

function LessonPage() {
  const lesson = Route.useLoaderData();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(lesson.previousAttempt?.selectedIndex ?? null);
  const [quizResult, setQuizResult] = useState<{ passed: boolean; correctIndex: number; explanation: string } | null>(null);
  const [quizPending, setQuizPending] = useState(false);

  async function markComplete() {
    setPending(true);
    setError(null);
    try {
      await completeLesson({ data: { lessonSlug: lesson.slug } });
      await router.invalidate();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not complete lesson.");
    } finally {
      setPending(false);
    }
  }

  async function checkAnswer() {
    if (!lesson.question || selectedAnswer === null) return;
    setQuizPending(true);
    try {
      setQuizResult(await submitKnowledgeCheck({ data: { questionId: lesson.question.id, selectedIndex: selectedAnswer } }));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not grade answer.");
    } finally {
      setQuizPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-6 py-10">
      <Link to="/learn/courses/$courseSlug" params={{ courseSlug: lesson.courseSlug }} className="text-sm font-medium text-blue-700 hover:underline">← Back to {lesson.courseTitle}</Link>
      <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-blue-700">{lesson.moduleTitle}</p>
      <h1 className="mt-2 text-4xl font-bold">{lesson.title}</h1>
      <p className="mt-4 text-lg text-gray-600">{lesson.summary}</p>

      <LessonDiagram lessonSlug={lesson.slug} />

      <article className="mt-10 space-y-6">{lesson.content.split("\n\n").map((block, index) => index % 2 === 0 ? <h2 key={block} className="text-2xl font-semibold">{block}</h2> : <p key={block} className="leading-7 text-gray-700">{block}</p>)}</article>

      {lesson.courseSlug === "react-foundations" && (
        <Suspense fallback={<div className="mt-12 rounded-xl border bg-gray-50 p-8 text-center text-gray-600">Loading interactive preview…</div>}>
          <ReactLessonPlayground lessonSlug={lesson.slug} />
        </Suspense>
      )}

      {lesson.question && (
        <section className="mt-12 rounded-lg border bg-gray-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Knowledge check</p>
          <h2 className="mt-2 text-xl font-semibold">{lesson.question.prompt}</h2>
          <div className="mt-5 space-y-3">{lesson.question.options.map((option, index) => (
            <label key={option} className="flex cursor-pointer gap-3 rounded border bg-white p-3">
              <input type="radio" name="knowledge-check" checked={selectedAnswer === index} onChange={() => { setSelectedAnswer(index); setQuizResult(null); }} />
              <span>{option}</span>
            </label>
          ))}</div>
          <button type="button" disabled={selectedAnswer === null || quizPending} onClick={() => void checkAnswer()} className="mt-5 rounded bg-gray-900 px-4 py-2 font-medium text-white disabled:opacity-50">{quizPending ? "Checking..." : "Check answer"}</button>
          {quizResult && <div className={quizResult.passed ? "mt-4 rounded bg-green-100 p-4 text-green-900" : "mt-4 rounded bg-red-100 p-4 text-red-900"}><p className="font-semibold">{quizResult.passed ? "Correct" : `Not quite. The correct answer is option ${quizResult.correctIndex + 1}.`}</p><p className="mt-1 text-sm">{quizResult.explanation}</p></div>}
          {!quizResult && lesson.previousAttempt?.passed && <p className="mt-4 text-sm font-medium text-green-700">✓ You previously answered this correctly.</p>}
        </section>
      )}

      <section className="mt-12 flex flex-wrap items-center gap-4 border-t pt-6">
        {lesson.practiceProblemSlug && <Link to="/problems/$problemSlug" params={{ problemSlug: lesson.practiceProblemSlug }} className="rounded bg-blue-600 px-5 py-3 font-medium text-white">Practice this concept</Link>}
        {lesson.completed ? <span className="font-medium text-green-700">✓ Lesson complete</span> : lesson.signedIn ? <button type="button" disabled={pending} onClick={() => void markComplete()} className="rounded border px-5 py-3 font-medium disabled:opacity-50">{pending ? "Saving..." : "Mark complete"}</button> : <Link to="/login" className="font-medium underline">Sign in to track completion</Link>}
        {error && <p className="w-full text-sm text-red-700">{error}</p>}
      </section>
    </main>
  );
}
