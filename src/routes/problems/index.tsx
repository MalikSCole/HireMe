import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { db } from "../../db";
import { problems } from "../../db/schema";

const getProblems = createServerFn({ method: "GET" }).handler(async () => {
  return db.select().from(problems);
});

export const Route = createFileRoute("/problems/")({
  loader: () => getProblems(),
  component: ProblemsPage,
});

function ProblemsPage() {
  const problemList = Route.useLoaderData();

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">DSA Problems</h1>

        <p className="mt-2 text-gray-600">
          Practice problems and track your progress.
        </p>
      </div>

      <div className="space-y-4">
        {problemList.map((problem) => (
          <article
            key={problem.id}
            className="rounded-lg border p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {problem.title}
              </h2>

              <span className="rounded-full border px-3 py-1 text-sm capitalize">
                {problem.difficulty}
              </span>
            </div>

            <p className="mt-3 text-gray-700">
              {problem.description}
            </p>

            <Link
              to="/problems/$problemSlug"
              params={{ problemSlug: problem.slug }}
              className="mt-4 inline-block font-medium underline"
            >
              Solve problem
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}