import "dotenv/config";

import type { AstAnalysis } from "./types";

type PistonResponse = {
  run?: { stdout?: string; stderr?: string; code?: number; signal?: string | null };
  message?: string;
};

const ANALYSIS_MARKER = "__HIREME_AST__";
const MAX_SOURCE_BYTES = 20_000;

function buildAnalyzer(sourceCode: string) {
  const encodedSource = Buffer.from(sourceCode).toString("base64");
  return `import ast, base64, json
source = base64.b64decode("${encodedSource}").decode("utf-8")
marker = "${ANALYSIS_MARKER}"

def emit(value):
    print(marker + json.dumps(value, separators=(",", ":")))

try:
    tree = ast.parse(source)
except SyntaxError as error:
    emit({"valid": False, "error": f"Line {error.lineno}: {error.msg}", "timeComplexity": "Unknown", "spaceComplexity": "Unknown", "confidence": "high", "patterns": [], "metrics": {"loops": 0, "maxLoopDepth": 0, "branches": 0, "functions": 0, "recursiveCalls": 0}, "findings": [{"kind": "warning", "title": "Fix the syntax error first", "detail": "AST analysis requires valid Python syntax."}]})
    raise SystemExit

class Analyzer(ast.NodeVisitor):
    def __init__(self):
        self.loops = 0
        self.loop_depth = 0
        self.max_loop_depth = 0
        self.branches = 0
        self.functions = []
        self.current_function = None
        self.recursive_calls = 0
        self.calls = []
        self.names = set()
        self.comprehensions = 0
        self.containers = 0

    def visit_FunctionDef(self, node):
        previous = self.current_function
        self.current_function = node.name
        self.functions.append(node.name)
        self.generic_visit(node)
        self.current_function = previous

    visit_AsyncFunctionDef = visit_FunctionDef

    def visit_For(self, node):
        self.loops += 1
        self.loop_depth += 1
        self.max_loop_depth = max(self.max_loop_depth, self.loop_depth)
        self.generic_visit(node)
        self.loop_depth -= 1

    visit_AsyncFor = visit_For
    visit_While = visit_For

    def visit_If(self, node):
        self.branches += 1
        self.generic_visit(node)

    def visit_Call(self, node):
        name = node.func.id if isinstance(node.func, ast.Name) else node.func.attr if isinstance(node.func, ast.Attribute) else ""
        if name:
            self.calls.append(name)
        if self.current_function and isinstance(node.func, ast.Name) and node.func.id == self.current_function:
            self.recursive_calls += 1
        self.generic_visit(node)

    def visit_Name(self, node):
        self.names.add(node.id)

    def visit_ListComp(self, node):
        self.comprehensions += 1
        self.generic_visit(node)
    visit_SetComp = visit_ListComp
    visit_DictComp = visit_ListComp
    visit_GeneratorExp = visit_ListComp

    def visit_List(self, node):
        self.containers += 1
        self.generic_visit(node)
    visit_Set = visit_List
    visit_Dict = visit_List

a = Analyzer()
a.visit(tree)
patterns = []
findings = []
calls = set(a.calls)

if "sort" in calls or "sorted" in calls:
    patterns.append("Sorting")
    findings.append({"kind": "info", "title": "Sorting detected", "detail": "Sorting usually contributes O(n log n) time."})
if any(name in calls for name in ("append", "pop")):
    patterns.append("Stack or dynamic array")
if any(name in a.names for name in ("left", "right", "low", "high", "mid")):
    patterns.append("Pointer-based traversal")
if any(name in a.names for name in ("seen", "lookup", "counts", "frequency", "visited")):
    patterns.append("Hash-based lookup")
    findings.append({"kind": "strength", "title": "Fast lookup structure detected", "detail": "Hash maps and sets often replace repeated scans with expected O(1) membership checks."})
if a.recursive_calls:
    patterns.append("Recursion")
if a.comprehensions:
    patterns.append("Comprehension")

is_binary_search = a.loops > 0 and "mid" in a.names and any(name in a.names for name in ("left", "right", "low", "high"))
if is_binary_search:
    time_complexity, confidence = "O(log n)", "medium"
elif a.recursive_calls > 1:
    time_complexity, confidence = "Potentially O(2^n)", "low"
elif a.recursive_calls == 1:
    time_complexity, confidence = "O(n) or O(depth)", "low"
elif a.max_loop_depth >= 2:
    time_complexity, confidence = f"O(n^{a.max_loop_depth})", "medium"
elif "sort" in calls or "sorted" in calls:
    time_complexity, confidence = "O(n log n)", "medium"
elif a.loops or a.comprehensions:
    time_complexity, confidence = "O(n)", "medium"
else:
    time_complexity, confidence = "O(1)", "medium"

uses_growing_storage = a.containers > 0 or a.comprehensions > 0 or any(name in calls for name in ("append", "add", "setdefault"))
space_complexity = "O(n)" if uses_growing_storage or a.recursive_calls else "O(1)"

if a.max_loop_depth >= 2:
    findings.append({"kind": "warning", "title": "Nested traversal detected", "detail": f"The deepest loop nesting is {a.max_loop_depth}. Check whether a set, map, or pointer technique can remove repeated work."})
elif a.loops == 1:
    findings.append({"kind": "strength", "title": "Single traversal detected", "detail": "One non-nested traversal is often a strong linear-time structure."})
if a.recursive_calls:
    findings.append({"kind": "info", "title": "Recursion uses call-stack space", "detail": "Maximum recursion depth contributes to auxiliary space and can hit Python's recursion limit."})
if not findings:
    findings.append({"kind": "info", "title": "Simple control flow", "detail": "No expensive structural pattern was detected. Confirm the estimate against input-dependent operations."})

emit({"valid": True, "error": None, "timeComplexity": time_complexity, "spaceComplexity": space_complexity, "confidence": confidence, "patterns": list(dict.fromkeys(patterns)), "metrics": {"loops": a.loops, "maxLoopDepth": a.max_loop_depth, "branches": a.branches, "functions": len(a.functions), "recursiveCalls": a.recursive_calls}, "findings": findings})
`;
}

export async function analyzePythonAst(sourceCode: string): Promise<AstAnalysis> {
  if (Buffer.byteLength(sourceCode, "utf8") > MAX_SOURCE_BYTES) throw new Error("Source code must be 20 KB or smaller.");
  const pistonUrl = process.env.PISTON_URL;
  if (!pistonUrl) throw new Error("PISTON_URL is not configured.");

  const response = await fetch(`${pistonUrl.replace(/\/$/, "")}/api/v2/execute`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      language: "python",
      version: process.env.PISTON_PYTHON_VERSION ?? "3.10.0",
      files: [{ name: "analyze.py", content: buildAnalyzer(sourceCode) }],
      run_timeout: 2_000,
      run_memory_limit: 64 * 1024 * 1024,
    }),
    signal: AbortSignal.timeout(4_000),
  });
  const payload = (await response.json()) as PistonResponse;
  if (!response.ok || !payload.run) throw new Error(payload.message ?? "The analysis service rejected the request.");
  const stdout = payload.run.stdout ?? "";
  const markerIndex = stdout.lastIndexOf(ANALYSIS_MARKER);
  if (payload.run.code !== 0 || payload.run.signal || markerIndex < 0) throw new Error((payload.run.stderr || "AST analysis failed.").slice(0, 2_000));
  return JSON.parse(stdout.slice(markerIndex + ANALYSIS_MARKER.length).trim()) as AstAnalysis;
}
