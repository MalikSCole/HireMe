import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { and, asc, eq } from "drizzle-orm";

import { db } from "../../../../db";
import { lessons, reactChallengeProgress, reactChallenges } from "../../../../db/schema";
import { getSession } from "../../../../lib/auth-functions";

const getReactChallenges = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getSession();
  const userId = session?.user.id ?? "00000000-0000-0000-0000-000000000000";
  return db.select({
    id: reactChallenges.id,
    title: reactChallenges.title,
    slug: reactChallenges.slug,
    description: reactChallenges.description,
    difficulty: reactChallenges.difficulty,
    lessonTitle: lessons.title,
    completedAt: reactChallengeProgress.completedAt,
  })
  .from(reactChallenges)
  .innerJoin(lessons, eq(reactChallenges.lessonId, lessons.id))
  .leftJoin(reactChallengeProgress, and(eq(reactChallengeProgress.challengeId, reactChallenges.id), eq(reactChallengeProgress.userId, userId)))
  .orderBy(asc(reactChallenges.position));
});

export const Route = createFileRoute("/learn/react/challenges/")({
  loader: () => getReactChallenges(),
  component: ReactChallengesPage,
});

function ReactChallengesPage() {
  const challenges = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-5xl p-6 py-10">
      <Link to="/learn/courses/$courseSlug" params={{ courseSlug: "react-foundations" }} className="text-sm font-medium text-violet-700 hover:underline">← React Foundations</Link>
      <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-violet-700">React practice lab</p>
      <h1 className="mt-2 text-4xl font-bold">Component challenges</h1>
      <p className="mt-3 max-w-3xl text-gray-600">Turn each concept into working UI. Edit the starter component and watch your result update in an isolated browser preview.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">{challenges.map((challenge, index) => (
        <Link key={challenge.id} to="/learn/react/challenges/$challengeSlug" params={{ challengeSlug: challenge.slug }} className="group flex flex-col rounded-xl border p-6 transition hover:-translate-y-1 hover:border-violet-400 hover:shadow-lg">
          <div className="flex items-center justify-between"><span className="text-sm font-bold text-violet-700">{String(index + 1).padStart(2, "0")}</span><span className={challenge.completedAt ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800" : "rounded-full bg-violet-100 px-3 py-1 text-xs capitalize text-violet-800"}>{challenge.completedAt ? "✓ Complete" : challenge.difficulty}</span></div>
          <h2 className="mt-6 text-xl font-semibold">{challenge.title}</h2>
          <p className="mt-2 text-sm text-gray-600">{challenge.description}</p>
          <p className="mt-4 text-xs text-gray-500">From: {challenge.lessonTitle}</p>
          <p className="mt-auto pt-6 font-semibold text-violet-700">Open challenge →</p>
        </Link>
      ))}</div>
    </main>
  );
}
