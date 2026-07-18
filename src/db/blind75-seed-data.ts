type BlindProblem = {
  title: string
  slug: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  starterCode: string
  functionName: string
  hints: string
  tests: Array<{ input: string; expectedOutput: string; isHidden?: boolean }>
}

export const blind75ProblemCatalog: BlindProblem[] = [
  {
    title: 'Group Anagrams',
    slug: 'group-anagrams',
    description: `Given an array of lowercase strings, group the anagrams together.

For deterministic judging, sort the strings inside each group, then sort the groups by their first string.

Example 1
Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
Output: [["ate","eat","tea"],["bat"],["nat","tan"]]

Example 2
Input: strs = [""]
Output: [[""]]

Constraints
• 1 ≤ strs.length ≤ 10,000
• Every string contains lowercase English letters`,
    difficulty: 'medium',
    topic: 'hash-maps',
    starterCode: `def group_anagrams(strs):
    # Return normalized groups as described above.
    pass
`,
    functionName: 'group_anagrams',
    hints: JSON.stringify([
      'Anagrams share a representation that does not depend on character order.',
      'Use a sorted string or a 26-value frequency tuple as a dictionary key.',
      'Append each word to its signature group, then normalize the output ordering for the judge.',
    ]),
    tests: [
      {
        input: '[["eat","tea","tan","ate","nat","bat"]]',
        expectedOutput: '[["ate","eat","tea"],["bat"],["nat","tan"]]',
      },
      { input: '[[""]]', expectedOutput: '[[""]]' },
      { input: '[["a"]]', expectedOutput: '[["a"]]', isHidden: true },
      {
        input: '[["ab","ba","abc","cab"]]',
        expectedOutput: '[["ab","ba"],["abc","cab"]]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Top K Frequent Elements',
    slug: 'top-k-frequent-elements',
    description: `Given an integer array nums and integer k, return the k most frequent values.

The answer is unique. Return values from highest to lowest frequency; break ties by smaller numeric value.

Example 1
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]

Example 2
Input: nums = [1], k = 1
Output: [1]

Constraints
• 1 ≤ nums.length ≤ 100,000
• 1 ≤ k ≤ number of distinct values`,
    difficulty: 'medium',
    topic: 'hash-maps',
    starterCode: `def top_k_frequent(nums, k):
    # Write your solution here.
    pass
`,
    functionName: 'top_k_frequent',
    hints: JSON.stringify([
      'Count every value before deciding which values rank highest.',
      'A size-k heap gives O(n log k); frequency buckets can give O(n).',
      'For bucket sort, place each value into bucket[count], then scan frequencies downward until k values are collected.',
    ]),
    tests: [
      { input: '[[1,1,1,2,2,3],2]', expectedOutput: '[1,2]' },
      { input: '[[1],1]', expectedOutput: '[1]' },
      { input: '[[4,4,4,5,5,6],1]', expectedOutput: '[4]', isHidden: true },
      { input: '[[-1,-1,2,2,3],2]', expectedOutput: '[-1,2]', isHidden: true },
    ],
  },
  {
    title: 'Encode and Decode Strings',
    slug: 'encode-and-decode-strings',
    description: `Encode a list of strings into one string using length-prefix encoding.

Return the exact format length#value for every input string concatenated together. This representation can be decoded even when values contain #.

Example 1
Input: strs = ["lint", "code"]
Output: "4#lint4#code"

Example 2
Input: strs = ["", "a#b"]
Output: "0#3#a#b"

Constraints
• 0 ≤ strs.length ≤ 10,000
• Strings may contain any Unicode character`,
    difficulty: 'medium',
    topic: 'strings',
    starterCode: `def encode_strings(strs):
    # Encode each string as length#value.
    pass
`,
    functionName: 'encode_strings',
    hints: JSON.stringify([
      'A separator alone is ambiguous when the original strings may contain that separator.',
      'Place the character length before each value so a decoder knows exactly how far to read.',
      'Concatenate str(len(value)) + "#" + value for every string.',
    ]),
    tests: [
      { input: '[["lint","code"]]', expectedOutput: '"4#lint4#code"' },
      { input: '[["","a#b"]]', expectedOutput: '"0#3#a#b"' },
      { input: '[[]]', expectedOutput: '""', isHidden: true },
      {
        input: '[["hello world"]]',
        expectedOutput: '"11#hello world"',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Longest Consecutive Sequence',
    slug: 'longest-consecutive-sequence',
    description: `Given an unsorted integer array nums, return the length of the longest sequence of consecutive values.

Your algorithm must run in O(n) expected time.

Example 1
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: [1,2,3,4] is the longest sequence.

Example 2
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9

Constraints
• 0 ≤ nums.length ≤ 100,000`,
    difficulty: 'medium',
    topic: 'hash-maps',
    starterCode: `def longest_consecutive(nums):
    # Write your solution here.
    pass
`,
    functionName: 'longest_consecutive',
    hints: JSON.stringify([
      'A set gives expected O(1) access to neighboring values.',
      'Only begin counting at values that have no predecessor in the set.',
      'For each sequence start x, advance while x + length is present and update the maximum length.',
    ]),
    tests: [
      { input: '[[100,4,200,1,3,2]]', expectedOutput: '4' },
      { input: '[[0,3,7,2,5,8,4,6,0,1]]', expectedOutput: '9' },
      { input: '[[]]', expectedOutput: '0', isHidden: true },
      { input: '[[1,2,0,1]]', expectedOutput: '3', isHidden: true },
    ],
  },
  {
    title: '3Sum',
    slug: 'three-sum',
    description: `Given an integer array nums, return every unique triplet [a,b,c] whose values sum to zero.

For deterministic judging, sort each triplet and return the triplets in lexicographic order.

Example 1
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]

Example 2
Input: nums = [0,1,1]
Output: []

Constraints
• 3 ≤ nums.length ≤ 3,000`,
    difficulty: 'medium',
    topic: 'two-pointers',
    starterCode: `def three_sum(nums):
    # Return normalized unique triplets.
    pass
`,
    functionName: 'three_sum',
    hints: JSON.stringify([
      'Sorting makes duplicate removal and directed pointer movement possible.',
      'Fix one value, then solve a two-sum problem on the suffix with left and right pointers.',
      'Skip duplicate fixed values and duplicate pointer values after recording a valid triplet.',
    ]),
    tests: [
      { input: '[[-1,0,1,2,-1,-4]]', expectedOutput: '[[-1,-1,2],[-1,0,1]]' },
      { input: '[[0,1,1]]', expectedOutput: '[]' },
      { input: '[[0,0,0]]', expectedOutput: '[[0,0,0]]', isHidden: true },
      {
        input: '[[-2,0,1,1,2]]',
        expectedOutput: '[[-2,0,2],[-2,1,1]]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Container With Most Water',
    slug: 'container-with-most-water',
    description: `Given non-negative heights, choose two vertical lines that hold the most water and return that area.

Area equals the distance between lines multiplied by the shorter height.

Example 1
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49

Example 2
Input: height = [1,1]
Output: 1

Constraints
• 2 ≤ height.length ≤ 100,000`,
    difficulty: 'medium',
    topic: 'two-pointers',
    starterCode: `def max_water_area(height):
    # Write your solution here.
    pass
`,
    functionName: 'max_water_area',
    hints: JSON.stringify([
      'Start with the widest possible container.',
      'The shorter line limits the current area, so keeping it while reducing width cannot improve the result.',
      'Move the pointer at the shorter height inward and update width * min(left_height, right_height).',
    ]),
    tests: [
      { input: '[[1,8,6,2,5,4,8,3,7]]', expectedOutput: '49' },
      { input: '[[1,1]]', expectedOutput: '1' },
      { input: '[[1,2,1]]', expectedOutput: '2', isHidden: true },
      { input: '[[4,3,2,1,4]]', expectedOutput: '16', isHidden: true },
    ],
  },
  {
    title: 'Longest Repeating Character Replacement',
    slug: 'longest-repeating-character-replacement',
    description: `Given an uppercase string s and integer k, return the length of the longest substring that can become one repeated character after replacing at most k characters.

Example 1
Input: s = "ABAB", k = 2
Output: 4

Example 2
Input: s = "AABABBA", k = 1
Output: 4

Constraints
• 1 ≤ s.length ≤ 100,000
• 0 ≤ k ≤ s.length`,
    difficulty: 'medium',
    topic: 'sliding-window',
    starterCode: `def character_replacement(s, k):
    # Write your solution here.
    pass
`,
    functionName: 'character_replacement',
    hints: JSON.stringify([
      'Inside a window, keep the most frequent character and replace every other character.',
      'A window is valid when window_length - highest_frequency <= k.',
      'Expand right, update counts and max frequency, then shrink left while the replacement cost exceeds k.',
    ]),
    tests: [
      { input: '["ABAB",2]', expectedOutput: '4' },
      { input: '["AABABBA",1]', expectedOutput: '4' },
      { input: '["AAAA",0]', expectedOutput: '4', isHidden: true },
      { input: '["ABCDE",1]', expectedOutput: '2', isHidden: true },
    ],
  },
  {
    title: 'Minimum Window Substring',
    slug: 'minimum-window-substring',
    description: `Given strings s and t, return the shortest substring of s containing every character of t with the required multiplicity. Return an empty string when no window exists.

Example 1
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"

Example 2
Input: s = "a", t = "aa"
Output: ""

Constraints
• 1 ≤ s.length, t.length ≤ 100,000`,
    difficulty: 'hard',
    topic: 'sliding-window',
    starterCode: `def min_window(s, t):
    # Write your solution here.
    pass
`,
    functionName: 'min_window',
    hints: JSON.stringify([
      'Count required characters and track how many distinct requirements are currently satisfied.',
      'Expand right until all requirements are met, then shrink left while preserving validity.',
      'Update the best boundaries before removing s[left]; adjust formed when a required count falls below its target.',
    ]),
    tests: [
      { input: '["ADOBECODEBANC","ABC"]', expectedOutput: '"BANC"' },
      { input: '["a","aa"]', expectedOutput: '""' },
      { input: '["a","a"]', expectedOutput: '"a"', isHidden: true },
      { input: '["aa","aa"]', expectedOutput: '"aa"', isHidden: true },
    ],
  },
  {
    title: 'Find Minimum in Rotated Sorted Array',
    slug: 'find-minimum-in-rotated-sorted-array',
    description: `A sorted array of distinct integers was rotated. Return its minimum value in O(log n) time.

Example 1
Input: nums = [3,4,5,1,2]
Output: 1

Example 2
Input: nums = [11,13,15,17]
Output: 11

Constraints
• 1 ≤ nums.length ≤ 100,000
• All values are unique`,
    difficulty: 'medium',
    topic: 'binary-search',
    starterCode: `def find_min_rotated(nums):
    # Write your solution here.
    pass
`,
    functionName: 'find_min_rotated',
    hints: JSON.stringify([
      'Compare the midpoint with the right boundary to identify which side contains the rotation point.',
      'If nums[mid] > nums[right], the minimum must be strictly to the right of mid.',
      'Otherwise keep mid as a candidate by moving right to mid. Stop when left equals right.',
    ]),
    tests: [
      { input: '[[3,4,5,1,2]]', expectedOutput: '1' },
      { input: '[[11,13,15,17]]', expectedOutput: '11' },
      { input: '[[2,1]]', expectedOutput: '1', isHidden: true },
      { input: '[[1]]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    description: `Reverse a singly linked list and return its values from the new head.

Platform representation: the input array lists nodes from head to tail. Return the reversed value array.

Example 1
Input: values = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2
Input: values = []
Output: []

Constraints
• 0 ≤ number of nodes ≤ 5,000`,
    difficulty: 'easy',
    topic: 'linked-lists',
    starterCode: `def reverse_linked_list(values):
    # Simulate pointer reversal and return values from the new head.
    pass
`,
    functionName: 'reverse_linked_list',
    hints: JSON.stringify([
      'A node needs its next pointer saved before that pointer is reversed.',
      'Track previous, current, and next while walking forward once.',
      'For this array representation, demonstrate the same order change without using values[::-1].',
    ]),
    tests: [
      { input: '[[1,2,3,4,5]]', expectedOutput: '[5,4,3,2,1]' },
      { input: '[[]]', expectedOutput: '[]' },
      { input: '[[1]]', expectedOutput: '[1]', isHidden: true },
      { input: '[[-2,0,7]]', expectedOutput: '[7,0,-2]', isHidden: true },
    ],
  },
  {
    title: 'Merge Two Sorted Lists',
    slug: 'merge-two-sorted-lists',
    description: `Merge two sorted singly linked lists and return the merged node values.

Platform representation: each list is supplied as a sorted value array.

Example 1
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

Example 2
Input: list1 = [], list2 = []
Output: []

Constraints
• At most 100 nodes per list`,
    difficulty: 'easy',
    topic: 'linked-lists',
    starterCode: `def merge_two_lists(list1, list2):
    # Merge with two current-node pointers.
    pass
`,
    functionName: 'merge_two_lists',
    hints: JSON.stringify([
      'A dummy head removes the special case for choosing the first result node.',
      'Compare the two current values and attach the smaller node, advancing only that list.',
      'After one list ends, attach the remaining suffix from the other list.',
    ]),
    tests: [
      { input: '[[1,2,4],[1,3,4]]', expectedOutput: '[1,1,2,3,4,4]' },
      { input: '[[],[]]', expectedOutput: '[]' },
      { input: '[[],[0]]', expectedOutput: '[0]', isHidden: true },
      {
        input: '[[-3,2],[-2,5]]',
        expectedOutput: '[-3,-2,2,5]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Reorder List',
    slug: 'reorder-list',
    description: `Reorder a linked list from L0 → L1 → … → Ln into L0 → Ln → L1 → Ln-1 → … and return its values.

Platform representation: the linked list is supplied and returned as a value array.

Example 1
Input: values = [1,2,3,4]
Output: [1,4,2,3]

Example 2
Input: values = [1,2,3,4,5]
Output: [1,5,2,4,3]

Constraints
• 1 ≤ number of nodes ≤ 50,000`,
    difficulty: 'medium',
    topic: 'linked-lists',
    starterCode: `def reorder_list(values):
    # Return values in reordered linked-list order.
    pass
`,
    functionName: 'reorder_list',
    hints: JSON.stringify([
      'The linked-list solution combines three familiar primitives.',
      'Find the middle with slow/fast pointers, reverse the second half, then merge halves alternately.',
      'For the array representation, mirror that final alternating merge with left and right indexes.',
    ]),
    tests: [
      { input: '[[1,2,3,4]]', expectedOutput: '[1,4,2,3]' },
      { input: '[[1,2,3,4,5]]', expectedOutput: '[1,5,2,4,3]' },
      { input: '[[1]]', expectedOutput: '[1]', isHidden: true },
      { input: '[[1,2]]', expectedOutput: '[1,2]', isHidden: true },
    ],
  },
  {
    title: 'Remove Nth Node From End of List',
    slug: 'remove-nth-node-from-end-of-list',
    description: `Remove the nth node from the end of a linked list and return the remaining values.

Platform representation: the linked list is supplied and returned as a value array.

Example 1
Input: values = [1,2,3,4,5], n = 2
Output: [1,2,3,5]

Example 2
Input: values = [1], n = 1
Output: []

Constraints
• 1 ≤ n ≤ number of nodes ≤ 50,000`,
    difficulty: 'medium',
    topic: 'linked-lists',
    starterCode: `def remove_nth_from_end(values, n):
    # Use the two-pointer gap pattern.
    pass
`,
    functionName: 'remove_nth_from_end',
    hints: JSON.stringify([
      'A fixed gap lets one pointer locate the predecessor of the node to remove.',
      'Use a dummy node concept so removing the original head needs no separate branch.',
      'Advance fast n + 1 positions from the dummy, then move fast and slow together until fast reaches the end.',
    ]),
    tests: [
      { input: '[[1,2,3,4,5],2]', expectedOutput: '[1,2,3,5]' },
      { input: '[[1],1]', expectedOutput: '[]' },
      { input: '[[1,2],1]', expectedOutput: '[1]', isHidden: true },
      { input: '[[1,2],2]', expectedOutput: '[2]', isHidden: true },
    ],
  },
  {
    title: 'Linked List Cycle',
    slug: 'linked-list-cycle',
    description: `Return true when a singly linked list contains a cycle.

Platform representation: values lists the nodes, and pos is the zero-based index that the tail points to. A pos of -1 means the tail points to null.

Example 1
Input: values = [3,2,0,-4], pos = 1
Output: true

Example 2
Input: values = [1], pos = -1
Output: false

Constraints
• 0 ≤ number of nodes ≤ 10,000
• -1 ≤ pos < number of nodes`,
    difficulty: 'easy',
    topic: 'linked-lists',
    starterCode: `def has_linked_list_cycle(values, pos):
    # Determine whether the represented tail reconnects to a node.
    pass
`,
    functionName: 'has_linked_list_cycle',
    hints: JSON.stringify([
      'In a real linked list, a slow pointer moves one edge and a fast pointer moves two.',
      'If a cycle exists, the two pointers eventually meet; otherwise fast reaches null.',
      'In this serialized representation, pos >= 0 directly means the tail reconnects to a node.',
    ]),
    tests: [
      { input: '[[3,2,0,-4],1]', expectedOutput: 'true' },
      { input: '[[1],-1]', expectedOutput: 'false' },
      { input: '[[], -1]', expectedOutput: 'false', isHidden: true },
      { input: '[[1,2],0]', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Merge K Sorted Lists',
    slug: 'merge-k-sorted-lists',
    description: `Merge k sorted linked lists and return all values in sorted order.

Platform representation: each linked list is supplied as a sorted value array.

Example 1
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]

Example 2
Input: lists = []
Output: []

Constraints
• 0 ≤ k ≤ 10,000
• At most 10,000 total nodes`,
    difficulty: 'hard',
    topic: 'linked-lists',
    starterCode: `def merge_k_lists(lists):
    # Merge using a heap containing one current value per list.
    pass
`,
    functionName: 'merge_k_lists',
    hints: JSON.stringify([
      'Only the current head of each non-empty list can be the next output value.',
      'Store (value, list_index, value_index) entries in a min-heap.',
      'Pop the smallest entry, append it, and push the next value from the same list until the heap is empty.',
    ]),
    tests: [
      {
        input: '[[[1,4,5],[1,3,4],[2,6]]]',
        expectedOutput: '[1,1,2,3,4,4,5,6]',
      },
      { input: '[[]]', expectedOutput: '[]' },
      { input: '[[[]]]', expectedOutput: '[]', isHidden: true },
      {
        input: '[[[-2,3],[-1,4],[0]]]',
        expectedOutput: '[-2,-1,0,3,4]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Invert Binary Tree',
    slug: 'invert-binary-tree',
    description: `Invert a binary tree by swapping every node's left and right children.

Platform representation: the tree is a level-order array using null for missing nodes. Return a trimmed level-order array for the inverted tree.

Example 1
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]

Example 2
Input: root = []
Output: []

Constraints
• 0 ≤ number of nodes ≤ 100`,
    difficulty: 'easy',
    topic: 'trees',
    starterCode: `def invert_binary_tree(root):
    # root is a level-order list with None for missing nodes.
    pass
`,
    functionName: 'invert_binary_tree',
    hints: JSON.stringify([
      'Every node performs the same local operation: exchange its two child references.',
      'Use DFS recursively or BFS with a queue to visit every real node once.',
      'For a level-order representation, build node relationships, swap children, then serialize and trim trailing None values.',
    ]),
    tests: [
      { input: '[[4,2,7,1,3,6,9]]', expectedOutput: '[4,7,2,9,6,3,1]' },
      { input: '[[]]', expectedOutput: '[]' },
      { input: '[[2,1,3]]', expectedOutput: '[2,3,1]', isHidden: true },
      { input: '[[1,2,null]]', expectedOutput: '[1,null,2]', isHidden: true },
    ],
  },
]

type ExtraProblemSpec = {
  title: string
  slug: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  functionName: string
  signature: string
  prompt: string
  examples: Array<{ input: string; expectedOutput: string }>
  hints: string[]
}

const extraProblem = (spec: ExtraProblemSpec): BlindProblem => ({
  title: spec.title,
  slug: spec.slug,
  description: `${spec.prompt}

Example 1
Input: ${spec.examples[0].input}
Output: ${spec.examples[0].expectedOutput}

Example 2
Input: ${spec.examples[1].input}
Output: ${spec.examples[1].expectedOutput}

Constraints
• Use the intended ${spec.topic} pattern.
• Handle empty, single-item, duplicate, boundary, and negative-value cases where they apply.`,
  difficulty: spec.difficulty,
  topic: spec.topic,
  starterCode: `def ${spec.functionName}(${spec.signature}):
    # Write your solution here.
    pass
`,
  functionName: spec.functionName,
  hints: JSON.stringify(spec.hints),
  tests: spec.examples.map((example, index) => ({
    input: example.input,
    expectedOutput: example.expectedOutput,
    ...(index >= 2 ? { isHidden: true } : {}),
  })),
})

const extraProblemSpecs: ExtraProblemSpec[] = [
  { title: 'Two Sum', slug: 'two-sum', difficulty: 'easy', topic: 'hash-maps', functionName: 'two_sum', signature: 'nums, target', prompt: 'Return indices of the two numbers that add to target.', examples: [{ input: '[[2,7,11,15],9]', expectedOutput: '[0,1]' }, { input: '[[3,2,4],6]', expectedOutput: '[1,2]' }, { input: '[[3,3],6]', expectedOutput: '[0,1]' }, { input: '[[-1,-2,-3,-4,-5],-8]', expectedOutput: '[2,4]' }], hints: ['Ask what value would complete the current number.', 'Store value to index as you scan.', 'Check before inserting so one element is not reused.'] },
  { title: 'Best Time to Buy and Sell Stock', slug: 'best-time-to-buy-and-sell-stock', difficulty: 'easy', topic: 'arrays', functionName: 'max_profit', signature: 'prices', prompt: 'Return the maximum profit from one buy followed by one sell.', examples: [{ input: '[[7,1,5,3,6,4]]', expectedOutput: '5' }, { input: '[[7,6,4,3,1]]', expectedOutput: '0' }, { input: '[[1,2]]', expectedOutput: '1' }, { input: '[[2,4,1]]', expectedOutput: '2' }], hints: ['The buy day must appear before the sell day.', 'Track the lowest price seen so far.', 'At each price, update profit using price - min_price.'] },
  { title: 'Contains Duplicate', slug: 'contains-duplicate', difficulty: 'easy', topic: 'hash-maps', functionName: 'contains_duplicate', signature: 'nums', prompt: 'Return true if any value appears at least twice.', examples: [{ input: '[[1,2,3,1]]', expectedOutput: 'true' }, { input: '[[1,2,3,4]]', expectedOutput: 'false' }, { input: '[[]]', expectedOutput: 'false' }, { input: '[[0,0]]', expectedOutput: 'true' }], hints: ['A set remembers values already seen.', 'The first repeated membership check proves the answer.', 'Compare len(set(nums)) with len(nums) for a compact version.'] },
  { title: 'Product of Array Except Self', slug: 'product-of-array-except-self', difficulty: 'medium', topic: 'arrays', functionName: 'product_except_self', signature: 'nums', prompt: 'Return an array where each position is the product of all other positions without division.', examples: [{ input: '[[1,2,3,4]]', expectedOutput: '[24,12,8,6]' }, { input: '[[-1,1,0,-3,3]]', expectedOutput: '[0,0,9,0,0]' }, { input: '[[2,3]]', expectedOutput: '[3,2]' }, { input: '[[0,0]]', expectedOutput: '[0,0]' }], hints: ['Separate products to the left from products to the right.', 'A prefix pass writes left products.', 'A suffix variable multiplies into each answer from the right.'] },
  { title: 'Maximum Subarray', slug: 'maximum-subarray', difficulty: 'medium', topic: 'dynamic-programming', functionName: 'max_sub_array', signature: 'nums', prompt: 'Return the largest sum of any contiguous non-empty subarray.', examples: [{ input: '[[-2,1,-3,4,-1,2,1,-5,4]]', expectedOutput: '6' }, { input: '[[1]]', expectedOutput: '1' }, { input: '[[5,4,-1,7,8]]', expectedOutput: '23' }, { input: '[[-2,-1]]', expectedOutput: '-1' }], hints: ['At each index decide whether to extend or restart.', 'current = max(num, current + num).', 'best records the maximum current value ever seen.'] },
  { title: 'Maximum Product Subarray', slug: 'maximum-product-subarray', difficulty: 'medium', topic: 'dynamic-programming', functionName: 'max_product', signature: 'nums', prompt: 'Return the largest product of a contiguous non-empty subarray.', examples: [{ input: '[[2,3,-2,4]]', expectedOutput: '6' }, { input: '[[-2,0,-1]]', expectedOutput: '0' }, { input: '[[-2,3,-4]]', expectedOutput: '24' }, { input: '[[0,2]]', expectedOutput: '2' }], hints: ['A negative number can turn the smallest product into the largest.', 'Track both max_ending_here and min_ending_here.', 'Reset naturally through multiplication by zero.'] },
  { title: 'Search in Rotated Sorted Array', slug: 'search-in-rotated-sorted-array', difficulty: 'medium', topic: 'binary-search', functionName: 'search_rotated', signature: 'nums, target', prompt: 'Return the index of target in a rotated sorted array, or -1.', examples: [{ input: '[[4,5,6,7,0,1,2],0]', expectedOutput: '4' }, { input: '[[4,5,6,7,0,1,2],3]', expectedOutput: '-1' }, { input: '[[1],0]', expectedOutput: '-1' }, { input: '[[1,3],3]', expectedOutput: '1' }], hints: ['One half around mid is always sorted.', 'Decide whether target lies inside the sorted half.', 'Discard the half that cannot contain target.'] },
  { title: 'Valid Anagram', slug: 'valid-anagram', difficulty: 'easy', topic: 'hash-maps', functionName: 'is_anagram', signature: 's, t', prompt: 'Return true when strings s and t contain the same characters with the same counts.', examples: [{ input: '["anagram","nagaram"]', expectedOutput: 'true' }, { input: '["rat","car"]', expectedOutput: 'false' }, { input: '["",""]', expectedOutput: 'true' }, { input: '["aacc","ccac"]', expectedOutput: 'false' }], hints: ['Length mismatch is an immediate false.', 'Character counts are the invariant.', 'A counter or fixed alphabet array works.'] },
  { title: 'Valid Palindrome', slug: 'valid-palindrome', difficulty: 'easy', topic: 'two-pointers', functionName: 'is_palindrome', signature: 's', prompt: 'Return true if s is a palindrome after ignoring non-alphanumeric characters and case.', examples: [{ input: '["A man, a plan, a canal: Panama"]', expectedOutput: 'true' }, { input: '["race a car"]', expectedOutput: 'false' }, { input: '[" "]', expectedOutput: 'true' }, { input: '["0P"]', expectedOutput: 'false' }], hints: ['Use pointers from both ends.', 'Skip characters that are not letters or digits.', 'Compare lowercase normalized characters.'] },
  { title: 'Longest Substring Without Repeating Characters', slug: 'longest-substring-without-repeating-characters', difficulty: 'medium', topic: 'sliding-window', functionName: 'length_of_longest_substring', signature: 's', prompt: 'Return the length of the longest substring with no repeated characters.', examples: [{ input: '["abcabcbb"]', expectedOutput: '3' }, { input: '["bbbbb"]', expectedOutput: '1' }, { input: '["pwwkew"]', expectedOutput: '3' }, { input: '[""]', expectedOutput: '0' }], hints: ['The window must contain unique characters.', 'Remember the most recent index for each character.', 'Move left past the duplicate instead of stepping one by one.'] },
  { title: 'Valid Parentheses', slug: 'valid-parentheses', difficulty: 'easy', topic: 'stacks', functionName: 'is_valid_parentheses', signature: 's', prompt: 'Return true if brackets are closed by the same type in the correct order.', examples: [{ input: '["()"]', expectedOutput: 'true' }, { input: '["()[]{}"]', expectedOutput: 'true' }, { input: '["(]"]', expectedOutput: 'false' }, { input: '["([)]"]', expectedOutput: 'false' }], hints: ['Opening brackets wait on a stack.', 'A closing bracket must match the most recent opener.', 'The stack must be empty at the end.'] },
  { title: 'Clone Graph', slug: 'clone-graph', difficulty: 'medium', topic: 'graphs', functionName: 'clone_graph_adjacency', signature: 'adj', prompt: 'Given an undirected graph adjacency list, return a deep-copied adjacency list.', examples: [{ input: '[[[2,4],[1,3],[2,4],[1,3]]]', expectedOutput: '[[2,4],[1,3],[2,4],[1,3]]' }, { input: '[[[]]]', expectedOutput: '[[]]' }, { input: '[[]]', expectedOutput: '[]' }, { input: '[[[2],[1]]]', expectedOutput: '[[2],[1]]' }], hints: ['Map original nodes to cloned nodes.', 'DFS or BFS prevents infinite revisits.', 'Copy neighbor relationships after each clone exists.'] },
  { title: 'Course Schedule', slug: 'course-schedule', difficulty: 'medium', topic: 'graphs', functionName: 'can_finish_courses', signature: 'num_courses, prerequisites', prompt: 'Return true if all courses can be finished.', examples: [{ input: '[2,[[1,0]]]', expectedOutput: 'true' }, { input: '[2,[[1,0],[0,1]]]', expectedOutput: 'false' }, { input: '[1,[]]', expectedOutput: 'true' }, { input: '[3,[[1,0],[2,1]]]', expectedOutput: 'true' }], hints: ['Prerequisites form a directed graph.', 'A cycle makes completion impossible.', 'Use DFS states or Kahn topological sorting.'] },
  { title: 'Pacific Atlantic Water Flow', slug: 'pacific-atlantic-water-flow', difficulty: 'medium', topic: 'graphs', functionName: 'pacific_atlantic', signature: 'heights', prompt: 'Return coordinates that can flow to both oceans, sorted lexicographically.', examples: [{ input: '[[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]]', expectedOutput: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]' }, { input: '[[[1]]]', expectedOutput: '[[0,0]]' }, { input: '[[[1,2],[4,3]]]', expectedOutput: '[[0,1],[1,0],[1,1]]' }, { input: '[[]]', expectedOutput: '[]' }], hints: ['Reverse the flow: start from ocean edges.', 'Move from low to equal-or-higher cells in reverse search.', 'Intersect Pacific-reachable and Atlantic-reachable cells.'] },
  { title: 'Number of Islands', slug: 'number-of-islands', difficulty: 'medium', topic: 'graphs', functionName: 'num_islands', signature: 'grid', prompt: 'Return the number of connected land components in a 2D grid.', examples: [{ input: '[[["1","1","0"],["0","1","0"],["1","0","1"]]]', expectedOutput: '3' }, { input: '[[["1","1"],["1","1"]]]', expectedOutput: '1' }, { input: '[[["0"]]]', expectedOutput: '0' }, { input: '[[]]', expectedOutput: '0' }], hints: ['An island is a connected component.', 'Start DFS/BFS from each unvisited land cell.', 'Mark visited land so it is counted once.'] },
  { title: 'Longest Palindromic Substring', slug: 'longest-palindromic-substring', difficulty: 'medium', topic: 'strings', functionName: 'longest_palindrome', signature: 's', prompt: 'Return the longest palindromic substring.', examples: [{ input: '["babad"]', expectedOutput: '"bab"' }, { input: '["cbbd"]', expectedOutput: '"bb"' }, { input: '["a"]', expectedOutput: '"a"' }, { input: '["ac"]', expectedOutput: '"a"' }], hints: ['Every palindrome has a center.', 'Expand around each odd and even center.', 'Keep the best boundaries found.'] },
  { title: 'Palindromic Substrings', slug: 'palindromic-substrings', difficulty: 'medium', topic: 'strings', functionName: 'count_substrings', signature: 's', prompt: 'Return the number of palindromic substrings.', examples: [{ input: '["abc"]', expectedOutput: '3' }, { input: '["aaa"]', expectedOutput: '6' }, { input: '["a"]', expectedOutput: '1' }, { input: '["abccba"]', expectedOutput: '9' }], hints: ['Count palindromes by centers.', 'Odd and even centers both matter.', 'Each successful expansion contributes one substring.'] },
  { title: 'Coin Change', slug: 'coin-change', difficulty: 'medium', topic: 'dynamic-programming', functionName: 'coin_change', signature: 'coins, amount', prompt: 'Return the fewest coins needed to make amount, or -1.', examples: [{ input: '[[1,2,5],11]', expectedOutput: '3' }, { input: '[[2],3]', expectedOutput: '-1' }, { input: '[[1],0]', expectedOutput: '0' }, { input: '[[1],2]', expectedOutput: '2' }], hints: ['dp[x] is the fewest coins to make x.', 'Initialize impossible states above any real answer.', 'For each amount, try each coin that can precede it.'] },
  { title: 'Maximum Depth of Binary Tree', slug: 'maximum-depth-of-binary-tree', difficulty: 'easy', topic: 'trees', functionName: 'max_depth', signature: 'root', prompt: 'Given a level-order tree array, return its maximum depth.', examples: [{ input: '[[3,9,20,null,null,15,7]]', expectedOutput: '3' }, { input: '[[1,null,2]]', expectedOutput: '2' }, { input: '[[]]', expectedOutput: '0' }, { input: '[[1]]', expectedOutput: '1' }], hints: ['Depth is one plus the deeper child depth.', 'A missing node contributes zero.', 'BFS level counting is an iterative alternative.'] },
  { title: 'Same Tree', slug: 'same-tree', difficulty: 'easy', topic: 'trees', functionName: 'is_same_tree', signature: 'p, q', prompt: 'Return true when two level-order trees have identical structure and values.', examples: [{ input: '[[1,2,3],[1,2,3]]', expectedOutput: 'true' }, { input: '[[1,2],[1,null,2]]', expectedOutput: 'false' }, { input: '[[],[]]', expectedOutput: 'true' }, { input: '[[1],[2]]', expectedOutput: 'false' }], hints: ['Compare nodes in pairs.', 'Both missing is equal; one missing is not.', 'Values and recursive children must match.'] },
  { title: 'Subtree of Another Tree', slug: 'subtree-of-another-tree', difficulty: 'easy', topic: 'trees', functionName: 'is_subtree', signature: 'root, sub_root', prompt: 'Return true if sub_root appears as a subtree of root.', examples: [{ input: '[[3,4,5,1,2],[4,1,2]]', expectedOutput: 'true' }, { input: '[[3,4,5,1,2,null,null,null,null,0],[4,1,2]]', expectedOutput: 'false' }, { input: '[[1],[1]]', expectedOutput: 'true' }, { input: '[[],[1]]', expectedOutput: 'false' }], hints: ['At each root node, ask whether the trees are identical.', 'If not, search the left and right children.', 'Reuse Same Tree as a helper.'] },
  { title: 'Lowest Common Ancestor of a BST', slug: 'lowest-common-ancestor-of-a-bst', difficulty: 'medium', topic: 'trees', functionName: 'lowest_common_ancestor_bst', signature: 'root, p, q', prompt: 'Given a BST level-order array and two values, return the lowest common ancestor value.', examples: [{ input: '[[6,2,8,0,4,7,9,null,null,3,5],2,8]', expectedOutput: '6' }, { input: '[[6,2,8,0,4,7,9,null,null,3,5],2,4]', expectedOutput: '2' }, { input: '[[2,1],2,1]', expectedOutput: '2' }, { input: '[[5,3,6,2,4],2,4]', expectedOutput: '3' }], hints: ['BST order tells which side contains each value.', 'If both targets are smaller, go left; if both larger, go right.', 'The split point is the LCA.'] },
  { title: 'Binary Tree Level Order Traversal', slug: 'binary-tree-level-order-traversal', difficulty: 'medium', topic: 'trees', functionName: 'level_order', signature: 'root', prompt: 'Return level-order values grouped by depth.', examples: [{ input: '[[3,9,20,null,null,15,7]]', expectedOutput: '[[3],[9,20],[15,7]]' }, { input: '[[1]]', expectedOutput: '[[1]]' }, { input: '[[]]', expectedOutput: '[]' }, { input: '[[1,2,3,4]]', expectedOutput: '[[1],[2,3],[4]]' }], hints: ['A queue holds the current frontier.', 'Process exactly the queue length for one level.', 'Append children for the next level.'] },
  { title: 'Validate Binary Search Tree', slug: 'validate-binary-search-tree', difficulty: 'medium', topic: 'trees', functionName: 'is_valid_bst', signature: 'root', prompt: 'Return true if a level-order binary tree satisfies strict BST ordering.', examples: [{ input: '[[2,1,3]]', expectedOutput: 'true' }, { input: '[[5,1,4,null,null,3,6]]', expectedOutput: 'false' }, { input: '[[1,1]]', expectedOutput: 'false' }, { input: '[[]]', expectedOutput: 'true' }], hints: ['Each node lives inside a min/max range.', 'Left children must be strictly below the node.', 'Right children must be strictly above the node.'] },
  { title: 'Kth Smallest Element in a BST', slug: 'kth-smallest-element-in-a-bst', difficulty: 'medium', topic: 'trees', functionName: 'kth_smallest', signature: 'root, k', prompt: 'Return the kth smallest value in a BST.', examples: [{ input: '[[3,1,4,null,2],1]', expectedOutput: '1' }, { input: '[[5,3,6,2,4,null,null,1],3]', expectedOutput: '3' }, { input: '[[1],1]', expectedOutput: '1' }, { input: '[[2,1,3],2]', expectedOutput: '2' }], hints: ['Inorder traversal of a BST is sorted.', 'Stop when the kth value is visited.', 'An iterative stack avoids full traversal.'] },
  { title: 'Construct Binary Tree from Preorder and Inorder Traversal', slug: 'construct-binary-tree-from-preorder-and-inorder-traversal', difficulty: 'medium', topic: 'trees', functionName: 'build_tree', signature: 'preorder, inorder', prompt: 'Return the constructed tree as a trimmed level-order array.', examples: [{ input: '[[3,9,20,15,7],[9,3,15,20,7]]', expectedOutput: '[3,9,20,null,null,15,7]' }, { input: '[[-1],[-1]]', expectedOutput: '[-1]' }, { input: '[[1,2],[2,1]]', expectedOutput: '[1,2]' }, { input: '[[1,2,3],[3,2,1]]', expectedOutput: '[1,2,null,3]' }], hints: ['Preorder reveals the root first.', 'Inorder splits left and right subtrees around that root.', 'A value-to-index map avoids repeated scans.'] },
  { title: 'Binary Tree Maximum Path Sum', slug: 'binary-tree-maximum-path-sum', difficulty: 'hard', topic: 'trees', functionName: 'max_path_sum', signature: 'root', prompt: 'Return the maximum path sum in a non-empty binary tree.', examples: [{ input: '[[1,2,3]]', expectedOutput: '6' }, { input: '[[-10,9,20,null,null,15,7]]', expectedOutput: '42' }, { input: '[[-3]]', expectedOutput: '-3' }, { input: '[[2,-1]]', expectedOutput: '2' }], hints: ['A path can bend at one node.', 'Return only the best single branch to the parent.', 'Update a global best with left + node + right.'] },
  { title: 'Serialize and Deserialize Binary Tree', slug: 'serialize-and-deserialize-binary-tree', difficulty: 'hard', topic: 'trees', functionName: 'serialize_tree', signature: 'root', prompt: 'Serialize a level-order tree array into a reversible comma string with # for nulls.', examples: [{ input: '[[1,2,3,null,null,4,5]]', expectedOutput: '"1,2,3,#,#,4,5"' }, { input: '[[]]', expectedOutput: '""' }, { input: '[[1]]', expectedOutput: '"1"' }, { input: '[[1,null,2]]', expectedOutput: '"1,#,2"' }], hints: ['Serialization must preserve missing children.', 'Use a sentinel such as # for null.', 'A preorder or level-order stream can both be reversible.'] },
  { title: 'Word Break', slug: 'word-break', difficulty: 'medium', topic: 'dynamic-programming', functionName: 'word_break', signature: 's, word_dict', prompt: 'Return true if s can be segmented into dictionary words.', examples: [{ input: '["leetcode",["leet","code"]]', expectedOutput: 'true' }, { input: '["applepenapple",["apple","pen"]]', expectedOutput: 'true' }, { input: '["catsandog",["cats","dog","sand","and","cat"]]', expectedOutput: 'false' }, { input: '["a",["b"]]', expectedOutput: 'false' }], hints: ['dp[i] means the prefix ending at i can be segmented.', 'Try words ending at i.', 'A set gives quick dictionary lookup.'] },
  { title: 'Combination Sum', slug: 'combination-sum', difficulty: 'medium', topic: 'backtracking', functionName: 'combination_sum', signature: 'candidates, target', prompt: 'Return unique combinations that sum to target, sorted lexicographically.', examples: [{ input: '[[2,3,6,7],7]', expectedOutput: '[[2,2,3],[7]]' }, { input: '[[2,3,5],8]', expectedOutput: '[[2,2,2,2],[2,3,3],[3,5]]' }, { input: '[[2],1]', expectedOutput: '[]' }, { input: '[[1],2]', expectedOutput: '[[1,1]]' }], hints: ['Backtracking explores choose-or-skip decisions.', 'Pass the current index again to allow reuse.', 'Stop when remaining target is zero or negative.'] },
  { title: 'House Robber', slug: 'house-robber', difficulty: 'medium', topic: 'dynamic-programming', functionName: 'rob', signature: 'nums', prompt: 'Return the most money that can be robbed without robbing adjacent houses.', examples: [{ input: '[[1,2,3,1]]', expectedOutput: '4' }, { input: '[[2,7,9,3,1]]', expectedOutput: '12' }, { input: '[[]]', expectedOutput: '0' }, { input: '[[2,1,1,2]]', expectedOutput: '4' }], hints: ['At each house choose rob or skip.', 'dp[i] = max(dp[i-1], dp[i-2] + nums[i]).', 'Only the previous two states are needed.'] },
  { title: 'House Robber II', slug: 'house-robber-ii', difficulty: 'medium', topic: 'dynamic-programming', functionName: 'rob_circular', signature: 'nums', prompt: 'Return the most money from circular houses without robbing adjacent houses.', examples: [{ input: '[[2,3,2]]', expectedOutput: '3' }, { input: '[[1,2,3,1]]', expectedOutput: '4' }, { input: '[[1]]', expectedOutput: '1' }, { input: '[[1,2,3]]', expectedOutput: '3' }], hints: ['The first and last house conflict.', 'Solve two linear robber ranges: exclude first or exclude last.', 'Take the better of those two cases.'] },
  { title: 'Decode Ways', slug: 'decode-ways', difficulty: 'medium', topic: 'dynamic-programming', functionName: 'num_decodings', signature: 's', prompt: 'Return the number of ways to decode digits where A=1 through Z=26.', examples: [{ input: '["12"]', expectedOutput: '2' }, { input: '["226"]', expectedOutput: '3' }, { input: '["06"]', expectedOutput: '0' }, { input: '["10"]', expectedOutput: '1' }], hints: ['A zero cannot stand alone.', 'A valid one-digit decode extends dp[i-1].', 'A valid two-digit decode between 10 and 26 extends dp[i-2].'] },
  { title: 'Unique Paths', slug: 'unique-paths', difficulty: 'medium', topic: 'dynamic-programming', functionName: 'unique_paths', signature: 'm, n', prompt: 'Return the number of paths from top-left to bottom-right moving only right or down.', examples: [{ input: '[3,7]', expectedOutput: '28' }, { input: '[3,2]', expectedOutput: '3' }, { input: '[1,1]', expectedOutput: '1' }, { input: '[2,2]', expectedOutput: '2' }], hints: ['Each cell is reached from above or left.', 'dp[r][c] = dp[r-1][c] + dp[r][c-1].', 'A one-dimensional row is enough.'] },
  { title: 'Jump Game', slug: 'jump-game', difficulty: 'medium', topic: 'greedy', functionName: 'can_jump', signature: 'nums', prompt: 'Return true if the last index is reachable.', examples: [{ input: '[[2,3,1,1,4]]', expectedOutput: 'true' }, { input: '[[3,2,1,0,4]]', expectedOutput: 'false' }, { input: '[[0]]', expectedOutput: 'true' }, { input: '[[2,0,0]]', expectedOutput: 'true' }], hints: ['Track the farthest reachable index.', 'If the current index exceeds reach, progress is impossible.', 'Update reach with i + nums[i].'] },
  { title: 'Meeting Rooms', slug: 'meeting-rooms', difficulty: 'easy', topic: 'intervals', functionName: 'can_attend_meetings', signature: 'intervals', prompt: 'Return true if no intervals overlap.', examples: [{ input: '[[[0,30],[5,10],[15,20]]]', expectedOutput: 'false' }, { input: '[[[7,10],[2,4]]]', expectedOutput: 'true' }, { input: '[[]]', expectedOutput: 'true' }, { input: '[[[1,2],[2,3]]]', expectedOutput: 'true' }], hints: ['Sort by start time.', 'Only adjacent intervals can newly overlap after sorting.', 'Check previous end against current start.'] },
  { title: 'Meeting Rooms II', slug: 'meeting-rooms-ii', difficulty: 'medium', topic: 'intervals', functionName: 'min_meeting_rooms', signature: 'intervals', prompt: 'Return the minimum number of rooms needed.', examples: [{ input: '[[[0,30],[5,10],[15,20]]]', expectedOutput: '2' }, { input: '[[[7,10],[2,4]]]', expectedOutput: '1' }, { input: '[[]]', expectedOutput: '0' }, { input: '[[[1,5],[2,6],[3,7]]]', expectedOutput: '3' }], hints: ['Sort starts and ends separately or use a min-heap of end times.', 'A room frees when the earliest end is <= current start.', 'The max simultaneous meetings is the answer.'] },
  { title: 'Insert Interval', slug: 'insert-interval', difficulty: 'medium', topic: 'intervals', functionName: 'insert_interval', signature: 'intervals, new_interval', prompt: 'Insert and merge a new interval into sorted non-overlapping intervals.', examples: [{ input: '[[[1,3],[6,9]],[2,5]]', expectedOutput: '[[1,5],[6,9]]' }, { input: '[[[1,2],[3,5],[6,7],[8,10],[12,16]],[4,8]]', expectedOutput: '[[1,2],[3,10],[12,16]]' }, { input: '[[],[5,7]]', expectedOutput: '[[5,7]]' }, { input: '[[[1,5]],[2,3]]', expectedOutput: '[[1,5]]' }], hints: ['Add intervals completely before the new interval.', 'Merge all overlaps into new_interval.', 'Append the remaining intervals unchanged.'] },
  { title: 'Merge Intervals', slug: 'merge-intervals', difficulty: 'medium', topic: 'intervals', functionName: 'merge_intervals', signature: 'intervals', prompt: 'Merge all overlapping intervals.', examples: [{ input: '[[[1,3],[2,6],[8,10],[15,18]]]', expectedOutput: '[[1,6],[8,10],[15,18]]' }, { input: '[[[1,4],[4,5]]]', expectedOutput: '[[1,5]]' }, { input: '[[[1,4],[0,4]]]', expectedOutput: '[[0,4]]' }, { input: '[[]]', expectedOutput: '[]' }], hints: ['Sort intervals by start.', 'Keep the last merged interval as the active range.', 'Overlap when current.start <= active.end.'] },
  { title: 'Non-overlapping Intervals', slug: 'non-overlapping-intervals', difficulty: 'medium', topic: 'intervals', functionName: 'erase_overlap_intervals', signature: 'intervals', prompt: 'Return the minimum intervals to remove so the rest do not overlap.', examples: [{ input: '[[[1,2],[2,3],[3,4],[1,3]]]', expectedOutput: '1' }, { input: '[[[1,2],[1,2],[1,2]]]', expectedOutput: '2' }, { input: '[[[1,2],[2,3]]]', expectedOutput: '0' }, { input: '[[[0,2],[1,3],[2,4],[3,5]]]', expectedOutput: '2' }], hints: ['Greedily keep the interval with the earliest end.', 'Sort by end time.', 'Remove intervals whose start is before the last kept end.'] },
  { title: 'Rotate Image', slug: 'rotate-image', difficulty: 'medium', topic: 'matrix', functionName: 'rotate_image', signature: 'matrix', prompt: 'Rotate an n x n matrix 90 degrees clockwise and return it.', examples: [{ input: '[[[1,2,3],[4,5,6],[7,8,9]]]', expectedOutput: '[[7,4,1],[8,5,2],[9,6,3]]' }, { input: '[[[1]]]', expectedOutput: '[[1]]' }, { input: '[[[1,2],[3,4]]]', expectedOutput: '[[3,1],[4,2]]' }, { input: '[[[5,1,9],[2,4,8],[13,3,6]]]', expectedOutput: '[[13,2,5],[3,4,1],[6,8,9]]' }], hints: ['Transpose across the main diagonal.', 'Reverse each row after transposing.', 'Layer-by-layer four-way swaps are another O(1) approach.'] },
  { title: 'Spiral Matrix', slug: 'spiral-matrix', difficulty: 'medium', topic: 'matrix', functionName: 'spiral_order', signature: 'matrix', prompt: 'Return all matrix values in spiral order.', examples: [{ input: '[[[1,2,3],[4,5,6],[7,8,9]]]', expectedOutput: '[1,2,3,6,9,8,7,4,5]' }, { input: '[[[1,2,3,4],[5,6,7,8],[9,10,11,12]]]', expectedOutput: '[1,2,3,4,8,12,11,10,9,5,6,7]' }, { input: '[[[1]]]', expectedOutput: '[1]' }, { input: '[[]]', expectedOutput: '[]' }], hints: ['Maintain top, bottom, left, and right boundaries.', 'Traverse one edge, then shrink that boundary.', 'Check boundaries before bottom and left traversals.'] },
  { title: 'Set Matrix Zeroes', slug: 'set-matrix-zeroes', difficulty: 'medium', topic: 'matrix', functionName: 'set_zeroes', signature: 'matrix', prompt: 'Return the matrix after zeroing every row and column containing a zero.', examples: [{ input: '[[[1,1,1],[1,0,1],[1,1,1]]]', expectedOutput: '[[1,0,1],[0,0,0],[1,0,1]]' }, { input: '[[[0,1,2,0],[3,4,5,2],[1,3,1,5]]]', expectedOutput: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]' }, { input: '[[[1]]]', expectedOutput: '[[1]]' }, { input: '[[[0]]]', expectedOutput: '[[0]]' }], hints: ['Rows and columns need markers.', 'The first row and column can store markers in O(1) space.', 'Remember whether the first row or first column originally had zero.'] },
  { title: 'Number of 1 Bits', slug: 'number-of-1-bits', difficulty: 'easy', topic: 'bit-manipulation', functionName: 'hamming_weight', signature: 'n', prompt: 'Return the number of set bits in a non-negative integer.', examples: [{ input: '[11]', expectedOutput: '3' }, { input: '[128]', expectedOutput: '1' }, { input: '[0]', expectedOutput: '0' }, { input: '[4294967293]', expectedOutput: '31' }], hints: ['n & 1 inspects the lowest bit.', 'Shift right to examine all bits.', 'n & (n - 1) removes the lowest set bit.'] },
  { title: 'Counting Bits', slug: 'counting-bits', difficulty: 'easy', topic: 'bit-manipulation', functionName: 'count_bits', signature: 'n', prompt: 'Return bit counts for every number from 0 through n.', examples: [{ input: '[2]', expectedOutput: '[0,1,1]' }, { input: '[5]', expectedOutput: '[0,1,1,2,1,2]' }, { input: '[0]', expectedOutput: '[0]' }, { input: '[1]', expectedOutput: '[0,1]' }], hints: ['Reuse smaller answers.', 'bits[i] = bits[i >> 1] + (i & 1).', 'This is dynamic programming over binary representation.'] },
  { title: 'Missing Number', slug: 'missing-number', difficulty: 'easy', topic: 'bit-manipulation', functionName: 'missing_number', signature: 'nums', prompt: 'Given n distinct numbers from 0..n, return the missing number.', examples: [{ input: '[[3,0,1]]', expectedOutput: '2' }, { input: '[[0,1]]', expectedOutput: '2' }, { input: '[[9,6,4,2,3,5,7,0,1]]', expectedOutput: '8' }, { input: '[[0]]', expectedOutput: '1' }], hints: ['Compare expected sum to actual sum.', 'XOR can cancel matching values.', 'The range includes n as a possible missing value.'] },
  { title: 'Reverse Bits', slug: 'reverse-bits', difficulty: 'easy', topic: 'bit-manipulation', functionName: 'reverse_bits', signature: 'n', prompt: 'Reverse the bits of a 32-bit unsigned integer.', examples: [{ input: '[43261596]', expectedOutput: '964176192' }, { input: '[0]', expectedOutput: '0' }, { input: '[1]', expectedOutput: '2147483648' }, { input: '[4294967293]', expectedOutput: '3221225471' }], hints: ['Build the result from left to right.', 'Shift result left and append n & 1.', 'Shift n right after consuming each bit.'] },
  { title: 'Sum of Two Integers', slug: 'sum-of-two-integers', difficulty: 'medium', topic: 'bit-manipulation', functionName: 'get_sum', signature: 'a, b', prompt: 'Return a + b without using + or - operators.', examples: [{ input: '[1,2]', expectedOutput: '3' }, { input: '[2,3]', expectedOutput: '5' }, { input: '[-1,1]', expectedOutput: '0' }, { input: '[-2,3]', expectedOutput: '1' }], hints: ['XOR adds bits without carries.', 'AND then left shift computes carries.', 'Mask to 32 bits when simulating signed integers.'] },
  { title: 'Climbing Stairs', slug: 'climbing-stairs', difficulty: 'easy', topic: 'dynamic-programming', functionName: 'climb_stairs', signature: 'n', prompt: 'Return the number of ways to climb n stairs taking 1 or 2 steps.', examples: [{ input: '[2]', expectedOutput: '2' }, { input: '[3]', expectedOutput: '3' }, { input: '[1]', expectedOutput: '1' }, { input: '[5]', expectedOutput: '8' }], hints: ['The last move was either one step or two steps.', 'ways[n] = ways[n-1] + ways[n-2].', 'This is Fibonacci with small base cases.'] },
  { title: 'Graph Valid Tree', slug: 'graph-valid-tree', difficulty: 'medium', topic: 'graphs', functionName: 'valid_tree', signature: 'n, edges', prompt: 'Return true if edges form one connected acyclic undirected graph.', examples: [{ input: '[5,[[0,1],[0,2],[0,3],[1,4]]]', expectedOutput: 'true' }, { input: '[5,[[0,1],[1,2],[2,3],[1,3],[1,4]]]', expectedOutput: 'false' }, { input: '[1,[]]', expectedOutput: 'true' }, { input: '[4,[[0,1],[2,3]]]', expectedOutput: 'false' }], hints: ['A tree with n nodes has n - 1 edges.', 'Use DFS/Union-Find to detect cycles.', 'Also verify all nodes are connected.'] },
  { title: 'Number of Connected Components in an Undirected Graph', slug: 'number-of-connected-components-in-an-undirected-graph', difficulty: 'medium', topic: 'graphs', functionName: 'count_components', signature: 'n, edges', prompt: 'Return the number of connected components.', examples: [{ input: '[5,[[0,1],[1,2],[3,4]]]', expectedOutput: '2' }, { input: '[5,[[0,1],[1,2],[2,3],[3,4]]]', expectedOutput: '1' }, { input: '[3,[]]', expectedOutput: '3' }, { input: '[1,[]]', expectedOutput: '1' }], hints: ['Each DFS/BFS from an unvisited node discovers one component.', 'Union-Find can merge endpoints and count roots.', 'Visit every node, not only nodes appearing in edges.'] },
  { title: 'Alien Dictionary', slug: 'alien-dictionary', difficulty: 'hard', topic: 'graphs', functionName: 'alien_order', signature: 'words', prompt: 'Return one valid alien character order, or empty string if impossible.', examples: [{ input: '[["wrt","wrf","er","ett","rftt"]]', expectedOutput: '"wertf"' }, { input: '[["z","x"]]', expectedOutput: '"zx"' }, { input: '[["z","x","z"]]', expectedOutput: '""' }, { input: '[["abc","ab"]]', expectedOutput: '""' }], hints: ['The first differing character between adjacent words creates an ordering edge.', 'A prefix violation is impossible.', 'Topologically sort characters and detect cycles.'] },
  { title: 'Implement Trie', slug: 'implement-trie', difficulty: 'medium', topic: 'tries', functionName: 'run_trie_operations', signature: 'operations, values', prompt: 'Run Trie operations and return outputs for search and startsWith calls.', examples: [{ input: '[["Trie","insert","search","search","startsWith","insert","search"],[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]]', expectedOutput: '[null,null,true,false,true,null,true]' }, { input: '[["Trie","search"],[[],["a"]]]', expectedOutput: '[null,false]' }, { input: '[["Trie","insert","startsWith"],[[],["car"],["ca"]]]', expectedOutput: '[null,null,true]' }, { input: '[["Trie","insert","search"],[[],["car"],["cars"]]]', expectedOutput: '[null,null,false]' }], hints: ['Each node maps characters to child nodes.', 'Insertion walks or creates one node per character.', 'A terminal marker distinguishes full words from prefixes.'] },
  { title: 'Word Search', slug: 'word-search', difficulty: 'medium', topic: 'backtracking', functionName: 'exist', signature: 'board, word', prompt: 'Return true if word exists by walking adjacent cells without reusing a cell.', examples: [{ input: '[[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],"ABCCED"]', expectedOutput: 'true' }, { input: '[[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],"SEE"]', expectedOutput: 'true' }, { input: '[[["A","B"],["C","D"]],"ABCD"]', expectedOutput: 'false' }, { input: '[[["A"]],"A"]', expectedOutput: 'true' }], hints: ['Try every cell as a starting point.', 'DFS matches the next character and marks the cell visited.', 'Backtrack by unmarking before returning.'] },
  { title: 'Word Search II', slug: 'word-search-ii', difficulty: 'hard', topic: 'tries', functionName: 'find_words', signature: 'board, words', prompt: 'Return all dictionary words found on the board, sorted lexicographically.', examples: [{ input: '[[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],["oath","pea","eat","rain"]]', expectedOutput: '["eat","oath"]' }, { input: '[[["a","b"],["c","d"]],["abcb"]]', expectedOutput: '[]' }, { input: '[[["a"]],["a"]]', expectedOutput: '["a"]' }, { input: '[[["a","b"]],["ab","ba"]]', expectedOutput: '["ab","ba"]' }], hints: ['A trie shares prefixes across words.', 'DFS the board while walking trie edges.', 'Record words at terminal trie nodes and avoid duplicates.'] },
  { title: 'Median from Data Stream', slug: 'median-from-data-stream', difficulty: 'hard', topic: 'heaps', functionName: 'median_finder_operations', signature: 'operations, values', prompt: 'Run MedianFinder operations and return outputs for findMedian.', examples: [{ input: '[["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"],[[],[1],[2],[],[3],[]]]', expectedOutput: '[null,null,null,1.5,null,2]' }, { input: '[["MedianFinder","addNum","findMedian"],[[],[1],[]]]', expectedOutput: '[null,null,1]' }, { input: '[["MedianFinder","addNum","addNum","findMedian"],[[],[-1],[-2],[]]]', expectedOutput: '[null,null,null,-1.5]' }, { input: '[["MedianFinder","addNum","addNum","addNum","findMedian"],[[],[5],[15],[1],[]]]', expectedOutput: '[null,null,null,null,5]' }], hints: ['Keep lower half in a max-heap and upper half in a min-heap.', 'Balance sizes so they differ by at most one.', 'Median comes from heap tops.'] },
  { title: 'Longest Increasing Subsequence', slug: 'longest-increasing-subsequence', difficulty: 'medium', topic: 'dynamic-programming', functionName: 'length_of_lis', signature: 'nums', prompt: 'Return the length of the longest strictly increasing subsequence.', examples: [{ input: '[[10,9,2,5,3,7,101,18]]', expectedOutput: '4' }, { input: '[[0,1,0,3,2,3]]', expectedOutput: '4' }, { input: '[[7,7,7,7]]', expectedOutput: '1' }, { input: '[[]]', expectedOutput: '0' }], hints: ['dp[i] can store the best subsequence ending at i.', 'The patience sorting tails array stores the smallest tail for each length.', 'Binary search finds the tail to replace.'] },
  { title: 'Find Median of Two Sorted Arrays', slug: 'find-median-of-two-sorted-arrays', difficulty: 'hard', topic: 'binary-search', functionName: 'find_median_sorted_arrays', signature: 'nums1, nums2', prompt: 'Return the median of two sorted arrays.', examples: [{ input: '[[1,3],[2]]', expectedOutput: '2' }, { input: '[[1,2],[3,4]]', expectedOutput: '2.5' }, { input: '[[],[1]]', expectedOutput: '1' }, { input: '[[0,0],[0,0]]', expectedOutput: '0' }], hints: ['Partition the shorter array with binary search.', 'Left partitions must contain half the combined values.', 'A valid partition has left_max <= right_min on both sides.'] },
  { title: 'Accounts Merge', slug: 'accounts-merge', difficulty: 'medium', topic: 'graphs', functionName: 'accounts_merge', signature: 'accounts', prompt: 'Merge accounts that share emails; return name followed by sorted emails, sorted by name then first email.', examples: [{ input: '[[["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]]', expectedOutput: '[["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["John","johnnybravo@mail.com"],["Mary","mary@mail.com"]]' }, { input: '[[["Gabe","g@mail.com"],["Gabe","g@mail.com","h@mail.com"]]]', expectedOutput: '[["Gabe","g@mail.com","h@mail.com"]]' }, { input: '[[["A","a@mail.com"]]]', expectedOutput: '[["A","a@mail.com"]]' }, { input: '[[]]', expectedOutput: '[]' }], hints: ['Emails are graph nodes connected when they appear in the same account.', 'DFS components or Union-Find merge shared ownership.', 'Sort emails inside each merged account for deterministic output.'] },
]

blind75ProblemCatalog.push(...extraProblemSpecs.map(extraProblem))

type BlindLesson = {
  module: string
  title: string
  slug: string
  summary: string
  practiceProblemSlug: string
  content: string
}

type LessonSection = {
  title: string
  body: string
}

type StructuredLesson = {
  format: 'curriculum-v1'
  learningObjectives: string[]
  sections: LessonSection[]
  visualization: {
    kind: 'pattern-diagram'
    prompt: string
  }
  workedExample: LessonSection
  practice: {
    problemSlug: string
    framing: string
  }
  replay: {
    prompt: string
  }
  quiz: {
    prompt: string
  }
  aiFeedback: {
    prompt: string
  }
}

const toLessonSections = (sections: string[]) => {
  const pairs: LessonSection[] = []
  for (let index = 0; index < sections.length; index += 2) {
    pairs.push({ title: sections[index], body: sections[index + 1] ?? '' })
  }
  return pairs
}

const toLearningObjectives = (title: string, summary: string, sections: LessonSection[]) => [
  summary,
  `Explain the core invariant behind ${title}.`,
  `Apply the pattern to a Blind 75 practice problem with clear complexity reasoning.`,
  sections.some((section) => section.title.toLowerCase().includes('complexity'))
    ? 'Identify the time and space complexity tradeoffs.'
    : 'Connect the worked example to the implementation strategy.',
]

const hasSection = (sections: LessonSection[], title: string) =>
  sections.some((section) => section.title.toLowerCase() === title.toLowerCase())

const enrichLessonSections = (
  title: string,
  summary: string,
  practiceProblemSlug: string,
  sections: LessonSection[],
) => {
  const enriched = [...sections]

  if (!hasSection(enriched, 'Mental model')) {
    enriched.unshift({
      title: 'Mental model',
      body: `${summary} Before writing code, draw the input and the one piece of state that makes each next move safe. A strong DSA solution is usually a small invariant repeated carefully, not a bag of clever tricks.`,
    })
  }

  if (!hasSection(enriched, 'Why this pattern exists')) {
    enriched.splice(1, 0, {
      title: 'Why this pattern exists',
      body: `The brute-force version of ${practiceProblemSlug} usually repeats work because it forgets useful facts from earlier steps. This pattern keeps those facts in a structure such as a pointer boundary, hash map, stack, heap, queue, recursion frame, or dynamic-programming table.`,
    })
  }

  if (!hasSection(enriched, 'How to trace it')) {
    enriched.push({
      title: 'How to trace it',
      body: `Make a small table before coding ${title}. Track the current candidate, the remembered state, the rule that says the state is valid, and the best answer so far. If the table feels confusing, simplify the example until the invariant is visible.`,
    })
  }

  if (!hasSection(enriched, 'Beginner coding checklist')) {
    enriched.push({
      title: 'Beginner coding checklist',
      body: `Name the invariant in a comment, initialize the smallest correct state, update state before using it, handle empty and one-item inputs, and finish by explaining time and space complexity from the number of values actually touched.`,
    })
  }

  if (!hasSection(enriched, 'Tiny code shape')) {
    enriched.push({
      title: 'Tiny code shape',
      body: `Use this as a thinking scaffold, then adapt it to the exact problem:
\`\`\`python
def solve(input):
    state = initialize()
    answer = initialize_answer()

    for candidate in candidates:
        update_state(candidate)
        repair_state_if_needed()
        answer = improve_answer(answer, state)

    return answer
\`\`\`
The real solution may use recursion, a queue, or two loops, but each line should still protect the invariant or read from it.`,
    })
  }

  return enriched
}

const structuredContent = (
  title: string,
  practiceProblemSlug: string,
  summary: string,
  sections: string[],
) => {
  const lessonSections = enrichLessonSections(
    title,
    summary,
    practiceProblemSlug,
    toLessonSections(sections),
  )
  const workedExample =
    lessonSections.find((section) => section.title.toLowerCase().includes('worked')) ??
    lessonSections[lessonSections.length - 1]
  const teachingSections = lessonSections.filter(
    (section) =>
      section !== workedExample &&
      !section.title.toLowerCase().includes('knowledge check'),
  )

  return JSON.stringify(
    {
      format: 'curriculum-v1',
      learningObjectives: toLearningObjectives(title, summary, lessonSections),
      sections: teachingSections,
      visualization: {
        kind: 'pattern-diagram',
        prompt: `Use the visualization to trace ${title}: point to the current candidate, the remembered state, the invariant, and the exact move that shrinks the search or improves the answer.`,
      },
      workedExample,
      practice: {
        problemSlug: practiceProblemSlug,
        framing:
          'Use the Blind 75 problem as the capstone exercise after the pattern is clear.',
      },
      replay: {
        prompt:
          'After your first accepted run, replay the execution and name the invariant at each pointer, map, stack, heap, or recursion step.',
      },
      quiz: {
        prompt:
          'Answer the knowledge check to confirm that the core invariant is in place before moving on.',
      },
      aiFeedback: {
        prompt:
          'Ask the AI tutor to review correctness, complexity, edge cases, and whether your code expresses the intended pattern.',
      },
    } satisfies StructuredLesson,
    null,
    2,
  )
}

const lesson = (
  module: string,
  title: string,
  slug: string,
  practiceProblemSlug: string,
  summary: string,
  sections: string[],
) =>
  ({
    module,
    title,
    slug,
    summary,
    practiceProblemSlug,
    content: structuredContent(title, practiceProblemSlug, summary, sections),
  }) satisfies BlindLesson

export const blind75LessonCatalog: BlindLesson[] = [
  lesson(
    'Arrays and Hashing',
    'Grouping by Canonical Signature',
    'grouping-canonical-signature',
    'group-anagrams',
    'Turn equivalent values into the same stable hash-map key.',
    [
      'Canonical representation',
      'Anagrams differ in order but share identical character counts. A sorted word or a 26-count tuple removes order and becomes a reliable dictionary key.',
      'Grouping invariant',
      'After processing each word, its signature bucket contains exactly the earlier words that are anagrams of it. The scan is linear apart from the work required to build each signature.',
      'Tradeoffs',
      'Sorting each word costs O(m log m). A fixed alphabet count costs O(m) per word and produces a tuple that Python can hash.',
      'Worked example',
      'eat, tea, and ate all map to aet. tan and nat map to ant. bat maps to abt, producing three independent groups.',
      'Knowledge check',
      'Why can the original word not serve as the grouping key? Different character orders would create different keys for equivalent anagrams.',
    ],
  ),
  lesson(
    'Arrays and Hashing',
    'Frequency Buckets and Top-K',
    'frequency-buckets-top-k',
    'top-k-frequent-elements',
    'Rank values without sorting the entire input.',
    [
      'Count before ranking',
      'A frequency map compresses repeated input into value-count pairs. The remaining task ranks distinct values rather than every array position.',
      'Bucket insight',
      'No value can occur more than n times. Create buckets indexed by frequency, place values into their matching bucket, and scan from n downward.',
      'Heap alternative',
      'A size-k min-heap uses O(u log k) time for u distinct values and is useful when k is small or frequencies arrive as a stream.',
      'Deterministic output',
      'When a platform compares arrays directly, define a tie-break rule. This lesson uses smaller numeric values first for equal frequencies.',
      'Knowledge check',
      'Why does bucket scanning take O(n)? There are only n + 1 possible frequency indexes and each distinct value is collected once.',
    ],
  ),
  lesson(
    'Arrays and Hashing',
    'Length-Prefix String Encoding',
    'length-prefix-string-encoding',
    'encode-and-decode-strings',
    'Serialize arbitrary strings without ambiguous separators.',
    [
      'Why separators fail',
      'Joining strings with # cannot distinguish a real # inside a value from a boundary between values.',
      'Self-describing fields',
      'Write each string as its character length, a delimiter, and then exactly that many characters. The delimiter separates the numeric header, not the data.',
      'Decoding state',
      'Read digits until #, parse the length, then consume exactly that many characters. Continue from the next position until the encoded string ends.',
      'Edge cases',
      'Empty strings become 0#. Consecutive empty values remain distinguishable, and delimiters inside values require no escaping.',
      'Knowledge check',
      'Why may the payload contain # safely? Its length tells the decoder where the payload ends.',
    ],
  ),
  lesson(
    'Arrays and Hashing',
    'Sequence Starts in Hash Sets',
    'sequence-starts-hash-sets',
    'longest-consecutive-sequence',
    'Find consecutive runs without sorting by expanding only from true starts.',
    [
      'Avoid repeated work',
      'Expanding from every number revisits the same sequence many times. A value starts a sequence only when value - 1 is absent.',
      'Set invariant',
      'The set provides expected constant-time neighbor checks and automatically removes duplicate input values.',
      'Expansion',
      'From each start, test start + 1, start + 2, and so on until a value is missing. Track the largest run length.',
      'Complexity',
      'Although expansion uses a nested loop, every distinct number belongs to one run and is advanced through once, giving O(n) expected time.',
      'Knowledge check',
      'Why should 3 not start counting when 2 exists? It lies inside a sequence that will already be counted from its smallest value.',
    ],
  ),
  lesson(
    'Problem-Solving Patterns',
    'Sorted Three-Value Search',
    'sorted-three-value-search',
    'three-sum',
    'Reduce a triplet search to repeated linear two-pointer scans.',
    [
      'Sort first',
      'Sorting gives direction: when a triplet sum is too small, move left; when too large, move right.',
      'Fix one value',
      'For each unique index i, search the suffix for two values totaling -nums[i]. This reduces O(n³) enumeration to O(n²).',
      'Remove duplicates',
      'Skip repeated fixed values. After recording a triplet, move both pointers past equal neighbors so the same value combination is not returned twice.',
      'Early reasoning',
      'Once the fixed value is positive, three sorted values cannot sum to zero, so the scan can stop.',
      'Knowledge check',
      'Why search only the suffix after i? It prevents reusing the fixed element and avoids generating permutations of the same triplet.',
    ],
  ),
  lesson(
    'Problem-Solving Patterns',
    'Greedy Container Pointers',
    'greedy-container-pointers',
    'container-with-most-water',
    'Prove which boundary cannot participate in a better narrower container.',
    [
      'Area formula',
      'A container uses width times the shorter height. Begin with maximum width by placing pointers at both ends.',
      'Safe movement',
      'If left is shorter, moving right inward keeps the same limiting height or lowers it while reducing width. Only moving left can possibly find a taller limit.',
      'Greedy proof',
      'Discarding the shorter boundary cannot lose a better solution involving that boundary because every future partner is closer.',
      'Complexity',
      'One pointer moves on every step, so the algorithm takes O(n) time and O(1) space.',
      'Knowledge check',
      'Why not move the taller pointer? The shorter unchanged boundary would still cap the height while width decreases.',
    ],
  ),
  lesson(
    'Problem-Solving Patterns',
    'Replacement-Budget Windows',
    'replacement-budget-windows',
    'longest-repeating-character-replacement',
    'Measure how many characters a window must replace to become uniform.',
    [
      'Replacement cost',
      'If the most frequent character appears max_frequency times, every other window character must be replaced. Cost equals window length minus max_frequency.',
      'Window invariant',
      'Shrink while cost exceeds k. Every valid window can be made uniform within the available replacement budget.',
      'Stale maximum',
      'The historical maximum frequency may remain larger than the exact current count. That is safe for finding the maximum length because it delays shrinking only for a size already proven achievable.',
      'Complexity',
      'Both boundaries move forward at most n positions, giving O(n) time with constant alphabet storage.',
      'Knowledge check',
      'What makes a window invalid? More than k characters differ from its most frequent character.',
    ],
  ),
  lesson(
    'Problem-Solving Patterns',
    'Covering Windows with Multiplicity',
    'covering-windows-multiplicity',
    'minimum-window-substring',
    'Track when every required character count is satisfied, then minimize the range.',
    [
      'Need versus have',
      'A need map stores required multiplicities. A window map stores current counts, and formed tracks how many distinct requirements are fully satisfied.',
      'Expand to validity',
      'Move right until formed equals the number of required keys. At that moment the window covers t, though it may not be minimal.',
      'Shrink to minimality',
      'Record the best window, remove s[left], and advance left until a required count falls below its target. Then resume expanding.',
      'Edge cases',
      'Multiplicity matters: t = aa requires two a characters. Return an empty string if no valid window is ever recorded.',
      'Knowledge check',
      'Why count satisfied character types instead of total matching characters? Each required type has its own multiplicity threshold.',
    ],
  ),
  lesson(
    'Search',
    'Binary Search for a Rotation Pivot',
    'binary-search-rotation-pivot',
    'find-minimum-in-rotated-sorted-array',
    'Locate the smallest value by comparing the midpoint with the right boundary.',
    [
      'Pivot structure',
      'A rotated distinct array contains two sorted runs. The minimum is the first value of the lower run.',
      'Midpoint decision',
      'When nums[mid] is greater than nums[right], mid lies in the higher run and the minimum is strictly right. Otherwise mid may be the minimum, so keep it.',
      'Converging boundaries',
      'Use while left < right. Assign left = mid + 1 or right = mid so the candidate interval always shrinks without discarding a possible minimum.',
      'Complexity',
      'Each comparison halves the candidate range for O(log n) time and O(1) space.',
      'Knowledge check',
      'Why use right = mid rather than mid - 1 in the second case? Mid itself may be the minimum.',
    ],
  ),
  lesson(
    'Linked Lists',
    'Reversing Pointer Direction',
    'reversing-pointer-direction',
    'reverse-linked-list',
    'Preserve the next node before redirecting each link.',
    [
      'Three references',
      'previous is the reversed prefix head, current is the node being processed, and next temporarily preserves the unprocessed suffix.',
      'Update order',
      'Save current.next, point current.next to previous, advance previous to current, then advance current to the saved next node.',
      'Invariant',
      'Before every iteration, previous heads a fully reversed prefix and current heads the untouched suffix.',
      'Complexity',
      'Every node is visited once for O(n) time with O(1) iterative auxiliary space.',
      'Knowledge check',
      'What happens if current.next is reversed before it is saved? The reference to the remaining list is lost.',
    ],
  ),
  lesson(
    'Linked Lists',
    'Dummy Heads for List Merging',
    'dummy-head-list-merging',
    'merge-two-sorted-lists',
    'Build a result chain without special-casing its first node.',
    [
      'Sentinel node',
      'A dummy head is never part of the returned data. It provides a stable predecessor for the first real result node.',
      'Merge invariant',
      'The result prefix is sorted, and both current pointers identify the smallest unmerged value in their respective lists.',
      'Attach leftovers',
      'When one list ends, the other suffix is already sorted and can be attached directly.',
      'Complexity',
      'Each node is attached once for O(n + m) time and O(1) pointer space.',
      'Knowledge check',
      'Why does comparing only the two current nodes suffice? Each list is sorted, so no later value can be smaller than its current head.',
    ],
  ),
  lesson(
    'Linked Lists',
    'Split, Reverse, and Weave',
    'split-reverse-weave',
    'reorder-list',
    'Compose three linked-list primitives into an alternating reorder.',
    [
      'Find the midpoint',
      'Slow advances one node while fast advances two. When fast ends, slow divides the list near its middle.',
      'Reverse the second half',
      'Reversal changes the tail half into descending original position, making Ln available first.',
      'Weave halves',
      'Alternately connect a node from the first half and a node from the reversed second half until the latter is exhausted.',
      'Complexity',
      'Each phase is linear and uses constant pointer space, so the complete algorithm remains O(n) time and O(1) space.',
      'Knowledge check',
      'Why reverse the second half? It exposes tail nodes in exactly the order needed for alternating merge.',
    ],
  ),
  lesson(
    'Linked Lists',
    'Fixed-Gap List Pointers',
    'fixed-gap-list-pointers',
    'remove-nth-node-from-end-of-list',
    'Translate a position from the end into one forward traversal.',
    [
      'Create a gap',
      'Advance fast n + 1 links ahead of slow when both begin at a dummy node. The gap stays constant as they move together.',
      'Find the predecessor',
      'When fast reaches null, slow is immediately before the node that is n positions from the end.',
      'Dummy advantage',
      'The dummy acts as a predecessor even when the real head must be removed, eliminating a separate head-removal branch.',
      'Complexity',
      'The list is traversed once with O(1) auxiliary pointer space.',
      'Knowledge check',
      'Why is the initial gap n + 1 rather than n? Slow must stop at the predecessor of the removed node.',
    ],
  ),
  lesson(
    'Linked Lists',
    'Fast and Slow Cycle Detection',
    'fast-slow-cycle-detection',
    'linked-list-cycle',
    'Use different pointer speeds to detect repeated traversal without extra memory.',
    [
      'Relative speed',
      'Inside a cycle, fast gains one node per iteration on slow. Their positions modulo the cycle length must eventually match.',
      'No-cycle ending',
      'If the list is acyclic, fast or fast.next becomes null before the pointers meet.',
      'Why a set is different',
      'A visited-node set also detects cycles but requires O(n) memory. Floyd’s method uses only two pointers.',
      'Serialized input',
      'The platform uses a tail position to represent a cycle in JSON, while the lesson models the pointer algorithm used with real nodes.',
      'Knowledge check',
      'Why can fast not skip slow forever inside a cycle? Their relative position advances by one modulo a finite cycle length.',
    ],
  ),
  lesson(
    'Linked Lists',
    'K-Way Heap Merging',
    'k-way-heap-merging',
    'merge-k-sorted-lists',
    'Expose one candidate per sorted list through a min-heap.',
    [
      'Candidate frontier',
      'Only the current head of each list can be the smallest remaining value. Put those k candidates in a min-heap.',
      'Advance one list',
      'After popping a value, push only its successor from the same list. The heap continues to represent the complete frontier.',
      'Tie safety',
      'Include a list index in heap entries so equal values never require comparing node objects.',
      'Complexity',
      'For N total nodes and k lists, every node enters and leaves a heap of size at most k: O(N log k) time and O(k) space.',
      'Knowledge check',
      'Why is one heap entry per list enough? Values behind a list head cannot be smaller than that head.',
    ],
  ),
  lesson(
    'Trees',
    'Recursive Tree Inversion',
    'recursive-tree-inversion',
    'invert-binary-tree',
    'Apply the same child swap independently at every tree node.',
    [
      'Recursive shape',
      'A tree is made of smaller trees. Invert the left subtree, invert the right subtree, then exchange the two results.',
      'Base case',
      'A missing node is already inverted and returns immediately. This stops recursion at every leaf boundary.',
      'Breadth-first alternative',
      'A queue can visit nodes level by level and swap children iteratively. Both traversals touch every node once.',
      'Complexity',
      'Time is O(n). Recursive auxiliary space is O(h), where h is tree height; breadth-first queue space can reach O(w), the maximum width.',
      'Knowledge check',
      'Why does swapping at every node invert the entire tree? Every parent-child left/right relationship is reversed exactly once.',
    ],
  ),
]

const moduleByTopic: Record<string, string> = {
  arrays: 'Arrays and Hashing',
  'hash-maps': 'Arrays and Hashing',
  strings: 'Strings',
  'two-pointers': 'Problem-Solving Patterns',
  'sliding-window': 'Problem-Solving Patterns',
  stacks: 'Stacks',
  'binary-search': 'Search',
  'linked-lists': 'Linked Lists',
  trees: 'Trees',
  graphs: 'Graphs',
  tries: 'Tries',
  heaps: 'Heaps',
  intervals: 'Intervals',
  matrix: 'Matrix',
  'bit-manipulation': 'Bit Manipulation',
  'dynamic-programming': 'Dynamic Programming',
  backtracking: 'Backtracking',
  greedy: 'Greedy',
}

const lessonTitleByTopic: Record<string, string> = {
  arrays: 'Linear Scan State',
  'hash-maps': 'Hash-Based Lookup',
  strings: 'String State and Centers',
  'two-pointers': 'Converging Pointer Decisions',
  'sliding-window': 'Maintaining a Valid Window',
  stacks: 'Last-In-First-Out Invariants',
  'binary-search': 'Halving a Search Space',
  'linked-lists': 'Pointer Ownership',
  trees: 'Recursive Tree Contracts',
  graphs: 'Graph Reachability and Cycles',
  tries: 'Prefix Tree Pruning',
  heaps: 'Priority Frontier Maintenance',
  intervals: 'Ordering Ranges by Boundaries',
  matrix: 'Grid Boundaries and Coordinates',
  'bit-manipulation': 'Bitwise State Transitions',
  'dynamic-programming': 'Subproblem Recurrence',
  backtracking: 'Choose, Explore, Unchoose',
  greedy: 'Safe Local Choices',
}

const extraLessonSlug = (slug: string) => `${slug}-mental-model`

blind75LessonCatalog.push(
  ...extraProblemSpecs.map((spec) =>
    lesson(
      moduleByTopic[spec.topic] ?? 'Problem-Solving Patterns',
      `${lessonTitleByTopic[spec.topic] ?? 'Problem Pattern'}: ${spec.title}`,
      extraLessonSlug(spec.slug),
      spec.slug,
      spec.prompt,
      [
        'Mental model',
        `Treat ${spec.title} as a ${spec.topic} problem. A beginner-friendly way to start is to ignore code for one minute and draw the moving pieces: the input, the answer being built, and the small piece of state that tells you what is still possible. The central question is not “what loop do I write?” but “what fact must remain true after every move?”`,
        'Why this pattern exists',
        `The brute-force solution usually checks too many candidates because it forgets what was already learned. The ${spec.topic} pattern keeps useful information in a deliberate structure: a map remembers previous values, a window remembers a valid range, a stack remembers unfinished work, recursion remembers a subtree contract, and dynamic programming remembers solved subproblems.`,
        'Interview framing',
        'Use the same progression you would see in a strong algorithms class or pattern-based interview prep: restate the specification, name the brute-force search space, find the repeated work, choose a data structure, state the invariant, then code only after the invariant feels obvious.',
        'Core invariant',
        `${spec.hints[0]} Say this invariant out loud before coding. If you cannot say it in one sentence, the implementation will feel like memorized steps instead of a controlled process.`,
        'Implementation strategy',
        `${spec.hints[1]} ${spec.hints[2]} Keep variable names tied to their jobs: left/right for boundaries, seen/counts for memory, best/current for running answers, stack/queue/heap for frontiers, and memo/dp for subproblem answers.`,
        'Tiny code shape',
        `Most solutions in this pattern follow a small skeleton:
\`\`\`python
def solve(input):
    state = initialize_the_invariant()
    answer = initialize_the_answer()

    for candidate in candidates_from(input):
        update_state(candidate)
        while state_breaks_the_rule():
            repair_state()
        answer = improve_answer(answer, state)

    return answer
\`\`\`
You will adapt this shape, not copy it literally. The important habit is that every line either preserves the invariant, repairs it, or uses it to improve the answer.`,
        'Complexity reasoning',
        'Account for every element, edge, character, cell, or recursive state exactly as the algorithm touches it. Then account for helper memory by naming what it stores: a frontier, visited set, count map, memo table, stack, heap, prefix tree, or output buffer. This is the difference between guessing Big-O and proving it.',
        'Common beginner mistake',
        `Do not jump straight from the example to code. First mark what changes and what must not change. In ${spec.title}, the dangerous bug is usually updating the answer before the state is valid, forgetting an edge case, or using a data structure that cannot answer the key question quickly.`,
        'Worked example',
        `Trace ${spec.examples[0].input} toward ${spec.examples[0].expectedOutput}. Make a table with columns for the current candidate, the remembered state, whether the invariant is valid, and the best answer so far. At each row, point to the invariant before changing state, then explain why the next candidate can be accepted, discarded, merged, or deferred.`,
        'Knowledge check',
        'Before coding, answer: what state proves progress, what state proves correctness, and what edge case would break a naive implementation?',
      ],
    ),
  ),
)

const questionOptions: Record<string, string[]> = {
  'grouping-canonical-signature': [
    'Equivalent anagrams map to the same canonical key.',
    'Every word receives a unique key.',
    'Groups are created from word length only.',
    'Input order determines equivalence.',
  ],
  'frequency-buckets-top-k': [
    'Each processed value is stored according to its frequency.',
    'The complete input must be alphabetically sorted.',
    'Only values occurring once matter.',
    'The smallest frequency is always returned first.',
  ],
  'length-prefix-string-encoding': [
    'A decoded field consumes exactly its recorded length.',
    'The delimiter may never occur in a value.',
    'All strings must have equal length.',
    'Empty strings cannot be represented.',
  ],
  'sequence-starts-hash-sets': [
    'A run is expanded only when its predecessor is absent.',
    'Every number starts a new run.',
    'The array is sorted before scanning.',
    'Duplicates extend a sequence.',
  ],
  'sorted-three-value-search': [
    'The fixed index and pointer suffix avoid reused positions and permutations.',
    'All three pointers move together.',
    'Only positive values are considered.',
    'Every triplet is generated three times.',
  ],
  'greedy-container-pointers': [
    'Moving the shorter boundary is the only move that can raise the limiting height.',
    'Moving the taller boundary increases width.',
    'Both boundaries must move every time.',
    'The shortest width is checked first.',
  ],
  'replacement-budget-windows': [
    'Window length minus its highest frequency stays within k.',
    'Every window contains one character.',
    'The left boundary never moves.',
    'All characters are replaced.',
  ],
  'covering-windows-multiplicity': [
    'A valid window satisfies every required character count.',
    'A valid window merely contains each distinct character once.',
    'The first valid window is always smallest.',
    'The right boundary moves backward.',
  ],
  'binary-search-rotation-pivot': [
    'The candidate interval always retains the minimum.',
    'The midpoint is always the minimum.',
    'Both boundaries move by one.',
    'The array must be rotated exactly once.',
  ],
  'reversing-pointer-direction': [
    'Previous heads the reversed prefix and current heads the untouched suffix.',
    'Current always points to the original head.',
    'Next is never stored.',
    'The reversed prefix remains empty.',
  ],
  'dummy-head-list-merging': [
    'The result prefix is sorted and pointers mark the smallest unmerged candidates.',
    'The dummy stores the maximum value.',
    'Both pointers always advance.',
    'Leftovers must be sorted again.',
  ],
  'split-reverse-weave': [
    'The first half and reversed second half expose the next alternating nodes.',
    'The list remains sorted.',
    'Fast and slow always point together.',
    'Only the middle node moves.',
  ],
  'fixed-gap-list-pointers': [
    'Fast remains n + 1 links ahead so slow ends at the predecessor.',
    'Slow moves twice as fast.',
    'The gap shrinks on every step.',
    'The head can never be removed.',
  ],
  'fast-slow-cycle-detection': [
    'Inside a cycle, the pointers’ relative position eventually becomes zero.',
    'Fast stops at every node.',
    'Slow moves backward.',
    'Cycles require a visited set.',
  ],
  'k-way-heap-merging': [
    'The heap contains the smallest unmerged candidate from each active list.',
    'Every node from every list begins in the heap.',
    'The largest value stays at the root.',
    'Lists are merged pairwise only.',
  ],
  'recursive-tree-inversion': [
    'Every visited node has its left and right children exchanged.',
    'Only leaf values change.',
    'Tree height becomes zero.',
    'Nodes are sorted after traversal.',
  ],
}

const questionExplanations: Record<string, string> = Object.fromEntries(
  Object.entries(questionOptions).map(([slug, options]) => [slug, options[0]]),
)

export const blind75QuestionCatalog = blind75LessonCatalog.map((item) => ({
  lessonSlug: item.slug,
  prompt: `Which statement best captures the key invariant in “${item.title}”?`,
  options: questionOptions[item.slug] ?? [
    'The algorithm preserves its stated invariant after every step.',
    'The input must always be processed with nested loops.',
    'Sorting is required for every data structure.',
    'Extra memory always reduces correctness.',
  ],
  correctIndex: 0,
  explanation:
    questionExplanations[item.slug] ??
    'The invariant describes the reliable state that makes each next decision safe and proves the algorithm correct.',
}))
