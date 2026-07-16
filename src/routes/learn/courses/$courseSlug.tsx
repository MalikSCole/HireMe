import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { and, asc, eq } from "drizzle-orm";

import { CourseRoadmap } from "../../../components/course-roadmap";
import { db } from "../../../db";
import { courseModules, courses, lessonProgress, lessons } from "../../../db/schema";
import { getSession } from "../../../lib/auth-functions";

const getCourse = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const session = await getSession();
    const userId = session?.user.id ?? "00000000-0000-0000-0000-000000000000";
    const rows = await db
      .select({
        courseId: courses.id,
        courseTitle: courses.title,
        courseDescription: courses.description,
        courseCategory: courses.category,
        moduleId: courseModules.id,
        moduleTitle: courseModules.title,
        lessonId: lessons.id,
        lessonTitle: lessons.title,
        lessonSlug: lessons.slug,
        lessonSummary: lessons.summary,
        completedAt: lessonProgress.completedAt,
      })
      .from(courses)
      .innerJoin(courseModules, eq(courseModules.courseId, courses.id))
      .innerJoin(lessons, eq(lessons.moduleId, courseModules.id))
      .leftJoin(
        lessonProgress,
        and(eq(lessonProgress.lessonId, lessons.id), eq(lessonProgress.userId, userId)),
      )
      .where(eq(courses.slug, slug))
      .orderBy(asc(courseModules.position), asc(lessons.position));
    if (rows.length === 0) throw notFound();
    return rows.map(({ completedAt, ...row }) => ({ ...row, completed: session ? Boolean(completedAt) : false }));
  });

export const Route = createFileRoute("/learn/courses/$courseSlug")({
  loader: ({ params }) => getCourse({ data: params.courseSlug }),
  component: CoursePage,
});

function CoursePage() {
  const lessonsList = Route.useLoaderData();
  const first = lessonsList[0];
  const modules = [...new Map(lessonsList.map((row) => [row.moduleId, { id: row.moduleId, title: row.moduleTitle, lessons: lessonsList.filter((lesson) => lesson.moduleId === row.moduleId) }])).values()];
  const completed = lessonsList.filter((lesson) => lesson.completed).length;
  const percentage = Math.round((completed / lessonsList.length) * 100);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <Link to="/learn" className="text-sm font-medium text-blue-700 hover:underline">← All courses</Link>
      <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-blue-700">{first.courseCategory} learning path</p>
      <h1 className="mt-2 text-4xl font-bold">{first.courseTitle}</h1>
      <p className="mt-3 max-w-3xl text-gray-600">{first.courseDescription}</p>
      <div className="mt-5 flex max-w-3xl items-center gap-4"><div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200"><div className="h-full bg-blue-600" style={{ width: `${percentage}%` }} /></div><span className="text-sm font-medium">{completed}/{lessonsList.length}</span></div>

      <CourseRoadmap category={first.courseCategory} modules={modules.map((module) => ({ title: module.title, completed: module.lessons.filter((lesson) => lesson.completed).length, total: module.lessons.length }))} />

      {first.courseCategory === "react" && (
        <section className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-violet-700 p-6 text-white">
          <div><p className="text-sm font-semibold uppercase tracking-wider text-violet-200">Practice lab</p><h2 className="mt-1 text-2xl font-semibold">Build interactive components</h2><p className="mt-2 text-sm text-violet-100">Apply these lessons in guided, editable React challenges.</p></div>
          <Link to="/learn/react/challenges" className="rounded bg-white px-5 py-3 font-semibold text-violet-800">Open challenges →</Link>
        </section>
      )}

      <div className="mt-12 space-y-8">{modules.map((module, moduleIndex) => (
        <section key={module.id}>
          <h2 className="text-xl font-semibold">{moduleIndex + 1}. {module.title}</h2>
          <div className="mt-3 divide-y rounded-lg border">{module.lessons.map((lesson, lessonIndex) => (
            <Link key={lesson.lessonId} to="/learn/$lessonSlug" params={{ lessonSlug: lesson.lessonSlug }} className="flex items-start justify-between gap-4 p-5 hover:bg-gray-50">
              <div><p className="font-medium">{lessonIndex + 1}. {lesson.lessonTitle}</p><p className="mt-1 text-sm text-gray-600">{lesson.lessonSummary}</p></div>
              <span className={lesson.completed ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800" : "rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"}>{lesson.completed ? "Complete" : "Start"}</span>
            </Link>
          ))}</div>
        </section>
      ))}</div>
    </main>
  );
}
