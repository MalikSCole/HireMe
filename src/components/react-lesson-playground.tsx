import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";

const examples: Partial<Record<string, { title: string; goal: string; code: string }>> = {
  "react-readiness-diagnostic": {
    title: "Transform component-shaped data",
    goal: "Change the minimum rating or add another product to practice map, filter, destructuring, and typed-looking data flow.",
    code: `const products = [
  { id: "p1", name: "Keyboard", rating: 4.8 },
  { id: "p2", name: "Notebook", rating: 4.2 },
  { id: "p3", name: "Desk lamp", rating: 4.6 },
];

export default function App() {
  const featured = products
    .filter(({ rating }) => rating >= 4.5)
    .map(({ id, name, rating }) => <li key={id}>{name}: {rating}</li>);

  return <main><h1>Featured products</h1><ul>{featured}</ul></main>;
}`,
  },
  "react-components-and-props": {
    title: "Experiment with props",
    goal: "Change the names or add another ProfileCard to see how one component creates many UI instances.",
    code: `function ProfileCard({ name, role, color }) {
  return (
    <article className="card" style={{ borderColor: color }}>
      <div className="avatar" style={{ background: color }}>{name[0]}</div>
      <div><strong>{name}</strong><p>{role}</p></div>
    </article>
  );
}

export default function App() {
  return <main><h1>Study group</h1>
    <ProfileCard name="Maya" role="React learner" color="#2563eb" />
    <ProfileCard name="Theo" role="DSA learner" color="#7c3aed" />
  </main>;
}`,
  },
  "react-props-and-reusable-components": {
    title: "Reuse one card with different props",
    goal: "Add another MovieCard. The layout should grow without copying the component markup.",
    code: `function MovieCard({ title, year, rating, children }) {
  return <article className="card"><div><strong>{title}</strong>
    <p>{year} · {rating}</p><p>{children}</p></div></article>;
}

export default function App() {
  return <main><h1>Watchlist</h1>
    <MovieCard title="Arrival" year="2016" rating="PG-13">Thoughtful sci-fi</MovieCard>
    <MovieCard title="Spider-Man: Into the Spider-Verse" year="2018" rating="PG">Animated adventure</MovieCard>
  </main>;
}`,
  },
  "react-state-and-events": {
    title: "Watch state drive the interface",
    goal: "Click the buttons, then change the step value in the code from 1 to 2.",
    code: `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const step = 1;
  return <main className="center"><p className="eyebrow">CURRENT COUNT</p>
    <h1 className="number">{count}</h1>
    <div className="actions">
      <button onClick={() => setCount(c => c - step)}>−</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount(c => c + step)}>+</button>
    </div>
  </main>;
}`,
  },
  "react-forms-and-validation": {
    title: "Control a form from state",
    goal: "Submit an empty name, then type one and submit again to see validation and saved UI states.",
    code: `import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const error = name.trim() === "" ? "Name is required" : "";

  function handleSubmit(event) {
    event.preventDefault();
    setSaved(!error);
  }

  return <main><h1>Profile</h1><form onSubmit={handleSubmit}>
    <label>Name <input value={name} onChange={event => setName(event.target.value)} /></label>
    {error && <p className="error">{error}</p>}
    <button>Save</button>
  </form>{saved && <p>Saved profile</p>}</main>;
}`,
  },
  "react-component-communication": {
    title: "Lift state to coordinate children",
    goal: "Click the child controls and watch the parent-owned quantity update both the count and derived total.",
    code: `import { useState } from "react";

function QuantityControls({ quantity, onIncrement, onDecrement }) {
  return <article className="task"><button onClick={onDecrement}>-</button>
    <span>Quantity: {quantity}</span><button onClick={onIncrement}>+</button></article>;
}

export default function App() {
  const [quantity, setQuantity] = useState(1);
  return <main><h1>Cart</h1>
    <QuantityControls
      quantity={quantity}
      onIncrement={() => setQuantity(value => value + 1)}
      onDecrement={() => setQuantity(value => Math.max(1, value - 1))}
    />
    <p>Total: {\`$\${quantity * 12}\`}</p>
  </main>;
}`,
  },
  "react-effects-and-synchronization": {
    title: "Observe an effect lifecycle",
    goal: "Start and stop the timer. The effect creates an interval and its cleanup removes it.",
    code: `import { useEffect, useState } from "react";

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, [running]);
  return <main className="center"><p className="eyebrow">EFFECT TIMER</p>
    <h1 className="number">{seconds}s</h1>
    <button onClick={() => setRunning(value => !value)}>{running ? "Pause" : "Start"}</button>
  </main>;
}`,
  },
  "tanstack-router-foundations": {
    title: "Think in routes and shared layouts",
    goal: "Change the active route value to see how one shell can render different pages.",
    code: `const routes = {
  "/movies": "Movie list",
  "/movies/arrival": "Arrival details",
  "/dashboard/progress": "Progress dashboard",
};

export default function App() {
  const activePath = "/movies/arrival";
  return <main><h1>App shell</h1>
    <nav>Movies / Dashboard</nav>
    <article className="card"><strong>{activePath}</strong><p>{routes[activePath]}</p></article>
  </main>;
}`,
  },
  "tanstack-query-server-state": {
    title: "Separate server state from UI state",
    goal: "Toggle favorite and notice the server-shaped record stays separate from local pending feedback.",
    code: `import { useState } from "react";

const initialIssues = [
  { id: "i1", title: "Add loading state", favorite: false },
  { id: "i2", title: "Polish dashboard", favorite: true },
];

export default function App() {
  const [issues, setIssues] = useState(initialIssues);
  return <main><h1>Issues</h1>{issues.map(issue =>
    <article className="task" key={issue.id}><span>{issue.title}</span>
      <button onClick={() => setIssues(all => all.map(item =>
        item.id === issue.id ? { ...item, favorite: !item.favorite } : item
      ))}>{issue.favorite ? "Favorited" : "Favorite"}</button></article>)}</main>;
}`,
  },
  "react-context-shared-state": {
    title: "Share app-level client state",
    goal: "Toggle theme from a nested toolbar. In the full app this shape becomes a provider plus custom context hook.",
    code: `import { useState } from "react";

function Toolbar({ theme, onToggle }) {
  return <article className="task"><span>{theme} mode</span><button onClick={onToggle}>Toggle theme</button></article>;
}

export default function App() {
  const [theme, setTheme] = useState("Light");
  return <main><h1>Dashboard shell</h1>
    <Toolbar theme={theme} onToggle={() => setTheme(value => value === "Light" ? "Dark" : "Light")} />
  </main>;
}`,
  },
  "react-custom-hooks": {
    title: "Reuse behavior with a custom hook",
    goal: "Toggle both controls. Each useToggle call reuses the behavior while keeping independent state.",
    code: `import { useState } from "react";

function useToggle(initialValue = false) {
  const [on, setOn] = useState(initialValue);
  return [on, () => setOn(value => !value)];
}
function Toggle({ label, initialValue }) {
  const [on, toggle] = useToggle(initialValue);
  return <article className="task"><span>{label}: <strong>{on ? "On" : "Off"}</strong></span>
    <button onClick={toggle}>Toggle</button></article>;
}
export default function App() {
  return <main><h1>Preferences</h1><Toggle label="Hints" initialValue={true} /><Toggle label="Sound" /></main>;
}`,
  },
  "react-performance-rendering": {
    title: "Move expensive work deliberately",
    goal: "Change the query. The expensive derived list belongs in render until measurement proves it needs memoization.",
    code: `import { useState } from "react";

const lessons = ["Components", "Props", "State", "Effects", "Router", "Testing"];

export default function App() {
  const [query, setQuery] = useState("");
  const visible = lessons.filter(name => name.toLowerCase().includes(query.toLowerCase()));
  return <main><h1>Lesson search</h1>
    <label>Search <input value={query} onChange={event => setQuery(event.target.value)} /></label>
    {visible.map(name => <article className="task" key={name}><span>{name}</span></article>)}
  </main>;
}`,
  },
  "react-testing-applications": {
    title: "Think like a behavior test",
    goal: "Interact with the component and name the user-visible assertions a test should make.",
    code: `import { useState } from "react";

export default function App() {
  const [saved, setSaved] = useState(false);
  return <main><h1>Settings</h1>
    <button onClick={() => setSaved(true)}>Save settings</button>
    {saved ? <p role="status">Settings saved</p> : <p>Unsaved changes</p>}
  </main>;
}`,
  },
  "react-accessibility-production-quality": {
    title: "Inspect accessible controls",
    goal: "Open and close the dialog using buttons with clear names and a labeled dialog region.",
    code: `import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false);
  return <main><h1>Settings</h1>
    <button onClick={() => setOpen(true)}>Open settings</button>
    {open && <section role="dialog" aria-labelledby="dialog-title" className="card">
      <div><h2 id="dialog-title">Preferences</h2><p>Keyboard users need a clear path in and out.</p>
      <button onClick={() => setOpen(false)}>Close</button></div>
    </section>}
  </main>;
}`,
  },
  "react-learning-dashboard-capstone": {
    title: "Review ownership decisions",
    goal: "Use this small dashboard to name which values are props, local state, route state, or server data.",
    code: `const learner = { name: "Maya", completed: 6, total: 8 };

function ProgressCard({ learner }) {
  const percent = Math.round((learner.completed / learner.total) * 100);
  return <article className="card"><strong>{learner.name}</strong>
    <p>{learner.completed}/{learner.total} lessons complete</p>
    <p>{percent}%</p></article>;
}

export default function App() {
  return <main><h1>Learning dashboard</h1><ProgressCard learner={learner} /></main>;
}`,
  },
  "react-conditional-rendering-and-lists": {
    title: "Render and update a keyed list",
    goal: "Remove tasks and notice that each stable ID continues to identify the correct item.",
    code: `import { useState } from "react";

const initialTasks = [
  { id: "arrays", label: "Review arrays" },
  { id: "hashing", label: "Solve Two Sum" },
  { id: "react", label: "Practice React state" },
];
export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  return <main><h1>Today's plan</h1>
    {tasks.length === 0 ? <p>All done! 🎉</p> : tasks.map(task =>
      <article className="task" key={task.id}><span>{task.label}</span>
        <button onClick={() => setTasks(all => all.filter(item => item.id !== task.id))}>Done</button>
      </article>)}
  </main>;
}`,
  },
};

const styles = `body { margin: 0; font-family: Inter, system-ui, sans-serif; color: #172033; background: #f8fafc; }
main { max-width: 420px; margin: 0 auto; padding: 28px; } h1 { margin: 0 0 20px; font-size: 24px; } label { display: grid; gap: 6px; margin: 12px 0; } input { border: 1px solid #cbd5e1; border-radius: 7px; padding: 9px; }
.card, .task { display: flex; align-items: center; gap: 12px; margin: 12px 0; padding: 14px; border: 1px solid #dbe2ea; border-left: 4px solid; border-radius: 10px; background: white; }
.card p { margin: 3px 0 0; color: #64748b; font-size: 14px; }.avatar { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; color: white; font-weight: 700; }
.center { text-align: center; }.eyebrow { color: #64748b; font-size: 12px; font-weight: 700; letter-spacing: .12em; }.number { font-size: 52px; margin: 12px; }.error { color: #b91c1c; font-weight: 600; }
.actions { display: flex; justify-content: center; gap: 8px; } button { margin-left: auto; border: 0; border-radius: 7px; background: #2563eb; color: white; padding: 9px 14px; font-weight: 600; cursor: pointer; }`;

// Inline "Fix the bug" / exercise snippets often render bare elements (e.g. a single <p>)
// with no <main> wrapper, so they'd otherwise sit flush against the top-left edge with no
// breathing room. Give the inline preview a base padding and readable typography on top of
// the shared styles, without touching the curated ReactLessonPlayground examples.
const inlineStyles = `${styles}
body { padding: 20px 22px; font-size: 15px; line-height: 1.55; }
body > *:first-child { margin-top: 0; }`;

export function ReactLessonPlayground({ lessonSlug }: { lessonSlug: string }) {
  const example = examples[lessonSlug];
  if (!example) return null;

  return (
    <section className="mt-12" aria-labelledby="react-playground-title">
      <p className="text-sm font-semibold uppercase tracking-wider text-violet-700">Interactive preview</p>
      <h2 id="react-playground-title" className="mt-2 text-2xl font-semibold">{example.title}</h2>
      <p className="mt-2 text-gray-600">{example.goal} Your edits run only inside the preview sandbox.</p>
      <div className="mt-5 overflow-hidden rounded-xl border border-gray-300">
        <SandpackProvider
          template="react"
          files={{ "/App.js": example.code, "/styles.css": styles }}
          customSetup={{ entry: "/index.js" }}
          options={{ activeFile: "/App.js", visibleFiles: ["/App.js"] }}
        >
          <SandpackLayout>
            <SandpackCodeEditor showTabs={false} showLineNumbers wrapContent style={{ minHeight: 420 }} />
            <SandpackPreview showOpenInCodeSandbox={false} showRefreshButton style={{ minHeight: 420 }} />
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </section>
  );
}

type InlineSandbox = {
  files: Record<string, string>;
  activeFile: string;
  visibleFiles: string[];
  canRun: boolean;
};

type ComponentModuleSandbox = {
  componentName: string;
  componentFile: string;
  appCode: string;
};

function splitMarkedFiles(code: string) {
  const fileMarker = /^\/\/\s*([\w.-]+\.(?:tsx|ts|jsx|js|css))\s*$/;
  const lines = code.split("\n");
  const files: Record<string, string[]> = {};
  let currentFile: string | null = null;

  for (const line of lines) {
    const marker = line.match(fileMarker);
    if (marker) {
      currentFile = `/${marker[1]}`;
      files[currentFile] = [];
      continue;
    }
    if (currentFile) files[currentFile].push(line);
  }

  const materialized = Object.fromEntries(
    Object.entries(files).map(([file, fileLines]) => [file, fileLines.join("\n").trim()])
  );

  return Object.keys(materialized).length > 0 ? materialized : null;
}

function withMissingReactImports(code: string) {
  if (code.includes('from "react"') || code.includes("from 'react'")) return code;
  const hooks = ["useState", "useEffect", "useMemo", "useCallback", "useContext"].filter((hook) =>
    new RegExp(`\\b${hook}\\b`).test(code),
  );
  if (hooks.length === 0 && !code.includes("React.")) return code;
  if (hooks.length === 0) return `import type React from "react";\n\n${code}`;
  if (code.includes("React.")) return `import React, { ${hooks.join(", ")} } from "react";\n\n${code}`;
  return `import { ${hooks.join(", ")} } from "react";\n\n${code}`;
}

function hasOnlyPlaceholderReturn(code: string) {
  return /return\s*\(\s*(?:\/\/[^\n]*(?:\n\s*)?)+\)/.test(code);
}

function hasRenderableReturn(code: string) {
  return /return\s*(?:\(|<)/.test(code) && !hasOnlyPlaceholderReturn(code);
}

function hasBrokenExerciseJsx(code: string) {
  return (
    // Object literal rendered directly as a JSX child, e.g. <p>{ role: "Frontend Developer" }</p>.
    // Scoped to `>{ ident:` so it ignores inline styles (style={{...}}) and object declarations.
    />\s*\{\s*[A-Za-z_$][\w$]*\s*:/.test(code) ||
    // Unclosed void element that JSX requires to self-close, e.g. <img src="..."> or <input ...>
    /<(?:img|input|br|hr|meta|link|source|area|base|col|embed|track|wbr)\b[^>]*[^/]>/i.test(code)
  );
}

// A "bug to fix" snippet contains real code that won't compile/run correctly and is meant to be
// repaired (wrong attribute names, unclosed tags, object-in-JSX, imperative DOM).
function hasBugToFix(code: string) {
  return (
    /\b(?:class|for)=["']/.test(code) ||
    hasBrokenExerciseJsx(code) ||
    /\bdocument\.(querySelector|getElementById|createElement|body|head)\b/.test(code)
  );
}

// An "incomplete" snippet is a build stub with placeholders the learner must fill in.
function hasIncompletePlaceholders(code: string) {
  return (
    code.includes("...") ||
    /\/\/\s*(Render|Add|Use|Show|Control|Validate|Create|Fetch|Return|Read|Type|Click|Assert|Clear|Keep|Derive|Let|Start|Move|Split|Import)\b/i.test(code) ||
    /\/\*\s*[^*]*(todo|200 lines|render|add|use|show|control|validate|create|fetch|return)[^*]*\*\//i.test(code)
  );
}

function hasTeachingPlaceholders(code: string) {
  return hasBugToFix(code) || hasIncompletePlaceholders(code);
}

// Why the live preview is withheld, so the UI can explain it in the snippet's own terms.
function lockReason(code: string): "bug" | "incomplete" | null {
  if (hasBugToFix(code)) return "bug";
  if (hasIncompletePlaceholders(code)) return "incomplete";
  return null;
}

function samplePropValue(name: string, typeHint = "") {
  const lowerName = name.toLowerCase();
  const lowerType = typeHint.toLowerCase();

  if (lowerType.includes("number") || lowerName.includes("count") || lowerName.includes("total") || lowerName.includes("completed")) {
    return lowerName.includes("total") ? "{5}" : "{3}";
  }
  if (lowerType.includes("boolean") || lowerName.startsWith("is") || lowerName.includes("open") || lowerName.includes("done")) {
    return "{true}";
  }
  if (lowerName.includes("status")) return '"complete"';
  if (lowerName.includes("role")) return '"Frontend Developer"';
  if (lowerName.includes("rating")) return '"PG-13"';
  if (lowerName.includes("title")) return '"Arrival"';
  if (lowerName.includes("name")) return '"Maya"';
  return '"Example"';
}

function sampleComponentProps(source: string, componentName: string) {
  const signature = source.match(new RegExp(`function\\s+${componentName}\\s*\\(\\s*\\{([\\s\\S]*?)\\}\\s*(?::\\s*\\{([\\s\\S]*?)\\})?\\s*\\)`));
  if (!signature) return "";

  const propNames = signature[1]
    .split(",")
    .map((part) => part.trim().split(/[:=]/)[0]?.trim())
    .filter(Boolean);
  const typeHints = Object.fromEntries(
    (signature[2] ?? "")
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const [name, type] = part.split(":").map((piece) => piece.trim());
        return [name?.replace("?", ""), type ?? ""];
      }),
  );

  return propNames
    .map((name) => `${name}=${samplePropValue(name, typeHints[name] ?? "")}`)
    .join(" ");
}

function extractTopLevelJsxExamples(code: string) {
  const lines = code.split("\n");
  const kept: string[] = [];
  const examples: string[] = [];
  let depth = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    const isTopLevelJsx = depth === 0 && /^<[A-Z][\s\S]*(?:\/>|>)/.test(trimmed);

    if (isTopLevelJsx) {
      examples.push(trimmed.endsWith(";") ? trimmed.slice(0, -1) : trimmed);
    } else {
      kept.push(line);
    }

    const withoutStrings = line.replace(/(["'`])(?:\\.|(?!\1).)*\1/g, "");
    depth += (withoutStrings.match(/{/g) ?? []).length;
    depth -= (withoutStrings.match(/}/g) ?? []).length;
    depth = Math.max(0, depth);
  }

  return { source: kept.join("\n").trim(), examples };
}

function toDefaultExportedComponent(source: string, componentName: string) {
  if (new RegExp(`export\\s+default\\s+function\\s+${componentName}\\b`).test(source)) return source;
  if (new RegExp(`export\\s+function\\s+${componentName}\\b`).test(source)) {
    return `${source.replace(new RegExp(`export\\s+function\\s+${componentName}\\b`), `function ${componentName}`)}\n\nexport default ${componentName};`;
  }
  return source.replace(new RegExp(`function\\s+${componentName}\\b`), `export default function ${componentName}`);
}

function toComponentModuleSandbox(code: string): ComponentModuleSandbox | null {
  const source = withMissingReactImports(code);
  if (source.includes("export default") || source.includes("function App(") || source.includes("function App()")) return null;

  const { source: sourceWithoutExamples, examples } = extractTopLevelJsxExamples(source);
  if (examples.length > 0) return null;

  const componentMatch = sourceWithoutExamples.match(/function\s+([A-Z][A-Za-z0-9]*)\s*\([^)]*\)\s*{/);
  if (!componentMatch || !hasRenderableReturn(sourceWithoutExamples)) return null;

  const componentName = componentMatch[1];
  const props = sampleComponentProps(sourceWithoutExamples, componentName);
  return {
    componentName,
    componentFile: toDefaultExportedComponent(sourceWithoutExamples, componentName),
    appCode: `import ${componentName} from "./${componentName}";

export default function App() {
  return <${componentName}${props ? ` ${props}` : ""} />;
}
`,
  };
}

function toRunnableCode(code: string) {
  const source = withMissingReactImports(code);
  if (source.includes("export default")) return source;
  if (source.includes("function App(") || source.includes("function App()")) {
    return `${source}\n\nexport default App;`;
  }

  const { source: sourceWithoutExamples, examples } = extractTopLevelJsxExamples(source);
  if (examples.length > 0) {
    return `${sourceWithoutExamples}\n\nexport default function App() {\n  return (\n    <>\n${examples.map((example) => `      ${example}`).join("\n")}\n    </>\n  );\n}`;
  }

  const componentMatch = sourceWithoutExamples.match(/function\s+([A-Z][A-Za-z0-9]*)\s*\([^)]*\)\s*{/);
  if (componentMatch && hasRenderableReturn(sourceWithoutExamples)) {
    const props = sampleComponentProps(sourceWithoutExamples, componentMatch[1]);
    return `${sourceWithoutExamples}\n\nexport default function App() {\n  return <${componentMatch[1]}${props ? ` ${props}` : ""} />;\n}`;
  }

  if (hasRenderableReturn(sourceWithoutExamples)) {
    const indentedCode = sourceWithoutExamples
      .split("\n")
      .map((line) => `  ${line}`)
      .join("\n");
    return `export default function App() {\n${indentedCode}\n}`;
  }
  return `export default function App() {\n  return (\n    <main>\n      <pre>{${JSON.stringify(sourceWithoutExamples || source)}}</pre>\n    </main>\n  );\n}`;
}

function toInlineSandbox(code: string): InlineSandbox {
  const canRun = !hasTeachingPlaceholders(code);
  const markedFiles = splitMarkedFiles(code);
  const entryFile = `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

class PreviewErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 20, fontFamily: "Inter, system-ui, sans-serif" }}>
          <strong style={{ color: "#b91c1c" }}>This snippet throws an error at runtime.</strong>
          <pre style={{ margin: "8px 0 0", whiteSpace: "pre-wrap", color: "#b91c1c", fontSize: 13 }}>
            {String(this.state.error.message || this.state.error)}
          </pre>
          <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: 13 }}>
            Fix the bug in the editor above and the preview will render.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PreviewErrorBoundary>
      <App />
    </PreviewErrorBoundary>
  </React.StrictMode>,
);
`;

  if (markedFiles) {
    const appFile = ["/App.tsx", "/App.jsx", "/App.ts", "/App.js"].find((file) => markedFiles[file]);
    if (appFile) {
      const files = {
        ...markedFiles,
        [appFile]: canRun ? toRunnableCode(markedFiles[appFile]) : markedFiles[appFile],
        "/index.tsx": entryFile,
      };

      return {
        files,
        activeFile: appFile,
        visibleFiles: Object.keys(files),
        canRun,
      };
    }
  }

  if (canRun) {
    const componentSandbox = toComponentModuleSandbox(code);
    if (componentSandbox) {
      return {
        files: {
          [`/${componentSandbox.componentName}.tsx`]: componentSandbox.componentFile,
          "/App.tsx": componentSandbox.appCode,
          "/index.tsx": entryFile,
        },
        activeFile: `/${componentSandbox.componentName}.tsx`,
        visibleFiles: [`/${componentSandbox.componentName}.tsx`, "/App.tsx"],
        canRun,
      };
    }
  }

  return {
    files: { "/App.tsx": canRun ? toRunnableCode(code) : code, "/index.tsx": entryFile },
    activeFile: "/App.tsx",
    visibleFiles: ["/App.tsx"],
    canRun,
  };
}

export function InlineReactEditor({ code }: { code: string }) {
  const sandbox = toInlineSandbox(code);
  const reason = lockReason(code);

  return (
    <SandpackProvider
      key={code}
      template="react-ts"
      files={{ ...sandbox.files, "/styles.css": inlineStyles }}
      customSetup={{ entry: "/index.tsx" }}
      options={{ activeFile: sandbox.activeFile, visibleFiles: sandbox.visibleFiles }}
    >
      {sandbox.canRun ? (
        <SandpackPreview showOpenInCodeSandbox={false} showRefreshButton style={{ minHeight: 260 }} />
      ) : (
        <div className="flex items-start gap-2 bg-white p-4 text-sm text-gray-600">
          <span aria-hidden className="text-base leading-5">{reason === "bug" ? "🐞" : "🧩"}</span>
          <span>
            {reason === "bug"
              ? "This snippet has a bug that stops it from compiling. Fix it in the editor above and the live preview will appear."
              : "This snippet is a starting point. Complete the code above and the live preview will appear."}
          </span>
        </div>
      )}
    </SandpackProvider>
  );
}
