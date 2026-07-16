import "dotenv/config";
import { inflateSync } from "node:zlib";

import type { JsonValue } from "../judge/types";
import type { ExecutionTrace } from "./types";

type PistonResponse = {
  run?: { stdout?: string; stderr?: string; code?: number; signal?: string | null };
  message?: string;
};

const TRACE_MARKER = "__HIREME_TRACE__";
const MAX_SOURCE_BYTES = 20_000;

export function buildTraceProgram(sourceCode: string, functionName: string, input: JsonValue) {
  const encodedSource = Buffer.from(sourceCode).toString("base64");
  const encodedName = Buffer.from(functionName).toString("base64");
  const encodedInput = Buffer.from(JSON.stringify(input)).toString("base64");
  return `import ast, base64, json, traceback, zlib
source = base64.b64decode("${encodedSource}").decode("utf-8")
function_name = base64.b64decode("${encodedName}").decode("utf-8")
arguments = json.loads(base64.b64decode("${encodedInput}").decode("utf-8"))
frames = []
truncated = False

def safe(value, level=0):
    if level > 3:
        return "…"
    if value is None or isinstance(value, (bool, int, float, str)):
        return value if not isinstance(value, str) else value[:500]
    if isinstance(value, (list, tuple)):
        return [safe(item, level + 1) for item in value[:30]]
    if isinstance(value, dict):
        return {str(key)[:100]: safe(item, level + 1) for key, item in list(value.items())[:30]}
    if isinstance(value, set):
        return sorted([safe(item, level + 1) for item in list(value)[:30]], key=str)
    try:
        return repr(value)[:500]
    except Exception:
        return f"<{type(value).__name__}>"

def _hireme_trace(values, line, event, function_name, call_depth):
    global truncated
    if len(frames) < 200:
        frames.append({"step": len(frames), "line": line, "event": event, "callDepth": call_depth, "functionName": function_name, "locals": {name: safe(value) for name, value in values.items() if not name.startswith("_")}})
    else:
        truncated = True

class Instrument(ast.NodeTransformer):
    def __init__(self):
        self.function_name = "<module>"
        self.call_depth = 0

    def visit_FunctionDef(self, node):
        previous_name, previous_depth = self.function_name, self.call_depth
        self.function_name, self.call_depth = node.name, previous_depth + 1
        result = self.generic_visit(node)
        self.function_name, self.call_depth = previous_name, previous_depth
        return result

    visit_AsyncFunctionDef = visit_FunctionDef

    def generic_visit(self, node):
        super().generic_visit(node)
        for field, value in ast.iter_fields(node):
            if isinstance(value, list) and value and all(isinstance(item, ast.stmt) for item in value):
                instrumented = []
                for statement in value:
                    event = "return" if isinstance(statement, ast.Return) else "line"
                    call = ast.Expr(value=ast.Call(func=ast.Name(id="_hireme_trace", ctx=ast.Load()), args=[ast.Call(func=ast.Name(id="locals", ctx=ast.Load()), args=[], keywords=[]), ast.Constant(value=statement.lineno), ast.Constant(value=event), ast.Constant(value=self.function_name), ast.Constant(value=max(self.call_depth - 1, 0))], keywords=[]))
                    instrumented.extend([ast.copy_location(call, statement), statement])
                setattr(node, field, instrumented)
        return node

namespace = {"_hireme_trace": _hireme_trace}
result = None
error = None
try:
    tree = Instrument().visit(ast.parse(source))
    ast.fix_missing_locations(tree)
    compiled = compile(tree, "submission.py", "exec")
    exec(compiled, namespace)
    result = namespace[function_name](*arguments)
except Exception:
    error = traceback.format_exc(limit=4)[-2000:]
    tb = traceback.extract_tb(__import__("sys").exc_info()[2])
    submission_frames = [item for item in tb if item.filename == "submission.py"]
    if submission_frames and len(frames) < 200:
        item = submission_frames[-1]
        frames.append({"step": len(frames), "line": item.lineno, "event": "exception", "callDepth": 0, "functionName": item.name, "locals": {}})

payload = json.dumps({"frames": frames, "truncated": truncated, "input": arguments, "output": safe(result), "error": error}, separators=(",", ":")).encode("utf-8")
print("${TRACE_MARKER}" + base64.b64encode(zlib.compress(payload, 9)).decode("ascii"))
`;
}

export async function tracePython(args: { sourceCode: string; functionName: string; input: JsonValue }): Promise<ExecutionTrace> {
  if (Buffer.byteLength(args.sourceCode, "utf8") > MAX_SOURCE_BYTES) throw new Error("Source code must be 20 KB or smaller.");
  const pistonUrl = process.env.PISTON_URL;
  if (!pistonUrl) throw new Error("PISTON_URL is not configured.");

  const response = await fetch(`${pistonUrl.replace(/\/$/, "")}/api/v2/execute`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      language: "python",
      version: process.env.PISTON_PYTHON_VERSION ?? "3.10.0",
      files: [{ name: "trace.py", content: buildTraceProgram(args.sourceCode, args.functionName, args.input) }],
      run_timeout: 3_000,
      run_output_limit: 256 * 1024,
    }),
    signal: AbortSignal.timeout(5_000),
  });
  const payload = (await response.json()) as PistonResponse;
  if (!response.ok || !payload.run) throw new Error(payload.message ?? "The trace service rejected the request.");
  const stdout = payload.run.stdout ?? "";
  const markerIndex = stdout.lastIndexOf(TRACE_MARKER);
  if (payload.run.signal || markerIndex < 0) throw new Error((payload.run.stderr || "Execution trace failed.").slice(0, 2_000));
  const compressed = Buffer.from(stdout.slice(markerIndex + TRACE_MARKER.length).trim(), "base64");
  return JSON.parse(inflateSync(compressed).toString("utf8")) as ExecutionTrace;
}
