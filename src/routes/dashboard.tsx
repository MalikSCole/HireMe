import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { and, asc, count, desc, eq } from "drizzle-orm";

import { db } from "../db";
import { courseModules, courses, lessonProgress, lessons, problemProgress, problems, quizAttempts, reactChallengeProgress, reactChallenges, submissions } from "../db/schema";
import { calculateAchievements } from "../features/progress/achievements";
import { ensureSession, getSession } from "../lib/auth-functions";

const getDashboard = createServerFn({ method: "GET" }).handler(async () => {
  const session = await ensureSession();
  const [problemRows, progressRows, submissionTotals, acceptedTotals, recent, lessonRows, quizRows, challengeTotals, completedChallengeRows] = await Promise.all([
    db.select({ id: problems.id, title: problems.title, slug: problems.slug, difficulty: problems.difficulty, topic: problems.topic }).from(problems).orderBy(asc(problems.title)),
    db
      .select({ problemId: problemProgress.problemId, bestStatus: problemProgress.bestStatus, attemptCount: problemProgress.attemptCount, lastAttemptAt: problemProgress.lastAttemptAt })
      .from(problemProgress)
      .where(eq(problemProgress.userId, session.user.id)),
    db.select({ value: count() }).from(submissions).where(eq(submissions.userId, session.user.id)),
    db
      .select({ value: count() })
      .from(submissions)
      .where(and(eq(submissions.userId, session.user.id), eq(submissions.status, "accepted"))),
    db
      .select({
        id: submissions.id,
        status: submissions.status,
        runtimeMs: submissions.runtimeMs,
        createdAt: submissions.createdAt,
        problemTitle: problems.title,
        problemSlug: problems.slug,
      })
      .from(submissions)
      .innerJoin(problems, eq(submissions.problemId, problems.id))
      .where(eq(submissions.userId, session.user.id))
      .orderBy(desc(submissions.createdAt))
      .limit(5),
    db
      .select({
        id: lessons.id,
        title: lessons.title,
        slug: lessons.slug,
        moduleId: courseModules.id,
        moduleTitle: courseModules.title,
        courseTitle: courses.title,
        courseSlug: courses.slug,
        courseCategory: courses.category,
        completedAt: lessonProgress.completedAt,
      })
      .from(lessons)
      .innerJoin(courseModules, eq(lessons.moduleId, courseModules.id))
      .innerJoin(courses, eq(courseModules.courseId, courses.id))
      .leftJoin(lessonProgress, and(eq(lessonProgress.lessonId, lessons.id), eq(lessonProgress.userId, session.user.id)))
      .orderBy(asc(courseModules.position), asc(lessons.position)),
    db
      .select({ passed: quizAttempts.passed, attemptedAt: quizAttempts.attemptedAt })
      .from(quizAttempts)
      .where(eq(quizAttempts.userId, session.user.id)),
    db.select({ value: count() }).from(reactChallenges),
    db.select({ completedAt: reactChallengeProgress.completedAt }).from(reactChallengeProgress).where(eq(reactChallengeProgress.userId, session.user.id)),
  ]);

  const totalSubmissions = submissionTotals[0]?.value ?? 0;
  const acceptedSubmissions = acceptedTotals[0]?.value ?? 0;
  const completedLessons = lessonRows.filter((lesson) => lesson.completedAt).length;
  const progressByProblem = new Map(progressRows.map((row) => [row.problemId, row]));
  const recommendedProblem = problemRows.find((problem) => {
    const progress = progressByProblem.get(problem.id);
    return progress && progress.bestStatus !== "accepted";
  }) ?? problemRows.find((problem) => !progressByProblem.has(problem.id)) ?? null;
  const courseProgress = [
    ...new Map(lessonRows.map((lesson) => [lesson.courseSlug, {
      slug: lesson.courseSlug,
      title: lesson.courseTitle,
      category: lesson.courseCategory,
      total: lessonRows.filter((row) => row.courseSlug === lesson.courseSlug).length,
      completed: lessonRows.filter((row) => row.courseSlug === lesson.courseSlug && row.completedAt).length,
      nextLesson: lessonRows.find((row) => row.courseSlug === lesson.courseSlug && !row.completedAt) ?? null,
    }])).values(),
  ];
  const moduleProgress = [
    ...new Map(
      lessonRows.map((lesson) => [
        lesson.moduleId,
        {
          id: lesson.moduleId,
          title: `${lesson.courseTitle}: ${lesson.moduleTitle}`,
          total: lessonRows.filter((row) => row.moduleId === lesson.moduleId).length,
          completed: lessonRows.filter((row) => row.moduleId === lesson.moduleId && row.completedAt).length,
        },
      ]),
    ).values(),
  ];
  const activityDates = [
    ...progressRows.map((row) => row.lastAttemptAt),
    ...lessonRows.flatMap((row) => row.completedAt ? [row.completedAt] : []),
    ...quizRows.map((row) => row.attemptedAt),
    ...completedChallengeRows.map((row) => row.completedAt),
  ];
  const activity = calculateActivity(activityDates);
  const solvedProblems = progressRows.filter((row) => row.bestStatus === "accepted").length;
  const correctQuizAnswers = quizRows.filter((attempt) => attempt.passed).length;
  const achievements = calculateAchievements({
    solvedProblems,
    completedLessons,
    correctQuizAnswers,
    completedReactChallenges: completedChallengeRows.length,
    longestStreak: activity.longestStreak,
    activeDayCount: activity.activeDayCount,
  });

  return {
    username: session.user.name,
    totalProblems: problemRows.length,
    solvedProblems,
    attemptedProblems: progressRows.length,
    totalAttempts: progressRows.reduce((sum, row) => sum + row.attemptCount, 0),
    totalSubmissions,
    acceptedSubmissions,
    acceptanceRate: totalSubmissions === 0 ? 0 : Math.round((acceptedSubmissions / totalSubmissions) * 100),
    totalLessons: lessonRows.length,
    completedLessons,
    learningCompletion: lessonRows.length === 0 ? 0 : Math.round((completedLessons / lessonRows.length) * 100),
    quizAttempts: quizRows.length,
    correctQuizAnswers,
    totalReactChallenges: challengeTotals[0]?.value ?? 0,
    completedReactChallenges: completedChallengeRows.length,
    recommendedProblem,
    courseProgress,
    moduleProgress,
    activity,
    achievements,
    recent,
  };
});

function calculateActivity(dates: Date[]) {
  const toDayKey = (date: Date) => date.toISOString().slice(0, 10);
  const activeDays = new Set(dates.map(toDayKey));
  const today = new Date();
  const dayAtOffset = (offset: number) => {
    const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + offset));
    return { key: toDayKey(date), label: date.toLocaleDateString(undefined, { weekday: "short", timeZone: "UTC" }) };
  };

  let currentStreak = 0;
  let offset = activeDays.has(dayAtOffset(0).key) ? 0 : -1;
  while (activeDays.has(dayAtOffset(offset).key)) {
    currentStreak += 1;
    offset -= 1;
  }

  const sortedDays = [...activeDays].sort();
  let longestStreak = 0;
  let run = 0;
  let previousTime: number | null = null;
  for (const day of sortedDays) {
    const time = Date.parse(`${day}T00:00:00Z`);
    run = previousTime !== null && time - previousTime === 86_400_000 ? run + 1 : 1;
    longestStreak = Math.max(longestStreak, run);
    previousTime = time;
  }

  return {
    currentStreak,
    longestStreak,
    activeDayCount: activeDays.size,
    lastSevenDays: Array.from({ length: 7 }, (_, index) => dayAtOffset(index - 6)).map((day) => ({ ...day, active: activeDays.has(day.key) })),
  };
}

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    if (!(await getSession())) throw redirect({ to: "/login" });
  },
  loader: () => getDashboard(),
  component: DashboardPage,
});

function DashboardPage() {
  const data = Route.useLoaderData();
  const completion = data.totalProblems === 0 ? 0 : Math.round((data.solvedProblems / data.totalProblems) * 100);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-bold">Welcome back, {data.username}</h1>
      <p className="mt-2 text-gray-600">Here is your coding progress so far.</p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Problems solved" value={`${data.solvedProblems}/${data.totalProblems}`} />
        <Metric label="Problems attempted" value={String(data.attemptedProblems)} />
        <Metric label="Total submissions" value={String(data.totalSubmissions)} />
        <Metric label="Acceptance rate" value={`${data.acceptanceRate}%`} />
      </section>

      <section className="mt-8 rounded-xl border border-orange-200 bg-orange-50/60 p-6" aria-labelledby="streak-title">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-700">Learning streak</p>
            <h2 id="streak-title" className="mt-1 text-2xl font-semibold">{data.activity.currentStreak} day{data.activity.currentStreak === 1 ? "" : "s"} strong 🔥</h2>
            <p className="mt-2 text-sm text-gray-600">Complete a lesson, knowledge check, or judged problem each day to keep your streak alive.</p>
          </div>
          <div className="flex gap-6 text-sm"><p><span className="block text-2xl font-bold">{data.activity.longestStreak}</span>Longest streak</p><p><span className="block text-2xl font-bold">{data.activity.activeDayCount}</span>Active days</p></div>
        </div>
        <div className="mt-6 grid grid-cols-7 gap-2" aria-label="Activity over the last seven days">
          {data.activity.lastSevenDays.map((day) => <div key={day.key} className="text-center"><div className={day.active ? "mx-auto grid size-10 place-items-center rounded-full bg-orange-600 text-white" : "mx-auto grid size-10 place-items-center rounded-full border bg-white text-gray-400"} aria-label={`${day.key}: ${day.active ? "active" : "no activity"}`}>{day.active ? "✓" : "·"}</div><p className="mt-2 text-xs text-gray-500">{day.label}</p></div>)}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="achievements-title">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-semibold uppercase tracking-wider text-violet-700">Milestones</p><h2 id="achievements-title" className="mt-1 text-2xl font-semibold">Achievements</h2></div><p className="text-sm text-gray-600">{data.achievements.filter((item) => item.unlocked).length}/{data.achievements.length} unlocked</p></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{data.achievements.map((achievement) => (
          <article key={achievement.id} className={achievement.unlocked ? "rounded-xl border border-violet-200 bg-violet-50 p-5" : "rounded-xl border bg-gray-50 p-5 text-gray-600"}>
            <div className="flex items-start gap-4"><span className={achievement.unlocked ? "grid size-12 shrink-0 place-items-center rounded-full bg-violet-700 text-xl text-white" : "grid size-12 shrink-0 place-items-center rounded-full bg-gray-200 text-xl grayscale"} aria-hidden="true">{achievement.icon}</span><div><h3 className="font-semibold text-gray-900">{achievement.title}</h3><p className="mt-1 text-sm">{achievement.description}</p></div></div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white"><div className={achievement.unlocked ? "h-full rounded-full bg-violet-600" : "h-full rounded-full bg-gray-400"} style={{ width: `${achievement.percentage}%` }} /></div>
            <p className="mt-2 text-right text-xs font-medium">{achievement.unlocked ? "Unlocked" : `${achievement.current}/${achievement.target}`}</p>
          </article>
        ))}</div>
      </section>

      <section className="mt-8" aria-labelledby="up-next-title">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Personalized path</p>
          <h2 id="up-next-title" className="mt-1 text-2xl font-semibold">Keep your momentum</h2>
          <p className="mt-2 text-sm text-gray-600">Continue each course where you stopped, then reinforce the ideas with a coding problem.</p>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {data.courseProgress.map((course) => {
            const percentage = course.total === 0 ? 0 : Math.round((course.completed / course.total) * 100);
            return (
              <article key={course.slug} className="flex flex-col rounded-xl border p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div><p className="text-xs font-semibold uppercase tracking-wider text-blue-700">{course.category}</p><h3 className="mt-1 text-lg font-semibold">{course.title}</h3></div>
                  <ProgressRing percentage={percentage} />
                </div>
                <p className="mt-4 text-sm text-gray-600">{course.completed} of {course.total} lessons complete</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200"><div className="h-full rounded-full bg-blue-600" style={{ width: `${percentage}%` }} /></div>
                {course.nextLesson ? (
                  <Link to="/learn/$lessonSlug" params={{ lessonSlug: course.nextLesson.slug }} className="mt-5 rounded bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white">Continue: {course.nextLesson.title}</Link>
                ) : (
                  <Link to="/learn/courses/$courseSlug" params={{ courseSlug: course.slug }} className="mt-5 rounded border px-4 py-2 text-center text-sm font-medium text-green-700">Review completed course</Link>
                )}
              </article>
            );
          })}
          {data.recommendedProblem && (
            <article className="flex flex-col rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-amber-800">Practice next</p><h3 className="mt-1 text-lg font-semibold">{data.recommendedProblem.title}</h3></div><span className="text-3xl" aria-hidden="true">⌨</span></div>
              <p className="mt-4 text-sm text-gray-700">Strengthen your {data.recommendedProblem.topic} skills with a {data.recommendedProblem.difficulty} challenge.</p>
              <div className="mt-4 flex gap-2"><span className="rounded-full bg-white px-3 py-1 text-xs capitalize text-gray-700">{data.recommendedProblem.topic}</span><span className="rounded-full bg-white px-3 py-1 text-xs capitalize text-gray-700">{data.recommendedProblem.difficulty}</span></div>
              <Link to="/problems/$problemSlug" params={{ problemSlug: data.recommendedProblem.slug }} className="mt-auto pt-5"><span className="block rounded bg-amber-700 px-4 py-2 text-center text-sm font-medium text-white">Solve recommended problem</span></Link>
            </article>
          )}
        </div>
      </section>

      <section className="mt-8 rounded-lg border p-6">
        <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">DSA progress</h2><span className="font-medium">{completion}%</span></div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-200"><div className="h-full rounded-full bg-blue-600" style={{ width: `${completion}%` }} /></div>
        <p className="mt-3 text-sm text-gray-600">{data.totalAttempts} judged {data.totalAttempts === 1 ? "attempt" : "attempts"} across your practiced problems.</p>
      </section>

      <section className="mt-8 rounded-lg border p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Learning path</p>
            <h2 className="mt-1 text-xl font-semibold">Learning progress</h2>
            <p className="mt-2 text-sm text-gray-600">{data.completedLessons}/{data.totalLessons} lessons complete · {data.correctQuizAnswers}/{data.quizAttempts} knowledge checks correct · {data.completedReactChallenges}/{data.totalReactChallenges} React challenges</p>
          </div>
          {data.completedLessons < data.totalLessons ? (
            <Link to="/learn" className="rounded bg-blue-600 px-4 py-2 font-medium text-white">View all courses</Link>
          ) : (
            <span className="font-medium text-green-700">✓ Course complete</span>
          )}
        </div>
        <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200"><div className="h-full rounded-full bg-green-600" style={{ width: `${data.learningCompletion}%` }} /></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">{data.moduleProgress.map((module) => (
          <div key={module.id} className="rounded border p-3"><div className="flex justify-between gap-3 text-sm"><span className="font-medium">{module.title}</span><span className="text-gray-500">{module.completed}/{module.total}</span></div></div>
        ))}</div>
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Recent activity</h2><Link to="/submissions" className="text-sm font-medium underline">View all</Link></div>
        {data.recent.length === 0 ? (
          <p className="mt-4 rounded-lg border p-6">No activity yet. <Link to="/problems" className="underline">Solve your first problem</Link>.</p>
        ) : (
          <div className="mt-4 divide-y rounded-lg border">{data.recent.map((item) => (
            <article key={item.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div><Link to="/problems/$problemSlug" params={{ problemSlug: item.problemSlug }} className="font-medium underline">{item.problemTitle}</Link><p className="mt-1 text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</p></div>
              <span className={item.status === "accepted" ? "text-sm font-medium text-green-700" : "text-sm font-medium text-red-700"}>{item.status.replaceAll("_", " ").toUpperCase()}</span>
            </article>
          ))}</div>
        )}
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <article className="rounded-lg border p-5 shadow-sm"><p className="text-sm text-gray-600">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></article>;
}

function ProgressRing({ percentage }: { percentage: number }) {
  return (
    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(#2563eb ${percentage}%, #e5e7eb 0)` }} aria-label={`${percentage}% complete`}>
      <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-xs font-bold">{percentage}%</span>
    </div>
  );
}
