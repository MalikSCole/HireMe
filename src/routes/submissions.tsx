import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { desc, eq } from "drizzle-orm";

import { db } from "../db";
import { problems, submissions } from "../db/schema";
import { ensureSession, getSession } from "../lib/auth-functions";

const getSubmissionHistory = createServerFn({ method: "GET" }).handler(async () => {
  const session = await ensureSession();
  return db
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
    .limit(100);
});

export const Route = createFileRoute("/submissions")({
  beforeLoad: async () => {
    if (!(await getSession())) throw redirect({ to: "/login" });
  },
  loader: () => getSubmissionHistory(),
  component: SubmissionHistoryPage,
});

function SubmissionHistoryPage() {
  const history = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Submission history</h1>
      <p className="mt-2 text-gray-600">Your latest judged solutions.</p>
      {history.length === 0 ? (
        <p className="mt-8 rounded border p-6">No submissions yet. <Link to="/problems" className="underline">Choose a problem</Link>.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50"><tr><th className="p-4">Problem</th><th className="p-4">Status</th><th className="p-4">Runtime</th><th className="p-4">Submitted</th></tr></thead>
            <tbody>{history.map((item) => (
              <tr key={item.id} className="border-b last:border-0">
                <td className="p-4"><Link to="/problems/$problemSlug" params={{ problemSlug: item.problemSlug }} className="font-medium underline">{item.problemTitle}</Link></td>
                <td className="p-4 uppercase">{item.status.replaceAll("_", " ")}</td>
                <td className="p-4">{item.runtimeMs ?? "—"} ms</td>
                <td className="p-4">{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </main>
  );
}
