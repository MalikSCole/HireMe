import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  SandpackTests,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { completeReactChallenge } from "../features/react-challenges/functions";

const challengeStyles = `body { margin: 0; font-family: Inter, system-ui, sans-serif; color: #172033; background: #f8fafc; }
main { max-width: 420px; margin: 0 auto; padding: 28px; } h1 { margin: 0 0 20px; font-size: 24px; }
article { margin: 12px 0; padding: 16px; border: 1px solid #dbe2ea; border-radius: 10px; background: white; }
button { margin: 6px; border: 0; border-radius: 7px; background: #7c3aed; color: white; padding: 10px 15px; font-weight: 600; cursor: pointer; }
p { line-height: 1.6; }`;

type ChallengeProject = {
  template?: "react" | "react-ts";
  files: Record<string, string | { code: string; hidden?: boolean; readOnly?: boolean }>;
  dependencies?: Record<string, string>;
  activeFile?: string;
  visibleFiles?: string[];
};

const testingDependencies = {
  "@testing-library/jest-dom": "6.9.1",
  "@testing-library/react": "16.3.0",
  "@testing-library/user-event": "14.6.1",
};

function parseChallengeProject(starterCode: string, testCode: string): ChallengeProject {
  try {
    const parsed = JSON.parse(starterCode) as Partial<ChallengeProject>;
    if (parsed && parsed.files && typeof parsed.files === "object") {
      return {
        template: parsed.template ?? "react-ts",
        files: {
          ...parsed.files,
          "/App.test.tsx": { code: testCode, hidden: true },
          "/styles.css": parsed.files["/styles.css"] ?? challengeStyles,
        },
        dependencies: { ...testingDependencies, ...parsed.dependencies },
        activeFile: parsed.activeFile,
        visibleFiles: parsed.visibleFiles,
      };
    }
  } catch {
    // Older challenge rows store a single source file.
  }

  return {
    template: "react",
    files: {
      "/App.js": starterCode,
      "/App.test.js": { code: testCode, hidden: true },
      "/styles.css": challengeStyles,
    },
    dependencies: testingDependencies,
    activeFile: "/App.js",
    visibleFiles: ["/App.js"],
  };
}

function serializeEditableProject(files: ReturnType<typeof useSandpack>["sandpack"]["files"]) {
  const savedFiles = Object.fromEntries(
    Object.entries(files)
      .filter(([path]) => !path.includes(".test."))
      .map(([path, file]) => [path, { code: file.code }]),
  );
  return JSON.stringify({ template: "react-ts", files: savedFiles }, null, 2);
}

export function ReactChallengeWorkspace({ challengeSlug, starterCode, testCode, signedIn, completed }: { challengeSlug: string; starterCode: string; testCode: string; signedIn: boolean; completed: boolean }) {
  const project = parseChallengeProject(starterCode, testCode);
  const visibleFiles = project.visibleFiles ?? Object.keys(project.files).filter((path) => !path.includes(".test.") && path !== "/package.json");
  const activeFile = project.activeFile ?? visibleFiles.find((path) => !path.endsWith(".css")) ?? visibleFiles[0];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300">
      <SandpackProvider
        template={project.template ?? "react-ts"}
        files={project.files}
        customSetup={{
          entry: "/index.js",
          dependencies: project.dependencies,
        }}
        options={{ activeFile, visibleFiles }}
      >
        <SandpackLayout>
          <SandpackCodeEditor showTabs showLineNumbers wrapContent style={{ minHeight: 560 }} />
          <SandpackPreview showOpenInCodeSandbox={false} showRefreshButton style={{ minHeight: 380 }} />
        </SandpackLayout>
        <div className="border-t border-gray-300">
          <SandpackConsole showHeader={false} style={{ minHeight: 140 }} />
        </div>
        <div className="border-t border-gray-300 bg-white p-4">
          <div className="mb-3"><p className="text-sm font-semibold uppercase tracking-wider text-violet-700">Automated checks</p><p className="mt-1 text-sm text-gray-600">Tests rerun automatically after you edit the component.</p></div>
          <ChallengeCompletion challengeSlug={challengeSlug} signedIn={signedIn} completed={completed} />
        </div>
      </SandpackProvider>
    </div>
  );
}

function ChallengeCompletion({ challengeSlug, signedIn, completed }: { challengeSlug: string; signedIn: boolean; completed: boolean }) {
  const { sandpack } = useSandpack();
  const router = useRouter();
  const [testsPassed, setTestsPassed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  type TestSpec = { tests: Record<string, { status: string }>; describes: Record<string, TestSpec> };
  function handleTestsComplete(specs: Record<string, TestSpec>) {
    const collectTests = (spec: TestSpec): Array<{ status: string }> => [
      ...Object.values(spec.tests),
      ...Object.values(spec.describes).flatMap(collectTests),
    ];
    const tests = Object.values(specs).flatMap(collectTests);
    setTestsPassed(tests.length > 0 && tests.every((test) => test.status === "pass"));
  }

  async function saveCompletion() {
    const sourceCode = serializeEditableProject(sandpack.files);
    if (!testsPassed || !sourceCode) return;
    setSaving(true);
    setError(null);
    try {
      await completeReactChallenge({ data: { challengeSlug, sourceCode } });
      await router.invalidate();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save challenge completion.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <SandpackTests watchMode onComplete={handleTestsComplete} showWatchButton={false} showVerboseButton={false} style={{ minHeight: 220 }} />
      <div className="mt-4 border-t pt-4">
      {completed ? <p className="font-semibold text-green-700">✓ Challenge completed</p> : !signedIn ? <p className="text-sm text-gray-600"><Link to="/login" className="font-medium text-violet-700 underline">Sign in</Link> to save completion after all tests pass.</p> : (
        <button type="button" disabled={!testsPassed || saving} onClick={() => void saveCompletion()} className="rounded bg-violet-700 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">{saving ? "Saving…" : testsPassed ? "Save completion" : "Pass all tests to complete"}</button>
      )}
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
      </div>
    </div>
  );
}
