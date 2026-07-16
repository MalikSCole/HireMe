import { useState } from "react";

import type { JsonValue } from "../features/judge/types";
import type { ExecutionTrace } from "../features/trace/types";

export function ExecutionReplay({ problemSlug, sourceCode, trace }: { problemSlug: string; sourceCode: string; trace: ExecutionTrace }) {
  const [step, setStep] = useState(0);
  const frame = trace.frames.at(step);
  const lines = sourceCode.split("\n");

  if (!frame) return <section className="mt-6 rounded-lg border p-5"><h2 className="text-xl font-semibold">Execution replay</h2><p className="mt-3 text-gray-600">No Python lines were traced. Check that the required function is defined and called.</p>{trace.error && <pre className="mt-3 whitespace-pre-wrap text-sm text-red-700">{trace.error}</pre>}</section>;

  return (
    <section className="mt-6 overflow-hidden rounded-xl border" aria-labelledby="execution-replay-title">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b bg-gray-50 p-5">
        <div><p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Visible test replay</p><h2 id="execution-replay-title" className="mt-1 text-xl font-semibold">Step through execution</h2></div>
        <div className="text-right text-sm"><p className="font-medium">Step {step + 1} of {trace.frames.length}</p><p className="mt-1 text-gray-500">{frame.event} · {frame.functionName} · depth {frame.callDepth}</p></div>
      </div>

      <AlgorithmState problemSlug={problemSlug} trace={trace} frame={frame} />

      <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
        <div className="overflow-auto bg-gray-950 py-3 font-mono text-sm text-gray-200" aria-label={`Source code with line ${frame.line} active`}>
          {lines.map((line, index) => {
            const lineNumber = index + 1;
            const active = lineNumber === frame.line;
            return <div key={lineNumber} className={active ? "flex min-h-7 bg-emerald-900/80 text-white" : "flex min-h-7"}><span className={active ? "w-12 shrink-0 select-none pr-3 text-right text-emerald-300" : "w-12 shrink-0 select-none pr-3 text-right text-gray-600"}>{active ? "▶" : lineNumber}</span><code className="whitespace-pre pr-4">{line || " "}</code></div>;
          })}
        </div>
        <aside className="border-t p-5 lg:border-t-0 lg:border-l">
          <h3 className="font-semibold">Local variables</h3>
          {Object.keys(frame.locals).length === 0 ? <p className="mt-3 text-sm text-gray-500">No local variables at this step.</p> : <dl className="mt-3 space-y-3">{Object.entries(frame.locals).map(([name, value]) => <div key={name} className="rounded bg-gray-50 p-3"><dt className="font-mono text-sm font-semibold text-emerald-800">{name}</dt><dd><pre className="mt-1 max-h-32 overflow-auto whitespace-pre-wrap text-xs text-gray-700">{JSON.stringify(value, null, 2)}</pre></dd></div>)}</dl>}
        </aside>
      </div>

      <div className="border-t p-4">
        <label htmlFor="trace-step" className="flex justify-between text-sm font-medium"><span>Execution step</span><span>{step + 1}/{trace.frames.length}</span></label>
        <input id="trace-step" type="range" min={0} max={trace.frames.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} className="mt-2 w-full accent-emerald-700" />
        <div className="mt-3 flex justify-between gap-3"><button type="button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))} className="rounded border px-4 py-2 disabled:opacity-40">← Previous</button><button type="button" disabled={step === trace.frames.length - 1} onClick={() => setStep((current) => Math.min(trace.frames.length - 1, current + 1))} className="rounded bg-emerald-700 px-4 py-2 text-white disabled:opacity-40">Next →</button></div>
        {trace.truncated && <p className="mt-3 text-sm text-amber-700">Replay stopped after 200 frames to keep the visualization responsive.</p>}
        {trace.error && <pre className="mt-3 whitespace-pre-wrap rounded bg-red-50 p-3 text-xs text-red-700">{trace.error}</pre>}
      </div>
    </section>
  );
}

type TraceFrame = ExecutionTrace["frames"][number];

function AlgorithmState({ problemSlug, trace, frame }: { problemSlug: string; trace: ExecutionTrace; frame: TraceFrame }) {
  if (problemSlug === "two-sum") return <TwoSumState trace={trace} frame={frame} />;
  if (problemSlug === "contains-duplicate") return <ContainsDuplicateState trace={trace} frame={frame} />;
  if (problemSlug === "valid-anagram") return <ValidAnagramState trace={trace} frame={frame} />;
  if (problemSlug === "best-time-to-buy-and-sell-stock") return <StockState trace={trace} frame={frame} />;
  if (problemSlug === "valid-parentheses") return <ParenthesesState trace={trace} frame={frame} />;
  return null;
}

function findNumber(frame: TraceFrame, names: string[]) {
  const value = names.map((name) => frame.locals[name]).find((item) => typeof item === "number");
  return typeof value === "number" ? value : null;
}

function findString(frame: TraceFrame, names: string[]) {
  const value = names.map((name) => frame.locals[name]).find((item) => typeof item === "string");
  return typeof value === "string" ? value : null;
}

function NumberCells({ values, currentIndex, secondaryIndex, currentLabel = "current", secondaryLabel = "minimum" }: { values: number[]; currentIndex: number | null; secondaryIndex?: number | null; currentLabel?: string; secondaryLabel?: string }) {
  return <div className="mt-5 flex flex-wrap gap-2">{values.map((value, index) => {
    const current = index === currentIndex;
    const secondary = index === secondaryIndex;
    return <div key={index} className={current ? "min-w-16 rounded-lg border-2 border-emerald-600 bg-emerald-100 p-3 text-center" : secondary ? "min-w-16 rounded-lg border-2 border-blue-500 bg-blue-50 p-3 text-center" : "min-w-16 rounded-lg border bg-white p-3 text-center"}><p className="text-xs text-gray-500">[{index}]</p><p className="mt-1 text-lg font-bold">{value}</p><p className="mt-1 min-h-4 text-xs font-medium">{current ? currentLabel : secondary ? secondaryLabel : ""}</p></div>;
  })}</div>;
}

function TwoSumState({ trace, frame }: { trace: ExecutionTrace; frame: TraceFrame }) {
  if (!Array.isArray(trace.input) || !Array.isArray(trace.input[0]) || !trace.input[0].every((value) => typeof value === "number") || typeof trace.input[1] !== "number") return null;
  const nums = trace.input[0];
  const target = trace.input[1];
  const currentIndex = findNumber(frame, ["i", "index", "idx", "right"]);
  const currentValue = findNumber(frame, ["num", "value", "current", "x"]) ?? (currentIndex === null ? null : nums[currentIndex] ?? null);
  const complement = findNumber(frame, ["complement", "needed", "need", "difference"]);
  const seenValue = ["seen", "lookup", "indices", "values"].map((name) => frame.locals[name]).find((value): value is { [key: string]: JsonValue } => value !== null && typeof value === "object" && !Array.isArray(value));
  const seen: { [key: string]: JsonValue } = seenValue ?? {};
  const matchedIndex = complement === null ? null : seen[String(complement)];

  return (
    <div className="border-b bg-emerald-50/40 p-5" role="img" aria-label={`Two Sum state at index ${currentIndex ?? "not selected"}, looking for complement ${complement ?? "not calculated"}`}>
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Two Sum state</p><p className="mt-1 text-sm text-gray-600">Target: <strong>{target}</strong>{currentValue !== null && complement !== null ? <> · {currentValue} + <strong>{complement}</strong> = {target}</> : " · waiting for complement calculation"}</p></div><p className="text-sm text-gray-600">Seen values: {Object.keys(seen).length === 0 ? "none" : Object.entries(seen).map(([value, index]) => `${value} → ${JSON.stringify(index)}`).join(", ")}</p></div>
      <div className="mt-5 flex flex-wrap gap-2">{nums.map((value, index) => {
        const current = index === currentIndex;
        const match = typeof matchedIndex === "number" && index === matchedIndex;
        return <div key={index} className={current ? "min-w-16 rounded-lg border-2 border-emerald-600 bg-emerald-100 p-3 text-center" : match ? "min-w-16 rounded-lg border-2 border-blue-500 bg-blue-50 p-3 text-center" : "min-w-16 rounded-lg border bg-white p-3 text-center"}><p className="text-xs text-gray-500">[{index}]</p><p className="mt-1 text-lg font-bold">{value}</p><p className="mt-1 min-h-4 text-xs font-medium">{current ? "current" : match ? "match" : ""}</p></div>;
      })}</div>
    </div>
  );
}

function ContainsDuplicateState({ trace, frame }: { trace: ExecutionTrace; frame: TraceFrame }) {
  if (!Array.isArray(trace.input) || !Array.isArray(trace.input[0]) || !trace.input[0].every((value) => typeof value === "number")) return null;
  const nums = trace.input[0];
  const currentIndex = findNumber(frame, ["i", "index", "idx"]);
  const currentValue = findNumber(frame, ["num", "value", "current", "x"]);
  const inferredIndex = currentIndex ?? (currentValue === null ? null : nums.indexOf(currentValue));
  const seenValue = ["seen", "values", "visited", "unique"].map((name) => frame.locals[name]).find(Array.isArray);
  const seen = seenValue ?? [];
  const duplicate = currentValue !== null && seen.some((value) => value === currentValue);

  return <div className="border-b bg-emerald-50/40 p-5" role="img" aria-label="Contains Duplicate algorithm state"><p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Contains Duplicate state</p><p className="mt-1 text-sm text-gray-600">Seen set: <strong>{seen.length === 0 ? "empty" : seen.map(String).join(", ")}</strong>{currentValue !== null ? <> · checking <strong>{currentValue}</strong>{duplicate ? " — duplicate found" : ""}</> : null}</p><NumberCells values={nums} currentIndex={inferredIndex} currentLabel={duplicate ? "duplicate" : "checking"} /></div>;
}

function ValidAnagramState({ trace, frame }: { trace: ExecutionTrace; frame: TraceFrame }) {
  if (!Array.isArray(trace.input) || typeof trace.input[0] !== "string" || typeof trace.input[1] !== "string") return null;
  const [first, second] = trace.input;
  const currentChar = findString(frame, ["char", "ch", "letter", "c"]);
  const countsValue = ["counts", "count", "frequency", "frequencies", "letters"].map((name) => frame.locals[name]).find((value): value is { [key: string]: JsonValue } => value !== null && typeof value === "object" && !Array.isArray(value));
  const counts = countsValue ?? {};
  const renderWord = (word: string, label: string) => <div><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p><div className="flex flex-wrap gap-1">{[...word].map((char, index) => <span key={index} className={char === currentChar ? "grid size-10 place-items-center rounded border-2 border-emerald-600 bg-emerald-100 font-mono font-bold" : "grid size-10 place-items-center rounded border bg-white font-mono font-bold"}>{char}</span>)}</div></div>;

  return <div className="border-b bg-emerald-50/40 p-5" role="img" aria-label="Valid Anagram frequency-count state"><div className="flex flex-wrap justify-between gap-3"><div><p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Valid Anagram state</p><p className="mt-1 text-sm text-gray-600">{currentChar ? <>Updating the count for <strong>{currentChar}</strong></> : "Comparing character frequencies"}</p></div><p className="text-sm text-gray-600">Counts: <strong>{Object.keys(counts).length === 0 ? "empty" : Object.entries(counts).map(([char, count]) => `${char}: ${JSON.stringify(count)}`).join(" · ")}</strong></p></div><div className="mt-5 grid gap-4 md:grid-cols-2">{renderWord(first, "First string")}{renderWord(second, "Second string")}</div></div>;
}

function StockState({ trace, frame }: { trace: ExecutionTrace; frame: TraceFrame }) {
  if (!Array.isArray(trace.input) || !Array.isArray(trace.input[0]) || !trace.input[0].every((value) => typeof value === "number")) return null;
  const prices = trace.input[0];
  const currentIndex = findNumber(frame, ["i", "index", "day"]);
  const currentPrice = findNumber(frame, ["price", "current_price", "current"]);
  const inferredIndex = currentIndex ?? (currentPrice === null ? null : prices.indexOf(currentPrice));
  const minimum = findNumber(frame, ["min_price", "minPrice", "minimum", "buy_price", "lowest"]);
  const minimumIndex = minimum === null ? null : prices.indexOf(minimum);
  const profit = findNumber(frame, ["best_profit", "max_profit", "maxProfit", "profit", "best"]);

  return <div className="border-b bg-emerald-50/40 p-5" role="img" aria-label="Stock profit algorithm state"><div className="flex flex-wrap justify-between gap-3"><div><p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Stock profit state</p><p className="mt-1 text-sm text-gray-600">Scan prices once, remembering the cheapest earlier buying price.</p></div><div className="flex gap-5 text-sm"><p>Minimum: <strong>{minimum ?? "—"}</strong></p><p>Best profit: <strong>{profit ?? "—"}</strong></p></div></div><NumberCells values={prices} currentIndex={inferredIndex} secondaryIndex={minimumIndex} currentLabel="today" secondaryLabel="best buy" /></div>;
}

function ParenthesesState({ trace, frame }: { trace: ExecutionTrace; frame: TraceFrame }) {
  if (!Array.isArray(trace.input) || typeof trace.input[0] !== "string") return null;
  const input = trace.input[0];
  const currentChar = findString(frame, ["char", "ch", "bracket", "current", "c"]);
  const stackValue = ["stack", "open_brackets", "opens"].map((name) => frame.locals[name]).find(Array.isArray);
  const stack = stackValue ?? [];
  const currentIndex = findNumber(frame, ["i", "index", "idx"]);

  return <div className="border-b bg-emerald-50/40 p-5" role="img" aria-label="Valid Parentheses stack state"><div className="flex flex-wrap justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Valid Parentheses state</p><p className="mt-1 text-sm text-gray-600">Opening brackets are pushed; closing brackets must match the stack top.</p></div><div><p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Stack (top on right)</p><div className="mt-2 flex min-h-10 items-center gap-1 rounded border bg-white px-3">{stack.length === 0 ? <span className="text-sm text-gray-400">empty</span> : stack.map((item, index) => <span key={index} className="grid size-8 place-items-center rounded bg-blue-100 font-mono font-bold text-blue-900">{String(item)}</span>)}</div></div></div><div className="mt-5 flex flex-wrap gap-2">{[...input].map((char, index) => { const active = index === currentIndex || (currentIndex === null && char === currentChar); return <span key={index} className={active ? "grid size-12 place-items-center rounded-lg border-2 border-emerald-600 bg-emerald-100 font-mono text-xl font-bold" : "grid size-12 place-items-center rounded-lg border bg-white font-mono text-xl font-bold"}>{char}</span>; })}</div></div>;
}
