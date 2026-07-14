import {
  ClientOnly,
  createFileRoute,
  notFound,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { lazy, Suspense, useState } from "react";
import { eq } from "drizzle-orm";

import { db } from "../../db";
import { problems } from "../../db/schema";

const MonacoEditor = lazy(() => import("@monaco-editor/react"));

const getProblem = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const [problem] = await db
      .select()
      .from(problems)
      .where(eq(problems.slug, slug))
      .limit(1);

    if (!problem) {
      throw notFound();
    }

    return problem;
  });

export const Route = createFileRoute("/problems/$problemSlug")({
  loader: ({ params }) =>
    getProblem({
      data: params.problemSlug,
    }),
  component: ProblemDetailPage,
});

function EditorLoadingState() {
  return (
    <div className="flex h-[420px] items-center justify-center bg-gray-950 text-gray-400">
      Loading code editor...
    </div>
  );
}

function ProblemDetailPage() {
  const problem = Route.useLoaderData();
  const [code, setCode] = useState(problem.starterCode);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{problem.title}</h1>

        <span className="mt-3 inline-block rounded-full border px-3 py-1 text-sm capitalize">
          {problem.difficulty}
        </span>
      </div>

      <section className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Problem Description</h2>

        <p className="mt-4 whitespace-pre-line text-gray-700">
          {problem.description}
        </p>
      </section>

      <section className="mt-6 overflow-hidden rounded-lg border">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-xl font-semibold">Code Editor</h2>

          <span className="text-sm text-gray-500">Python</span>
        </div>

        <ClientOnly fallback={<EditorLoadingState />}>
          <Suspense fallback={<EditorLoadingState />}>
            <MonacoEditor
              height="420px"
              defaultLanguage="python"
              value={code}
              onChange={(value) => setCode(value ?? "")}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: {
                  enabled: false,
                },
                automaticLayout: true,
                scrollBeyondLastLine: false,
                tabSize: 4,
                insertSpaces: true,
                wordWrap: "on",
              }}
            />
          </Suspense>
        </ClientOnly>

        <div className="flex justify-end gap-3 border-t p-4">
          <button
            type="button"
            onClick={() => setCode(problem.starterCode)}
            className="rounded border px-4 py-2"
          >
            Reset
          </button>

          <button
            type="button"
            className="rounded bg-black px-4 py-2 text-white"
          >
            Run Code
          </button>

          <button
            type="button"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Submit
          </button>
        </div>
      </section>
    </main>
  );
}