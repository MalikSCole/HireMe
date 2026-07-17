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

type BlindLesson = {
  module: string
  title: string
  slug: string
  summary: string
  practiceProblemSlug: string
  content: string
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
    content: sections.join('\n\n'),
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
