import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { lazy, Suspense, useState } from "react";

import { db } from "../../db";
import { AiTutor } from "../../components/ai-tutor";
import { LessonDiagram } from "../../components/lesson-diagram";
import { courseModules, courses, lessonProgress, lessonQuestions, lessons, quizAttempts, reactChallenges } from "../../db/schema";
import { completeLesson, submitKnowledgeCheck } from "../../features/lessons/functions";
import { getSession } from "../../lib/auth-functions";

const ReactLessonPlayground = lazy(() => import("../../components/react-lesson-playground").then((module) => ({ default: module.ReactLessonPlayground })));
const InlineReactEditor = lazy(() => import("../../components/react-lesson-playground").then((module) => ({ default: module.InlineReactEditor })));
const SystemDesignBuilder = lazy(() => import("../../components/system-design-builder").then((module) => ({ default: module.SystemDesignBuilder })));

type CurriculumLessonContent = {
  format: "curriculum-v1";
  learningObjectives: string[];
  sections: Array<{ title: string; body: string }>;
  visualization?: { prompt: string };
  workedExample?: { title: string; body: string };
  practice?: { problemSlug: string; framing: string };
  replay?: { prompt: string };
  quiz?: { prompt: string };
  aiFeedback?: { prompt: string };
};

type SnippetMode = "display" | "react-preview" | "react-exercise";

function parseCodeFenceInfo(info: string | undefined): { language: string; mode: SnippetMode } {
  const [language = "code", ...flags] = (info ?? "").trim().split(/\s+/).filter(Boolean);
  const modeFlag = flags.find((flag) => ["display", "react-preview", "react-exercise"].includes(flag));
  return {
    language,
    mode: (modeFlag as SnippetMode | undefined) ?? "display",
  };
}

function parseCurriculumContent(content: string): CurriculumLessonContent | null {
  try {
    const parsed = JSON.parse(content) as Partial<CurriculumLessonContent>;
    if (parsed.format !== "curriculum-v1" || !Array.isArray(parsed.sections)) return null;
    return {
      format: "curriculum-v1",
      learningObjectives: Array.isArray(parsed.learningObjectives) ? parsed.learningObjectives : [],
      sections: parsed.sections.filter((section) => section.title && section.body),
      visualization: parsed.visualization,
      workedExample: parsed.workedExample,
      practice: parsed.practice,
      replay: parsed.replay,
      quiz: parsed.quiz,
      aiFeedback: parsed.aiFeedback,
    };
  } catch {
    return null;
  }
}

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
    const challengeRows = await db
      .select({ title: reactChallenges.title, slug: reactChallenges.slug, difficulty: reactChallenges.difficulty })
      .from(reactChallenges)
      .where(eq(reactChallenges.lessonId, rows[0].id))
      .limit(1);
    const reactChallenge = challengeRows[0] ?? null;

    const session = await getSession();
    if (!session) return { ...rows[0], question, reactChallenge, completed: false, signedIn: false, previousAttempt: null };
    const progress = await db.select().from(lessonProgress).where(and(eq(lessonProgress.userId, session.user.id), eq(lessonProgress.lessonId, rows[0].id))).limit(1);
    const attempts = question
      ? await db.select({ selectedIndex: quizAttempts.selectedIndex, passed: quizAttempts.passed }).from(quizAttempts).where(and(eq(quizAttempts.userId, session.user.id), eq(quizAttempts.questionId, question.id))).limit(1)
      : [];
    return { ...rows[0], question, reactChallenge, completed: progress.length > 0, signedIn: true, previousAttempt: attempts[0] ?? null };
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
  const curriculumContent = parseCurriculumContent(lesson.content);

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

      {curriculumContent ? (
        <CurriculumLessonBody lessonSlug={lesson.slug} content={curriculumContent} isReactCourse={lesson.courseSlug === "react-foundations"} signedIn={lesson.signedIn} />
      ) : (
        <>
          <LessonDiagram lessonSlug={lesson.slug} />
          <article className="mt-10 space-y-6">{lesson.content.split("\n\n").map((block, index) => index % 2 === 0 ? <h2 key={block} className="text-2xl font-semibold">{block}</h2> : <p key={block} className="leading-7 text-gray-700">{block}</p>)}</article>
        </>
      )}

      {lesson.courseSlug === "react-foundations" && (
        <Suspense fallback={<div className="mt-12 rounded-xl border bg-gray-50 p-8 text-center text-gray-600">Loading interactive preview…</div>}>
          <ReactLessonPlayground lessonSlug={lesson.slug} />
        </Suspense>
      )}

      {lesson.reactChallenge && (
        <section className="mt-12 rounded-lg border border-violet-200 bg-violet-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-violet-700">Practice problem</p>
          <h2 className="mt-2 text-xl font-semibold">{lesson.reactChallenge.title}</h2>
          <p className="mt-2 text-sm capitalize text-violet-800">{lesson.reactChallenge.difficulty}</p>
          <Link to="/learn/react/challenges/$challengeSlug" params={{ challengeSlug: lesson.reactChallenge.slug }} className="mt-5 inline-flex rounded bg-violet-700 px-5 py-3 font-medium text-white">Open React challenge</Link>
        </section>
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

function CurriculumLessonBody({ lessonSlug, content, isReactCourse, signedIn }: { lessonSlug: string; content: CurriculumLessonContent; isReactCourse: boolean; signedIn: boolean }) {
  return (
    <>
      {content.learningObjectives.length > 0 && (
        <section className="mt-10 rounded-lg border bg-gray-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Learning objectives</p>
          <ul className="mt-4 space-y-2 text-gray-700">
            {content.learningObjectives.map((objective) => (
              <li key={objective} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <article className="mt-10 space-y-8">
        <section>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Interactive explanation</p>
          <div className="mt-4 space-y-6">
            {content.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                <LessonRichText body={section.body} />
                {isReactCourse && section.title === "Fix the bug" && (
                  <AiTutor contextType="lesson" contextSlug={lessonSlug} sourceCode={section.body} signedIn={signedIn} />
                )}
              </section>
            ))}
          </div>
        </section>
      </article>

      <section className="mt-10">
        <div className="mb-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Visualization</p>
          {content.visualization?.prompt && <p className="mt-1 text-sm text-gray-600">{content.visualization.prompt}</p>}
        </div>
        <LessonDiagram lessonSlug={lessonSlug} />
      </section>

      {lessonSlug.startsWith("system-design-") && (
        <Suspense fallback={<div className="mt-10 rounded-xl border bg-gray-50 p-8 text-center text-gray-600">Loading architecture builder...</div>}>
          <SystemDesignBuilder lessonSlug={lessonSlug} />
        </Suspense>
      )}

      {content.workedExample && (
        <section className="mt-10 rounded-lg border p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Worked example</p>
          <h2 className="mt-2 text-2xl font-semibold">{content.workedExample.title}</h2>
          <LessonRichText body={content.workedExample.body} />
        </section>
      )}

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        {content.practice && <LessonStepCard label="Practice problem" body={content.practice.framing} />}
        {content.replay && <LessonStepCard label="Replay" body={content.replay.prompt} />}
        {content.quiz && <LessonStepCard label="Quiz" body={content.quiz.prompt} />}
        {content.aiFeedback && <LessonStepCard label="AI feedback" body={content.aiFeedback.prompt} />}
      </section>
    </>
  );
}

function LessonRichText({ body }: { body: string }) {
  const parts = body.split(/```([^\n]*)\n([\s\S]*?)```/g);
  return (
    <div className="mt-2 space-y-3">
      {parts.map((part, index) => {
        if (index % 3 === 2) {
          const snippet = parseCodeFenceInfo(parts[index - 1]);
          return <EditableCodeBlock key={`${index}-${part.slice(0, 20)}`} code={part.trim()} language={snippet.language} mode={snippet.mode} />;
        }
        if (index % 3 === 1 || part.trim() === "") return null;
        return <p key={`${index}-${part.slice(0, 20)}`} className="leading-7 text-gray-700 whitespace-pre-line">{part.trim()}</p>;
      })}
    </div>
  );
}

function EditableCodeBlock({ code, language, mode }: { code: string; language: string; mode: SnippetMode }) {
  const [value, setValue] = useState(code);
  const lineCount = Math.max(8, value.split("\n").length + 1);
  const isEditable = mode !== "display";
  const canPreview = mode === "react-preview" || mode === "react-exercise";
  const modeLabel = mode === "display" ? language : `${language} · ${mode.replace("react-", "")}`;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-950">
      <div className="flex items-center justify-between border-b border-gray-800 px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{modeLabel}</span>
        {isEditable && <button type="button" onClick={() => setValue(code)} className="rounded border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-800">Reset</button>}
      </div>
      {isEditable ? (
        <textarea
          aria-label={`Editable ${language} code`}
          spellCheck={false}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          rows={lineCount}
          className="block w-full resize-y bg-gray-950 p-4 font-mono text-sm leading-6 text-gray-100 outline-none"
        />
      ) : (
        <pre className="overflow-x-auto bg-gray-950 p-4 font-mono text-sm leading-6 text-gray-100"><code>{code}</code></pre>
      )}
      {canPreview && (
        <div className="border-t border-gray-800 bg-white">
          <Suspense fallback={<div className="p-4 text-sm text-gray-600">Loading preview...</div>}>
            <InlineReactEditor code={value} />
          </Suspense>
        </div>
      )}
    </div>
  );
}

function LessonStepCard({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-lg border bg-white p-5">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">{label}</p>
      <p className="mt-2 text-sm leading-6 text-gray-700">{body}</p>
    </div>
  );
}
