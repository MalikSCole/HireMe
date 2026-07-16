import "dotenv/config";

import type { JsonValue, JudgeResult, JudgeStatus, TestResult } from "./types";

type TestCase = {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  position: number;
};

type PistonResponse = {
  run?: {
    stdout?: string;
    stderr?: string;
    code?: number;
    signal?: string | null;
  };
  message?: string;
};

const RESULT_MARKER = "__HIREME_RESULT__";
const MAX_SOURCE_BYTES = 20_000;

function buildProgram(sourceCode: string, functionName: string, input: JsonValue) {
  const encodedInput = Buffer.from(JSON.stringify(input)).toString("base64");
  const encodedName = Buffer.from(functionName).toString("base64");

  return `${sourceCode}\n\n# Platform test harness\nimport base64 as _b64\nimport json as _json\n_args = _json.loads(_b64.b64decode("${encodedInput}").decode())\n_name = _b64.b64decode("${encodedName}").decode()\n_result = globals()[_name](*_args)\nprint("${RESULT_MARKER}" + _json.dumps(_result, separators=(",", ":")))\n`;
}

function publicResult(
  test: TestCase,
  passed: boolean,
  actual?: JsonValue,
  error?: string,
): TestResult {
  return {
    position: test.position,
    passed,
    hidden: test.isHidden,
    ...(!test.isHidden
      ? {
          input: JSON.parse(test.input) as JsonValue,
          expected: JSON.parse(test.expectedOutput) as JsonValue,
          actual,
        }
      : {}),
    ...(error ? { error } : {}),
  };
}

export async function judgePython(args: {
  sourceCode: string;
  functionName: string;
  tests: TestCase[];
}): Promise<JudgeResult> {
  if (Buffer.byteLength(args.sourceCode, "utf8") > MAX_SOURCE_BYTES) {
    throw new Error("Source code must be 20 KB or smaller.");
  }

  const pistonUrl = process.env.PISTON_URL;
  if (!pistonUrl) {
    throw new Error("PISTON_URL is not configured.");
  }

  const results: TestResult[] = [];
  const outputs: string[] = [];
  const startedAt = performance.now();
  let status: JudgeStatus = "accepted";

  for (const test of args.tests) {
    try {
      const input = JSON.parse(test.input) as JsonValue;
      const expected = JSON.parse(test.expectedOutput) as JsonValue;
      const response = await fetch(`${pistonUrl.replace(/\/$/, "")}/api/v2/execute`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          language: "python",
          version: process.env.PISTON_PYTHON_VERSION ?? "3.10.0",
          files: [{ name: "main.py", content: buildProgram(args.sourceCode, args.functionName, input) }],
          run_timeout: 3_000,
          run_memory_limit: 128 * 1024 * 1024,
        }),
        signal: AbortSignal.timeout(5_000),
      });
      const payload = (await response.json()) as PistonResponse;
      if (!response.ok || !payload.run) {
        throw new Error(payload.message ?? "The execution service rejected the request.");
      }

      const stdout = payload.run.stdout ?? "";
      const markerIndex = stdout.lastIndexOf(RESULT_MARKER);
      outputs.push(stdout.slice(0, markerIndex < 0 ? undefined : markerIndex).trim());
      if (payload.run.signal || markerIndex < 0 || payload.run.code !== 0) {
        status = payload.run.signal === "SIGKILL" ? "time_limit_exceeded" : "runtime_error";
        results.push(publicResult(test, false, undefined, (payload.run.stderr || "Execution failed.").slice(0, 2_000)));
        break;
      }

      const actual = JSON.parse(stdout.slice(markerIndex + RESULT_MARKER.length).trim()) as JsonValue;
      const passed = JSON.stringify(actual) === JSON.stringify(expected);
      results.push(publicResult(test, passed, actual));
      if (!passed) status = "wrong_answer";
    } catch (error) {
      status = error instanceof DOMException && error.name === "TimeoutError" ? "time_limit_exceeded" : "internal_error";
      results.push(publicResult(test, false, undefined, error instanceof Error ? error.message : "Execution failed."));
      break;
    }
  }

  return {
    status,
    passed: status === "accepted" && results.length === args.tests.length,
    passedCount: results.filter((result) => result.passed).length,
    totalCount: args.tests.length,
    runtimeMs: Math.round(performance.now() - startedAt),
    memoryKb: null,
    output: outputs.filter(Boolean).join("\n").slice(0, 4_000),
    tests: results,
  };
}
