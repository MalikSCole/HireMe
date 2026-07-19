type DiagramProps = { lessonSlug: string }

const blind75PatternDiagrams: Partial<
  Record<
    string,
    {
      title: string
      description: string
      steps: [string, string, string]
      result: string
    }
  >
> = {
  'grouping-canonical-signature': {
    title: 'Words collapse into shared signatures',
    description: 'A canonical key removes irrelevant character order.',
    steps: ['eat → aet', 'tea → aet', 'tan → ant'],
    result: 'aet: [eat, tea] · ant: [tan]',
  },
  'frequency-buckets-top-k': {
    title: 'Counts become frequency buckets',
    description:
      'Values move from a count map into buckets that can be scanned high to low.',
    steps: [
      'Count each value',
      'Place value at bucket[count]',
      'Scan buckets from n downward',
    ],
    result: 'The first k collected values are the answer',
  },
  'length-prefix-string-encoding': {
    title: 'Each payload carries its own boundary',
    description: 'The length header makes delimiters inside a string harmless.',
    steps: ['Read length: 5', 'Skip separator: #', 'Consume exactly: a#bcd'],
    result: '5#a#bcd decodes without ambiguity',
  },
  'sequence-starts-hash-sets': {
    title: 'Expand only from true sequence starts',
    description:
      'A missing predecessor identifies the one place a run should be counted.',
    steps: [
      '100: 99 absent → start',
      '4: 3 present → skip',
      '1: 0 absent → expand 1,2,3,4',
    ],
    result: 'Longest run length = 4',
  },
  'sorted-three-value-search': {
    title: 'Fix one value, then close the gap',
    description:
      'Sorting turns the remaining pair search into directional pointer movement.',
    steps: [
      'Fix -1',
      '-1 + 0 + 2 = 1 → move right leftward',
      '-1 + 0 + 1 = 0 → record',
    ],
    result: 'Unique triplet [-1, 0, 1]',
  },
  'greedy-container-pointers': {
    title: 'Discard the limiting boundary',
    description:
      'Width shrinks every move, so only a taller short side can improve area.',
    steps: [
      'Start at widest pair',
      'Compute width × shorter height',
      'Move the shorter side inward',
    ],
    result: 'Every discarded boundary is proven unable to do better',
  },
  'replacement-budget-windows': {
    title: 'Keep replacement cost within budget',
    description:
      'The window is valid while non-majority characters fit inside k replacements.',
    steps: [
      'Expand right and update counts',
      'cost = length − max frequency',
      'Shrink left while cost > k',
    ],
    result: 'Track the largest valid window',
  },
  'covering-windows-multiplicity': {
    title: 'Expand to cover, shrink to minimize',
    description:
      'Required multiplicities decide when a window fully covers the target.',
    steps: [
      'Expand until all needs are met',
      'Record the current window',
      'Shrink until one need breaks',
    ],
    result: 'Repeat to find the shortest covering range',
  },
  'binary-search-rotation-pivot': {
    title: 'The right edge reveals the pivot side',
    description:
      'Comparing middle with right preserves the half containing the minimum.',
    steps: [
      'mid > right → minimum is right',
      'mid ≤ right → keep mid and left half',
      'Stop when left = right',
    ],
    result: 'The remaining index is the rotation minimum',
  },
  'reversing-pointer-direction': {
    title: 'Reverse one link without losing the suffix',
    description:
      'Three references preserve both halves during each pointer update.',
    steps: [
      'Save next',
      'current.next = previous',
      'Advance previous and current',
    ],
    result: 'Reversed prefix grows by one node',
  },
  'dummy-head-list-merging': {
    title: 'A sentinel anchors the merged chain',
    description:
      'The tail always points to the last chosen node, including the first choice.',
    steps: [
      'Compare both list heads',
      'Attach the smaller node',
      'Advance that list and the tail',
    ],
    result: 'Attach the remaining sorted suffix',
  },
  'split-reverse-weave': {
    title: 'Reorder through three composable phases',
    description:
      'The tail becomes directly accessible after reversing the second half.',
    steps: [
      'Split at the midpoint',
      'Reverse the second half',
      'Alternate nodes from both halves',
    ],
    result: 'L0 → Ln → L1 → Ln−1 …',
  },
  'fixed-gap-list-pointers': {
    title: 'A fixed gap converts distance from the end',
    description:
      'When fast reaches the end, slow is positioned before the removal target.',
    steps: [
      'Start both at a dummy',
      'Advance fast n + 1 links',
      'Move both until fast is null',
    ],
    result: 'Delete slow.next safely, even when it is the head',
  },
  'fast-slow-cycle-detection': {
    title: 'Different speeds expose a cycle',
    description:
      'Inside a finite loop, the faster pointer eventually closes the relative gap.',
    steps: [
      'slow moves 1 edge',
      'fast moves 2 edges',
      'Meeting means a repeated cycle position',
    ],
    result: 'A null fast pointer proves there is no cycle',
  },
  'k-way-heap-merging': {
    title: 'The heap stores the active frontier',
    description:
      'Only the smallest unmerged value from each list can win next.',
    steps: [
      'Push each nonempty list head',
      'Pop the global minimum',
      'Push its successor from the same list',
    ],
    result: 'Heap size stays at most k',
  },
  'recursive-tree-inversion': {
    title: 'Swap the same relationship at every node',
    description:
      'The recursive rule applies independently to both child subtrees.',
    steps: [
      'Invert the left subtree',
      'Invert the right subtree',
      'Exchange the two results',
    ],
    result: 'Every left/right edge is mirrored exactly once',
  },
}

export function LessonDiagram({ lessonSlug }: DiagramProps) {
  const patternDiagram =
    blind75PatternDiagrams[lessonSlug] ?? getGeneratedBlind75Diagram(lessonSlug)
  const generatedReactDiagram = getGeneratedReactDiagram(lessonSlug)
  const diagram = patternDiagram ? (
    <PatternFlowDiagram {...patternDiagram} />
  ) : lessonSlug.startsWith('system-design-') ? (
    <SystemDesignArchitectureDiagram lessonSlug={lessonSlug} />
  ) : generatedReactDiagram ? (
    generatedReactDiagram
  ) : (
    {
      'understanding-big-o': <BigODiagram />,
      'arrays-and-indexes': <ArrayScanDiagram />,
      'hash-maps-and-sets': <HashMapDiagram />,
      'complement-lookup': <ComplementDiagram />,
      'stacks-and-nested-structure': <StackDiagram />,
      'two-pointers-and-sliding-windows': <WindowDiagram />,
      'binary-search-foundations': <BinarySearchDiagram />,
      'two-pointer-comparisons': <TwoPointerDiagram />,
      'sliding-windows-last-seen': <LastSeenWindowDiagram />,
      'running-best-kadanes-algorithm': <KadaneDiagram />,
      'prefix-and-suffix-products': <PrefixSuffixDiagram />,
      'read-and-write-pointers': <ReadWriteDiagram />,
      'monotonic-stacks': <MonotonicStackDiagram />,
      'variable-size-sliding-windows': <VariableWindowDiagram />,
      'expression-evaluation-stacks': <RpnDiagram />,
      'binary-search-rotated-data': <RotatedSearchDiagram />,
      'heaps-and-top-k-selection': <HeapDiagram />,
      'grid-traversal-connected-components': <GridTraversalDiagram />,
      'one-dimensional-dynamic-programming': <DynamicProgrammingDiagram />,
      'react-js-variables-functions-modules': <ModuleBoundaryDiagram />,
      'react-js-objects-arrays-destructuring': <ObjectShapeDiagram />,
      'react-js-map-filter-reduce': <ArrayTransformDiagram />,
      'react-typescript-props-data-shapes': <TypeContractDiagram />,
      'react-what-react-solves': <DeclarativeReactDiagram />,
      'react-jsx-rules-expressions': <JsxExpressionDiagram />,
      'react-components-as-ui-functions': <ComponentResponsibilityDiagram />,
      'react-readiness-diagnostic': <ArrayScanDiagram />,
      'react-components-and-props': <ComponentTreeDiagram />,
      'react-props-and-reusable-components': <ComponentTreeDiagram />,
      'react-state-and-events': <StateLoopDiagram />,
      'react-forms-and-validation': <StateLoopDiagram />,
      'react-component-communication': <StateLoopDiagram />,
      'react-effects-and-synchronization': <EffectDiagram />,
      'react-conditional-rendering-and-lists': <ListIdentityDiagram />,
      'tanstack-router-foundations': <ComponentTreeDiagram />,
      'tanstack-query-server-state': <EffectDiagram />,
      'react-context-shared-state': <ComponentTreeDiagram />,
      'react-performance-rendering': <StateLoopDiagram />,
      'react-testing-applications': <ListIdentityDiagram />,
      'react-accessibility-production-quality': <ComponentTreeDiagram />,
      'react-learning-dashboard-capstone': <ComponentTreeDiagram />,
      'react-custom-hooks': <CustomHookDiagram />,
    }[lessonSlug]
  )

  if (!diagram) return null
  return (
    <section className="mt-10 overflow-hidden rounded-xl border bg-gray-50 p-5 sm:p-7">
      {diagram}
    </section>
  )
}

function getGeneratedReactDiagram(lessonSlug: string) {
  if (/props|required-optional|one-component|children/.test(lessonSlug))
    return <PropsContractDiagram />
  if (/rendering-arrays|stable-keys|conditional-rendering|empty-loading/.test(lessonSlug))
    return <CollectionStateDiagram />
  if (/usestate|functional-updates|immutable|controlled-inputs/.test(lessonSlug))
    return <StateOwnershipDiagram />
  if (/form|validation|submit|multiple-form|reusable-form/.test(lessonSlug))
    return <FormFlowDiagram />
  if (/lifting-state|callback|parent-controlled|sibling|ownership/.test(lessonSlug))
    return <CommunicationDiagram />
  if (/effect|fetching|unnecessary-effects|dependency|cleanup/.test(lessonSlug))
    return <EffectDiagram />
  if (/router|route|params|search-parameters|loaders/.test(lessonSlug))
    return <RouteDiagram />
  if (/query|server-state|mutation|refetching|optimistic/.test(lessonSlug))
    return <ServerStateDiagram />
  if (/context/.test(lessonSlug)) return <ContextBoundaryDiagram />
  if (/hooks|custom-hook|local-storage|debounce/.test(lessonSlug))
    return <CustomHookDiagram />
  if (/performance|memo|lazy-loading|measure/.test(lessonSlug))
    return <PerformanceDiagram />
  if (/testing/.test(lessonSlug)) return <TestingPyramidDiagram />
  if (/a11y|accessibility|semantic|keyboard|focus/.test(lessonSlug))
    return <AccessibilityDiagram />
  if (/capstone/.test(lessonSlug)) return <CapstoneIntegrationDiagram />
  return null
}

function SystemDesignArchitectureDiagram({ lessonSlug }: { lessonSlug: string }) {
  const isEventDriven =
    /queue|event|pub-sub|write-heavy|cqrs|chat|discord|timeline|tiktok/.test(
      lessonSlug,
    )
  const isMedia =
    /youtube|netflix|instagram|dropbox|spotify|blob|cdn|tiktok/.test(lessonSlug)
  const nodes = isMedia
    ? ['Client', 'API Gateway', 'Metadata Service', 'Object Storage', 'CDN']
    : isEventDriven
      ? ['Producer', 'API Service', 'Queue', 'Worker', 'Database']
      : ['Browser', 'Load Balancer', 'App Servers', 'Cache', 'Database']

  return (
    <div>
      <h2 className="text-lg font-semibold">Trace the architecture path</h2>
      <p className="mt-1 text-sm text-gray-600">
        Follow one request or event from left to right. Each box has a job, a
        reason to exist, and a cost.
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-[repeat(5,minmax(0,1fr))] md:items-stretch">
        {nodes.map((node, index) => (
          <div key={node} className="relative rounded-lg border bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              {index === 0 ? 'Entry' : index === nodes.length - 1 ? 'State' : `Layer ${index}`}
            </p>
            <p className="mt-2 text-sm font-semibold">{node}</p>
            <p className="mt-2 text-xs leading-5 text-gray-600">
              {architectureNodeHelp[node] ?? 'Moves data through the design while adding a tradeoff.'}
            </p>
            {index < nodes.length - 1 && (
              <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-xl text-gray-400 md:block">
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950">
        Ask: what happens when this box is slow, unavailable, too expensive, or
        receives 10x more traffic?
      </div>
    </div>
  )
}

const architectureNodeHelp: Record<string, string> = {
  Browser: 'Starts user requests and receives rendered or API responses.',
  Client: 'Mobile or web app that sends user actions to backend systems.',
  'Load Balancer': 'Spreads traffic across healthy application instances.',
  'App Servers': 'Run business logic and coordinate storage or cache calls.',
  Cache: 'Serves repeated hot reads quickly, usually from memory.',
  Database: 'Stores durable source-of-truth data and supports queries.',
  Producer: 'Creates an event when work should happen asynchronously.',
  'API Service': 'Validates requests and accepts commands or events.',
  Queue: 'Buffers work so spikes do not overload downstream systems.',
  Worker: 'Processes background jobs outside the user request path.',
  'API Gateway': 'Routes requests, enforces auth, and centralizes edge policy.',
  'Metadata Service': 'Stores searchable facts about large objects.',
  'Object Storage': 'Stores large binary files outside the primary database.',
  CDN: 'Caches static or media content near users around the world.',
}

function getGeneratedBlind75Diagram(lessonSlug: string) {
  if (!lessonSlug.endsWith('-mental-model')) return null

  const problemSlug = lessonSlug.replace(/-mental-model$/, '')

  if (/(two-sum|contains-duplicate|valid-anagram|accounts-merge)/.test(problemSlug)) {
    return {
      title: 'Remember what the scan has already proved',
      description:
        'Hash-based problems trade repeated searching for constant-time questions about prior values.',
      steps: ['Read one candidate', 'Update or query remembered state', 'Use the answer only when the invariant matches'],
      result: 'The map or set turns past work into immediate evidence',
    } as const
  }

  if (/(palindrome|three-sum|container)/.test(problemSlug)) {
    return {
      title: 'Pointers move because order gives direction',
      description:
        'Two-pointer problems work when a sorted or mirrored structure tells which side can be safely discarded.',
      steps: ['Place pointers at meaningful boundaries', 'Compare the current pair or range', 'Move the side that cannot improve'],
      result: 'Each move removes candidates with a reason',
    } as const
  }

  if (/(substring|window|replacement)/.test(problemSlug)) {
    return {
      title: 'A window expands, breaks, repairs, and records',
      description:
        'Sliding-window problems keep a contiguous range plus just enough counts to know whether the range is valid.',
      steps: ['Expand right', 'Repair by moving left', 'Record the best valid range'],
      result: 'Every character enters and leaves the window at most once',
    } as const
  }

  if (/(binary-search|rotated|median-of-two)/.test(problemSlug)) {
    return {
      title: 'Halve only after naming the impossible half',
      description:
        'Binary search is a proof technique: every comparison must preserve the side that can still contain the answer.',
      steps: ['Choose the middle', 'Compare against the invariant', 'Discard the impossible side'],
      result: 'The candidate range shrinks without losing the answer',
    } as const
  }

  if (/(tree|bst|ancestor|serialize|depth|subtree)/.test(problemSlug)) {
    return {
      title: 'Each node returns a promise to its parent',
      description:
        'Tree algorithms become manageable when each recursive call has a small contract.',
      steps: ['Handle the missing-node base case', 'Ask children for their answers', 'Combine child answers at the parent'],
      result: 'The whole tree is solved by repeating one local rule',
    } as const
  }

  if (/(course|islands|graph|pacific|alien|clone)/.test(problemSlug)) {
    return {
      title: 'Traversal turns relationships into visited state',
      description:
        'Graph problems are about reachability, components, cycles, and dependency order.',
      steps: ['Build neighbors', 'Traverse from a frontier', 'Mark visited or detect cycles'],
      result: 'The visited state explains what has been proven reachable',
    } as const
  }

  if (/(word-search|combination-sum)/.test(problemSlug)) {
    return {
      title: 'Backtracking explores one choice stack',
      description:
        'A backtracking search makes a choice, explores its consequences, then undoes the choice before trying the next branch.',
      steps: ['Choose a candidate', 'Explore recursively', 'Unchoose to restore state'],
      result: 'Every branch sees a clean version of the partial answer',
    } as const
  }

  if (/(trie|word-search-ii)/.test(problemSlug)) {
    return {
      title: 'Prefixes prune impossible words early',
      description:
        'A trie stores shared prefixes so the search can stop the moment a prefix is absent.',
      steps: ['Walk one character', 'Follow the matching child', 'Stop if the prefix disappears'],
      result: 'The trie avoids exploring branches no word can use',
    } as const
  }

  if (/(heap|median|top-k|meeting-rooms-ii)/.test(problemSlug)) {
    return {
      title: 'A heap keeps the next best frontier item visible',
      description:
        'Priority queues are useful when many candidates exist but only the smallest, largest, or middle boundary matters next.',
      steps: ['Push active candidates', 'Pop or peek the priority item', 'Rebalance or advance the frontier'],
      result: 'The next decision is available without sorting everything again',
    } as const
  }

  if (/(interval|meeting-rooms)/.test(problemSlug)) {
    return {
      title: 'Sorted boundaries reveal overlaps',
      description:
        'Interval problems become linear after sorting because overlap decisions only depend on nearby boundaries.',
      steps: ['Sort by start or end', 'Compare with the active interval', 'Merge, keep, remove, or allocate'],
      result: 'A local boundary decision preserves the global schedule',
    } as const
  }

  if (/(matrix|spiral|rotate|zeroes)/.test(problemSlug)) {
    return {
      title: 'Rows, columns, and boundaries are the state',
      description:
        'Matrix problems become less mysterious when every move is expressed as row and column changes.',
      steps: ['Name the boundaries', 'Move through one direction', 'Shrink or mark before continuing'],
      result: 'Coordinate rules replace guesswork',
    } as const
  }

  if (/(bits|number|sum-of-two|missing)/.test(problemSlug)) {
    return {
      title: 'Bits solve one binary position at a time',
      description:
        'Bit manipulation is arithmetic with explicit carry, mask, shift, and cancellation rules.',
      steps: ['Inspect the lowest bit', 'Apply mask, xor, or carry logic', 'Shift to the next position'],
      result: 'Small binary identities replace larger arithmetic work',
    } as const
  }

  if (/(rob|coin|decode|paths|stairs|subsequence|subarray|product)/.test(problemSlug)) {
    return {
      title: 'Dynamic programming saves solved subproblems',
      description:
        'DP works when the answer for a larger state can be assembled from smaller states.',
      steps: ['Define what dp[i] means', 'Write the recurrence', 'Fill states in dependency order'],
      result: 'The table turns exponential reconsideration into reuse',
    } as const
  }

  return {
    title: 'State, invariant, move, answer',
    description:
      'Every DSA pattern becomes easier when you can name the state and the rule that keeps it trustworthy.',
    steps: ['Initialize state', 'Make one valid move', 'Update the answer from trusted state'],
    result: 'Correctness comes from preserving the invariant',
  } as const
}

function PatternFlowDiagram({
  title,
  description,
  steps,
  result,
}: {
  title: string
  description: string
  steps: [string, string, string]
  result: string
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
        {steps.map((step, index) => (
          <div key={step} className="contents">
            <div className="rounded-lg border bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                Step {index + 1}
              </p>
              <p className="mt-2 text-sm font-medium">{step}</p>
            </div>
            {index < steps.length - 1 && (
              <span
                className="self-center text-center text-xl text-gray-400"
                aria-hidden="true"
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-blue-100 px-4 py-3 text-center text-sm font-medium text-blue-900">
        {result}
      </p>
    </div>
  )
}

function BigODiagram() {
  return (
    <div>
      <h2 className="text-lg font-semibold">How work grows with input size</h2>
      <p className="mt-1 text-sm text-gray-600">
        Flatter curves scale better as n increases.
      </p>
      <svg
        viewBox="0 0 640 300"
        role="img"
        aria-label="Graph comparing constant, logarithmic, linear, n log n, and quadratic growth"
        className="mt-5 h-auto w-full"
      >
        <path d="M60 20V250H610" fill="none" stroke="#94a3b8" strokeWidth="2" />
        {[100, 200, 300, 400, 500, 600].map((x) => (
          <path key={x} d={`M${x} 245V255`} stroke="#94a3b8" />
        ))}
        <path d="M60 225H610" fill="none" stroke="#16a34a" strokeWidth="4" />
        <path
          d="M60 225 C160 210 300 195 610 175"
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
        />
        <path
          d="M60 235 L610 85"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="4"
        />
        <path
          d="M60 240 C240 225 430 155 610 45"
          fill="none"
          stroke="#ea580c"
          strokeWidth="4"
        />
        <path
          d="M60 240 Q400 230 610 20"
          fill="none"
          stroke="#dc2626"
          strokeWidth="4"
        />
        <g fontSize="14" fontWeight="600">
          <text x="520" y="218" fill="#16a34a">
            O(1)
          </text>
          <text x="520" y="166" fill="#2563eb">
            O(log n)
          </text>
          <text x="525" y="100" fill="#7c3aed">
            O(n)
          </text>
          <text x="450" y="68" fill="#ea580c">
            O(n log n)
          </text>
          <text x="555" y="25" fill="#dc2626">
            O(n²)
          </text>
        </g>
        <text x="325" y="285" textAnchor="middle" fill="#475569">
          Input size (n) →
        </text>
        <text
          x="18"
          y="140"
          textAnchor="middle"
          transform="rotate(-90 18 140)"
          fill="#475569"
        >
          Operations →
        </text>
      </svg>
    </div>
  )
}

function ArrayScanDiagram() {
  const prices = [7, 1, 5, 3, 6, 4]
  return (
    <div>
      <h2 className="text-lg font-semibold">One-pass stock scan</h2>
      <p className="mt-1 text-sm text-gray-600">
        Carry the minimum earlier price forward; compare each new price against
        it.
      </p>
      <div className="mt-6 grid grid-cols-6 gap-2">
        {prices.map((price, index) => (
          <div
            key={index}
            className={
              index === 1
                ? 'rounded-lg border-2 border-green-600 bg-green-50 p-3 text-center'
                : index === 4
                  ? 'rounded-lg border-2 border-blue-600 bg-blue-50 p-3 text-center'
                  : 'rounded-lg border bg-white p-3 text-center'
            }
          >
            <p className="text-xs text-gray-500">day {index}</p>
            <p className="text-xl font-bold">{price}</p>
            {index === 1 && (
              <p className="mt-1 text-xs font-medium text-green-700">buy</p>
            )}
            {index === 4 && (
              <p className="mt-1 text-xs font-medium text-blue-700">sell</p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
        <span className="rounded bg-green-100 px-3 py-2">
          minimum so far = 1
        </span>
        <span>→</span>
        <span className="rounded bg-blue-100 px-3 py-2">6 − 1 = 5 profit</span>
      </div>
    </div>
  )
}

function HashMapDiagram() {
  return (
    <div>
      <h2 className="text-lg font-semibold">Set membership while scanning</h2>
      <p className="mt-1 text-sm text-gray-600">
        The final 1 is detected without comparing it against every earlier
        element.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div>
          <p className="mb-2 text-sm font-medium">Input</p>
          <div className="flex gap-2">
            {[1, 2, 3, 1].map((value, index) => (
              <span
                key={index}
                className={
                  index === 3
                    ? 'flex h-12 w-12 items-center justify-center rounded border-2 border-red-600 bg-red-50 font-bold'
                    : 'flex h-12 w-12 items-center justify-center rounded border bg-white font-bold'
                }
              >
                {value}
              </span>
            ))}
          </div>
        </div>
        <span className="hidden text-2xl text-gray-400 md:block">→</span>
        <div>
          <p className="mb-2 text-sm font-medium">
            Seen set before final value
          </p>
          <div className="flex gap-2 rounded-lg border bg-white p-3">
            {[1, 2, 3].map((value) => (
              <span
                key={value}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800"
              >
                {value}
              </span>
            ))}
          </div>
          <p className="mt-2 text-sm font-medium text-red-700">
            1 is already present → duplicate
          </p>
        </div>
      </div>
    </div>
  )
}

function ComplementDiagram() {
  return (
    <div>
      <h2 className="text-lg font-semibold">Two Sum complement lookup</h2>
      <p className="mt-1 text-sm text-gray-600">
        At value 7, the needed complement is 2—and 2 already maps to index 0.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3 sm:items-center">
        <div className="rounded-lg border bg-white p-4 text-center">
          <p className="text-sm text-gray-500">current value</p>
          <p className="mt-1 text-3xl font-bold">7</p>
        </div>
        <div className="text-center">
          <p className="font-mono text-lg">9 − 7 = 2</p>
          <p className="mt-1 text-sm text-gray-500">target − current</p>
        </div>
        <div className="rounded-lg border-2 border-green-600 bg-green-50 p-4">
          <p className="text-sm font-medium text-green-800">Seen map</p>
          <p className="mt-2 font-mono text-xl">2 → index 0</p>
        </div>
      </div>
      <div className="mt-5 text-center text-sm font-medium text-green-800">
        Match found: return [0, 1]
      </div>
    </div>
  )
}

function StackDiagram() {
  return (
    <div>
      <h2 className="text-lg font-semibold">
        Why nested brackets need a stack
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        For {'{[]}'}, the most recent opening bracket is always the next one
        closed.
      </p>
      <div className="mt-6 flex flex-wrap items-end justify-center gap-6">
        {[
          { char: '{', stack: ['{'] },
          { char: '[', stack: ['{', '['] },
          { char: ']', stack: ['{'] },
          { char: '}', stack: [] },
        ].map((step, index) => (
          <div key={index} className="text-center">
            <p className="mb-2 font-mono text-xl font-bold">read {step.char}</p>
            <div className="flex h-28 w-20 flex-col-reverse rounded-b border-x-2 border-b-2 border-gray-500 p-1">
              {step.stack.map((item, stackIndex) => (
                <div
                  key={stackIndex}
                  className="mb-1 rounded bg-blue-100 py-1 font-mono font-bold text-blue-800"
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              {step.stack.length ? 'stack' : 'empty ✓'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function WindowDiagram() {
  return (
    <div>
      <h2 className="text-lg font-semibold">A window reuses previous work</h2>
      <p className="mt-1 text-sm text-gray-600">
        Move boundaries instead of rebuilding every range.
      </p>
      <div className="mt-6 flex justify-center gap-2">
        {[2, 1, 5, 1, 3, 2].map((value, index) => (
          <div
            key={index}
            className={
              index >= 1 && index <= 3
                ? 'relative flex h-14 w-14 items-center justify-center border-y-4 border-blue-600 bg-blue-50 text-xl font-bold first:border-l-4'
                : 'flex h-14 w-14 items-center justify-center rounded border bg-white text-xl font-bold'
            }
          >
            {value}
            {index === 1 && (
              <span className="absolute -bottom-7 text-xs text-blue-700">
                left
              </span>
            )}
            {index === 3 && (
              <span className="absolute -bottom-7 text-xs text-blue-700">
                right
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-10 text-center font-mono text-sm">
        window sum: 1 + 5 + 1 = 7 · move → subtract left, add right
      </p>
    </div>
  )
}

function BinarySearchDiagram() {
  return (
    <div>
      <h2 className="text-lg font-semibold">
        Discard half after each comparison
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Searching for 23 in sorted data.
      </p>
      <div className="mt-6 flex justify-center gap-2">
        {[3, 8, 12, 17, 23, 31, 44].map((value, index) => (
          <div
            key={value}
            className={
              index < 4
                ? 'flex h-14 w-14 items-center justify-center rounded border bg-gray-200 text-gray-400 line-through'
                : index === 4
                  ? 'flex h-14 w-14 items-center justify-center rounded border-2 border-green-600 bg-green-50 text-xl font-bold text-green-800'
                  : 'flex h-14 w-14 items-center justify-center rounded border bg-white text-xl font-bold'
            }
          >
            {value}
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-2 text-center text-sm sm:grid-cols-3">
        <span className="rounded bg-gray-200 p-2">17 is too small</span>
        <span className="p-2">discard left half →</span>
        <span className="rounded bg-green-100 p-2 font-medium text-green-800">
          23 found
        </span>
      </div>
    </div>
  )
}

function TwoPointerDiagram() {
  const chars = ['A', ' ', 'm', 'a', 'n', '!', 'a']
  return (
    <div>
      <DiagramHeading
        title="Compare inward from both ends"
        description="Pointers skip punctuation and compare only normalized letters or digits."
      />
      <div className="mt-8 flex justify-center gap-2">
        {chars.map((char, index) => (
          <div
            key={index}
            className={
              index === 0 || index === 6
                ? 'relative grid h-14 w-14 place-items-center rounded border-2 border-blue-600 bg-blue-50 font-mono text-xl font-bold'
                : char.trim() && char !== '!'
                  ? 'grid h-14 w-14 place-items-center rounded border bg-white font-mono text-xl'
                  : 'grid h-14 w-14 place-items-center rounded border border-dashed bg-gray-100 font-mono text-gray-400'
            }
          >
            {char === ' ' ? 'space' : char}
            {index === 0 && (
              <span className="absolute -top-6 text-xs text-blue-700">
                left →
              </span>
            )}
            {index === 6 && (
              <span className="absolute -top-6 text-xs text-blue-700">
                ← right
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm">
        <strong>a = a</strong> after lowercase conversion, so both pointers move
        inward.
      </p>
    </div>
  )
}

function LastSeenWindowDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Jump past the repeated character"
        description="In abba, the second b makes the active window invalid until left moves past the first b."
      />
      <CellRow
        values={['a', 'b', 'b', 'a']}
        active={[1, 2]}
        labels={{ 1: 'old b', 2: 'repeat' }}
      />
      <div className="mt-6 grid gap-3 text-center sm:grid-cols-3">
        <Node label="last_seen[b]" detail="index 1" />
        <span className="self-center text-2xl">→</span>
        <Node label="new left" detail="max(0, 1 + 1) = 2" />
      </div>
    </div>
  )
}

function KadaneDiagram() {
  const values = [-2, 1, -3, 4, -1, 2, 1]
  const running = [-2, 1, -2, 4, 3, 5, 6]
  return (
    <div>
      <DiagramHeading
        title="Best subarray ending at each index"
        description="A negative running prefix is abandoned when starting fresh produces a larger sum."
      />
      <div className="mt-6 grid grid-cols-7 gap-1 text-center">
        <span className="col-span-7 mb-1 text-left text-xs font-medium text-gray-500">
          input
        </span>
        {values.map((value, index) => (
          <span
            key={index}
            className={
              index >= 3
                ? 'rounded bg-blue-100 p-2 font-mono font-bold'
                : 'rounded border bg-white p-2 font-mono'
            }
          >
            {value}
          </span>
        ))}
        <span className="col-span-7 mt-3 mb-1 text-left text-xs font-medium text-gray-500">
          best sum ending here
        </span>
        {running.map((value, index) => (
          <span
            key={index}
            className={
              index === 6
                ? 'rounded bg-green-600 p-2 font-mono font-bold text-white'
                : 'rounded border bg-white p-2 font-mono'
            }
          >
            {value}
          </span>
        ))}
      </div>
      <p className="mt-5 text-center font-mono text-sm">
        current = max(1, 5 + 1) = 6 · best = 6
      </p>
    </div>
  )
}

function PrefixSuffixDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Build each answer from two directions"
        description="For index 2 in [1, 2, 3, 4], combine everything before 3 with everything after it."
      />
      <div className="mt-6 grid items-center gap-3 text-center sm:grid-cols-5">
        <Node label="left product" detail="1 × 2 = 2" />
        <span className="text-2xl">×</span>
        <Node label="right product" detail="4" />
        <span className="text-2xl">=</span>
        <Node label="answer[2]" detail="8" />
      </div>
      <CellRow
        values={[24, 12, 8, 6]}
        active={[2]}
        labels={{ 2: 'prefix × suffix' }}
      />
    </div>
  )
}

function ReadWriteDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Read scans; write compacts"
        description="After processing the first four values, write points to the next open position for a non-zero value."
      />
      <CellRow
        values={[1, 3, 0, 3, 12]}
        active={[1, 3]}
        labels={{ 1: 'write', 3: 'read' }}
      />
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
        <span className="rounded bg-blue-100 px-3 py-2">
          processed non-zero prefix: [1, 3]
        </span>
        <span>→</span>
        <span className="rounded bg-gray-200 px-3 py-2">
          fill remaining slots with 0 after scan
        </span>
      </div>
    </div>
  )
}

function MonotonicStackDiagram() {
  return (
    <div>
      <DiagramHeading
        title="A warmer day resolves waiting indexes"
        description="When 72 arrives, it resolves temperatures 69 and 71 from the decreasing stack."
      />
      <CellRow
        values={[73, 74, 75, 71, 69, 72]}
        active={[3, 4, 5]}
        labels={{ 3: '+2 days', 4: '+1 day', 5: 'current' }}
      />
      <div className="mt-6 flex items-end justify-center gap-3">
        <span className="text-sm text-gray-500">stack before 72</span>
        {[75, 71, 69].map((value, index) => (
          <span
            key={value}
            className={
              index === 0
                ? 'rounded bg-gray-200 px-4 py-2 font-mono'
                : 'rounded bg-orange-100 px-4 py-2 font-mono line-through'
            }
          >
            {value}
          </span>
        ))}
        <span>→</span>
        <span className="rounded bg-blue-100 px-4 py-2 font-mono">
          [75, 72]
        </span>
      </div>
    </div>
  )
}

function VariableWindowDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Shrink while the window still qualifies"
        description="For target 7, the sum reaches 8; removing values from the left searches for the shortest valid range."
      />
      <CellRow
        values={[2, 3, 1, 2, 4, 3]}
        active={[3, 4, 5]}
        labels={{ 3: 'left', 5: 'right' }}
      />
      <div className="mt-6 grid gap-3 text-center sm:grid-cols-3">
        <Node label="window [2, 4, 3]" detail="sum = 9" />
        <span className="self-center text-2xl">→ shrink →</span>
        <Node label="window [4, 3]" detail="sum = 7 · length 2" />
      </div>
    </div>
  )
}

function RpnDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Operators consume the top two operands"
        description="Evaluate [2, 1, +, 3, ×] from left to right; intermediate results return to the stack."
      />
      <div className="mt-6 grid gap-3 text-center sm:grid-cols-5">
        {[
          { token: '2', stack: '[2]' },
          { token: '1', stack: '[2, 1]' },
          { token: '+', stack: '[3]' },
          { token: '3', stack: '[3, 3]' },
          { token: '×', stack: '[9]' },
        ].map((step) => (
          <div
            key={`${step.token}-${step.stack}`}
            className="rounded border bg-white p-3"
          >
            <p className="text-xs text-gray-500">read {step.token}</p>
            <p className="mt-2 font-mono font-bold">{step.stack}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-sm">
        For subtraction and division: pop <strong>right</strong> first, then{' '}
        <strong>left</strong>.
      </p>
    </div>
  )
}

function RotatedSearchDiagram() {
  return (
    <div>
      <DiagramHeading
        title="One half is still sorted"
        description="At midpoint 7, the left half [4, 5, 6, 7] is sorted, but target 0 is outside its range."
      />
      <CellRow
        values={[4, 5, 6, 7, 0, 1, 2]}
        active={[3, 4]}
        labels={{ 3: 'mid', 4: 'search here' }}
      />
      <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
        <span className="rounded bg-gray-200 px-3 py-2 line-through">
          discard sorted left half
        </span>
        <span className="rounded bg-green-100 px-3 py-2 font-medium text-green-800">
          continue in [0, 1, 2]
        </span>
      </div>
    </div>
  )
}

function HeapDiagram() {
  return (
    <div>
      <DiagramHeading
        title="A size-k min-heap keeps the strongest candidates"
        description="For k = 3, the root is the smallest of the three largest values seen so far."
      />
      <div className="mt-7 flex flex-col items-center">
        <span className="rounded-full border-2 border-green-600 bg-green-50 px-5 py-3 font-bold">
          4 · root
        </span>
        <div className="h-6 w-40 border-x border-gray-400 [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
        <div className="flex gap-16">
          <span className="rounded-full bg-blue-100 px-5 py-3 font-bold">
            5
          </span>
          <span className="rounded-full bg-blue-100 px-5 py-3 font-bold">
            6
          </span>
        </div>
      </div>
      <p className="mt-6 text-center text-sm">
        Heap contains [4, 5, 6] → the 3rd largest is <strong>4</strong>.
      </p>
    </div>
  )
}

function GridTraversalDiagram() {
  const grid = [
    ['1', '1', '0'],
    ['1', '0', '0'],
    ['0', '0', '1'],
  ]
  return (
    <div>
      <DiagramHeading
        title="One traversal marks one complete island"
        description="Horizontal and vertical land cells form connected components; diagonal cells remain separate."
      />
      <div className="mx-auto mt-6 grid w-fit grid-cols-3 gap-2">
        {grid.flatMap((row, rowIndex) =>
          row.map((cell, columnIndex) => {
            const firstIsland =
              cell === '1' && !(rowIndex === 2 && columnIndex === 2)
            const land = cell === '1'
            return (
              <span
                key={`${rowIndex}-${columnIndex}`}
                className={
                  firstIsland
                    ? 'grid h-14 w-14 place-items-center rounded bg-blue-600 font-bold text-white'
                    : land
                      ? 'grid h-14 w-14 place-items-center rounded bg-green-600 font-bold text-white'
                      : 'grid h-14 w-14 place-items-center rounded border bg-white text-gray-400'
                }
              >
                {land ? (firstIsland ? 'A' : 'B') : 'water'}
              </span>
            )
          }),
        )}
      </div>
      <p className="mt-5 text-center text-sm">
        Two traversal starts → <strong>2 connected components</strong>.
      </p>
    </div>
  )
}

function DynamicProgrammingDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Each stair reuses the previous two answers"
        description="Every route to step 5 arrives from step 4 or step 3."
      />
      <div className="mt-7 flex flex-wrap items-end justify-center gap-2">
        {[1, 1, 2, 3, 5, 8].map((ways, step) => (
          <div
            key={step}
            className={
              step === 5
                ? 'grid w-16 place-items-center rounded-t border-2 border-green-600 bg-green-50 font-bold'
                : 'grid w-16 place-items-center rounded-t border bg-white'
            }
            style={{ height: `${56 + step * 14}px` }}
          >
            <span className="text-xs text-gray-500">step {step}</span>
            <span className="text-xl">{ways}</span>
            <span className="text-xs">ways</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center font-mono text-sm">
        ways[5] = ways[4] + ways[3] = 5 + 3 = 8
      </p>
    </div>
  )
}

function DiagramHeading({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </>
  )
}

function CellRow({
  values,
  active,
  labels = {},
}: {
  values: Array<string | number>
  active: number[]
  labels?: Record<number, string>
}) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      {values.map((value, index) => (
        <div
          key={index}
          className={
            active.includes(index)
              ? 'relative grid h-14 min-w-14 place-items-center rounded border-2 border-blue-600 bg-blue-50 px-2 font-mono text-lg font-bold'
              : 'relative grid h-14 min-w-14 place-items-center rounded border bg-white px-2 font-mono text-lg'
          }
        >
          {value}
          {labels[index] && (
            <span className="absolute -bottom-6 whitespace-nowrap text-xs font-sans font-medium text-blue-700">
              {labels[index]}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function ModuleBoundaryDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Modules create clear file boundaries"
        description="A value must be exported from one file before another file can import and use it."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <Node label="profile-data.ts" detail="exports learner + formatter" />
        <span className="text-center text-2xl text-blue-600">→</span>
        <Node label="App.tsx" detail="imports and calls helper" />
        <span className="text-center text-2xl text-blue-600">→</span>
        <Node label="Screen" detail="renders Maya Chen" />
      </div>
      <p className="mt-5 rounded bg-blue-50 p-3 text-sm text-blue-950">
        Beginner check: if a name is not declared, imported, or passed in, the
        component cannot see it.
      </p>
    </div>
  )
}

function ObjectShapeDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Destructuring follows the object shape"
        description="Local variables are labels for fields that already exist inside the data."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="rounded-lg border bg-white p-4 font-mono text-sm leading-7">
          <p>movie</p>
          <p className="pl-4">title: "Arrival"</p>
          <p className="pl-4">meta</p>
          <p className="pl-8">year: 2016</p>
          <p className="pl-8">rating: "PG-13"</p>
        </div>
        <span className="text-center text-2xl text-blue-600">→</span>
        <div className="rounded-lg border bg-blue-50 p-4 font-mono text-sm leading-7">
          <p>const {'{ title }'} = movie</p>
          <p>const {'{ year }'} = movie.meta</p>
          <p className="mt-2 font-sans text-sm font-semibold text-blue-800">
            title and year are now local names
          </p>
        </div>
      </div>
    </div>
  )
}

function ArrayTransformDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Choose the array method by output shape"
        description="Each method answers a different question about the data you want next."
      />
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <Node label="filter" detail="many items → fewer items" />
        <Node label="map" detail="each item → one UI row" />
        <Node label="reduce" detail="many items → one summary" />
      </div>
      <div className="mt-5 rounded-lg border bg-white p-4 text-sm">
        <p className="font-semibold">Product list flow</p>
        <p className="mt-2 font-mono">
          products → inStock products → &lt;li&gt; rows → total price
        </p>
      </div>
    </div>
  )
}

function TypeContractDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Types are component contracts"
        description="A prop type explains what the component needs before it can render correctly."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <Node label="Caller" detail='<MovieCard title year rating />' />
        <span className="text-center text-2xl text-blue-600">→</span>
        <Node label="MovieCardProps" detail="title: string · year: number" />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded border bg-green-50 p-3 text-sm">
          <p className="font-semibold text-green-800">Accepted</p>
          <code>year={2016}</code>
        </div>
        <div className="rounded border bg-red-50 p-3 text-sm">
          <p className="font-semibold text-red-800">Rejected</p>
          <code>year="2016"</code>
        </div>
      </div>
    </div>
  )
}

function DeclarativeReactDiagram() {
  return (
    <div>
      <DiagramHeading
        title="React turns data into UI descriptions"
        description="You describe what the screen should be for current data; React performs the DOM update."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <Node label="Props / State" detail="completed=3 total=5" />
        <span className="text-center text-2xl text-blue-600">→</span>
        <Node label="Component" detail="returns JSX" />
        <span className="text-center text-2xl text-blue-600">→</span>
        <Node label="DOM" detail="3/5 lessons complete" />
      </div>
      <p className="mt-5 rounded bg-blue-50 p-3 text-sm text-blue-950">
        Senior-engineer habit: avoid manual DOM writes in render. Make the DOM
        a result of data instead.
      </p>
    </div>
  )
}

function JsxExpressionDiagram() {
  return (
    <div>
      <DiagramHeading
        title="JSX is markup plus JavaScript expressions"
        description="Literal text stays as text. Braces switch into JavaScript."
      />
      <div className="mt-6 rounded-lg border bg-white p-4 font-mono text-sm leading-7">
        <p>&lt;section className="card"&gt;</p>
        <p className="pl-4">&lt;h1&gt;{'{learner.name}'}&lt;/h1&gt;</p>
        <p className="pl-4">&lt;p&gt;12 lessons complete&lt;/p&gt;</p>
        <p>&lt;/section&gt;</p>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Node label="className" detail="React attribute name" />
        <Node label="{...}" detail="evaluate JavaScript" />
        <Node label="one root" detail="one returned expression" />
      </div>
    </div>
  )
}

function ComponentResponsibilityDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Components name responsibilities in the UI tree"
        description="A clear component does one job, then composes with other clear components."
      />
      <div className="mt-6 flex flex-col items-center">
        <Node label="ProfileCard" detail="owns card layout" />
        <div className="py-2 text-2xl text-blue-600">
          ↙ &nbsp;&nbsp;&nbsp; ↓ &nbsp;&nbsp;&nbsp; ↘
        </div>
        <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
          <Node label="Avatar" detail="initials or image" />
          <Node label="UserDetails" detail="name and role" />
          <Node label="SkillList" detail="repeated skills" />
        </div>
      </div>
      <p className="mt-5 text-center text-sm text-gray-600">
        If the name explains what that screen piece is responsible for, the
        boundary is probably useful.
      </p>
    </div>
  )
}

function PropsContractDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Props are explicit inputs"
        description="The parent owns the value. The child receives a read-only contract and renders from it."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <Node label="Parent" detail='name="Maya"' />
        <span className="text-center text-2xl text-blue-600">→</span>
        <Node label="Props object" detail="{ name, role }" />
        <span className="text-center text-2xl text-blue-600">→</span>
        <Node label="Child UI" detail="Maya · Engineer" />
      </div>
    </div>
  )
}

function CollectionStateDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Collections need identity and state branches"
        description="Render lists from data, preserve each row with a stable key, and handle every user-visible state."
      />
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <Node label="Array" detail="records" />
        <Node label="map" detail="one row each" />
        <Node label="key" detail="stable id" />
        <Node label="state branch" detail="loading/error/empty" />
      </div>
    </div>
  )
}

function StateOwnershipDiagram() {
  return (
    <div>
      <DiagramHeading
        title="State has one owner"
        description="Events request updates. React rerenders from the owner and passes the new values downward."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <Node label="User event" detail="click or type" />
        <span className="text-center text-2xl text-blue-600">→</span>
        <Node label="State owner" detail="setState/update" />
        <span className="text-center text-2xl text-blue-600">→</span>
        <Node label="Rerender" detail="new UI from state" />
      </div>
    </div>
  )
}

function FormFlowDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Forms are controlled data flows"
        description="A field displays state, reports changes, validates on submit, and renders feedback."
      />
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <Node label="Input value" detail="from state" />
        <Node label="onChange" detail="update draft" />
        <Node label="Submit" detail="prevent refresh" />
        <Node label="Validate" detail="errors or success" />
        <Node label="Feedback" detail="visible result" />
      </div>
    </div>
  )
}

function CommunicationDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Children communicate through parent-owned callbacks"
        description="The child does not secretly change sibling state. It asks the parent to update the shared source of truth."
      />
      <div className="mt-6 flex flex-col items-center">
        <Node label="Parent state" detail="quantity=1" />
        <div className="py-2 text-2xl text-blue-600">↓ props + callbacks</div>
        <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
          <Node label="Controls" detail="onIncrement()" />
          <Node label="Summary" detail="reads total" />
        </div>
      </div>
    </div>
  )
}

function RouteDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Routes connect URLs to UI and data"
        description="The URL carries location, params, and search state. The route decides what component and data belong there."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <Node label="URL" detail="/products/42?tab=reviews" />
        <span className="text-center text-2xl text-blue-600">→</span>
        <Node label="Route" detail="$productId + search" />
        <span className="text-center text-2xl text-blue-600">→</span>
        <Node label="Page" detail="detail + reviews" />
      </div>
    </div>
  )
}

function ServerStateDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Server state lives in a cache, not local component memory"
        description="Queries read remote data, cache it, refetch it, and invalidate it after writes."
      />
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <Node label="Component" detail="useQuery" />
        <Node label="Cache" detail="queryKey" />
        <Node label="API" detail="fetch data" />
        <Node label="Mutation" detail="write data" />
        <Node label="Invalidate" detail="refresh reads" />
      </div>
    </div>
  )
}

function ContextBoundaryDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Context creates a provider boundary"
        description="Only descendants inside the provider can read the shared value."
      />
      <div className="mt-6 flex flex-col items-center">
        <Node label="ThemeProvider" detail="value={theme}" />
        <div className="py-2 text-2xl text-blue-600">↓ available below</div>
        <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
          <Node label="Dashboard" detail="can read theme" />
          <Node label="ThemeButton" detail="can toggle" />
        </div>
        <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-800">
          Components outside the provider do not have this context.
        </p>
      </div>
    </div>
  )
}

function PerformanceDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Measure the render path before optimizing"
        description="Performance work starts by finding which state update causes which expensive work."
      />
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <Node label="State update" detail="what changed?" />
        <Node label="Rerender path" detail="who recalculates?" />
        <Node label="Measurement" detail="where is slow?" />
        <Node label="Optimization" detail="move, split, or memoize" />
      </div>
    </div>
  )
}

function TestingPyramidDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Tests should follow user-observable behavior"
        description="Prefer roles, labels, text, and interactions over private implementation details."
      />
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <Node label="Arrange" detail="render the UI" />
        <Node label="Act" detail="click/type/wait" />
        <Node label="Assert" detail="visible outcome" />
      </div>
    </div>
  )
}

function AccessibilityDiagram() {
  return (
    <div>
      <DiagramHeading
        title="Accessible UI starts with semantic structure"
        description="The right element, label, focus path, and status message make the interface understandable."
      />
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <Node label="Semantic element" detail="button, form, nav" />
        <Node label="Accessible name" detail="label or text" />
        <Node label="Keyboard path" detail="focus + escape" />
        <Node label="Status" detail="errors/loading" />
      </div>
    </div>
  )
}

function CapstoneIntegrationDiagram() {
  return (
    <div>
      <DiagramHeading
        title="A capstone combines ownership decisions"
        description="Real React apps connect components, state, routes, server data, forms, tests, and accessibility."
      />
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <Node label="Components" detail="UI boundaries" />
        <Node label="State" detail="local/shared/server" />
        <Node label="Routes" detail="URL owns location" />
        <Node label="Quality" detail="tests + a11y" />
      </div>
    </div>
  )
}

function ComponentTreeDiagram() {
  return (
    <div>
      <h2 className="text-lg font-semibold">
        Props flow down a component tree
      </h2>
      <div className="mt-6 flex flex-col items-center">
        <Node label="App" detail="owns user data" />
        <span className="py-2 text-blue-600">↓ props</span>
        <div className="grid w-full max-w-lg grid-cols-2 gap-5">
          <Node label="ProfileCard" detail="user={user}" />
          <Node label="Navigation" detail="name={user.name}" />
        </div>
        <div className="ml-[-50%] py-2 text-blue-600">↓</div>
        <div className="grid w-full max-w-sm grid-cols-2 gap-5">
          <Node label="Avatar" detail="src={image}" />
          <Node label="UserDetails" detail="name, role" />
        </div>
      </div>
    </div>
  )
}

function StateLoopDiagram() {
  return (
    <div>
      <h2 className="text-lg font-semibold">
        Events update state, then React renders again
      </h2>
      <div className="mt-6 grid items-center gap-3 text-center sm:grid-cols-4">
        <Node label="Click" detail="user event" />
        <span className="text-2xl">→</span>
        <Node label="setCount" detail="queue update" />
        <span className="hidden sm:block text-2xl">↘</span>
      </div>
      <div className="mt-3 grid items-center gap-3 text-center sm:grid-cols-4">
        <Node label="Updated UI" detail="Count: 1" />
        <span className="text-2xl">←</span>
        <Node label="Render" detail="read new state" />
        <span className="hidden sm:block text-2xl">←</span>
      </div>
    </div>
  )
}

function EffectDiagram() {
  return (
    <div>
      <h2 className="text-lg font-semibold">
        Effect synchronization lifecycle
      </h2>
      <div className="mt-6 grid gap-3 text-center sm:grid-cols-5">
        <Node label="Render" detail="dependencies" />
        <span className="text-2xl">→</span>
        <Node label="Setup" detail="add listener" />
        <span className="text-2xl">→</span>
        <Node label="External system" detail="browser API" />
      </div>
      <div className="mt-5 flex items-center justify-center gap-3">
        <span className="rounded bg-orange-100 p-3 text-sm">
          dependency changes or unmount
        </span>
        <span>→</span>
        <span className="rounded bg-red-100 p-3 text-sm">cleanup listener</span>
      </div>
    </div>
  )
}

function ListIdentityDiagram() {
  return (
    <div>
      <h2 className="text-lg font-semibold">
        Stable keys preserve identity after reordering
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium">Before</p>
          {[
            ['a', 'Ada'],
            ['b', 'Ben'],
            ['c', 'Cam'],
          ].map(([id, name]) => (
            <div
              key={id}
              className="mb-2 flex justify-between rounded border bg-white p-3"
            >
              <span>{name}</span>
              <code>key={id}</code>
            </div>
          ))}
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">After sort</p>
          {[
            ['c', 'Cam'],
            ['a', 'Ada'],
            ['b', 'Ben'],
          ].map(([id, name]) => (
            <div
              key={id}
              className="mb-2 flex justify-between rounded border bg-blue-50 p-3"
            >
              <span>{name}</span>
              <code>key={id}</code>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-center text-sm text-gray-600">
        The key travels with the record, so local state stays attached to the
        right person.
      </p>
    </div>
  )
}

function CustomHookDiagram() {
  return (
    <div>
      <h2 className="text-lg font-semibold">
        One hook definition, independent component state
      </h2>
      <div className="mt-6 flex flex-col items-center">
        <Node label="useOnlineStatus" detail="shared behavior" />
        <div className="py-2 text-2xl text-blue-600">
          ↙ &nbsp;&nbsp;&nbsp; ↘
        </div>
        <div className="grid w-full max-w-lg grid-cols-2 gap-5">
          <Node label="StatusBadge" detail="state: online" />
          <Node label="SaveButton" detail="state: online" />
        </div>
      </div>
      <p className="mt-5 text-center text-sm text-gray-600">
        The logic is reused; each call belongs to its own component instance.
      </p>
    </div>
  )
}

function Node({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="rounded-lg border-2 border-blue-300 bg-white p-3 text-center">
      <p className="font-semibold">{label}</p>
      <p className="mt-1 text-xs text-gray-500">{detail}</p>
    </div>
  )
}
