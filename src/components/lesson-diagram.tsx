type DiagramProps = { lessonSlug: string };

export function LessonDiagram({ lessonSlug }: DiagramProps) {
  const diagram = {
    "understanding-big-o": <BigODiagram />,
    "arrays-and-indexes": <ArrayScanDiagram />,
    "hash-maps-and-sets": <HashMapDiagram />,
    "complement-lookup": <ComplementDiagram />,
    "stacks-and-nested-structure": <StackDiagram />,
    "two-pointers-and-sliding-windows": <WindowDiagram />,
    "binary-search-foundations": <BinarySearchDiagram />,
    "two-pointer-comparisons": <TwoPointerDiagram />,
    "sliding-windows-last-seen": <LastSeenWindowDiagram />,
    "running-best-kadanes-algorithm": <KadaneDiagram />,
    "prefix-and-suffix-products": <PrefixSuffixDiagram />,
    "read-and-write-pointers": <ReadWriteDiagram />,
    "monotonic-stacks": <MonotonicStackDiagram />,
    "variable-size-sliding-windows": <VariableWindowDiagram />,
    "expression-evaluation-stacks": <RpnDiagram />,
    "binary-search-rotated-data": <RotatedSearchDiagram />,
    "heaps-and-top-k-selection": <HeapDiagram />,
    "grid-traversal-connected-components": <GridTraversalDiagram />,
    "one-dimensional-dynamic-programming": <DynamicProgrammingDiagram />,
    "react-components-and-props": <ComponentTreeDiagram />,
    "react-state-and-events": <StateLoopDiagram />,
    "react-effects-and-synchronization": <EffectDiagram />,
    "react-conditional-rendering-and-lists": <ListIdentityDiagram />,
    "react-custom-hooks": <CustomHookDiagram />,
  }[lessonSlug];

  if (!diagram) return null;
  return <section className="mt-10 overflow-hidden rounded-xl border bg-gray-50 p-5 sm:p-7">{diagram}</section>;
}

function BigODiagram() {
  return (
    <div>
      <h2 className="text-lg font-semibold">How work grows with input size</h2>
      <p className="mt-1 text-sm text-gray-600">Flatter curves scale better as n increases.</p>
      <svg viewBox="0 0 640 300" role="img" aria-label="Graph comparing constant, logarithmic, linear, n log n, and quadratic growth" className="mt-5 h-auto w-full">
        <path d="M60 20V250H610" fill="none" stroke="#94a3b8" strokeWidth="2" />
        {[100, 200, 300, 400, 500, 600].map((x) => <path key={x} d={`M${x} 245V255`} stroke="#94a3b8" />)}
        <path d="M60 225H610" fill="none" stroke="#16a34a" strokeWidth="4" />
        <path d="M60 225 C160 210 300 195 610 175" fill="none" stroke="#2563eb" strokeWidth="4" />
        <path d="M60 235 L610 85" fill="none" stroke="#7c3aed" strokeWidth="4" />
        <path d="M60 240 C240 225 430 155 610 45" fill="none" stroke="#ea580c" strokeWidth="4" />
        <path d="M60 240 Q400 230 610 20" fill="none" stroke="#dc2626" strokeWidth="4" />
        <g fontSize="14" fontWeight="600">
          <text x="520" y="218" fill="#16a34a">O(1)</text><text x="520" y="166" fill="#2563eb">O(log n)</text>
          <text x="525" y="100" fill="#7c3aed">O(n)</text><text x="450" y="68" fill="#ea580c">O(n log n)</text><text x="555" y="25" fill="#dc2626">O(n²)</text>
        </g>
        <text x="325" y="285" textAnchor="middle" fill="#475569">Input size (n) →</text>
        <text x="18" y="140" textAnchor="middle" transform="rotate(-90 18 140)" fill="#475569">Operations →</text>
      </svg>
    </div>
  );
}

function ArrayScanDiagram() {
  const prices = [7, 1, 5, 3, 6, 4];
  return (
    <div>
      <h2 className="text-lg font-semibold">One-pass stock scan</h2>
      <p className="mt-1 text-sm text-gray-600">Carry the minimum earlier price forward; compare each new price against it.</p>
      <div className="mt-6 grid grid-cols-6 gap-2">{prices.map((price, index) => (
        <div key={index} className={index === 1 ? "rounded-lg border-2 border-green-600 bg-green-50 p-3 text-center" : index === 4 ? "rounded-lg border-2 border-blue-600 bg-blue-50 p-3 text-center" : "rounded-lg border bg-white p-3 text-center"}>
          <p className="text-xs text-gray-500">day {index}</p><p className="text-xl font-bold">{price}</p>
          {index === 1 && <p className="mt-1 text-xs font-medium text-green-700">buy</p>}{index === 4 && <p className="mt-1 text-xs font-medium text-blue-700">sell</p>}
        </div>
      ))}</div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm"><span className="rounded bg-green-100 px-3 py-2">minimum so far = 1</span><span>→</span><span className="rounded bg-blue-100 px-3 py-2">6 − 1 = 5 profit</span></div>
    </div>
  );
}

function HashMapDiagram() {
  return (
    <div>
      <h2 className="text-lg font-semibold">Set membership while scanning</h2>
      <p className="mt-1 text-sm text-gray-600">The final 1 is detected without comparing it against every earlier element.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div><p className="mb-2 text-sm font-medium">Input</p><div className="flex gap-2">{[1, 2, 3, 1].map((value, index) => <span key={index} className={index === 3 ? "flex h-12 w-12 items-center justify-center rounded border-2 border-red-600 bg-red-50 font-bold" : "flex h-12 w-12 items-center justify-center rounded border bg-white font-bold"}>{value}</span>)}</div></div>
        <span className="hidden text-2xl text-gray-400 md:block">→</span>
        <div><p className="mb-2 text-sm font-medium">Seen set before final value</p><div className="flex gap-2 rounded-lg border bg-white p-3">{[1, 2, 3].map((value) => <span key={value} className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800">{value}</span>)}</div><p className="mt-2 text-sm font-medium text-red-700">1 is already present → duplicate</p></div>
      </div>
    </div>
  );
}

function ComplementDiagram() {
  return (
    <div>
      <h2 className="text-lg font-semibold">Two Sum complement lookup</h2>
      <p className="mt-1 text-sm text-gray-600">At value 7, the needed complement is 2—and 2 already maps to index 0.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3 sm:items-center">
        <div className="rounded-lg border bg-white p-4 text-center"><p className="text-sm text-gray-500">current value</p><p className="mt-1 text-3xl font-bold">7</p></div>
        <div className="text-center"><p className="font-mono text-lg">9 − 7 = 2</p><p className="mt-1 text-sm text-gray-500">target − current</p></div>
        <div className="rounded-lg border-2 border-green-600 bg-green-50 p-4"><p className="text-sm font-medium text-green-800">Seen map</p><p className="mt-2 font-mono text-xl">2 → index 0</p></div>
      </div>
      <div className="mt-5 text-center text-sm font-medium text-green-800">Match found: return [0, 1]</div>
    </div>
  );
}

function StackDiagram() {
  return (
    <div>
      <h2 className="text-lg font-semibold">Why nested brackets need a stack</h2>
      <p className="mt-1 text-sm text-gray-600">For {"{[]}"}, the most recent opening bracket is always the next one closed.</p>
      <div className="mt-6 flex flex-wrap items-end justify-center gap-6">
        {[
          { char: "{", stack: ["{"] },
          { char: "[", stack: ["{", "["] },
          { char: "]", stack: ["{"] },
          { char: "}", stack: [] },
        ].map((step, index) => (
          <div key={index} className="text-center"><p className="mb-2 font-mono text-xl font-bold">read {step.char}</p><div className="flex h-28 w-20 flex-col-reverse rounded-b border-x-2 border-b-2 border-gray-500 p-1">{step.stack.map((item, stackIndex) => <div key={stackIndex} className="mb-1 rounded bg-blue-100 py-1 font-mono font-bold text-blue-800">{item}</div>)}</div><p className="mt-2 text-xs text-gray-500">{step.stack.length ? "stack" : "empty ✓"}</p></div>
        ))}
      </div>
    </div>
  );
}

function WindowDiagram() {
  return <div><h2 className="text-lg font-semibold">A window reuses previous work</h2><p className="mt-1 text-sm text-gray-600">Move boundaries instead of rebuilding every range.</p><div className="mt-6 flex justify-center gap-2">{[2, 1, 5, 1, 3, 2].map((value, index) => <div key={index} className={index >= 1 && index <= 3 ? "relative flex h-14 w-14 items-center justify-center border-y-4 border-blue-600 bg-blue-50 text-xl font-bold first:border-l-4" : "flex h-14 w-14 items-center justify-center rounded border bg-white text-xl font-bold"}>{value}{index === 1 && <span className="absolute -bottom-7 text-xs text-blue-700">left</span>}{index === 3 && <span className="absolute -bottom-7 text-xs text-blue-700">right</span>}</div>)}</div><p className="mt-10 text-center font-mono text-sm">window sum: 1 + 5 + 1 = 7 · move → subtract left, add right</p></div>;
}

function BinarySearchDiagram() {
  return <div><h2 className="text-lg font-semibold">Discard half after each comparison</h2><p className="mt-1 text-sm text-gray-600">Searching for 23 in sorted data.</p><div className="mt-6 flex justify-center gap-2">{[3, 8, 12, 17, 23, 31, 44].map((value, index) => <div key={value} className={index < 4 ? "flex h-14 w-14 items-center justify-center rounded border bg-gray-200 text-gray-400 line-through" : index === 4 ? "flex h-14 w-14 items-center justify-center rounded border-2 border-green-600 bg-green-50 text-xl font-bold text-green-800" : "flex h-14 w-14 items-center justify-center rounded border bg-white text-xl font-bold"}>{value}</div>)}</div><div className="mt-5 grid gap-2 text-center text-sm sm:grid-cols-3"><span className="rounded bg-gray-200 p-2">17 is too small</span><span className="p-2">discard left half →</span><span className="rounded bg-green-100 p-2 font-medium text-green-800">23 found</span></div></div>;
}

function TwoPointerDiagram() {
  const chars = ["A", " ", "m", "a", "n", "!", "a"];
  return <div><DiagramHeading title="Compare inward from both ends" description="Pointers skip punctuation and compare only normalized letters or digits." /><div className="mt-8 flex justify-center gap-2">{chars.map((char, index) => <div key={index} className={index === 0 || index === 6 ? "relative grid h-14 w-14 place-items-center rounded border-2 border-blue-600 bg-blue-50 font-mono text-xl font-bold" : char.trim() && char !== "!" ? "grid h-14 w-14 place-items-center rounded border bg-white font-mono text-xl" : "grid h-14 w-14 place-items-center rounded border border-dashed bg-gray-100 font-mono text-gray-400"}>{char === " " ? "space" : char}{index === 0 && <span className="absolute -top-6 text-xs text-blue-700">left →</span>}{index === 6 && <span className="absolute -top-6 text-xs text-blue-700">← right</span>}</div>)}</div><p className="mt-6 text-center text-sm"><strong>a = a</strong> after lowercase conversion, so both pointers move inward.</p></div>;
}

function LastSeenWindowDiagram() {
  return <div><DiagramHeading title="Jump past the repeated character" description="In abba, the second b makes the active window invalid until left moves past the first b." /><CellRow values={["a", "b", "b", "a"]} active={[1, 2]} labels={{ 1: "old b", 2: "repeat" }} /><div className="mt-6 grid gap-3 text-center sm:grid-cols-3"><Node label="last_seen[b]" detail="index 1" /><span className="self-center text-2xl">→</span><Node label="new left" detail="max(0, 1 + 1) = 2" /></div></div>;
}

function KadaneDiagram() {
  const values = [-2, 1, -3, 4, -1, 2, 1];
  const running = [-2, 1, -2, 4, 3, 5, 6];
  return <div><DiagramHeading title="Best subarray ending at each index" description="A negative running prefix is abandoned when starting fresh produces a larger sum." /><div className="mt-6 grid grid-cols-7 gap-1 text-center"><span className="col-span-7 mb-1 text-left text-xs font-medium text-gray-500">input</span>{values.map((value, index) => <span key={index} className={index >= 3 ? "rounded bg-blue-100 p-2 font-mono font-bold" : "rounded border bg-white p-2 font-mono"}>{value}</span>)}<span className="col-span-7 mt-3 mb-1 text-left text-xs font-medium text-gray-500">best sum ending here</span>{running.map((value, index) => <span key={index} className={index === 6 ? "rounded bg-green-600 p-2 font-mono font-bold text-white" : "rounded border bg-white p-2 font-mono"}>{value}</span>)}</div><p className="mt-5 text-center font-mono text-sm">current = max(1, 5 + 1) = 6 · best = 6</p></div>;
}

function PrefixSuffixDiagram() {
  return <div><DiagramHeading title="Build each answer from two directions" description="For index 2 in [1, 2, 3, 4], combine everything before 3 with everything after it." /><div className="mt-6 grid items-center gap-3 text-center sm:grid-cols-5"><Node label="left product" detail="1 × 2 = 2" /><span className="text-2xl">×</span><Node label="right product" detail="4" /><span className="text-2xl">=</span><Node label="answer[2]" detail="8" /></div><CellRow values={[24, 12, 8, 6]} active={[2]} labels={{ 2: "prefix × suffix" }} /></div>;
}

function ReadWriteDiagram() {
  return <div><DiagramHeading title="Read scans; write compacts" description="After processing the first four values, write points to the next open position for a non-zero value." /><CellRow values={[1, 3, 0, 3, 12]} active={[1, 3]} labels={{ 1: "write", 3: "read" }} /><div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm"><span className="rounded bg-blue-100 px-3 py-2">processed non-zero prefix: [1, 3]</span><span>→</span><span className="rounded bg-gray-200 px-3 py-2">fill remaining slots with 0 after scan</span></div></div>;
}

function MonotonicStackDiagram() {
  return <div><DiagramHeading title="A warmer day resolves waiting indexes" description="When 72 arrives, it resolves temperatures 69 and 71 from the decreasing stack." /><CellRow values={[73, 74, 75, 71, 69, 72]} active={[3, 4, 5]} labels={{ 3: "+2 days", 4: "+1 day", 5: "current" }} /><div className="mt-6 flex items-end justify-center gap-3"><span className="text-sm text-gray-500">stack before 72</span>{[75, 71, 69].map((value, index) => <span key={value} className={index === 0 ? "rounded bg-gray-200 px-4 py-2 font-mono" : "rounded bg-orange-100 px-4 py-2 font-mono line-through"}>{value}</span>)}<span>→</span><span className="rounded bg-blue-100 px-4 py-2 font-mono">[75, 72]</span></div></div>;
}

function VariableWindowDiagram() {
  return <div><DiagramHeading title="Shrink while the window still qualifies" description="For target 7, the sum reaches 8; removing values from the left searches for the shortest valid range." /><CellRow values={[2, 3, 1, 2, 4, 3]} active={[3, 4, 5]} labels={{ 3: "left", 5: "right" }} /><div className="mt-6 grid gap-3 text-center sm:grid-cols-3"><Node label="window [2, 4, 3]" detail="sum = 9" /><span className="self-center text-2xl">→ shrink →</span><Node label="window [4, 3]" detail="sum = 7 · length 2" /></div></div>;
}

function RpnDiagram() {
  return <div><DiagramHeading title="Operators consume the top two operands" description="Evaluate [2, 1, +, 3, ×] from left to right; intermediate results return to the stack." /><div className="mt-6 grid gap-3 text-center sm:grid-cols-5">{[{ token: "2", stack: "[2]" }, { token: "1", stack: "[2, 1]" }, { token: "+", stack: "[3]" }, { token: "3", stack: "[3, 3]" }, { token: "×", stack: "[9]" }].map((step) => <div key={`${step.token}-${step.stack}`} className="rounded border bg-white p-3"><p className="text-xs text-gray-500">read {step.token}</p><p className="mt-2 font-mono font-bold">{step.stack}</p></div>)}</div><p className="mt-5 text-center text-sm">For subtraction and division: pop <strong>right</strong> first, then <strong>left</strong>.</p></div>;
}

function RotatedSearchDiagram() {
  return <div><DiagramHeading title="One half is still sorted" description="At midpoint 7, the left half [4, 5, 6, 7] is sorted, but target 0 is outside its range." /><CellRow values={[4, 5, 6, 7, 0, 1, 2]} active={[3, 4]} labels={{ 3: "mid", 4: "search here" }} /><div className="mt-6 flex flex-wrap justify-center gap-3 text-sm"><span className="rounded bg-gray-200 px-3 py-2 line-through">discard sorted left half</span><span className="rounded bg-green-100 px-3 py-2 font-medium text-green-800">continue in [0, 1, 2]</span></div></div>;
}

function HeapDiagram() {
  return <div><DiagramHeading title="A size-k min-heap keeps the strongest candidates" description="For k = 3, the root is the smallest of the three largest values seen so far." /><div className="mt-7 flex flex-col items-center"><span className="rounded-full border-2 border-green-600 bg-green-50 px-5 py-3 font-bold">4 · root</span><div className="h-6 w-40 border-x border-gray-400 [clip-path:polygon(0_100%,50%_0,100%_100%)]" /><div className="flex gap-16"><span className="rounded-full bg-blue-100 px-5 py-3 font-bold">5</span><span className="rounded-full bg-blue-100 px-5 py-3 font-bold">6</span></div></div><p className="mt-6 text-center text-sm">Heap contains [4, 5, 6] → the 3rd largest is <strong>4</strong>.</p></div>;
}

function GridTraversalDiagram() {
  const grid = [["1", "1", "0"], ["1", "0", "0"], ["0", "0", "1"]];
  return <div><DiagramHeading title="One traversal marks one complete island" description="Horizontal and vertical land cells form connected components; diagonal cells remain separate." /><div className="mx-auto mt-6 grid w-fit grid-cols-3 gap-2">{grid.flatMap((row, rowIndex) => row.map((cell, columnIndex) => { const firstIsland = cell === "1" && !(rowIndex === 2 && columnIndex === 2); const land = cell === "1"; return <span key={`${rowIndex}-${columnIndex}`} className={firstIsland ? "grid h-14 w-14 place-items-center rounded bg-blue-600 font-bold text-white" : land ? "grid h-14 w-14 place-items-center rounded bg-green-600 font-bold text-white" : "grid h-14 w-14 place-items-center rounded border bg-white text-gray-400"}>{land ? firstIsland ? "A" : "B" : "water"}</span>; }))}</div><p className="mt-5 text-center text-sm">Two traversal starts → <strong>2 connected components</strong>.</p></div>;
}

function DynamicProgrammingDiagram() {
  return <div><DiagramHeading title="Each stair reuses the previous two answers" description="Every route to step 5 arrives from step 4 or step 3." /><div className="mt-7 flex flex-wrap items-end justify-center gap-2">{[1, 1, 2, 3, 5, 8].map((ways, step) => <div key={step} className={step === 5 ? "grid w-16 place-items-center rounded-t border-2 border-green-600 bg-green-50 font-bold" : "grid w-16 place-items-center rounded-t border bg-white"} style={{ height: `${56 + step * 14}px` }}><span className="text-xs text-gray-500">step {step}</span><span className="text-xl">{ways}</span><span className="text-xs">ways</span></div>)}</div><p className="mt-5 text-center font-mono text-sm">ways[5] = ways[4] + ways[3] = 5 + 3 = 8</p></div>;
}

function DiagramHeading({ title, description }: { title: string; description: string }) {
  return <><h2 className="text-lg font-semibold">{title}</h2><p className="mt-1 text-sm text-gray-600">{description}</p></>;
}

function CellRow({ values, active, labels = {} }: { values: Array<string | number>; active: number[]; labels?: Record<number, string> }) {
  return <div className="mt-8 flex flex-wrap justify-center gap-2">{values.map((value, index) => <div key={index} className={active.includes(index) ? "relative grid h-14 min-w-14 place-items-center rounded border-2 border-blue-600 bg-blue-50 px-2 font-mono text-lg font-bold" : "relative grid h-14 min-w-14 place-items-center rounded border bg-white px-2 font-mono text-lg"}>{value}{labels[index] && <span className="absolute -bottom-6 whitespace-nowrap text-xs font-sans font-medium text-blue-700">{labels[index]}</span>}</div>)}</div>;
}

function ComponentTreeDiagram() {
  return <div><h2 className="text-lg font-semibold">Props flow down a component tree</h2><div className="mt-6 flex flex-col items-center"><Node label="App" detail="owns user data" /><span className="py-2 text-blue-600">↓ props</span><div className="grid w-full max-w-lg grid-cols-2 gap-5"><Node label="ProfileCard" detail="user={user}" /><Node label="Navigation" detail="name={user.name}" /></div><div className="ml-[-50%] py-2 text-blue-600">↓</div><div className="grid w-full max-w-sm grid-cols-2 gap-5"><Node label="Avatar" detail="src={image}" /><Node label="UserDetails" detail="name, role" /></div></div></div>;
}

function StateLoopDiagram() {
  return <div><h2 className="text-lg font-semibold">Events update state, then React renders again</h2><div className="mt-6 grid items-center gap-3 text-center sm:grid-cols-4"><Node label="Click" detail="user event" /><span className="text-2xl">→</span><Node label="setCount" detail="queue update" /><span className="hidden sm:block text-2xl">↘</span></div><div className="mt-3 grid items-center gap-3 text-center sm:grid-cols-4"><Node label="Updated UI" detail="Count: 1" /><span className="text-2xl">←</span><Node label="Render" detail="read new state" /><span className="hidden sm:block text-2xl">←</span></div></div>;
}

function EffectDiagram() {
  return <div><h2 className="text-lg font-semibold">Effect synchronization lifecycle</h2><div className="mt-6 grid gap-3 text-center sm:grid-cols-5"><Node label="Render" detail="dependencies" /><span className="text-2xl">→</span><Node label="Setup" detail="add listener" /><span className="text-2xl">→</span><Node label="External system" detail="browser API" /></div><div className="mt-5 flex items-center justify-center gap-3"><span className="rounded bg-orange-100 p-3 text-sm">dependency changes or unmount</span><span>→</span><span className="rounded bg-red-100 p-3 text-sm">cleanup listener</span></div></div>;
}

function ListIdentityDiagram() {
  return <div><h2 className="text-lg font-semibold">Stable keys preserve identity after reordering</h2><div className="mt-6 grid gap-6 sm:grid-cols-2"><div><p className="mb-2 text-sm font-medium">Before</p>{[["a", "Ada"], ["b", "Ben"], ["c", "Cam"]].map(([id, name]) => <div key={id} className="mb-2 flex justify-between rounded border bg-white p-3"><span>{name}</span><code>key={id}</code></div>)}</div><div><p className="mb-2 text-sm font-medium">After sort</p>{[["c", "Cam"], ["a", "Ada"], ["b", "Ben"]].map(([id, name]) => <div key={id} className="mb-2 flex justify-between rounded border bg-blue-50 p-3"><span>{name}</span><code>key={id}</code></div>)}</div></div><p className="mt-3 text-center text-sm text-gray-600">The key travels with the record, so local state stays attached to the right person.</p></div>;
}

function CustomHookDiagram() {
  return <div><h2 className="text-lg font-semibold">One hook definition, independent component state</h2><div className="mt-6 flex flex-col items-center"><Node label="useOnlineStatus" detail="shared behavior" /><div className="py-2 text-2xl text-blue-600">↙ &nbsp;&nbsp;&nbsp; ↘</div><div className="grid w-full max-w-lg grid-cols-2 gap-5"><Node label="StatusBadge" detail="state: online" /><Node label="SaveButton" detail="state: online" /></div></div><p className="mt-5 text-center text-sm text-gray-600">The logic is reused; each call belongs to its own component instance.</p></div>;
}

function Node({ label, detail }: { label: string; detail: string }) {
  return <div className="rounded-lg border-2 border-blue-300 bg-white p-3 text-center"><p className="font-semibold">{label}</p><p className="mt-1 text-xs text-gray-500">{detail}</p></div>;
}
