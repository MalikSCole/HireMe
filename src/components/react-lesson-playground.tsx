import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";

const examples: Partial<Record<string, { title: string; goal: string; code: string }>> = {
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
};

const styles = `body { margin: 0; font-family: Inter, system-ui, sans-serif; color: #172033; background: #f8fafc; }
main { max-width: 420px; margin: 0 auto; padding: 28px; } h1 { margin: 0 0 20px; font-size: 24px; }
.card, .task { display: flex; align-items: center; gap: 12px; margin: 12px 0; padding: 14px; border: 1px solid #dbe2ea; border-left: 4px solid; border-radius: 10px; background: white; }
.card p { margin: 3px 0 0; color: #64748b; font-size: 14px; }.avatar { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; color: white; font-weight: 700; }
.center { text-align: center; }.eyebrow { color: #64748b; font-size: 12px; font-weight: 700; letter-spacing: .12em; }.number { font-size: 52px; margin: 12px; }
.actions { display: flex; justify-content: center; gap: 8px; } button { margin-left: auto; border: 0; border-radius: 7px; background: #2563eb; color: white; padding: 9px 14px; font-weight: 600; cursor: pointer; }`;

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
