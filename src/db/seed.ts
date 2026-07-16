import "dotenv/config";
import { and, eq } from "drizzle-orm";

import { db } from "./index";
import { courseModules, courses, lessonQuestions, lessons, problems, reactChallenges, testCases } from "./schema";

type SeedProblem = typeof problems.$inferInsert & {
  tests: Array<{ input: string; expectedOutput: string; isHidden?: boolean }>;
};

const catalog: SeedProblem[] = [
  {
    title: "Two Sum",
    slug: "two-sum",
    description: `Given an array of integers nums and an integer target, return the indices of the two numbers whose values add up to target.

You may assume that every input has exactly one valid answer. You cannot use the same array element twice, and you may return the two indices in any order.

Example 1
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] equals 9, so the answer is [0, 1].

Example 2
Input: nums = [3, 2, 4], target = 6
Output: [1, 2]

Constraints
• 2 ≤ nums.length ≤ 10,000
• -1,000,000,000 ≤ nums[i], target ≤ 1,000,000,000
• Exactly one valid answer exists.`,
    difficulty: "easy",
    topic: "arrays",
    starterCode: "def two_sum(nums, target):\n    # Write your solution here\n    pass\n",
    functionName: "two_sum",
    hints: JSON.stringify(["Rewrite the target relationship in terms of the current value: what other value would complete the pair?", "Store previously visited values so you can look up that needed value without scanning the array again.", "Use a map from value to index. Check for target - num before inserting the current num so one element cannot match itself."]),
    tests: [
      { input: "[[2,7,11,15],9]", expectedOutput: "[0,1]" },
      { input: "[[3,2,4],6]", expectedOutput: "[1,2]" },
      { input: "[[3,3],6]", expectedOutput: "[0,1]", isHidden: true },
      { input: "[[-3,4,3,90],0]", expectedOutput: "[0,2]", isHidden: true },
    ],
  },
  {
    title: "Contains Duplicate",
    slug: "contains-duplicate",
    description: `Given an integer array nums, return true if any value appears at least twice. Return false if every element is distinct.

Example 1
Input: nums = [1, 2, 3, 1]
Output: true
Explanation: The value 1 appears at indices 0 and 3.

Example 2
Input: nums = [1, 2, 3, 4]
Output: false
Explanation: Every value appears exactly once.

Constraints
• 0 ≤ nums.length ≤ 100,000
• -1,000,000,000 ≤ nums[i] ≤ 1,000,000,000`,
    difficulty: "easy",
    topic: "hash-maps",
    starterCode: "def contains_duplicate(nums):\n    # Write your solution here\n    pass\n",
    functionName: "contains_duplicate",
    hints: JSON.stringify(["You only need to know whether a value appeared before; its index is not required.", "A set supports expected O(1) membership checks and insertion.", "Scan once: return true when num is already in the set; otherwise add it. Return false after the loop."]),
    tests: [
      { input: "[[1,2,3,1]]", expectedOutput: "true" },
      { input: "[[1,2,3,4]]", expectedOutput: "false" },
      { input: "[[]]", expectedOutput: "false", isHidden: true },
      { input: "[[1,1,1,3,3,4,3,2,4,2]]", expectedOutput: "true", isHidden: true },
    ],
  },
  {
    title: "Valid Anagram",
    slug: "valid-anagram",
    description: `Given two lowercase strings s and t, return true if t is an anagram of s. Otherwise, return false.

An anagram uses every character from the original string exactly once, but the characters may appear in a different order.

Example 1
Input: s = "anagram", t = "nagaram"
Output: true

Example 2
Input: s = "rat", t = "car"
Output: false
Explanation: The strings do not contain the same characters.

Constraints
• 0 ≤ s.length, t.length ≤ 50,000
• s and t contain lowercase English letters only.`,
    difficulty: "easy",
    topic: "hash-maps",
    starterCode: "def is_anagram(s, t):\n    # Write your solution here\n    pass\n",
    functionName: "is_anagram",
    hints: JSON.stringify(["Anagrams must have the same length and the same count for every character.", "Build a character-frequency map, or compare two frequency maps.", "After rejecting unequal lengths, increment counts for s and decrement them for t; every final count must be zero."]),
    tests: [
      { input: '["anagram","nagaram"]', expectedOutput: "true" },
      { input: '["rat","car"]', expectedOutput: "false" },
      { input: '["",""]', expectedOutput: "true", isHidden: true },
      { input: '["aacc","ccac"]', expectedOutput: "false", isHidden: true },
    ],
  },
  {
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    description: `You are given an array prices where prices[i] is a stock's price on day i. Choose one day to buy and a later day to sell.

Return the maximum profit you can achieve. If no profitable transaction exists, return 0. You may complete at most one transaction.

Example 1
Input: prices = [7, 1, 5, 3, 6, 4]
Output: 5
Explanation: Buy at 1 on day 1 and sell at 6 on day 4 for a profit of 5.

Example 2
Input: prices = [7, 6, 4, 3, 1]
Output: 0
Explanation: Prices only decrease, so the best choice is not to trade.

Constraints
• 1 ≤ prices.length ≤ 100,000
• 0 ≤ prices[i] ≤ 10,000`,
    difficulty: "easy",
    topic: "two-pointers",
    starterCode: "def max_profit(prices):\n    # Write your solution here\n    pass\n",
    functionName: "max_profit",
    hints: JSON.stringify(["The selling day must come after the buying day, so process prices from left to right.", "Track the minimum price seen before or on the current day and compare today against it.", "For each price, update best_profit with price - min_price, then update min_price. Initialize best profit to zero."]),
    tests: [
      { input: "[[7,1,5,3,6,4]]", expectedOutput: "5" },
      { input: "[[7,6,4,3,1]]", expectedOutput: "0" },
      { input: "[[1,2]]", expectedOutput: "1", isHidden: true },
      { input: "[[2,4,1]]", expectedOutput: "2", isHidden: true },
    ],
  },
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    description: `Given a string s containing only parentheses, square brackets, and curly braces, determine whether the string is valid.

A string is valid when every opening bracket is closed by the same bracket type and brackets are closed in the correct nested order.

Example 1
Input: s = "()[]{}"
Output: true

Example 2
Input: s = "(]"
Output: false
Explanation: An opening parenthesis cannot be closed by a square bracket.

Example 3
Input: s = "([)]"
Output: false
Explanation: The brackets are closed in the wrong order.

Constraints
• 1 ≤ s.length ≤ 10,000
• s contains only the characters ()[]{}.`,
    difficulty: "easy",
    topic: "stacks",
    starterCode: "def is_valid_parentheses(s):\n    # Write your solution here\n    pass\n",
    functionName: "is_valid_parentheses",
    hints: JSON.stringify(["The most recently opened bracket must be the first one closed.", "Use a stack for opening brackets and a map from each closing bracket to its expected opening bracket.", "For each closer, reject an empty stack or mismatched top. At the end, return true only if the stack is empty."]),
    tests: [
      { input: '["()"]', expectedOutput: "true" },
      { input: '["()[]{}"]', expectedOutput: "true" },
      { input: '["(]"]', expectedOutput: "false", isHidden: true },
      { input: '["([)]"]', expectedOutput: "false", isHidden: true },
      { input: '["{[]}"]', expectedOutput: "true", isHidden: true },
    ],
  },
  {
    title: "Binary Search",
    slug: "binary-search",
    description: `Given a sorted array of distinct integers nums and an integer target, return the index of target. Return -1 when target is not present.

Your solution must run in O(log n) time.

Example 1
Input: nums = [-1, 0, 3, 5, 9, 12], target = 9
Output: 4
Explanation: The value 9 is stored at index 4.

Example 2
Input: nums = [-1, 0, 3, 5, 9, 12], target = 2
Output: -1

Constraints
• 1 ≤ nums.length ≤ 100,000
• nums is sorted in strictly increasing order
• -1,000,000,000 ≤ nums[i], target ≤ 1,000,000,000`,
    difficulty: "easy",
    topic: "binary-search",
    starterCode: "def binary_search(nums, target):\n    # Write your solution here\n    pass\n",
    functionName: "binary_search",
    hints: JSON.stringify(["Use the sorted order to decide which half cannot contain the target.", "Maintain inclusive left and right boundaries and inspect their midpoint.", "While left <= right, return mid on a match; move left to mid + 1 when nums[mid] is too small, otherwise move right to mid - 1."]),
    tests: [
      { input: "[[-1,0,3,5,9,12],9]", expectedOutput: "4" },
      { input: "[[-1,0,3,5,9,12],2]", expectedOutput: "-1" },
      { input: "[[5],5]", expectedOutput: "0", isHidden: true },
      { input: "[[2,4,7,10,15],2]", expectedOutput: "0", isHidden: true },
    ],
  },
  {
    title: "Valid Palindrome",
    slug: "valid-palindrome",
    description: `Given a string s, return true if it is a palindrome after converting uppercase letters to lowercase and removing all non-alphanumeric characters.

A palindrome reads the same forward and backward.

Example 1
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: The normalized string is "amanaplanacanalpanama".

Example 2
Input: s = "race a car"
Output: false

Constraints
• 1 ≤ s.length ≤ 200,000
• s contains printable ASCII characters`,
    difficulty: "easy",
    topic: "two-pointers",
    starterCode: "def is_palindrome(s):\n    # Write your solution here\n    pass\n",
    functionName: "is_palindrome",
    hints: JSON.stringify(["Characters that are not letters or digits do not affect the answer.", "Place one pointer at each end and move them inward, skipping irrelevant characters.", "Compare lowercase characters at left and right. Return false on a mismatch; otherwise continue until the pointers meet."]),
    tests: [
      { input: '["A man, a plan, a canal: Panama"]', expectedOutput: "true" },
      { input: '["race a car"]', expectedOutput: "false" },
      { input: '[" "]', expectedOutput: "true", isHidden: true },
      { input: '["0P"]', expectedOutput: "false", isHidden: true },
    ],
  },
  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    description: `Given a non-empty integer array nums, find the contiguous subarray with the largest sum and return that sum.

Example 1
Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
Explanation: The subarray [4, -1, 2, 1] has the largest sum.

Example 2
Input: nums = [5, 4, -1, 7, 8]
Output: 23

Constraints
• 1 ≤ nums.length ≤ 100,000
• -10,000 ≤ nums[i] ≤ 10,000`,
    difficulty: "medium",
    topic: "arrays",
    starterCode: "def max_subarray(nums):\n    # Write your solution here\n    pass\n",
    functionName: "max_subarray",
    hints: JSON.stringify(["At each index, decide whether extending the previous subarray is better than starting fresh.", "Track both the best sum ending at the current position and the best sum found anywhere.", "Initialize both values with nums[0]. For every later num, set current = max(num, current + num), then update best."]),
    tests: [
      { input: "[[-2,1,-3,4,-1,2,1,-5,4]]", expectedOutput: "6" },
      { input: "[[5,4,-1,7,8]]", expectedOutput: "23" },
      { input: "[[-1]]", expectedOutput: "-1", isHidden: true },
      { input: "[[-2,-3,-1,-5]]", expectedOutput: "-1", isHidden: true },
    ],
  },
  {
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    description: `Given a string s, return the length of its longest substring containing no repeated characters.

A substring is a contiguous sequence of characters.

Example 1
Input: s = "abcabcbb"
Output: 3
Explanation: "abc" has length 3.

Example 2
Input: s = "bbbbb"
Output: 1

Constraints
• 0 ≤ s.length ≤ 100,000
• s consists of English letters, digits, symbols, and spaces`,
    difficulty: "medium",
    topic: "sliding-window",
    starterCode: "def longest_unique_substring(s):\n    # Write your solution here\n    pass\n",
    functionName: "longest_unique_substring",
    hints: JSON.stringify(["Maintain a window that always contains unique characters.", "When the right character already exists in the window, move the left boundary past its previous position.", "Store each character's latest index. Set left = max(left, last_seen[char] + 1), update the index, and maximize right - left + 1."]),
    tests: [
      { input: '["abcabcbb"]', expectedOutput: "3" },
      { input: '["bbbbb"]', expectedOutput: "1" },
      { input: '[""]', expectedOutput: "0", isHidden: true },
      { input: '["pwwkew"]', expectedOutput: "3", isHidden: true },
      { input: '["abba"]', expectedOutput: "2", isHidden: true },
    ],
  },
  {
    title: "Merge Sorted Arrays",
    slug: "merge-sorted-arrays",
    description: `Given two integer arrays nums1 and nums2 sorted in non-decreasing order, return one new array containing all values in sorted order.

Example 1
Input: nums1 = [1, 2, 4], nums2 = [1, 3, 4]
Output: [1, 1, 2, 3, 4, 4]

Example 2
Input: nums1 = [], nums2 = [2, 5]
Output: [2, 5]

Constraints
• 0 ≤ nums1.length, nums2.length ≤ 100,000
• Both input arrays are already sorted
• At least one input array is non-empty`,
    difficulty: "easy",
    topic: "two-pointers",
    starterCode: "def merge_sorted_arrays(nums1, nums2):\n    # Write your solution here\n    pass\n",
    functionName: "merge_sorted_arrays",
    hints: JSON.stringify(["The smallest unmerged value must be at the front of one of the two remaining array suffixes.", "Use one pointer for each input and append the smaller pointed value to a result array.", "Continue while both pointers are valid, then append the remaining suffix from whichever array is not exhausted."]),
    tests: [
      { input: "[[1,2,4],[1,3,4]]", expectedOutput: "[1,1,2,3,4,4]" },
      { input: "[[],[2,5]]", expectedOutput: "[2,5]" },
      { input: "[[1],[]]", expectedOutput: "[1]", isHidden: true },
      { input: "[[-3,0,7],[-2,0,8]]", expectedOutput: "[-3,-2,0,0,7,8]", isHidden: true },
    ],
  },
  {
    title: "Product of Array Except Self",
    slug: "product-of-array-except-self",
    description: `Given an integer array nums, return an array answer where answer[i] equals the product of every element except nums[i].

Solve the problem in O(n) time without using division.

Example 1
Input: nums = [1, 2, 3, 4]
Output: [24, 12, 8, 6]

Example 2
Input: nums = [-1, 1, 0, -3, 3]
Output: [0, 0, 9, 0, 0]

Constraints
• 2 ≤ nums.length ≤ 100,000
• -30 ≤ nums[i] ≤ 30
• Every prefix or suffix product fits in a signed 32-bit integer`,
    difficulty: "medium",
    topic: "arrays",
    starterCode: "def product_except_self(nums):\n    # Write your solution here\n    pass\n",
    functionName: "product_except_self",
    hints: JSON.stringify(["The answer at each index combines the product to its left with the product to its right.", "Fill an output array with prefix products in a left-to-right pass.", "Walk right-to-left with one suffix variable. Multiply each stored prefix by the suffix, then include the current value in the suffix."]),
    tests: [
      { input: "[[1,2,3,4]]", expectedOutput: "[24,12,8,6]" },
      { input: "[[-1,1,0,-3,3]]", expectedOutput: "[0,0,9,0,0]" },
      { input: "[[0,0]]", expectedOutput: "[0,0]", isHidden: true },
      { input: "[[2,3]]", expectedOutput: "[3,2]", isHidden: true },
    ],
  },
  {
    title: "Move Zeroes",
    slug: "move-zeroes",
    description: `Given an integer array nums, move every zero to the end while preserving the relative order of non-zero values. Return the transformed array.

Example 1
Input: nums = [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]

Example 2
Input: nums = [0]
Output: [0]

Constraints
• 1 ≤ nums.length ≤ 100,000
• -2,147,483,648 ≤ nums[i] ≤ 2,147,483,647
• Preserve the order of non-zero values`,
    difficulty: "easy",
    topic: "two-pointers",
    starterCode: "def move_zeroes(nums):\n    # Return the reordered array\n    pass\n",
    functionName: "move_zeroes",
    hints: JSON.stringify(["Separate the position being read from the position where the next non-zero value belongs.", "Let a write pointer count how many non-zero values have been placed.", "Copy non-zero values forward, then fill every remaining position from write to the end with zero."]),
    tests: [
      { input: "[[0,1,0,3,12]]", expectedOutput: "[1,3,12,0,0]" },
      { input: "[[0]]", expectedOutput: "[0]" },
      { input: "[[1,2,3]]", expectedOutput: "[1,2,3]", isHidden: true },
      { input: "[[0,0,1]]", expectedOutput: "[1,0,0]", isHidden: true },
    ],
  },
  {
    title: "Daily Temperatures",
    slug: "daily-temperatures",
    description: `Given daily temperatures, return an array answer where answer[i] is the number of days until a warmer temperature. Use 0 when no warmer future day exists.

Example 1
Input: temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
Output: [1, 1, 4, 2, 1, 1, 0, 0]

Example 2
Input: temperatures = [30, 40, 50, 60]
Output: [1, 1, 1, 0]

Constraints
• 1 ≤ temperatures.length ≤ 100,000
• 30 ≤ temperatures[i] ≤ 100`,
    difficulty: "medium",
    topic: "stacks",
    starterCode: "def daily_temperatures(temperatures):\n    # Write your solution here\n    pass\n",
    functionName: "daily_temperatures",
    hints: JSON.stringify(["Unresolved days only need to wait for the next temperature greater than theirs.", "Keep indexes in a stack whose temperatures are monotonically decreasing.", "For each temperature, pop while it is warmer than the stack top and set answer[old_index] = current_index - old_index, then push the current index."]),
    tests: [
      { input: "[[73,74,75,71,69,72,76,73]]", expectedOutput: "[1,1,4,2,1,1,0,0]" },
      { input: "[[30,40,50,60]]", expectedOutput: "[1,1,1,0]" },
      { input: "[[60,50,40]]", expectedOutput: "[0,0,0]", isHidden: true },
      { input: "[[70]]", expectedOutput: "[0]", isHidden: true },
    ],
  },
  {
    title: "Minimum Size Subarray Sum",
    slug: "minimum-size-subarray-sum",
    description: `Given an array of positive integers nums and a positive integer target, return the minimum length of a contiguous subarray whose sum is at least target. Return 0 if none exists.

Example 1
Input: target = 7, nums = [2, 3, 1, 2, 4, 3]
Output: 2
Explanation: [4, 3] is the shortest qualifying subarray.

Example 2
Input: target = 11, nums = [1, 1, 1, 1, 1]
Output: 0

Constraints
• 1 ≤ target ≤ 1,000,000,000
• 1 ≤ nums.length ≤ 100,000
• Every nums[i] is positive`,
    difficulty: "medium",
    topic: "sliding-window",
    starterCode: "def min_subarray_len(target, nums):\n    # Write your solution here\n    pass\n",
    functionName: "min_subarray_len",
    hints: JSON.stringify(["Because every value is positive, expanding right never decreases the sum and shrinking left never increases it.", "Expand until the sum qualifies, then shrink repeatedly while it still qualifies.", "Track left, window_sum, and best. After adding nums[right], use a while loop to update best and subtract nums[left]. Return 0 if best was never updated."]),
    tests: [
      { input: "[7,[2,3,1,2,4,3]]", expectedOutput: "2" },
      { input: "[11,[1,1,1,1,1]]", expectedOutput: "0" },
      { input: "[4,[1,4,4]]", expectedOutput: "1", isHidden: true },
      { input: "[15,[1,2,3,4,5]]", expectedOutput: "5", isHidden: true },
    ],
  },
  {
    title: "Evaluate Reverse Polish Notation",
    slug: "evaluate-reverse-polish-notation",
    description: `Evaluate an arithmetic expression written in Reverse Polish Notation and return its integer result.

Each operator follows its two operands. Division must truncate toward zero.

Example 1
Input: tokens = ["2", "1", "+", "3", "*"]
Output: 9
Explanation: (2 + 1) × 3 = 9.

Example 2
Input: tokens = ["4", "13", "5", "/", "+"]
Output: 6

Constraints
• 1 ≤ tokens.length ≤ 10,000
• Operators are +, -, *, and /
• Every expression is valid`,
    difficulty: "medium",
    topic: "stacks",
    starterCode: "def eval_rpn(tokens):\n    # Write your solution here\n    pass\n",
    functionName: "eval_rpn",
    hints: JSON.stringify(["Numbers wait until a later operator consumes them, which matches last-in-first-out order.", "Push numbers. For an operator, pop the right operand first and then the left operand.", "Compute left operator right and push the result. For division use int(left / right) to truncate toward zero in Python."]),
    tests: [
      { input: '[["2","1","+","3","*"]]', expectedOutput: "9" },
      { input: '[["4","13","5","/","+"]]', expectedOutput: "6" },
      { input: '[["7","-3","/"]]', expectedOutput: "-2", isHidden: true },
      { input: '[["3","4","+"]]', expectedOutput: "7", isHidden: true },
    ],
  },
  {
    title: "Search in Rotated Sorted Array",
    slug: "search-in-rotated-sorted-array",
    description: `A sorted array of distinct integers has been rotated at an unknown pivot. Given the rotated array nums and target, return the target's index or -1 when it is absent.

Your solution must run in O(log n) time.

Example 1
Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 0
Output: 4

Example 2
Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 3
Output: -1

Constraints
• 1 ≤ nums.length ≤ 100,000
• nums contains distinct values
• nums was sorted before one possible rotation`,
    difficulty: "medium",
    topic: "binary-search",
    starterCode: "def search_rotated(nums, target):\n    # Write your solution here\n    pass\n",
    functionName: "search_rotated",
    hints: JSON.stringify(["At every midpoint, at least one half of the current interval is normally sorted.", "Compare nums[left] with nums[mid] to identify the sorted half, then test whether target lies inside its value range.", "If the left half is sorted and nums[left] <= target < nums[mid], move right; otherwise move left. Mirror the logic when the right half is sorted."]),
    tests: [
      { input: "[[4,5,6,7,0,1,2],0]", expectedOutput: "4" },
      { input: "[[4,5,6,7,0,1,2],3]", expectedOutput: "-1" },
      { input: "[[1],1]", expectedOutput: "0", isHidden: true },
      { input: "[[3,1],1]", expectedOutput: "1", isHidden: true },
    ],
  },
  {
    title: "Kth Largest Element",
    slug: "kth-largest-element",
    description: `Given an unsorted integer array nums and integer k, return the kth largest element by sorted order. Duplicate values count as separate positions.

Example 1
Input: nums = [3, 2, 1, 5, 6, 4], k = 2
Output: 5

Example 2
Input: nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4
Output: 4

Constraints
• 1 ≤ k ≤ nums.length ≤ 100,000
• -10,000 ≤ nums[i] ≤ 10,000`,
    difficulty: "medium",
    topic: "heaps",
    starterCode: "def find_kth_largest(nums, k):\n    # Write your solution here\n    pass\n",
    functionName: "find_kth_largest",
    hints: JSON.stringify(["You do not need the complete sorted order; only the k largest candidates matter.", "Maintain a min-heap whose size never exceeds k.", "Push each number and pop the smallest whenever the heap grows beyond k. The heap root is the kth largest after the scan."]),
    tests: [
      { input: "[[3,2,1,5,6,4],2]", expectedOutput: "5" },
      { input: "[[3,2,3,1,2,4,5,5,6],4]", expectedOutput: "4" },
      { input: "[[-1],1]", expectedOutput: "-1", isHidden: true },
      { input: "[[2,1],2]", expectedOutput: "1", isHidden: true },
    ],
  },
  {
    title: "Number of Islands",
    slug: "number-of-islands",
    description: `Given a rectangular grid of "1" land cells and "0" water cells, return the number of islands.

Land connects horizontally and vertically, but not diagonally. An island is surrounded by water or grid boundaries.

Example 1
Input: grid = [["1","1","0"],["1","0","0"],["0","0","1"]]
Output: 2

Example 2
Input: grid = [["0","0"],["0","0"]]
Output: 0

Constraints
• 1 ≤ rows, columns ≤ 300
• Every cell is "0" or "1"`,
    difficulty: "medium",
    topic: "graphs",
    starterCode: "def num_islands(grid):\n    # Write your solution here\n    pass\n",
    functionName: "num_islands",
    hints: JSON.stringify(["Treat every land cell as a graph node connected to its four land neighbors.", "When you find unvisited land, count one island and traverse the entire connected component.", "Use DFS or BFS with a visited set, or mark visited land as water. Check row and column bounds before exploring each neighbor."]),
    tests: [
      { input: '[[["1","1","0"],["1","0","0"],["0","0","1"]]]', expectedOutput: "2" },
      { input: '[[["0","0"],["0","0"]]]', expectedOutput: "0" },
      { input: '[[["1"]]]', expectedOutput: "1", isHidden: true },
      { input: '[[["1","0","1","0","1"]]]', expectedOutput: "3", isHidden: true },
    ],
  },
  {
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    description: `You are climbing n stairs. Each move climbs either one or two steps. Return the number of distinct ways to reach the top.

Example 1
Input: n = 2
Output: 2
Explanation: The sequences are 1+1 and 2.

Example 2
Input: n = 5
Output: 8

Constraints
• 1 ≤ n ≤ 45`,
    difficulty: "easy",
    topic: "dynamic-programming",
    starterCode: "def climb_stairs(n):\n    # Write your solution here\n    pass\n",
    functionName: "climb_stairs",
    hints: JSON.stringify(["Every route to step n must arrive from either step n - 1 or step n - 2.", "This gives the recurrence ways[n] = ways[n - 1] + ways[n - 2].", "Start with one way to stand at step 0 and one way to reach step 1. Iteratively update two previous values through n."]),
    tests: [
      { input: "[2]", expectedOutput: "2" },
      { input: "[5]", expectedOutput: "8" },
      { input: "[1]", expectedOutput: "1", isHidden: true },
      { input: "[10]", expectedOutput: "89", isHidden: true },
    ],
  },
];

const lessonCatalog = [
  {
    module: "Foundations",
    title: "Understanding Big-O",
    slug: "understanding-big-o",
    summary: "Learn how runtime and memory grow as an input becomes larger.",
    practiceProblemSlug: null,
    content: `Why Big-O matters

Big-O notation describes how an algorithm's resource usage grows as its input size n grows. It focuses on the dominant growth term rather than exact machine time.

Common growth rates

O(1) stays constant. O(log n) grows slowly by repeatedly shrinking the search space. O(n) visits the input once. O(n log n) is common in efficient sorting. O(n²) often comes from comparing every pair.

Example

Looking up an array item by index is O(1). Scanning an array for a value is O(n). A nested loop that checks every pair is O(n²).

Space complexity

Apply the same reasoning to additional memory. A hash set containing every input value uses O(n) extra space, even if the algorithm only makes one pass.

Dropping constants and smaller terms

If an algorithm performs 3n + 10 operations, we describe it as O(n). As n becomes large, the linear term determines the shape of the growth. Similarly, O(n² + n) becomes O(n²). This does not mean constants never matter in real software; it means Big-O answers a different question about scalability.

Best, average, and worst cases

An algorithm can behave differently across inputs. Linear search is O(1) in the best case when the first item matches, but O(n) in the worst case when the value is last or missing. Unless a problem says otherwise, interview analysis usually emphasizes the worst case.

How to analyze code

First identify which operations depend on n. Sequential loops add their costs, while nested loops multiply them. Then analyze auxiliary space separately, excluding the input and usually excluding the returned output.

Knowledge check

What are the time and auxiliary-space complexities of building a set from n array values? The expected answer is O(n) time and O(n) extra space.`,
  },
  {
    module: "Arrays and Hashing",
    title: "Arrays and Indexes",
    slug: "arrays-and-indexes",
    summary: "Use array indexes to traverse, compare, and transform ordered data.",
    practiceProblemSlug: "best-time-to-buy-and-sell-stock",
    content: `Arrays as ordered storage

An array stores values in order and provides constant-time access by index. That makes it natural for problems involving positions, neighbors, ranges, and sequential scans.

Traversal pattern

Use enumerate when you need both a value and its index. Track only the state needed for the remaining suffix, such as the smallest price seen so far.

Important edge cases

Always consider empty arrays, one-element arrays, duplicate values, negative values, and answers that use the first or last element.

Practice connection

Best Time to Buy and Sell Stock uses one left-to-right pass. At each price, compare against the minimum earlier price and update the best profit.

Reading and writing by index

Accessing nums[i] and replacing nums[i] are O(1). Inserting or removing near the beginning is O(n) because later elements must shift. Appending is typically O(1) amortized, meaning occasional resizing is spread across many cheap appends.

State invariants

An invariant is a fact that remains true after every iteration. In the stock problem, min_price is always the smallest price in the portion already visited, and best_profit is always the best valid profit found so far. Naming these facts makes a one-pass solution easier to design and verify.

Walkthrough

For prices [7, 1, 5, 3, 6, 4], start with a minimum of 7. Reading 1 updates the minimum. Reading 5 creates profit 4; reading 6 later improves it to 5. The minimum must be updated from earlier days only, which guarantees buying occurs before selling.

Knowledge check

Why is sorting usually invalid for a problem involving original positions or time order? Sorting rearranges the input and can destroy the relationship the problem requires you to preserve.`,
  },
  {
    module: "Arrays and Hashing",
    title: "Hash Maps and Sets",
    slug: "hash-maps-and-sets",
    summary: "Trade extra memory for fast membership checks and frequency counting.",
    practiceProblemSlug: "contains-duplicate",
    content: `Fast lookup

Hash maps associate keys with values, while sets store unique keys. Average insertion and lookup are O(1), making them useful when a nested search would otherwise be required.

Membership pattern

For each value, check whether it has been seen before. If it has, you found a duplicate; otherwise add it to the set. This reduces an O(n²) pairwise comparison to O(n) time with O(n) space.

Frequency pattern

A map can count how often each character appears. Two strings are anagrams when their frequency maps match.

Choosing between them

Use a set when only presence matters. Use a map when you also need an index, count, or other information associated with each key.

Python operations

Use value in seen for membership, seen.add(value) for set insertion, and counts[key] = counts.get(key, 0) + 1 for frequency counting. These operations are O(1) on average but can degrade in pathological collision cases.

Walkthrough

For [1, 2, 3, 1], begin with an empty set. Add 1, 2, and 3 as they appear. When the final 1 is processed, membership succeeds immediately, so the algorithm returns true without scanning the remaining input.

Common mistakes

Do not confuse a key with its stored value. Be careful when zero is a valid stored value: checking if mapping.get(key) can incorrectly treat zero as missing. Prefer key in mapping when presence itself is the question.

Knowledge check

If you must return the first index where each value appeared, should you use a set or a map? Use a map because each value must be associated with additional information: its index.`,
  },
  {
    module: "Problem-Solving Patterns",
    title: "Complement Lookup",
    slug: "complement-lookup",
    summary: "Turn a two-value search into a single pass by storing what you have seen.",
    practiceProblemSlug: "two-sum",
    content: `From pairs to complements

A direct Two Sum solution checks every pair and takes O(n²) time. Instead, rewrite the relationship a + b = target as b = target - a.

Single-pass strategy

As you scan each number, calculate its required complement. If that complement is already in a map, return the stored index and the current index. Otherwise store the current number and index.

Why lookup comes first

Checking before inserting prevents using the same array element twice. It still handles duplicate values because the earlier duplicate is already stored when the later one is processed.

Complexity

The algorithm uses O(n) expected time and O(n) additional space.

Detailed walkthrough

For nums = [2, 7, 11, 15] and target = 9, the first value needs complement 7, which is not stored, so save 2 → 0. The second value needs complement 2, which is stored at index 0, so return [0, 1].

Duplicates

For nums = [3, 3] and target = 6, the first 3 is stored. The second 3 finds the first one as its complement. This works because lookup happens before insertion and because the map stores an earlier index.

Common mistakes

Storing the current number before checking can allow an element to match itself. Returning values instead of indices answers a different question. A second full pass can work, but it makes handling the same-index restriction less direct.

Generalizing the pattern

Complement lookup appears whenever two values must satisfy a relationship. The stored key might represent a needed difference, prefix sum, frequency, or previously observed state rather than a literal arithmetic complement.

Knowledge check

At index i with value x, what key should you search for? Search for target - x, and only store x after that lookup fails.`,
  },
  {
    module: "Stacks",
    title: "Stacks and Nested Structure",
    slug: "stacks-and-nested-structure",
    summary: "Use last-in-first-out state to validate properly nested input.",
    practiceProblemSlug: "valid-parentheses",
    content: `Last in, first out

A stack removes the most recently added item first. This matches nested structures: the latest opening bracket must be the first one closed.

Validation pattern

Push opening brackets onto the stack. For a closing bracket, verify that the stack is not empty and its top contains the matching opening bracket, then pop it.

Finishing condition

Every closing bracket matching is not enough. The stack must also be empty at the end, otherwise one or more opening brackets were never closed.

Complexity

Each character is pushed or popped at most once, so validation takes O(n) time and O(n) space in the worst case.

Detailed walkthrough

For {[]}, push {, then [, and pop [ when ] appears. The final } matches and pops {. The stack is empty, so the input is valid. For ([)], the closing ) does not match the [ on top, so the input fails immediately.

Mapping closing to opening

A small map such as ) → (, ] → [, and } → { keeps matching logic compact. When a closing character appears, compare mapping[character] with the stack's top item.

Common mistakes

Calling pop on an empty stack causes an error, so check emptiness first. Checking only bracket counts is insufficient because equal counts do not guarantee correct order. Remember to reject a nonempty stack after the scan.

Broader uses

The same structure supports expression parsing, browser history, undo operations, depth-first search, and monotonic-stack problems. Look for situations where the most recently opened or discovered item must be handled first.

Knowledge check

Why is ([)] invalid even though every bracket type has matching counts? The closing parenthesis arrives while the most recent unmatched opening bracket is [, so the nesting order is broken.`,
  },
  {
    module: "Problem-Solving Patterns",
    title: "Two Pointers and Sliding Windows",
    slug: "two-pointers-and-sliding-windows",
    summary: "Replace repeated range work with indexes that move according to a clear invariant.",
    practiceProblemSlug: "best-time-to-buy-and-sell-stock",
    content: `Two moving indexes

The two-pointer pattern tracks two meaningful positions instead of exploring every pair. Pointers may move toward each other, travel in the same direction, or mark the boundaries of a range.

Opposite-direction pointers

On sorted data, compare the values at the left and right edges. If their sum is too small, move left forward; if too large, move right backward. Sorted order proves which possibilities can be discarded.

Sliding windows

A sliding window represents a contiguous range. Expand the right boundary to include new data and move the left boundary only when the current range violates a requirement. Maintain a running sum, count map, or other compact state instead of recomputing the whole range.

Choosing the pattern

Use two pointers when positions have a relationship and movement can safely eliminate candidates. Use a sliding window when the answer concerns a contiguous subarray or substring and the window can be updated incrementally.

Common mistakes

Write down what each pointer means and why moving it cannot skip a valid answer. Window code often fails when shrinking happens too early, too late, or only once when a while loop is required.

Knowledge check

What makes a sliding window faster than checking every contiguous range? It reuses state from the previous range, so each boundary usually moves across the input at most once.`,
  },
  {
    module: "Search",
    title: "Binary Search",
    slug: "binary-search-foundations",
    summary: "Use a monotonic condition to discard half of the remaining search space.",
    practiceProblemSlug: "binary-search",
    content: `Halving the search space

Binary search works when the search space has an ordered or monotonic structure. Inspect the midpoint, decide which half cannot contain the answer, and continue with the other half.

Boundary invariant

For an inclusive search, left and right bound the portion that may still contain the target. Continue while left <= right. If the midpoint is too small, set left to mid + 1; if too large, set right to mid - 1.

Beyond sorted arrays

Binary search can find the first position satisfying a condition, the minimum feasible capacity, or the maximum valid threshold. The key is a predicate that changes from false to true, or true to false, only once.

Common mistakes

Mixing inclusive and exclusive boundary conventions causes infinite loops and off-by-one errors. Choose one convention, define the invariant, and ensure every update makes the interval smaller.

Complexity

Each comparison halves the remaining candidates, so a space of n elements requires O(log n) comparisons and O(1) iterative auxiliary space.

Knowledge check

Why can binary search not generally be applied to an unsorted array? A midpoint comparison does not reveal which half can be discarded without an ordering or monotonic property.`,
  },
  {
    module: "Problem-Solving Patterns",
    title: "Two-Pointer Comparisons",
    slug: "two-pointer-comparisons",
    summary: "Move inward from both ends when each comparison can eliminate positions safely.",
    practiceProblemSlug: "valid-palindrome",
    content: `Why two pointers work

Two pointers are useful when a relationship between positions lets one comparison rule out future work. Instead of creating a cleaned copy or checking every pair, keep a left pointer and a right pointer and move them according to an invariant.

Palindrome invariant

Before every comparison, all relevant characters outside the current pointers have already matched. Skip punctuation and spaces, compare the lowercase characters at the pointers, and move both inward after a match.

Merging sorted data

With two sorted arrays, the smallest remaining value must be at one of the two current pointers. Append the smaller value and advance only that pointer. Once one input is exhausted, copy the other suffix.

Complexity

Each pointer moves in one direction and visits a position at most once. Both palindrome validation and merging therefore take O(n) total time. Palindrome validation can use O(1) extra space; producing a merged output requires space for that output.

Common mistakes

Do not move a pointer without proving why its current position can be discarded. For palindrome input, normalize case only for the characters being compared. For merging, remember to append leftovers after the main loop.

Worked example

For "A man, a plan", the left pointer begins at A and the right pointer at n. Punctuation and spaces are skipped as the pointers move. The first meaningful mismatch proves the string is not a palindrome without building every possible comparison.

Knowledge check

Why is merging two sorted arrays linear rather than quadratic? Every iteration advances at least one pointer, and neither pointer ever moves backward.`,
  },
  {
    module: "Problem-Solving Patterns",
    title: "Sliding Windows with Last-Seen Indexes",
    slug: "sliding-windows-last-seen",
    summary: "Maintain a valid substring and jump its left boundary past repeated characters.",
    practiceProblemSlug: "longest-substring-without-repeating-characters",
    content: `A window with a promise

The window between left and right should always contain unique characters. Expand right one character at a time. When a repeated character would break the promise, move left just far enough to restore it.

Last-seen map

Store the most recent index for each character. If the current character was seen inside the active window, its old occurrence cannot remain, so move left to one position after that index.

Never move left backward

Use left = max(left, last_seen[character] + 1). The maximum matters because a character may have appeared before the current window. Moving left backward would reintroduce invalid positions.

Measuring the answer

After restoring validity, the inclusive window length is right - left + 1. Update the best length at every right boundary.

Walkthrough

For "abba", the second b moves left past the first b. When the final a arrives, its earlier index is already outside the window, so left must stay where it is. The longest valid length is 2.

Complexity

The right boundary visits every character once and left only moves forward, giving O(n) time. The last-seen map uses O(k) space for k distinct characters.

Knowledge check

Why must the left boundary use max with its current value? A repeat outside the active window should not make the window expand backward.`,
  },
  {
    module: "Arrays and Hashing",
    title: "Running Best with Kadane's Algorithm",
    slug: "running-best-kadanes-algorithm",
    summary: "Compress a subarray search into the best sum ending here and the best sum overall.",
    practiceProblemSlug: "maximum-subarray",
    content: `From many ranges to one decision

There are O(n²) contiguous subarrays, so calculating each sum separately is too expensive for large input. Kadane's algorithm asks one local question at every value: should the best subarray ending here extend the previous one or start fresh?

Two pieces of state

current is the maximum sum of a subarray that must end at the current index. best is the maximum sum found at any index so far. Update current with max(num, current + num), then update best.

Why negative prefixes disappear

If the previous running sum is negative, attaching it makes the current value smaller. Starting a new subarray at the current value is therefore always at least as good.

Initialization matters

Initialize current and best to the first array value, not zero. Starting at zero incorrectly returns zero for an input where every number is negative, even though the problem requires a non-empty subarray.

Walkthrough

For [-2, 1, -3, 4, -1, 2, 1], the running sum restarts at 1 and later at 4. Extending 4 with -1, 2, and 1 produces the best sum 6.

Complexity

The array is scanned once, so time is O(n), and only two numeric variables are required, so auxiliary space is O(1).

Knowledge check

Why should best start at nums[0] instead of zero? The valid answer must include at least one element and may be negative.`,
  },
  {
    module: "Arrays and Hashing",
    title: "Prefix and Suffix Products",
    slug: "prefix-and-suffix-products",
    summary: "Combine information from both sides of every index without repeated scans.",
    practiceProblemSlug: "product-of-array-except-self",
    content: `Decomposing the answer

The product except index i equals the product of values before i multiplied by the product of values after i. Computing both sides from scratch at every index takes O(n²) time.

Prefix pass

Walk left to right with prefix initialized to 1. Store prefix as the answer for the current index, then multiply prefix by the current value. Each output cell now contains the product strictly to its left.

Suffix pass

Walk right to left with suffix initialized to 1. Multiply the stored prefix by suffix, then include the current value in suffix. The result now contains both sides while never dividing.

Zeros and signs

The method naturally handles zero and negative values. Division-based shortcuts require special zero cases and are prohibited by this problem.

Complexity

Two linear passes give O(n) time. Excluding the returned array, only prefix and suffix variables use extra space, so auxiliary space is O(1).

Knowledge check

Why must prefix be stored before multiplying by nums[i]? The current element must be excluded from its own answer.`,
  },
  {
    module: "Problem-Solving Patterns",
    title: "Read and Write Pointers",
    slug: "read-and-write-pointers",
    summary: "Compact or reorder an array while preserving the order of selected values.",
    practiceProblemSlug: "move-zeroes",
    content: `Two different responsibilities

A read pointer examines every input value. A write pointer marks where the next kept value belongs. Separating these roles makes stable filtering and compaction possible in one pass.

Moving zeroes

Whenever read finds a non-zero value, write it at the write position and advance write. After the scan, every position from write to the end becomes zero.

Stable order

Because read moves only forward and values are written in discovery order, non-zero values retain their original relative order.

Alternative swapping

Swapping nums[write] with nums[read] also works and writes zeroes along the way. The overwrite-then-fill approach can be easier to reason about because its phases have separate invariants.

Complexity

Both pointers cross the array once, giving O(n) time and O(1) auxiliary space.

Knowledge check

What does write represent after processing a prefix? It is the index where the next non-zero value should be placed.`,
  },
  {
    module: "Stacks",
    title: "Monotonic Stacks",
    slug: "monotonic-stacks",
    summary: "Keep unresolved candidates in useful order to find the next greater value.",
    practiceProblemSlug: "daily-temperatures",
    content: `Unresolved candidates

Daily Temperatures asks when each day first encounters a warmer future day. A decreasing stack stores indexes whose answers are still unknown.

Resolving with new information

When a new temperature is warmer than the temperature at the top index, the current day is that older day's first warmer day. Pop the index and record their distance. Continue while the new temperature resolves more days.

Why indexes matter

Store indexes rather than temperatures because the answer is a distance. Temperatures remain available through the input array.

Amortized analysis

Although a while loop is nested inside the scan, every index is pushed once and popped at most once. Total work is O(n), not O(n²), with O(n) worst-case stack space.

Knowledge check

Why can a colder current day not resolve anything on the stack? It is not warmer than the most recent unresolved temperature.`,
  },
  {
    module: "Problem-Solving Patterns",
    title: "Variable-Size Sliding Windows",
    slug: "variable-size-sliding-windows",
    summary: "Expand to satisfy a condition, then shrink to find the smallest valid range.",
    practiceProblemSlug: "minimum-size-subarray-sum",
    content: `Expand, then shrink

For positive numbers, adding a right-side value can only increase the window sum. Once the sum reaches the target, move left forward as long as the window remains valid, recording each smaller length.

Why positivity matters

Monotonic sum behavior makes pointer decisions safe. With negative numbers, removing a left value might increase the sum and adding a right value might decrease it, so this exact window strategy would not be valid.

The inner while loop

Shrinking only once can miss a shorter valid window. Use while window_sum >= target, update the best length, subtract nums[left], and advance left.

No-answer state

Initialize best to infinity or n + 1. Return zero if it never changes.

Complexity

Each boundary advances at most n times, so total work is O(n) even with the nested while loop. Auxiliary space is O(1).

Knowledge check

Why does the algorithm shrink repeatedly after reaching the target? Every shrink may reveal a shorter window that still satisfies the condition.`,
  },
  {
    module: "Stacks",
    title: "Expression Evaluation with Stacks",
    slug: "expression-evaluation-stacks",
    summary: "Evaluate postfix expressions by storing operands until an operator arrives.",
    practiceProblemSlug: "evaluate-reverse-polish-notation",
    content: `Postfix notation

Reverse Polish Notation places each operator after its operands, removing the need for parentheses or precedence rules. Reading left to right, push numbers until an operator appears.

Operand order

For an operator, pop the right operand first and the left operand second. This distinction matters for subtraction and division: left - right is not the same as right - left.

Push intermediate results

Apply the operator and push its result. That result can become an operand for a later operation. A valid expression finishes with exactly one value on the stack.

Division in Python

The problem requires truncation toward zero. int(left / right) follows that rule, whereas // rounds negative results down.

Complexity

Every token is processed once for O(n) time. The stack can hold O(n) operands.

Knowledge check

For tokens ["7", "3", "-"], which number is the left operand? Seven: the first pop is 3, the right operand, and the second pop is 7.`,
  },
  {
    module: "Search",
    title: "Binary Search on Rotated Data",
    slug: "binary-search-rotated-data",
    summary: "Use the sorted half of a rotated interval to preserve logarithmic search.",
    practiceProblemSlug: "search-in-rotated-sorted-array",
    content: `What rotation changes

A rotation breaks the array at one pivot, but it does not destroy all order. At any midpoint, at least one side of an interval with distinct values is sorted normally.

Identify the sorted side

If nums[left] <= nums[mid], the left half is sorted. Otherwise the right half is sorted. This observation replaces the ordinary binary-search comparison that assumes the entire interval is sorted.

Choose with a range test

After finding the sorted half, determine whether target lies inside its inclusive-to-exclusive value range. Search that half when it does; otherwise discard it and search the other half.

Boundary discipline

Use one consistent inclusive interval and ensure every update removes the midpoint. Test one-element arrays, an unrotated array, and a pivot near either edge.

Complexity

Every decision discards half of the remaining positions, giving O(log n) time and O(1) iterative space.

Knowledge check

What fact replaces the assumption that the whole interval is sorted? At least one half around the midpoint is sorted.`,
  },
  {
    module: "Heaps",
    title: "Heaps and Top-K Selection",
    slug: "heaps-and-top-k-selection",
    summary: "Keep only the strongest k candidates with a size-limited min-heap.",
    practiceProblemSlug: "kth-largest-element",
    content: `Priority at the root

A min-heap exposes its smallest value in O(1) time and inserts or removes in O(log k) time. Python's heapq module implements a min-heap.

Keeping the k largest

Push each input value. Whenever the heap grows beyond k, pop its smallest value. The heap then contains the k largest values seen so far, and its root is the weakest of those candidates.

Why the root is the answer

After all values are processed, exactly k values remain and every discarded value is no larger than the heap candidates. The smallest remaining candidate is therefore the kth largest overall.

Duplicates

Do not use a set: duplicate values occupy separate sorted positions and must remain separate heap entries.

Complexity

Processing n values with a heap of at most k elements takes O(n log k) time and O(k) space.

Knowledge check

Why use a min-heap for the kth largest problem? Its root is the candidate that should be removed when a stronger value arrives.`,
  },
  {
    module: "Graphs",
    title: "Grid Traversal and Connected Components",
    slug: "grid-traversal-connected-components",
    summary: "Model neighboring grid cells as a graph and count complete connected regions.",
    practiceProblemSlug: "number-of-islands",
    content: `A grid is a graph

Each land cell is a node. Horizontal and vertical land neighbors create edges. An island is one connected component in this implicit graph.

Count from unvisited starts

Scan every cell. When unvisited land appears, increment the island count and run DFS or BFS to mark all land reachable from it. Those cells must not start another island later.

Neighbor safety

For each cell, generate four directions and check row bounds, column bounds, land status, and visited status before adding a neighbor.

Visited choices

A set preserves the input but uses extra memory. Marking visited land as water avoids the set but mutates the grid. Both approaches are valid when their tradeoff is explicit.

Complexity

Every cell is inspected a constant number of times, so time is O(rows × columns) and traversal storage is O(rows × columns) in the worst case.

Knowledge check

Why is one traversal launched per island rather than per land cell? The first traversal marks the entire connected component as visited.`,
  },
  {
    module: "Dynamic Programming",
    title: "One-Dimensional Dynamic Programming",
    slug: "one-dimensional-dynamic-programming",
    summary: "Build larger answers from previously solved smaller states.",
    practiceProblemSlug: "climbing-stairs",
    content: `Overlapping subproblems

A direct recursive stair solution recomputes the same remaining stair counts many times. Dynamic programming stores or iteratively builds those repeated answers.

Define the state

Let ways[i] be the number of routes to step i. The final move came from i - 1 with a one-step move or i - 2 with a two-step move, so ways[i] = ways[i - 1] + ways[i - 2].

Base cases

There is one way to stand at step zero and one way to reach step one. Clear base cases anchor the recurrence and prevent special-case errors later.

Space optimization

Each state uses only the two previous values, so a full array is unnecessary. Rotate two variables as i advances.

Complexity

The iterative solution takes O(n) time and O(1) auxiliary space.

Knowledge check

What must a dynamic-programming state definition explain? Exactly what the stored value represents and how smaller states produce it.`,
  },
] as const;

const reactLessonCatalog = [
  {
    module: "Components",
    title: "Components and Props",
    slug: "react-components-and-props",
    summary: "Build reusable UI functions and pass data through explicit props.",
    content: `Components as UI functions

A React component is a JavaScript function that returns a description of user interface. Components let you divide a page into small pieces with clear responsibilities.

Props are inputs

Props carry data from a parent component to a child. Treat props as read-only values. A child can display them or use them to make decisions, but should not mutate them.

Composition

Build larger interfaces by nesting smaller components. A ProfileCard might compose Avatar, UserDetails, and ActionButton rather than implementing every detail in one function.

Rendering lists

Use array.map to turn data into elements. Each sibling needs a stable key derived from the item's identity, such as a database ID. Avoid array indexes when items can be reordered, inserted, or removed.

Common mistakes

Component names must begin with a capital letter. Callbacks should usually be passed as functions rather than called during rendering. Keep data flow explicit instead of copying props into state without a reason.

Knowledge check

When should a value be a prop? Use a prop when a parent owns the value and a child needs it to render or handle an interaction.`,
  },
  {
    module: "State",
    title: "State and Events",
    slug: "react-state-and-events",
    summary: "Model changing UI data with state and update it from user events.",
    content: `State is component memory

State stores information that changes over time and affects rendering. Calling a state setter requests a new render with the updated value.

Choosing state

Store the smallest source of truth. Values that can be calculated from props or other state should usually be derived during rendering rather than stored separately.

Event handlers

Pass a function to handlers such as onClick. The handler can read current props and state, then request updates. Writing onClick={handleClick} passes the function; onClick={handleClick()} calls it immediately.

Updates based on previous state

When the next value depends on the previous value, use the updater form: setCount(previous => previous + 1). This remains correct when React batches multiple updates.

Immutability

Do not mutate objects or arrays stored in state. Create a new array with map, filter, or spread, then pass it to the setter so React can recognize the change.

Knowledge check

Why can two setCount(count + 1) calls produce only one increment? Both calls may read the same render's count value. Functional updaters receive the latest queued value.`,
  },
  {
    module: "Effects",
    title: "Effects and Synchronization",
    slug: "react-effects-and-synchronization",
    summary: "Synchronize components with systems outside React without creating render loops.",
    content: `What effects are for

An effect synchronizes a component with something outside React, such as a network connection, browser API, timer, or third-party widget. Effects run after React commits a render.

You might not need an effect

Do not use an effect merely to calculate render data or respond to a click. Derive values during rendering and put interaction logic in event handlers. This keeps data flow easier to understand.

Dependencies

The dependency array lists reactive values used by the effect. React reruns the effect when one changes. Omitting a required dependency can create stale behavior; updating a dependency inside the effect without care can create a loop.

Cleanup

Return a cleanup function when synchronization must be undone. Clear timers, remove event listeners, abort obsolete requests, and disconnect subscriptions before the effect reruns or the component unmounts.

Race conditions

Async responses may arrive out of order. Cleanup can ignore or abort work from an older render so stale data does not overwrite a newer result.

Knowledge check

Where should code that submits a form belong? Put it in the submit event handler because it is caused by a specific user interaction, not by the component merely being visible.`,
  },
  {
    module: "Rendering",
    title: "Conditional Rendering and Lists",
    slug: "react-conditional-rendering-and-lists",
    summary: "Render UI from data while preserving stable component identity.",
    content: `UI as a function of data

React components use ordinary JavaScript conditions to decide what to return. Use if statements for major branches and ternaries or logical AND for small inline choices.

Rendering collections

Use map to transform each data item into an element. Keep filtering and sorting separate when that makes the data transformation easier to read.

Stable keys

Keys tell React which logical item each rendered component represents. Stable database IDs allow React to preserve input values, focus, and local state when items move.

Empty and loading states

Design collection views for more than the successful case. Decide what appears while data loads, when loading fails, and when the resulting collection is empty.

Common mistakes

Do not generate keys during rendering. Avoid nested ternaries that obscure the possible UI states. Remember that zero is rendered by React, so count && <Message /> may display 0 when count is zero.

Knowledge check

Why can an array index be a dangerous key? After reordering or deletion, the same index can refer to a different logical item, causing React to preserve state on the wrong row.`,
  },
  {
    module: "Reuse",
    title: "Custom Hooks",
    slug: "react-custom-hooks",
    summary: "Extract reusable stateful behavior without sharing component instances.",
    content: `Sharing behavior

A custom hook is a function whose name begins with use and that calls other hooks. It extracts stateful logic so multiple components can use the same behavior with independent state.

What hooks return

A hook can return values, setter functions, event handlers, or a small object describing its state. Design the return value around what callers need rather than exposing every internal detail.

Rules of Hooks

Call hooks at the top level of React components or other hooks. Do not call them conditionally, inside loops, or inside ordinary event handlers. Consistent call order lets React associate state with the correct hook call.

Example design

A useOnlineStatus hook can subscribe to browser online and offline events, clean up those listeners, and return one boolean. Components consume that boolean without duplicating synchronization code.

Common mistakes

Custom hooks share logic, not a single state value. Two components calling the same hook receive separate state unless the hook connects to an intentionally shared external store or context.

Knowledge check

When should logic become a custom hook? Extract it when stateful behavior is repeated or when naming the behavior makes a complex component easier to understand.`,
  },
] as const;

const reactChallengeCatalog = [
  {
    lessonSlug: "react-components-and-props",
    title: "Build a Profile Card",
    slug: "build-a-profile-card",
    description: "Complete a reusable ProfileCard component that displays different people from props.",
    difficulty: "easy" as const,
    requirements: ["Accept name and role props", "Render the person's name and role", "Render Maya as a Frontend Developer", "Render Theo as a Product Designer"],
    starterCode: `function ProfileCard({ name, role }) {
  // Return a card that displays both props.
}

export default function App() {
  return (
    <main>
      <h1>Team</h1>
      {/* Render two different ProfileCard instances. */}
    </main>
  );
}`,
    testCode: `import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders two profile cards with different names", () => {
  render(<App />);
  expect(screen.getByText("Maya")).toBeInTheDocument();
  expect(screen.getByText("Theo")).toBeInTheDocument();
});

test("renders the role passed to each card", () => {
  render(<App />);
  expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
  expect(screen.getByText("Product Designer")).toBeInTheDocument();
});`,
  },
  {
    lessonSlug: "react-state-and-events",
    title: "Build a Toggle",
    slug: "build-a-toggle",
    description: "Use state and an event handler to build an accessible on/off control.",
    difficulty: "easy" as const,
    requirements: ["Create boolean state with useState", "Show On or Off from the current state", "Toggle state when the button is clicked", "Set aria-pressed to the current state"],
    starterCode: `import { useState } from "react";

export default function App() {
  // Add boolean state and a click handler.
  return (
    <main>
      <h1>Notifications</h1>
      <button>Off</button>
    </main>
  );
}`,
    testCode: `import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("starts in the off state", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: "Off" })).toHaveAttribute("aria-pressed", "false");
});

test("switches on when clicked", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Off" }));
  expect(screen.getByRole("button", { name: "On" })).toHaveAttribute("aria-pressed", "true");
});`,
  },
  {
    lessonSlug: "react-custom-hooks",
    title: "Create useCounter",
    slug: "create-use-counter",
    description: "Extract counter state and actions into a reusable custom hook.",
    difficulty: "medium" as const,
    requirements: ["Create a useCounter custom hook", "Return count, increment, and reset", "Render the current count", "Connect both buttons to the hook actions"],
    starterCode: `import { useState } from "react";

function useCounter() {
  // Return count plus increment and reset actions.
}

export default function App() {
  // Use the custom hook here.
  return (
    <main>
      <h1>Practice sessions</h1>
      <p>Completed: 0</p>
      <button>Add session</button>
      <button>Reset</button>
    </main>
  );
}`,
    testCode: `import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("increments the completed session count", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Add session" }));
  expect(screen.getByText("Completed: 1")).toBeInTheDocument();
});

test("resets the completed session count", () => {
  render(<App />);
  const add = screen.getByRole("button", { name: "Add session" });
  fireEvent.click(add);
  fireEvent.click(add);
  fireEvent.click(screen.getByRole("button", { name: "Reset" }));
  expect(screen.getByText("Completed: 0")).toBeInTheDocument();
});`,
  },
] as const;

const questionCatalog = [
  {
    lessonSlug: "understanding-big-o",
    prompt: "A function scans an array once and stores every value in a set. What are its expected complexities?",
    options: ["O(1) time, O(n) space", "O(n) time, O(n) space", "O(n²) time, O(1) space", "O(log n) time, O(n) space"],
    correctIndex: 1,
    explanation: "The single scan is O(n), and a set containing up to n distinct values requires O(n) auxiliary space.",
  },
  {
    lessonSlug: "arrays-and-indexes",
    prompt: "Which invariant makes the one-pass stock-profit solution correct?",
    options: ["Prices are processed in sorted order", "The current price is always the maximum", "The minimum price is from an earlier or current day", "Every price is compared with every later price"],
    correctIndex: 2,
    explanation: "Tracking the minimum price seen so far guarantees that a candidate buy occurs no later than the current sell day.",
  },
  {
    lessonSlug: "hash-maps-and-sets",
    prompt: "You need to remember the first index where each number appeared. Which structure best fits?",
    options: ["A set", "A hash map", "A queue", "A boolean"],
    correctIndex: 1,
    explanation: "A hash map associates each number with additional information—its first index. A set stores presence only.",
  },
  {
    lessonSlug: "complement-lookup",
    prompt: "For Two Sum, why should you look up the complement before storing the current value?",
    options: ["To sort the array", "To avoid using the same element twice", "To reduce memory to O(1)", "To handle only positive values"],
    correctIndex: 1,
    explanation: "Looking up first ensures a match came from an earlier index rather than the current element itself.",
  },
  {
    lessonSlug: "stacks-and-nested-structure",
    prompt: "Why is counting each bracket type insufficient for validating parentheses?",
    options: ["Counts require O(n) time", "Stacks cannot store characters", "Equal counts do not guarantee correct nesting order", "Closing brackets should be ignored"],
    correctIndex: 2,
    explanation: "A string such as ([)] has balanced counts but invalid order. A stack preserves which opening bracket must close next.",
  },
  {
    lessonSlug: "two-pointers-and-sliding-windows",
    prompt: "Why can a well-designed sliding window often process an array in O(n) time?",
    options: ["It sorts every window", "Each boundary moves across the array at most once", "It stores every possible range", "It uses recursion for each element"],
    correctIndex: 1,
    explanation: "The left and right boundaries advance rather than restarting for every range, so their total movement is linear.",
  },
  {
    lessonSlug: "binary-search-foundations",
    prompt: "What property is required to binary-search an answer space?",
    options: ["Every value must be unique", "The input must fit in memory", "The decision condition must be monotonic", "The algorithm must use recursion"],
    correctIndex: 2,
    explanation: "A monotonic condition lets a midpoint result prove that one entire side of the search space can be discarded.",
  },
  {
    lessonSlug: "two-pointer-comparisons",
    prompt: "Why can two pointers merge two sorted arrays in linear time?",
    options: ["Both arrays are sorted again", "Each step advances at least one pointer", "Every pair is compared", "The arrays must have equal lengths"],
    correctIndex: 1,
    explanation: "Each comparison consumes one current value, so the two pointers make at most the combined number of advances.",
  },
  {
    lessonSlug: "sliding-windows-last-seen",
    prompt: "When a repeated character was last seen before the active window, what should happen to left?",
    options: ["Move left backward", "Reset left to zero", "Leave left unchanged", "Move left to right"],
    correctIndex: 2,
    explanation: "Only repeats inside the active window violate uniqueness. Taking max with the current left boundary prevents backward movement.",
  },
  {
    lessonSlug: "running-best-kadanes-algorithm",
    prompt: "Why should Maximum Subarray initialize its best sum from the first element instead of zero?",
    options: ["The array is sorted", "The answer must be non-empty and can be negative", "Zero uses extra memory", "The first element is always the answer"],
    correctIndex: 1,
    explanation: "For an all-negative array, zero is not the sum of a permitted non-empty subarray; initialization from the input preserves validity.",
  },
  {
    lessonSlug: "prefix-and-suffix-products",
    prompt: "Why is the prefix saved before multiplying by the current array value?",
    options: ["To sort the prefix", "To exclude the current value from its answer", "To avoid negative numbers", "To make the output shorter"],
    correctIndex: 1,
    explanation: "At index i, the stored prefix must contain only values strictly before i so nums[i] is excluded.",
  },
  {
    lessonSlug: "read-and-write-pointers",
    prompt: "What invariant does the write pointer maintain while moving zeroes?",
    options: ["It points at the largest value", "Everything before it contains the processed non-zero values in order", "Everything after it is sorted", "It always equals read"],
    correctIndex: 1,
    explanation: "The prefix before write contains exactly the non-zero values discovered so far, preserving their order.",
  },
  {
    lessonSlug: "monotonic-stacks",
    prompt: "Why is the nested while loop in Daily Temperatures still O(n) overall?",
    options: ["Temperatures have a small range", "Each index is pushed and popped at most once", "The stack is always empty", "The loop runs only on warm days"],
    correctIndex: 1,
    explanation: "Across the complete scan, no index can be popped more than once, so all stack operations total O(n).",
  },
  {
    lessonSlug: "variable-size-sliding-windows",
    prompt: "Which input property makes the minimum-size sum window safe to shrink greedily?",
    options: ["The array is sorted", "All values are positive", "Every value is unique", "The target is even"],
    correctIndex: 1,
    explanation: "Positive values make the window sum monotonic as either boundary advances, which justifies the pointer decisions.",
  },
  {
    lessonSlug: "expression-evaluation-stacks",
    prompt: "When an RPN operator is read, which operand is popped first?",
    options: ["The left operand", "The right operand", "The smallest operand", "The oldest operand"],
    correctIndex: 1,
    explanation: "The most recently pushed value is the right operand; the next pop is the left operand.",
  },
  {
    lessonSlug: "binary-search-rotated-data",
    prompt: "What remains reliably true inside a rotated sorted search interval with distinct values?",
    options: ["The midpoint is the smallest value", "At least one half is sorted", "The target is in the left half", "Both halves are unsorted"],
    correctIndex: 1,
    explanation: "The rotation pivot can disrupt only one side around a midpoint, leaving the other side normally sorted.",
  },
  {
    lessonSlug: "heaps-and-top-k-selection",
    prompt: "After processing every value with a min-heap of size k, what does the root represent?",
    options: ["The array minimum", "The array maximum", "The kth largest value", "The kth smallest value"],
    correctIndex: 2,
    explanation: "The heap retains the k largest candidates, and its smallest retained candidate is the kth largest overall.",
  },
  {
    lessonSlug: "grid-traversal-connected-components",
    prompt: "When should the island count increase during a full grid scan?",
    options: ["For every land cell", "When unvisited land starts a new traversal", "For every water cell", "Whenever DFS returns"],
    correctIndex: 1,
    explanation: "Each traversal from unvisited land consumes exactly one previously uncounted connected component.",
  },
  {
    lessonSlug: "one-dimensional-dynamic-programming",
    prompt: "Why can Climbing Stairs use only two variables instead of a full table?",
    options: ["There are only two answers", "Each state depends only on the previous two states", "Recursion stores the table", "The input is sorted"],
    correctIndex: 1,
    explanation: "Once ways[i] is computed, states older than i - 1 and i - 2 are no longer needed.",
  },
  {
    lessonSlug: "react-components-and-props",
    prompt: "Which value makes the best React key for a reorderable list of database records?",
    options: ["The array index", "A random number generated during render", "The record's stable database ID", "The visible label, even if labels repeat"],
    correctIndex: 2,
    explanation: "A stable ID follows the same logical record across inserts, removals, and reordering, allowing React to preserve the correct component identity.",
  },
  {
    lessonSlug: "react-state-and-events",
    prompt: "How should you increment state twice when both updates depend on the previous count?",
    options: ["Call setCount(count + 2) outside an event", "Use setCount(previous => previous + 1) twice", "Mutate count directly", "Copy count into a prop"],
    correctIndex: 1,
    explanation: "Functional updaters are processed against the latest queued state, so both increments are preserved even when updates are batched.",
  },
  {
    lessonSlug: "react-effects-and-synchronization",
    prompt: "Which task is an appropriate use of an effect?",
    options: ["Calculating a filtered array for rendering", "Handling a button click", "Synchronizing a browser event listener and cleaning it up", "Formatting a prop as text"],
    correctIndex: 2,
    explanation: "An external browser event source requires setup and cleanup that follows the component lifecycle, which is exactly what an effect models.",
  },
  {
    lessonSlug: "react-conditional-rendering-and-lists",
    prompt: "What is the main purpose of a key on a rendered list item?",
    options: ["To style the item", "To identify the same logical item across renders", "To make map run faster", "To expose the item globally"],
    correctIndex: 1,
    explanation: "Keys help React match each prior element with its next version so identity and local state remain attached to the correct item.",
  },
  {
    lessonSlug: "react-custom-hooks",
    prompt: "What happens when two components call the same custom hook that uses useState?",
    options: ["They automatically share one state value", "Only the first component receives state", "Each call receives independent state", "React throws an error"],
    correctIndex: 2,
    explanation: "Custom hooks reuse stateful logic. Each component call creates its own state unless the hook explicitly connects to shared external state.",
  },
] as const;

async function seed() {
  for (const { tests, ...problemValues } of catalog) {
    await db
      .insert(problems)
      .values(problemValues)
      .onConflictDoUpdate({
        target: problems.slug,
        set: {
          title: problemValues.title,
          description: problemValues.description,
          difficulty: problemValues.difficulty,
          topic: problemValues.topic,
          starterCode: problemValues.starterCode,
          functionName: problemValues.functionName,
          hints: problemValues.hints,
        },
      });

    const problemRows = await db.select({ id: problems.id }).from(problems).where(eq(problems.slug, problemValues.slug)).limit(1);
    if (problemRows.length === 0) throw new Error(`${problemValues.title} was not created.`);

    const existing = await db.select({ id: testCases.id }).from(testCases).where(eq(testCases.problemId, problemRows[0].id)).limit(1);
    if (existing.length === 0) {
      await db.insert(testCases).values(tests.map((test, position) => ({ ...test, problemId: problemRows[0].id, position })));
    }
  }

  await db
    .insert(courses)
    .values({ title: "DSA Foundations", slug: "dsa-foundations", category: "dsa", description: "Build the core patterns used to solve array, hashing, two-pointer, and stack problems." })
    .onConflictDoUpdate({ target: courses.slug, set: { title: "DSA Foundations", description: "Build the core patterns used to solve array, hashing, two-pointer, and stack problems." } });

  const courseRows = await db.select({ id: courses.id }).from(courses).where(eq(courses.slug, "dsa-foundations")).limit(1);
  if (courseRows.length === 0) throw new Error("DSA course was not created.");

  const moduleNames = [...new Set(lessonCatalog.map((lesson) => lesson.module))];
  for (const [modulePosition, moduleTitle] of moduleNames.entries()) {
    await db
      .insert(courseModules)
      .values({ courseId: courseRows[0].id, title: moduleTitle, position: modulePosition })
      .onConflictDoUpdate({ target: [courseModules.courseId, courseModules.position], set: { title: moduleTitle } });

    const moduleRows = await db
      .select({ id: courseModules.id })
      .from(courseModules)
      .where(and(eq(courseModules.courseId, courseRows[0].id), eq(courseModules.position, modulePosition)))
      .limit(1);
    if (moduleRows.length === 0) throw new Error(`${moduleTitle} module was not created.`);
    const currentModule = moduleRows[0];

    const moduleLessons = lessonCatalog.filter((lesson) => lesson.module === moduleTitle);
    for (const [position, lesson] of moduleLessons.entries()) {
      await db
        .insert(lessons)
        .values({ moduleId: currentModule.id, title: lesson.title, slug: lesson.slug, summary: lesson.summary, content: lesson.content, position, practiceProblemSlug: lesson.practiceProblemSlug })
        .onConflictDoUpdate({ target: lessons.slug, set: { moduleId: currentModule.id, title: lesson.title, summary: lesson.summary, content: lesson.content, position, practiceProblemSlug: lesson.practiceProblemSlug } });
    }
  }

  await db
    .insert(courses)
    .values({ title: "React Foundations", slug: "react-foundations", category: "react", description: "Learn the component, state, event, and effect fundamentals behind reliable React interfaces." })
    .onConflictDoUpdate({ target: courses.slug, set: { title: "React Foundations", description: "Learn the component, state, event, and effect fundamentals behind reliable React interfaces." } });

  const reactCourseRows = await db.select({ id: courses.id }).from(courses).where(eq(courses.slug, "react-foundations")).limit(1);
  if (reactCourseRows.length === 0) throw new Error("React course was not created.");

  const reactModuleNames = [...new Set(reactLessonCatalog.map((lesson) => lesson.module))];
  for (const [modulePosition, moduleTitle] of reactModuleNames.entries()) {
    await db
      .insert(courseModules)
      .values({ courseId: reactCourseRows[0].id, title: moduleTitle, position: modulePosition })
      .onConflictDoUpdate({ target: [courseModules.courseId, courseModules.position], set: { title: moduleTitle } });

    const moduleRows = await db
      .select({ id: courseModules.id })
      .from(courseModules)
      .where(and(eq(courseModules.courseId, reactCourseRows[0].id), eq(courseModules.position, modulePosition)))
      .limit(1);
    if (moduleRows.length === 0) throw new Error(`${moduleTitle} React module was not created.`);

    const moduleLessons = reactLessonCatalog.filter((lesson) => lesson.module === moduleTitle);
    for (const [position, lesson] of moduleLessons.entries()) {
      await db
        .insert(lessons)
        .values({ moduleId: moduleRows[0].id, title: lesson.title, slug: lesson.slug, summary: lesson.summary, content: lesson.content, position, practiceProblemSlug: null })
        .onConflictDoUpdate({ target: lessons.slug, set: { moduleId: moduleRows[0].id, title: lesson.title, summary: lesson.summary, content: lesson.content, position, practiceProblemSlug: null } });
    }
  }

  for (const question of questionCatalog) {
    const lessonRows = await db.select({ id: lessons.id }).from(lessons).where(eq(lessons.slug, question.lessonSlug)).limit(1);
    if (lessonRows.length === 0) throw new Error(`${question.lessonSlug} lesson was not found.`);
    await db
      .insert(lessonQuestions)
      .values({ lessonId: lessonRows[0].id, prompt: question.prompt, options: JSON.stringify(question.options), correctIndex: question.correctIndex, explanation: question.explanation })
      .onConflictDoUpdate({ target: lessonQuestions.lessonId, set: { prompt: question.prompt, options: JSON.stringify(question.options), correctIndex: question.correctIndex, explanation: question.explanation } });
  }

  for (const [position, challenge] of reactChallengeCatalog.entries()) {
    const lessonRows = await db.select({ id: lessons.id }).from(lessons).where(eq(lessons.slug, challenge.lessonSlug)).limit(1);
    if (lessonRows.length === 0) throw new Error(`${challenge.lessonSlug} lesson was not found for its React challenge.`);
    await db
      .insert(reactChallenges)
      .values({ lessonId: lessonRows[0].id, title: challenge.title, slug: challenge.slug, description: challenge.description, difficulty: challenge.difficulty, starterCode: challenge.starterCode, testCode: challenge.testCode, requirements: JSON.stringify(challenge.requirements), position })
      .onConflictDoUpdate({ target: reactChallenges.slug, set: { lessonId: lessonRows[0].id, title: challenge.title, description: challenge.description, difficulty: challenge.difficulty, starterCode: challenge.starterCode, testCode: challenge.testCode, requirements: JSON.stringify(challenge.requirements), position } });
  }

  console.log(`Database seeded with ${catalog.length} problems, ${lessonCatalog.length + reactLessonCatalog.length} lessons, ${questionCatalog.length} knowledge checks, and ${reactChallengeCatalog.length} React challenges.`);
}

seed()
  .catch((error) => {
    console.error("Failed to seed database:", error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
