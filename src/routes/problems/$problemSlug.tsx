import {
  ClientOnly,
  createFileRoute,
  notFound,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { and, eq } from "drizzle-orm";

import { db } from "../../db";
import { ExecutionReplay } from "../../components/execution-replay";
import { codeDrafts, problems } from "../../db/schema";
import { saveDraft } from "../../features/drafts/functions";
import { analyzeCode } from "../../features/analysis/functions";
import type { CodeIntelligenceAnalysis } from "../../features/analysis/types";
import { runCode, submitCode } from "../../features/judge/functions";
import type { JudgeResult } from "../../features/judge/types";
import { traceCode } from "../../features/trace/functions";
import type { ExecutionTrace } from "../../features/trace/types";
import { getSession } from "../../lib/auth-functions";

const MonacoEditor = lazy(() => import("@monaco-editor/react"));

const getProblem = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const problemRows = await db
      .select()
      .from(problems)
      .where(eq(problems.slug, slug))
      .limit(1);

    if (problemRows.length === 0) {
      throw notFound();
    }

    const problem = problemRows[0];
    const hints = JSON.parse(problem.hints) as string[];
    const session = await getSession();
    if (!session) return { ...problem, hints, draftSource: null, canSaveDraft: false };

    const draftRows = await db
      .select({ sourceCode: codeDrafts.sourceCode })
      .from(codeDrafts)
      .where(and(eq(codeDrafts.userId, session.user.id), eq(codeDrafts.problemId, problem.id)))
      .limit(1);

    return { ...problem, hints, draftSource: draftRows[0]?.sourceCode ?? null, canSaveDraft: true };
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
  const [code, setCode] = useState(problem.draftSource ?? problem.starterCode);
  const [result, setResult] = useState<JudgeResult | null>(null);
  const [analysis, setAnalysis] = useState<CodeIntelligenceAnalysis | null>(null);
  const [trace, setTrace] = useState<{ data: ExecutionTrace; sourceCode: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [action, setAction] = useState<"analyze" | "trace" | "run" | "submit" | null>(null);
  const [draftState, setDraftState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const lastSavedCode = useRef(code);

  useEffect(() => {
    if (!problem.canSaveDraft || code === lastSavedCode.current) return;

    setDraftState("idle");
    let active = true;
    const timeout = window.setTimeout(async () => {
      setDraftState("saving");
      try {
        await saveDraft({ data: { problemSlug: problem.slug, sourceCode: code } });
        if (active) {
          lastSavedCode.current = code;
          setDraftState("saved");
        }
      } catch {
        if (active) setDraftState("error");
      }
    }, 800);

    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, [code, problem.canSaveDraft, problem.slug]);

  async function execute(kind: "run" | "submit") {
    setAction(kind);
    setError(null);
    setResult(null);

    try {
      const fn = kind === "run" ? runCode : submitCode;
      setResult(
        await fn({
          data: { problemSlug: problem.slug, sourceCode: code },
        }),
      );
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Code execution failed.");
    } finally {
      setAction(null);
    }
  }

  async function analyze() {
    setAction("analyze");
    setError(null);
    setAnalysis(null);
    try {
      setAnalysis(await analyzeCode({ data: { problemSlug: problem.slug, sourceCode: code } }));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "AST analysis failed.");
    } finally {
      setAction(null);
    }
  }

  async function visualizeExecution() {
    setAction("trace");
    setError(null);
    setTrace(null);
    try {
      const data = await traceCode({ data: { problemSlug: problem.slug, sourceCode: code } });
      setTrace({ data, sourceCode: code });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Execution replay failed.");
    } finally {
      setAction(null);
    }
  }

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

      <ProblemHints hints={problem.hints} />

      <section className="mt-6 overflow-hidden rounded-lg border">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-xl font-semibold">Code Editor</h2>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{problem.canSaveDraft ? draftState === "saving" ? "Saving draft..." : draftState === "saved" ? "Draft saved" : draftState === "error" ? "Draft save failed" : "Autosave enabled" : "Sign in to save drafts"}</span>
            <span>Python</span>
          </div>
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
            onClick={() => void analyze()}
            disabled={action !== null}
            className="rounded border border-violet-300 bg-violet-50 px-4 py-2 font-medium text-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {action === "analyze" ? "Analyzing..." : "Analyze Complexity"}
          </button>

          <button
            type="button"
            onClick={() => void visualizeExecution()}
            disabled={action !== null}
            className="rounded border border-emerald-300 bg-emerald-50 px-4 py-2 font-medium text-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {action === "trace" ? "Building Replay..." : "Visualize Execution"}
          </button>

          <button
            type="button"
            onClick={() => void execute("run")}
            disabled={action !== null}
            className="rounded bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {action === "run" ? "Running..." : "Run Code"}
          </button>

          <button
            type="button"
            onClick={() => void execute("submit")}
            disabled={action !== null}
            className="rounded bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {action === "submit" ? "Submitting..." : "Submit"}
          </button>
        </div>
      </section>

      {analysis && <AstAnalysisPanel analysis={analysis} />}
      {trace && <ExecutionReplay problemSlug={problem.slug} sourceCode={trace.sourceCode} trace={trace.data} />}

      {(error || result) && (
        <section className="mt-6 rounded-lg border p-5" aria-live="polite">
          <h2 className="text-xl font-semibold">Test Results</h2>

          {error && <p className="mt-3 text-red-700">{error}</p>}

          {result && (
            <div className="mt-3">
              <p className={result.passed ? "font-semibold text-green-700" : "font-semibold text-red-700"}>
                {result.status.replaceAll("_", " ").toUpperCase()} — {result.passedCount}/{result.totalCount} tests passed
              </p>
              <p className="mt-1 text-sm text-gray-500">Judge round trip: {result.runtimeMs} ms</p>

              <div className="mt-4 space-y-3">
                {result.tests.map((test) => (
                  <article key={test.position} className="rounded border p-3 text-sm">
                    <p className="font-medium">
                      Test {test.position + 1}: {test.passed ? "Passed" : "Failed"}
                      {test.hidden ? " (hidden)" : ""}
                    </p>
                    {!test.hidden && (
                      <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs">
                        Input: {JSON.stringify(test.input)}{"\n"}
                        Expected: {JSON.stringify(test.expected)}{"\n"}
                        Actual: {JSON.stringify(test.actual)}
                      </pre>
                    )}
                    {test.error && <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs text-red-700">{test.error}</pre>}
                  </article>
                ))}
              </div>

              {result.output && (
                <pre className="mt-4 max-h-40 overflow-auto rounded bg-gray-950 p-3 text-xs text-gray-100">{result.output}</pre>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

function ProblemHints({ hints }: { hints: string[] }) {
  const [revealed, setRevealed] = useState(0);
  if (hints.length === 0) return null;
  return (
    <section className="mt-6 rounded-lg border border-amber-200 bg-amber-50/50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-wider text-amber-800">Progressive hints</p><h2 className="mt-1 text-xl font-semibold">Need a small nudge?</h2></div><span className="text-sm text-gray-600">{revealed}/{hints.length} revealed</span></div>
      {revealed === 0 ? <p className="mt-3 text-sm text-gray-600">Reveal hints gradually so you can keep ownership of the solution.</p> : <ol className="mt-4 space-y-3">{hints.slice(0, revealed).map((hint, index) => <li key={hint} className="flex gap-3 rounded bg-white p-3 text-sm text-gray-700"><span className="font-bold text-amber-700">{index + 1}</span><span>{hint}</span></li>)}</ol>}
      {revealed < hints.length && <button type="button" onClick={() => setRevealed((count) => count + 1)} className="mt-4 rounded border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-900">Reveal hint {revealed + 1}</button>}
    </section>
  );
}

function AstAnalysisPanel({ analysis }: { analysis: CodeIntelligenceAnalysis }) {
  return (
    <section className="mt-6 rounded-xl border border-violet-200 bg-violet-50/40 p-5" aria-live="polite">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><p className="text-sm font-semibold uppercase tracking-wider text-violet-700">Python AST analysis</p><h2 className="mt-1 text-xl font-semibold">Structure and complexity feedback</h2></div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium capitalize text-gray-600">{analysis.confidence} confidence</span>
      </div>
      {!analysis.valid ? <p className="mt-5 rounded bg-red-100 p-4 text-red-800">{analysis.error}</p> : (
        <>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border bg-white p-4"><p className="text-sm text-gray-500">Estimated time</p><p className="mt-1 text-2xl font-bold text-violet-800">{analysis.timeComplexity}</p></div>
            <div className="rounded-lg border bg-white p-4"><p className="text-sm text-gray-500">Estimated auxiliary space</p><p className="mt-1 text-2xl font-bold text-violet-800">{analysis.spaceComplexity}</p></div>
          </div>
          <div className={analysis.codeBerta.status === "available" ? "mt-5 rounded-lg border border-blue-200 bg-blue-50 p-4" : "mt-5 rounded-lg border bg-white p-4"}>
            <div className="flex flex-wrap items-center justify-between gap-3"><p className="font-semibold text-blue-900">CodeBERTa optimization classifier</p><span className="rounded-full bg-white px-3 py-1 text-xs font-medium capitalize text-gray-600">{analysis.codeBerta.status.replaceAll("_", " ")}</span></div>
            {analysis.codeBerta.status === "available" ? <><p className="mt-3 text-lg font-semibold capitalize text-blue-900">{analysis.codeBerta.label?.replaceAll(/[_-]/g, " ")} · {Math.round((analysis.codeBerta.confidence ?? 0) * 100)}%</p><p className="mt-1 text-sm leading-6 text-blue-900">{analysis.codeBerta.explanation}</p><div className="mt-3 flex flex-wrap gap-2">{analysis.codeBerta.probabilities.map((item) => <span key={item.label} className="rounded bg-white px-2 py-1 text-xs capitalize text-gray-600">{item.label.replaceAll(/[_-]/g, " ")} {Math.round(item.probability * 100)}%</span>)}</div></> : <p className="mt-2 text-sm text-gray-600">{analysis.codeBerta.explanation} Deterministic AST feedback remains available.</p>}
          </div>
          {analysis.patterns.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{analysis.patterns.map((pattern) => <span key={pattern} className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-800">{pattern}</span>)}</div>}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">{analysis.findings.map((finding) => (
            <article key={`${finding.kind}-${finding.title}`} className="rounded-lg border bg-white p-4">
              <p className={finding.kind === "warning" ? "font-semibold text-amber-800" : finding.kind === "strength" ? "font-semibold text-green-700" : "font-semibold text-gray-900"}>{finding.kind === "warning" ? "△ " : finding.kind === "strength" ? "✓ " : "○ "}{finding.title}</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">{finding.detail}</p>
            </article>
          ))}</div>
          <p className="mt-5 text-xs text-gray-500">Heuristic estimate based on syntax structure. Input sizes and library behavior can change the true complexity.</p>
        </>
      )}
    </section>
  );
}
