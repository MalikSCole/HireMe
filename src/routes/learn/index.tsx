import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";

import { db } from "../../db";
import { courseModules, courses, lessonProgress, lessons } from "../../db/schema";
import { getSession } from "../../lib/auth-functions";

const getCourseSummaries = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getSession();
  const userId = session?.user.id ?? "00000000-0000-0000-0000-000000000000";
  const rows = await db
    .select({
      id: courses.id,
      title: courses.title,
      slug: courses.slug,
      category: courses.category,
      description: courses.description,
      lessonId: lessons.id,
      completedAt: lessonProgress.completedAt,
    })
    .from(courses)
    .innerJoin(courseModules, eq(courseModules.courseId, courses.id))
    .innerJoin(lessons, eq(lessons.moduleId, courseModules.id))
    .leftJoin(
      lessonProgress,
      and(eq(lessonProgress.lessonId, lessons.id), eq(lessonProgress.userId, userId)),
    );

  return [...new Map(rows.map((row) => [row.id, {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    description: row.description,
    total: rows.filter((item) => item.id === row.id).length,
    completed: session ? rows.filter((item) => item.id === row.id && item.completedAt).length : 0,
  }])).values()];
});

export const Route = createFileRoute("/learn/")({ loader: () => getCourseSummaries(), component: LearnPage });

function LearnPage() {
  const courseList = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-5xl p-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Learning paths</p>
      <h1 className="mt-2 text-4xl font-bold">Choose your course</h1>
      <p className="mt-3 max-w-3xl text-gray-600">Open a dedicated learning path with its own roadmap, modules, lessons, visuals, and progress.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">{courseList.map((course) => {
        const percentage = course.total === 0 ? 0 : Math.round((course.completed / course.total) * 100);
        return (
          <Link key={course.id} to="/learn/courses/$courseSlug" params={{ courseSlug: course.slug }} className="group rounded-2xl border bg-gray-50 p-7 transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg">
            <div className="flex items-center justify-between"><span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold uppercase text-blue-800">{course.category}</span><span className="text-3xl transition group-hover:translate-x-1" aria-hidden="true">→</span></div>
            <h2 className="mt-6 text-3xl font-bold">{course.title}</h2>
            <p className="mt-3 text-gray-600">{course.description}</p>
            <div className="mt-7 flex justify-between text-sm"><span className="font-medium">{course.completed}/{course.total} lessons</span><span>{percentage}%</span></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200"><div className="h-full bg-blue-600" style={{ width: `${percentage}%` }} /></div>
            <p className="mt-6 font-semibold text-blue-700">Open {course.category.toUpperCase()} course</p>
          </Link>
        );
      })}</div>
    </main>
  );
}
