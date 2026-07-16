import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { lazy, Suspense } from "react";

import { db } from "../../../../db";
import { lessons, reactChallengeProgress, reactChallenges } from "../../../../db/schema";
import { getSession } from "../../../../lib/auth-functions";

const ReactChallengeWorkspace = lazy(() => import("../../../../components/react-challenge-workspace").then((module) => ({ default: module.ReactChallengeWorkspace })));

const getReactChallenge = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const session = await getSession();
    const userId = session?.user.id ?? "00000000-0000-0000-0000-000000000000";
    const rows = await db
      .select({
        title: reactChallenges.title,
        slug: reactChallenges.slug,
        description: reactChallenges.description,
        difficulty: reactChallenges.difficulty,
        starterCode: reactChallenges.starterCode,
        testCode: reactChallenges.testCode,
        requirements: reactChallenges.requirements,
        lessonTitle: lessons.title,
        lessonSlug: lessons.slug,
        savedSourceCode: reactChallengeProgress.sourceCode,
        completedAt: reactChallengeProgress.completedAt,
      })
      .from(reactChallenges)
      .innerJoin(lessons, eq(reactChallenges.lessonId, lessons.id))
      .leftJoin(reactChallengeProgress, and(eq(reactChallengeProgress.challengeId, reactChallenges.id), eq(reactChallengeProgress.userId, userId)))
      .where(eq(reactChallenges.slug, slug))
      .limit(1);
    if (rows.length === 0) throw notFound();
    return { ...rows[0], requirements: JSON.parse(rows[0].requirements) as string[], signedIn: Boolean(session) };
  });

export const Route = createFileRoute("/learn/react/challenges/$challengeSlug")({
  loader: ({ params }) => getReactChallenge({ data: params.challengeSlug }),
  component: ReactChallengePage,
});

function ReactChallengePage() {
  const challenge = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-7xl p-6 py-10">
      <Link to="/learn/react/challenges" className="text-sm font-medium text-violet-700 hover:underline">← All React challenges</Link>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(260px,0.65fr)_minmax(0,1.6fr)]">
        <aside>
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs capitalize text-violet-800">{challenge.difficulty}</span>
          <h1 className="mt-4 text-3xl font-bold">{challenge.title}</h1>
          <p className="mt-3 leading-7 text-gray-600">{challenge.description}</p>
          <section className="mt-8 rounded-xl border bg-gray-50 p-5">
            <h2 className="font-semibold">Requirements</h2>
            <ul className="mt-4 space-y-3">{challenge.requirements.map((requirement) => <li key={requirement} className="flex gap-3 text-sm text-gray-700"><span className="text-violet-700">○</span><span>{requirement}</span></li>)}</ul>
          </section>
          <p className="mt-5 text-sm text-gray-500">Need a refresher? <Link to="/learn/$lessonSlug" params={{ lessonSlug: challenge.lessonSlug }} className="font-medium text-violet-700 underline">Review {challenge.lessonTitle}</Link>.</p>
          <div className="mt-6 rounded-lg bg-violet-50 p-4 text-sm text-violet-900">Automated checks run as you type. Saved completion arrives in the next roadmap step.</div>
        </aside>
        <section aria-label="React challenge editor and preview">
          <Suspense fallback={<div className="rounded-xl border bg-gray-50 p-10 text-center text-gray-600">Loading challenge workspace…</div>}>
            <ReactChallengeWorkspace challengeSlug={challenge.slug} starterCode={challenge.savedSourceCode ?? challenge.starterCode} testCode={challenge.testCode} signedIn={challenge.signedIn} completed={Boolean(challenge.completedAt)} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
