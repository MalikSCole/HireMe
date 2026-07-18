import 'dotenv/config'
import { and, eq, sql } from 'drizzle-orm'

import { db } from './index'
import {
  blind75LessonCatalog,
  blind75ProblemCatalog,
  blind75QuestionCatalog,
} from './blind75-seed-data'
import {
  courseModules,
  courses,
  lessonQuestions,
  lessons,
  problems,
  reactChallenges,
  testCases,
} from './schema'

type SeedProblem = typeof problems.$inferInsert & {
  tests: Array<{ input: string; expectedOutput: string; isHidden?: boolean }>
}

const catalog: SeedProblem[] = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
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
    difficulty: 'easy',
    topic: 'arrays',
    starterCode:
      'def two_sum(nums, target):\n    # Write your solution here\n    pass\n',
    functionName: 'two_sum',
    hints: JSON.stringify([
      'Rewrite the target relationship in terms of the current value: what other value would complete the pair?',
      'Store previously visited values so you can look up that needed value without scanning the array again.',
      'Use a map from value to index. Check for target - num before inserting the current num so one element cannot match itself.',
    ]),
    tests: [
      { input: '[[2,7,11,15],9]', expectedOutput: '[0,1]' },
      { input: '[[3,2,4],6]', expectedOutput: '[1,2]' },
      { input: '[[3,3],6]', expectedOutput: '[0,1]', isHidden: true },
      { input: '[[-3,4,3,90],0]', expectedOutput: '[0,2]', isHidden: true },
    ],
  },
  {
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
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
    difficulty: 'easy',
    topic: 'hash-maps',
    starterCode:
      'def contains_duplicate(nums):\n    # Write your solution here\n    pass\n',
    functionName: 'contains_duplicate',
    hints: JSON.stringify([
      'You only need to know whether a value appeared before; its index is not required.',
      'A set supports expected O(1) membership checks and insertion.',
      'Scan once: return true when num is already in the set; otherwise add it. Return false after the loop.',
    ]),
    tests: [
      { input: '[[1,2,3,1]]', expectedOutput: 'true' },
      { input: '[[1,2,3,4]]', expectedOutput: 'false' },
      { input: '[[]]', expectedOutput: 'false', isHidden: true },
      {
        input: '[[1,1,1,3,3,4,3,2,4,2]]',
        expectedOutput: 'true',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Valid Anagram',
    slug: 'valid-anagram',
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
    difficulty: 'easy',
    topic: 'hash-maps',
    starterCode:
      'def is_anagram(s, t):\n    # Write your solution here\n    pass\n',
    functionName: 'is_anagram',
    hints: JSON.stringify([
      'Anagrams must have the same length and the same count for every character.',
      'Build a character-frequency map, or compare two frequency maps.',
      'After rejecting unequal lengths, increment counts for s and decrement them for t; every final count must be zero.',
    ]),
    tests: [
      { input: '["anagram","nagaram"]', expectedOutput: 'true' },
      { input: '["rat","car"]', expectedOutput: 'false' },
      { input: '["",""]', expectedOutput: 'true', isHidden: true },
      { input: '["aacc","ccac"]', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
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
    difficulty: 'easy',
    topic: 'two-pointers',
    starterCode:
      'def max_profit(prices):\n    # Write your solution here\n    pass\n',
    functionName: 'max_profit',
    hints: JSON.stringify([
      'The selling day must come after the buying day, so process prices from left to right.',
      'Track the minimum price seen before or on the current day and compare today against it.',
      'For each price, update best_profit with price - min_price, then update min_price. Initialize best profit to zero.',
    ]),
    tests: [
      { input: '[[7,1,5,3,6,4]]', expectedOutput: '5' },
      { input: '[[7,6,4,3,1]]', expectedOutput: '0' },
      { input: '[[1,2]]', expectedOutput: '1', isHidden: true },
      { input: '[[2,4,1]]', expectedOutput: '2', isHidden: true },
    ],
  },
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
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
    difficulty: 'easy',
    topic: 'stacks',
    starterCode:
      'def is_valid_parentheses(s):\n    # Write your solution here\n    pass\n',
    functionName: 'is_valid_parentheses',
    hints: JSON.stringify([
      'The most recently opened bracket must be the first one closed.',
      'Use a stack for opening brackets and a map from each closing bracket to its expected opening bracket.',
      'For each closer, reject an empty stack or mismatched top. At the end, return true only if the stack is empty.',
    ]),
    tests: [
      { input: '["()"]', expectedOutput: 'true' },
      { input: '["()[]{}"]', expectedOutput: 'true' },
      { input: '["(]"]', expectedOutput: 'false', isHidden: true },
      { input: '["([)]"]', expectedOutput: 'false', isHidden: true },
      { input: '["{[]}"]', expectedOutput: 'true', isHidden: true },
    ],
  },
  {
    title: 'Binary Search',
    slug: 'binary-search',
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
    difficulty: 'easy',
    topic: 'binary-search',
    starterCode:
      'def binary_search(nums, target):\n    # Write your solution here\n    pass\n',
    functionName: 'binary_search',
    hints: JSON.stringify([
      'Use the sorted order to decide which half cannot contain the target.',
      'Maintain inclusive left and right boundaries and inspect their midpoint.',
      'While left <= right, return mid on a match; move left to mid + 1 when nums[mid] is too small, otherwise move right to mid - 1.',
    ]),
    tests: [
      { input: '[[-1,0,3,5,9,12],9]', expectedOutput: '4' },
      { input: '[[-1,0,3,5,9,12],2]', expectedOutput: '-1' },
      { input: '[[5],5]', expectedOutput: '0', isHidden: true },
      { input: '[[2,4,7,10,15],2]', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    title: 'Valid Palindrome',
    slug: 'valid-palindrome',
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
    difficulty: 'easy',
    topic: 'two-pointers',
    starterCode:
      'def is_palindrome(s):\n    # Write your solution here\n    pass\n',
    functionName: 'is_palindrome',
    hints: JSON.stringify([
      'Characters that are not letters or digits do not affect the answer.',
      'Place one pointer at each end and move them inward, skipping irrelevant characters.',
      'Compare lowercase characters at left and right. Return false on a mismatch; otherwise continue until the pointers meet.',
    ]),
    tests: [
      { input: '["A man, a plan, a canal: Panama"]', expectedOutput: 'true' },
      { input: '["race a car"]', expectedOutput: 'false' },
      { input: '[" "]', expectedOutput: 'true', isHidden: true },
      { input: '["0P"]', expectedOutput: 'false', isHidden: true },
    ],
  },
  {
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
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
    difficulty: 'medium',
    topic: 'arrays',
    starterCode:
      'def max_subarray(nums):\n    # Write your solution here\n    pass\n',
    functionName: 'max_subarray',
    hints: JSON.stringify([
      'At each index, decide whether extending the previous subarray is better than starting fresh.',
      'Track both the best sum ending at the current position and the best sum found anywhere.',
      'Initialize both values with nums[0]. For every later num, set current = max(num, current + num), then update best.',
    ]),
    tests: [
      { input: '[[-2,1,-3,4,-1,2,1,-5,4]]', expectedOutput: '6' },
      { input: '[[5,4,-1,7,8]]', expectedOutput: '23' },
      { input: '[[-1]]', expectedOutput: '-1', isHidden: true },
      { input: '[[-2,-3,-1,-5]]', expectedOutput: '-1', isHidden: true },
    ],
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
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
    difficulty: 'medium',
    topic: 'sliding-window',
    starterCode:
      'def longest_unique_substring(s):\n    # Write your solution here\n    pass\n',
    functionName: 'longest_unique_substring',
    hints: JSON.stringify([
      'Maintain a window that always contains unique characters.',
      'When the right character already exists in the window, move the left boundary past its previous position.',
      "Store each character's latest index. Set left = max(left, last_seen[char] + 1), update the index, and maximize right - left + 1.",
    ]),
    tests: [
      { input: '["abcabcbb"]', expectedOutput: '3' },
      { input: '["bbbbb"]', expectedOutput: '1' },
      { input: '[""]', expectedOutput: '0', isHidden: true },
      { input: '["pwwkew"]', expectedOutput: '3', isHidden: true },
      { input: '["abba"]', expectedOutput: '2', isHidden: true },
    ],
  },
  {
    title: 'Merge Sorted Arrays',
    slug: 'merge-sorted-arrays',
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
    difficulty: 'easy',
    topic: 'two-pointers',
    starterCode:
      'def merge_sorted_arrays(nums1, nums2):\n    # Write your solution here\n    pass\n',
    functionName: 'merge_sorted_arrays',
    hints: JSON.stringify([
      'The smallest unmerged value must be at the front of one of the two remaining array suffixes.',
      'Use one pointer for each input and append the smaller pointed value to a result array.',
      'Continue while both pointers are valid, then append the remaining suffix from whichever array is not exhausted.',
    ]),
    tests: [
      { input: '[[1,2,4],[1,3,4]]', expectedOutput: '[1,1,2,3,4,4]' },
      { input: '[[],[2,5]]', expectedOutput: '[2,5]' },
      { input: '[[1],[]]', expectedOutput: '[1]', isHidden: true },
      {
        input: '[[-3,0,7],[-2,0,8]]',
        expectedOutput: '[-3,-2,0,0,7,8]',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Product of Array Except Self',
    slug: 'product-of-array-except-self',
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
    difficulty: 'medium',
    topic: 'arrays',
    starterCode:
      'def product_except_self(nums):\n    # Write your solution here\n    pass\n',
    functionName: 'product_except_self',
    hints: JSON.stringify([
      'The answer at each index combines the product to its left with the product to its right.',
      'Fill an output array with prefix products in a left-to-right pass.',
      'Walk right-to-left with one suffix variable. Multiply each stored prefix by the suffix, then include the current value in the suffix.',
    ]),
    tests: [
      { input: '[[1,2,3,4]]', expectedOutput: '[24,12,8,6]' },
      { input: '[[-1,1,0,-3,3]]', expectedOutput: '[0,0,9,0,0]' },
      { input: '[[0,0]]', expectedOutput: '[0,0]', isHidden: true },
      { input: '[[2,3]]', expectedOutput: '[3,2]', isHidden: true },
    ],
  },
  {
    title: 'Move Zeroes',
    slug: 'move-zeroes',
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
    difficulty: 'easy',
    topic: 'two-pointers',
    starterCode:
      'def move_zeroes(nums):\n    # Return the reordered array\n    pass\n',
    functionName: 'move_zeroes',
    hints: JSON.stringify([
      'Separate the position being read from the position where the next non-zero value belongs.',
      'Let a write pointer count how many non-zero values have been placed.',
      'Copy non-zero values forward, then fill every remaining position from write to the end with zero.',
    ]),
    tests: [
      { input: '[[0,1,0,3,12]]', expectedOutput: '[1,3,12,0,0]' },
      { input: '[[0]]', expectedOutput: '[0]' },
      { input: '[[1,2,3]]', expectedOutput: '[1,2,3]', isHidden: true },
      { input: '[[0,0,1]]', expectedOutput: '[1,0,0]', isHidden: true },
    ],
  },
  {
    title: 'Daily Temperatures',
    slug: 'daily-temperatures',
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
    difficulty: 'medium',
    topic: 'stacks',
    starterCode:
      'def daily_temperatures(temperatures):\n    # Write your solution here\n    pass\n',
    functionName: 'daily_temperatures',
    hints: JSON.stringify([
      'Unresolved days only need to wait for the next temperature greater than theirs.',
      'Keep indexes in a stack whose temperatures are monotonically decreasing.',
      'For each temperature, pop while it is warmer than the stack top and set answer[old_index] = current_index - old_index, then push the current index.',
    ]),
    tests: [
      {
        input: '[[73,74,75,71,69,72,76,73]]',
        expectedOutput: '[1,1,4,2,1,1,0,0]',
      },
      { input: '[[30,40,50,60]]', expectedOutput: '[1,1,1,0]' },
      { input: '[[60,50,40]]', expectedOutput: '[0,0,0]', isHidden: true },
      { input: '[[70]]', expectedOutput: '[0]', isHidden: true },
    ],
  },
  {
    title: 'Minimum Size Subarray Sum',
    slug: 'minimum-size-subarray-sum',
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
    difficulty: 'medium',
    topic: 'sliding-window',
    starterCode:
      'def min_subarray_len(target, nums):\n    # Write your solution here\n    pass\n',
    functionName: 'min_subarray_len',
    hints: JSON.stringify([
      'Because every value is positive, expanding right never decreases the sum and shrinking left never increases it.',
      'Expand until the sum qualifies, then shrink repeatedly while it still qualifies.',
      'Track left, window_sum, and best. After adding nums[right], use a while loop to update best and subtract nums[left]. Return 0 if best was never updated.',
    ]),
    tests: [
      { input: '[7,[2,3,1,2,4,3]]', expectedOutput: '2' },
      { input: '[11,[1,1,1,1,1]]', expectedOutput: '0' },
      { input: '[4,[1,4,4]]', expectedOutput: '1', isHidden: true },
      { input: '[15,[1,2,3,4,5]]', expectedOutput: '5', isHidden: true },
    ],
  },
  {
    title: 'Evaluate Reverse Polish Notation',
    slug: 'evaluate-reverse-polish-notation',
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
    difficulty: 'medium',
    topic: 'stacks',
    starterCode:
      'def eval_rpn(tokens):\n    # Write your solution here\n    pass\n',
    functionName: 'eval_rpn',
    hints: JSON.stringify([
      'Numbers wait until a later operator consumes them, which matches last-in-first-out order.',
      'Push numbers. For an operator, pop the right operand first and then the left operand.',
      'Compute left operator right and push the result. For division use int(left / right) to truncate toward zero in Python.',
    ]),
    tests: [
      { input: '[["2","1","+","3","*"]]', expectedOutput: '9' },
      { input: '[["4","13","5","/","+"]]', expectedOutput: '6' },
      { input: '[["7","-3","/"]]', expectedOutput: '-2', isHidden: true },
      { input: '[["3","4","+"]]', expectedOutput: '7', isHidden: true },
    ],
  },
  {
    title: 'Search in Rotated Sorted Array',
    slug: 'search-in-rotated-sorted-array',
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
    difficulty: 'medium',
    topic: 'binary-search',
    starterCode:
      'def search_rotated(nums, target):\n    # Write your solution here\n    pass\n',
    functionName: 'search_rotated',
    hints: JSON.stringify([
      'At every midpoint, at least one half of the current interval is normally sorted.',
      'Compare nums[left] with nums[mid] to identify the sorted half, then test whether target lies inside its value range.',
      'If the left half is sorted and nums[left] <= target < nums[mid], move right; otherwise move left. Mirror the logic when the right half is sorted.',
    ]),
    tests: [
      { input: '[[4,5,6,7,0,1,2],0]', expectedOutput: '4' },
      { input: '[[4,5,6,7,0,1,2],3]', expectedOutput: '-1' },
      { input: '[[1],1]', expectedOutput: '0', isHidden: true },
      { input: '[[3,1],1]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Kth Largest Element',
    slug: 'kth-largest-element',
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
    difficulty: 'medium',
    topic: 'heaps',
    starterCode:
      'def find_kth_largest(nums, k):\n    # Write your solution here\n    pass\n',
    functionName: 'find_kth_largest',
    hints: JSON.stringify([
      'You do not need the complete sorted order; only the k largest candidates matter.',
      'Maintain a min-heap whose size never exceeds k.',
      'Push each number and pop the smallest whenever the heap grows beyond k. The heap root is the kth largest after the scan.',
    ]),
    tests: [
      { input: '[[3,2,1,5,6,4],2]', expectedOutput: '5' },
      { input: '[[3,2,3,1,2,4,5,5,6],4]', expectedOutput: '4' },
      { input: '[[-1],1]', expectedOutput: '-1', isHidden: true },
      { input: '[[2,1],2]', expectedOutput: '1', isHidden: true },
    ],
  },
  {
    title: 'Number of Islands',
    slug: 'number-of-islands',
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
    difficulty: 'medium',
    topic: 'graphs',
    starterCode:
      'def num_islands(grid):\n    # Write your solution here\n    pass\n',
    functionName: 'num_islands',
    hints: JSON.stringify([
      'Treat every land cell as a graph node connected to its four land neighbors.',
      'When you find unvisited land, count one island and traverse the entire connected component.',
      'Use DFS or BFS with a visited set, or mark visited land as water. Check row and column bounds before exploring each neighbor.',
    ]),
    tests: [
      {
        input: '[[["1","1","0"],["1","0","0"],["0","0","1"]]]',
        expectedOutput: '2',
      },
      { input: '[[["0","0"],["0","0"]]]', expectedOutput: '0' },
      { input: '[[["1"]]]', expectedOutput: '1', isHidden: true },
      {
        input: '[[["1","0","1","0","1"]]]',
        expectedOutput: '3',
        isHidden: true,
      },
    ],
  },
  {
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
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
    difficulty: 'easy',
    topic: 'dynamic-programming',
    starterCode:
      'def climb_stairs(n):\n    # Write your solution here\n    pass\n',
    functionName: 'climb_stairs',
    hints: JSON.stringify([
      'Every route to step n must arrive from either step n - 1 or step n - 2.',
      'This gives the recurrence ways[n] = ways[n - 1] + ways[n - 2].',
      'Start with one way to stand at step 0 and one way to reach step 1. Iteratively update two previous values through n.',
    ]),
    tests: [
      { input: '[2]', expectedOutput: '2' },
      { input: '[5]', expectedOutput: '8' },
      { input: '[1]', expectedOutput: '1', isHidden: true },
      { input: '[10]', expectedOutput: '89', isHidden: true },
    ],
  },
  ...blind75ProblemCatalog,
]

const lessonCatalog = [
  {
    module: 'Foundations',
    title: 'Understanding Big-O',
    slug: 'understanding-big-o',
    summary: 'Learn how runtime and memory grow as an input becomes larger.',
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
    module: 'Arrays and Hashing',
    title: 'Arrays and Indexes',
    slug: 'arrays-and-indexes',
    summary:
      'Use array indexes to traverse, compare, and transform ordered data.',
    practiceProblemSlug: 'best-time-to-buy-and-sell-stock',
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
    module: 'Arrays and Hashing',
    title: 'Hash Maps and Sets',
    slug: 'hash-maps-and-sets',
    summary:
      'Trade extra memory for fast membership checks and frequency counting.',
    practiceProblemSlug: 'contains-duplicate',
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
    module: 'Problem-Solving Patterns',
    title: 'Complement Lookup',
    slug: 'complement-lookup',
    summary:
      'Turn a two-value search into a single pass by storing what you have seen.',
    practiceProblemSlug: 'two-sum',
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
    module: 'Stacks',
    title: 'Stacks and Nested Structure',
    slug: 'stacks-and-nested-structure',
    summary: 'Use last-in-first-out state to validate properly nested input.',
    practiceProblemSlug: 'valid-parentheses',
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
    module: 'Problem-Solving Patterns',
    title: 'Two Pointers and Sliding Windows',
    slug: 'two-pointers-and-sliding-windows',
    summary:
      'Replace repeated range work with indexes that move according to a clear invariant.',
    practiceProblemSlug: 'best-time-to-buy-and-sell-stock',
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
    module: 'Search',
    title: 'Binary Search',
    slug: 'binary-search-foundations',
    summary:
      'Use a monotonic condition to discard half of the remaining search space.',
    practiceProblemSlug: 'binary-search',
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
    module: 'Problem-Solving Patterns',
    title: 'Two-Pointer Comparisons',
    slug: 'two-pointer-comparisons',
    summary:
      'Move inward from both ends when each comparison can eliminate positions safely.',
    practiceProblemSlug: 'valid-palindrome',
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
    module: 'Problem-Solving Patterns',
    title: 'Sliding Windows with Last-Seen Indexes',
    slug: 'sliding-windows-last-seen',
    summary:
      'Maintain a valid substring and jump its left boundary past repeated characters.',
    practiceProblemSlug: 'longest-substring-without-repeating-characters',
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
    module: 'Arrays and Hashing',
    title: "Running Best with Kadane's Algorithm",
    slug: 'running-best-kadanes-algorithm',
    summary:
      'Compress a subarray search into the best sum ending here and the best sum overall.',
    practiceProblemSlug: 'maximum-subarray',
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
    module: 'Arrays and Hashing',
    title: 'Prefix and Suffix Products',
    slug: 'prefix-and-suffix-products',
    summary:
      'Combine information from both sides of every index without repeated scans.',
    practiceProblemSlug: 'product-of-array-except-self',
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
    module: 'Problem-Solving Patterns',
    title: 'Read and Write Pointers',
    slug: 'read-and-write-pointers',
    summary:
      'Compact or reorder an array while preserving the order of selected values.',
    practiceProblemSlug: 'move-zeroes',
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
    module: 'Stacks',
    title: 'Monotonic Stacks',
    slug: 'monotonic-stacks',
    summary:
      'Keep unresolved candidates in useful order to find the next greater value.',
    practiceProblemSlug: 'daily-temperatures',
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
    module: 'Problem-Solving Patterns',
    title: 'Variable-Size Sliding Windows',
    slug: 'variable-size-sliding-windows',
    summary:
      'Expand to satisfy a condition, then shrink to find the smallest valid range.',
    practiceProblemSlug: 'minimum-size-subarray-sum',
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
    module: 'Stacks',
    title: 'Expression Evaluation with Stacks',
    slug: 'expression-evaluation-stacks',
    summary:
      'Evaluate postfix expressions by storing operands until an operator arrives.',
    practiceProblemSlug: 'evaluate-reverse-polish-notation',
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
    module: 'Search',
    title: 'Binary Search on Rotated Data',
    slug: 'binary-search-rotated-data',
    summary:
      'Use the sorted half of a rotated interval to preserve logarithmic search.',
    practiceProblemSlug: 'search-in-rotated-sorted-array',
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
    module: 'Heaps',
    title: 'Heaps and Top-K Selection',
    slug: 'heaps-and-top-k-selection',
    summary:
      'Keep only the strongest k candidates with a size-limited min-heap.',
    practiceProblemSlug: 'kth-largest-element',
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
    module: 'Graphs',
    title: 'Grid Traversal and Connected Components',
    slug: 'grid-traversal-connected-components',
    summary:
      'Model neighboring grid cells as a graph and count complete connected regions.',
    practiceProblemSlug: 'number-of-islands',
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
    module: 'Dynamic Programming',
    title: 'One-Dimensional Dynamic Programming',
    slug: 'one-dimensional-dynamic-programming',
    summary: 'Build larger answers from previously solved smaller states.',
    practiceProblemSlug: 'climbing-stairs',
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
  ...blind75LessonCatalog,
] as const

const reactStructuredContent = ({
  mentalModel,
  guidedExample,
  predict,
  fix,
  build,
  miniProject,
  review,
}: {
  mentalModel: string
  guidedExample: string
  predict: string
  fix: string
  build: string
  miniProject: string
  review: string
}) =>
  JSON.stringify(
    {
      format: 'curriculum-v1',
      learningObjectives: [
        mentalModel,
        guidedExample,
        'Practice the concept through prediction, debugging, and component-building tasks.',
      ],
      sections: [
        { title: 'Mental model', body: mentalModel },
        { title: 'Guided example', body: guidedExample },
        { title: 'Predict the output', body: predict },
        { title: 'Fix the bug', body: fix },
      ],
      visualization: {
        kind: 'pattern-diagram',
        prompt:
          'Use the playground to connect code changes to rendered output and component state.',
      },
      workedExample: { title: 'Build challenge', body: build },
      practice: {
        problemSlug: '',
        framing: miniProject,
      },
      replay: {
        prompt:
          'Replay the render path: inputs, event or data change, updated value, and final UI.',
      },
      quiz: {
        prompt: review,
      },
      aiFeedback: {
        prompt:
          'Ask the AI tutor for progressive help: concept, location, React rule, pseudocode, partial correction, then solution only if requested.',
      },
    },
    null,
    2,
  )

const reactTopicLesson = ({
  module,
  title,
  slug,
  summary,
  concept,
  example,
  predict,
  fix,
  build,
  project,
  check,
  examples,
}: {
  module: string
  title: string
  slug: string
  summary: string
  concept: string
  example: string
  predict: string
  fix: string
  build: string
  project: string
  check: string
  examples?: {
    predict?: string
    fix?: string
    build?: string
  }
}) => ({
  module,
  title,
  slug,
  summary,
  content: reactStructuredContent({
    mentalModel: concept,
    guidedExample: example,
    predict: examples?.predict ? `${predict}\n\n${examples.predict}` : predict,
    fix: examples?.fix ? `${fix}\n\n${examples.fix}` : fix,
    build: examples?.build ? `${build}\n\n${examples.build}` : build,
    miniProject: project,
    review: check,
  }),
})

const reactExample = {
  jsxRules: {
    predict: `Predict the rendered text:
\`\`\`tsx
function Badge() {
  const count = 3
  return <p className="badge">Unread: {count + 1}</p>
}
\`\`\``,
    fix: `Fix the JSX errors:
\`\`\`tsx
function Profile() {
  return (
    <section class="card">
      <h2>Maya</h2>
      <img src="/avatar.png">
      <p>{ role: "Frontend Developer" }</p>
    </section>
    <footer>Online</footer>
  )
}
\`\`\``,
    build: `Build target:
\`\`\`tsx
function ProfileSummary() {
  const learner = { name: "Maya", role: "Frontend Developer", lessons: 12 }
  return (
    // Render name, role, and "12 lessons complete" with valid JSX.
  )
}
\`\`\``,
  },
  props: {
    predict: `Predict each card's text:
\`\`\`tsx
function MovieCard({ title, rating }: { title: string; rating: string }) {
  return <article>{title} is rated {rating}</article>
}

<MovieCard title="Arrival" rating="PG-13" />
<MovieCard title="Kiki's Delivery Service" rating="G" />
\`\`\``,
    fix: `Fix the prop mismatch:
\`\`\`tsx
function UserCard({ name, role }: { name: string; role: string }) {
  return <p>{name}: {role}</p>
}

export default function App() {
  return <UserCard fullName="Maya" role="Frontend Developer" />
}
\`\`\``,
    build: `Build target:
\`\`\`tsx
type ButtonProps = {
  children: React.ReactNode
  variant?: "primary" | "secondary"
}

function Button(props: ButtonProps) {
  // Render a button using children and a default variant.
}
\`\`\``,
  },
  mapKeys: {
    predict: `Predict the list:
\`\`\`tsx
const tasks = [
  { id: "a", title: "Read props", done: true },
  { id: "b", title: "Build list", done: false },
]

tasks.filter(task => !task.done).map(task => task.title)
\`\`\``,
    fix: `Fix the unstable keys:
\`\`\`tsx
{tasks.map((task, index) => (
  <TaskRow key={index} task={task} />
))}
\`\`\``,
    build: `Build target:
\`\`\`tsx
function TaskList({ tasks }: { tasks: Task[] }) {
  // Render each task with key={task.id}.
  // Show "No tasks found" when the array is empty.
}
\`\`\``,
  },
  stateUpdates: {
    predict: `Predict the final count after one click:
\`\`\`tsx
function Counter() {
  const [count, setCount] = useState(0)
  function addTwo() {
    setCount(count + 1)
    setCount(count + 1)
  }
  return <button onClick={addTwo}>{count}</button>
}
\`\`\``,
    fix: `Fix the stale updates:
\`\`\`tsx
function addTwo() {
  setCount(count + 1)
  setCount(count + 1)
}
\`\`\``,
    build: `Build target:
\`\`\`tsx
function Counter() {
  // Add Increment, Add two, and Reset buttons.
  // Use functional updates when the next value depends on the previous one.
}
\`\`\``,
  },
  immutableState: {
    predict: `Predict which item changes:
\`\`\`tsx
setTasks(tasks.map(task =>
  task.id === selectedId ? { ...task, done: !task.done } : task
))
\`\`\``,
    fix: `Fix the mutation:
\`\`\`tsx
function addTask(title: string) {
  tasks.push({ id: crypto.randomUUID(), title, done: false })
  setTasks(tasks)
}
\`\`\``,
    build: `Build target:
\`\`\`tsx
function removeTask(id: string) {
  // Use filter and setTasks with a new array.
}
\`\`\``,
  },
  form: {
    predict: `Predict the UI after submit with an empty name:
\`\`\`tsx
const error = name.trim() === "" ? "Name is required" : ""
return <>{error && <p>{error}</p>}</>
\`\`\``,
    fix: `Fix the refreshing form:
\`\`\`tsx
function ProfileForm() {
  function handleSubmit() {
    setSaved(true)
  }
  return <form onSubmit={handleSubmit}>...</form>
}
\`\`\``,
    build: `Build target:
\`\`\`tsx
function ProfileForm() {
  // Control name and email.
  // Validate required name.
  // Show "Saved profile" after valid submit.
}
\`\`\``,
  },
  communication: {
    predict: `Predict what rerenders when + is clicked:
\`\`\`tsx
function Cart() {
  const [quantity, setQuantity] = useState(1)
  return <QuantityControls value={quantity} onChange={setQuantity} />
}
\`\`\``,
    fix: `Fix the child-owned duplicate state:
\`\`\`tsx
function QuantityControls({ initialQuantity }: { initialQuantity: number }) {
  const [quantity, setQuantity] = useState(initialQuantity)
  return <button onClick={() => setQuantity(quantity + 1)}>+</button>
}
\`\`\``,
    build: `Build target:
\`\`\`tsx
function QuantityControls({ quantity, onIncrement, onDecrement }: Props) {
  // Render -, quantity, +.
  // Let the parent own the state.
}
\`\`\``,
  },
  effects: {
    predict: `Predict setup and cleanup:
\`\`\`tsx
useEffect(() => {
  console.log("connect", roomId)
  return () => console.log("disconnect", roomId)
}, [roomId])
\`\`\``,
    fix: `Fix the leaking interval:
\`\`\`tsx
useEffect(() => {
  if (!running) return
  setInterval(() => setSeconds(seconds + 1), 1000)
}, [running])
\`\`\``,
    build: `Build target:
\`\`\`tsx
useEffect(() => {
  // Start timer only when running is true.
  // Use a functional state update.
  // Clear the interval in cleanup.
}, [running])
\`\`\``,
  },
  router: {
    predict: `Predict the params for this URL:
\`\`\`txt
/products/keyboard?tab=reviews
\`\`\`
Route:
\`\`\`tsx
createFileRoute("/products/$productId")
\`\`\``,
    fix: `Fix the disappearing filter:
\`\`\`tsx
const [query, setQuery] = useState("")
// Refreshing the page loses query. Move shareable filters to search params.
\`\`\``,
    build: `Build target:
\`\`\`tsx
// Create /products and /products/$productId.
// Add search params for query and page.
// Show not-found when the product id is missing.
\`\`\``,
  },
  query: {
    predict: `Predict when this query refetches:
\`\`\`tsx
useQuery({
  queryKey: ["issues", { status }],
  queryFn: () => fetchIssues(status),
  staleTime: 30_000,
})
\`\`\``,
    fix: `Fix the stale list after create:
\`\`\`tsx
const createIssue = useMutation({
  mutationFn: postIssue,
  onSuccess: () => {
    // What query should be invalidated?
  },
})
\`\`\``,
    build: `Build target:
\`\`\`tsx
// Fetch issues with useQuery.
// Add an issue with useMutation.
// Invalidate ["issues"] after success.
\`\`\``,
  },
  context: {
    predict: `Predict which component can read theme:
\`\`\`tsx
<ThemeProvider>
  <Dashboard />
</ThemeProvider>
<MarketingPage />
\`\`\``,
    fix: `Fix the overused context:
\`\`\`tsx
<AppProvider value={{ theme, formDraft, issueList, modalOpen }}>
  <App />
</AppProvider>
\`\`\`
Move form drafts local, issueList to Query, and modalOpen near its owner.`,
    build: `Build target:
\`\`\`tsx
const ThemeContext = createContext<ThemeContextValue | null>(null)

function useTheme() {
  // Read context and throw a helpful error if missing.
}
\`\`\``,
  },
  hooks: {
    predict: `Predict whether these states are shared:
\`\`\`tsx
function A() { const [on] = useToggle(false) }
function B() { const [on] = useToggle(false) }
\`\`\``,
    fix: `Fix the hook rule violation:
\`\`\`tsx
if (enabled) {
  const [value, setValue] = useState("")
}
\`\`\``,
    build: `Build target:
\`\`\`tsx
function useDebounce<T>(value: T, delay: number) {
  // Return a delayed version of value.
  // Clear the timer in cleanup.
}
\`\`\``,
  },
  testing: {
    predict: `Which assertion is behavior-focused?
\`\`\`tsx
expect(screen.getByRole("status")).toHaveTextContent("Saved")
expect(component.state("saved")).toBe(true)
\`\`\``,
    fix: `Fix the brittle test:
\`\`\`tsx
expect(container.querySelector(".green")).not.toBeNull()
\`\`\`
Prefer an accessible role or visible text that describes user behavior.`,
    build: `Build target:
\`\`\`tsx
test("submits a valid profile", async () => {
  // Type into labeled fields.
  // Click Save.
  // Assert visible success feedback.
})
\`\`\``,
  },
  accessibility: {
    predict: `Predict the accessible name:
\`\`\`tsx
<button aria-label="Open settings">
  <SettingsIcon />
</button>
\`\`\``,
    fix: `Fix the inaccessible trigger:
\`\`\`tsx
<div onClick={openModal}>Open settings</div>
\`\`\``,
    build: `Build target:
\`\`\`tsx
<section role="dialog" aria-labelledby="settings-title">
  <h2 id="settings-title">Preferences</h2>
  <button>Close</button>
</section>
\`\`\``,
  },
  variablesFunctionsModules: {
    predict: `Predict what App renders:
\`\`\`tsx
// format.ts
export function formatName(name: string) {
  return name.trim().toUpperCase()
}

// App.tsx
import { formatName } from "./format"

export default function App() {
  const learner = " maya "
  return <h1>{formatName(learner)}</h1>
}
\`\`\``,
    fix: `Fix the import/export and reassignment issues:
\`\`\`tsx
// profile.ts
export default function formatRole(role: string) {
  return role.toLowerCase()
}

// App.tsx
import { formatRole } from "./profile"

const role = "Developer"
role = formatRole(role)
\`\`\``,
    build: `Build target:
\`\`\`tsx
// profile-data.ts
export const learner = { firstName: "Maya", lastName: "Chen" }

export function getDisplayName(first: string, last: string) {
  // Return "Maya Chen"
}

// App.tsx
// Import learner and getDisplayName, then render the display name.
\`\`\``,
  },
  objectsArraysDestructuring: {
    predict: `Predict the rendered text:
\`\`\`tsx
const movie = {
  title: "Arrival",
  meta: { year: 2016, rating: "PG-13" },
}

const { title, meta: { year } } = movie
return <p>{title} ({year})</p>
\`\`\``,
    fix: `Fix the missing field and mutation:
\`\`\`tsx
function MovieRow({ movie }: { movie: Movie }) {
  const { name, meta } = movie
  meta.rating = "G"
  return <p>{name}: {meta.rating}</p>
}
\`\`\``,
    build: `Build target:
\`\`\`tsx
type Product = {
  id: string
  name: string
  price: number
  tags: string[]
}

function ProductPreview({ product }: { product: Product }) {
  // Destructure name, price, and tags.
  // Render "Keyboard - $129 - 2 tags".
}
\`\`\``,
  },
  arrayTransforms: {
    predict: `Predict the final value:
\`\`\`tsx
const products = [
  { name: "Keyboard", price: 129, inStock: true },
  { name: "Mouse", price: 49, inStock: false },
  { name: "Monitor", price: 299, inStock: true },
]

products
  .filter(product => product.inStock)
  .map(product => product.name)
\`\`\``,
    fix: `Fix the map and reduce bugs:
\`\`\`tsx
const labels = products.map(product => {
  product.name.toUpperCase()
})

const total = products.reduce((sum, product) => {
  sum + product.price
})
\`\`\``,
    build: `Build target:
\`\`\`tsx
const visibleProducts = products
  // Keep only products in stock.
  // Render one <li> per product.
  // Derive the total price with reduce.
\`\`\``,
  },
  typescriptShapes: {
    predict: `Which component calls type-check?
\`\`\`tsx
type MovieCardProps = {
  title: string
  year: number
  rating?: string
}

<MovieCard title="Arrival" year={2016} />
<MovieCard title="Arrival" year="2016" />
<MovieCard title="Arrival" />
\`\`\``,
    fix: `Fix the prop contract:
\`\`\`tsx
type ButtonProps = {
  label: string
  disabled: boolean
}

function Button({ label, disabled }: ButtonProps) {
  return <button disabled={disabled}>{children}</button>
}
\`\`\``,
    build: `Build target:
\`\`\`tsx
type Learner = {
  id: string
  name: string
  completedLessons: number
}

type LearnerBadgeProps = {
  learner: Learner
  compact?: boolean
}
\`\`\``,
  },
  reactSolves: {
    predict: `Predict the UI when status is "complete":
\`\`\`tsx
function StatusPanel({ status }: { status: "idle" | "complete" }) {
  return <p>{status === "complete" ? "Ready to review" : "Keep working"}</p>
}
\`\`\``,
    fix: `Fix the manual DOM update:
\`\`\`tsx
function StatusPanel({ status }: { status: string }) {
  document.querySelector("#status")!.textContent = status
  return <p id="status" />
}
\`\`\``,
    build: `Build target:
\`\`\`tsx
function StatusPanel({ completed, total }: { completed: number; total: number }) {
  // Render "3/5 lessons complete".
  // Render "Course complete" when completed === total.
}
\`\`\``,
  },
  componentFunction: {
    predict: `Predict the component tree and visible text:
\`\`\`tsx
function Header() {
  return <h1>Portfolio</h1>
}

function App() {
  return <main><Header /><p>Maya Chen</p></main>
}
\`\`\``,
    fix: `Fix the component mistakes:
\`\`\`tsx
function profileCard() {
  return <article>Maya</article>
}

export default function App() {
  return <profileCard />
}
\`\`\``,
    build: `Build target:
\`\`\`tsx
function Avatar() {}
function UserDetails() {}
function ProfileCard() {
  // Compose Avatar and UserDetails.
}
\`\`\``,
  },
  compositionStructure: {
    predict: `Predict which component renders SkillList:
\`\`\`tsx
function App() {
  return <PortfolioPage />
}
function PortfolioPage() {
  return <><Hero /><SkillList /></>
}
\`\`\``,
    fix: `Fix the overgrown component:
\`\`\`tsx
function App() {
  return (
    <main>
      {/* 200 lines of hero, skills, projects, contact, and footer */}
    </main>
  )
}
\`\`\`
Split by responsibility: Hero, SkillList, ProjectList, ContactSection.`,
    build: `Build target:
\`\`\`txt
src/
  App.tsx
  components/
    Hero.tsx
    SkillList.tsx
    ProjectList.tsx
  data/
    profile.ts
\`\`\``,
  },
} as const

const reactIndividualLessonCatalog = [
  reactTopicLesson({
    module: 'JavaScript and TypeScript prerequisites',
    title: 'Variables, Functions, and Modules',
    slug: 'react-js-variables-functions-modules',
    summary:
      'Use let, const, arrow functions, and imports the way React components expect.',
    concept:
      'React files are modules, and components are functions. const is the default for values that are not reassigned, while event handlers and helpers are ordinary functions passed around as values.',
    example:
      'Create a formatName helper, export a small data array, import it into a component file, and call the helper while rendering.',
    predict:
      'Given a helper imported from another module, predict which values are available locally and which names are out of scope.',
    fix:
      'Fix a helper accidentally called during render setup, a reassigned const, and an import using the wrong exported name.',
    build:
      'Build a tiny utilities module with a formatter and a component that imports and uses it.',
    project:
      'Diagnostic task: prepare component-shaped data without JSX errors.',
    check:
      'Confirm the learner knows that React component files are JavaScript modules made from functions and values.',
    examples: reactExample.variablesFunctionsModules,
  }),
  reactTopicLesson({
    module: 'JavaScript and TypeScript prerequisites',
    title: 'Objects, Arrays, and Destructuring',
    slug: 'react-js-objects-arrays-destructuring',
    summary:
      'Read object and array data in the same shapes used by props and list rendering.',
    concept:
      'Most React UI starts as arrays of objects. Destructuring pulls named fields out of those objects so render code can focus on meaning instead of repeated property access.',
    example:
      'Destructure title, rating, and tags from movie objects before rendering a compact watchlist row.',
    predict:
      'Given nested destructuring with a renamed field, predict the local variable names and rendered output.',
    fix:
      'Fix a component that destructures a missing field and another that mutates an object while preparing display data.',
    build:
      'Build a small data preview from an array of product objects using destructuring.',
    project:
      'Diagnostic task: destructure component data before passing it into JSX.',
    check:
      'Confirm the learner can trace object shape, local variable names, and immutable reads.',
    examples: reactExample.objectsArraysDestructuring,
  }),
  reactTopicLesson({
    module: 'JavaScript and TypeScript prerequisites',
    title: 'Array Transformations for UI',
    slug: 'react-js-map-filter-reduce',
    summary:
      'Use map, filter, and reduce as the bridge between raw data and rendered UI.',
    concept:
      'React list rendering is array transformation. map creates one rendered item per value, filter chooses which values remain visible, and reduce derives summaries like totals.',
    example:
      'Filter products by category, map visible products to rows, and reduce prices into a cart total.',
    predict:
      'Given a filter and map chain, predict which items survive and what labels are produced.',
    fix:
      'Fix a map callback with no return value and a reduce call with the wrong initial value.',
    build:
      'Transform an array into visible rows plus a derived summary.',
    project:
      'Diagnostic task: filter a product list and derive a total before any React state appears.',
    check:
      'Confirm the learner can choose map, filter, or reduce based on the desired data shape.',
    examples: reactExample.arrayTransforms,
  }),
  reactTopicLesson({
    module: 'JavaScript and TypeScript prerequisites',
    title: 'TypeScript Props and Data Shapes',
    slug: 'react-typescript-props-data-shapes',
    summary:
      'Describe component inputs with basic types and interfaces.',
    concept:
      'TypeScript makes prop contracts explicit. Interfaces describe the object shape a component expects and catch mismatches before the UI runs.',
    example:
      'Define a Movie type and MovieCardProps interface, then use them to type a reusable component.',
    predict:
      'Given an interface and a component call, predict whether TypeScript accepts the props.',
    fix:
      'Fix a wrong prop type, a missing required prop, and an optional prop used without a fallback.',
    build:
      'Type a helper function and a small component prop interface.',
    project:
      'Diagnostic task: type function parameters, return values, and component-shaped data.',
    check:
      'Confirm the learner can explain required versus optional fields in a prop contract.',
    examples: reactExample.typescriptShapes,
  }),
  reactTopicLesson({
    module: 'React fundamentals',
    title: 'What React Solves',
    slug: 'react-what-react-solves',
    summary:
      'Understand why React turns state and data into a predictable UI tree.',
    concept:
      'React helps keep UI synchronized with data. Instead of manually editing DOM nodes, components describe what the UI should look like for the current inputs.',
    example:
      'Compare manually updating a status label with returning JSX from a StatusPanel component.',
    predict:
      'Given a data value and a component, predict the rendered UI without thinking about DOM mutation steps.',
    fix:
      'Fix code that tries to manually query and update DOM text inside the component body.',
    build:
      'Build a static status panel from plain data.',
    project:
      'Mini project step: define the static sections of a developer portfolio.',
    check:
      'Confirm the learner can describe React as declarative UI rather than manual DOM scripting.',
    examples: reactExample.reactSolves,
  }),
  reactTopicLesson({
    module: 'React fundamentals',
    title: 'JSX Rules and Expressions',
    slug: 'react-jsx-rules-expressions',
    summary:
      'Write valid JSX with expressions, attributes, fragments, and readable markup.',
    concept:
      'JSX looks like HTML but is JavaScript syntax. Expressions go in braces, attributes use React names like className, and one component returns one root expression.',
    example:
      'Render a profile heading with className, a dynamic role expression, and a fragment wrapping sibling elements.',
    predict:
      'Given JSX with strings, braces, and nested elements, predict which values render as text.',
    fix:
      'Fix invalid class attributes, unclosed tags, adjacent root elements, and accidental object rendering.',
    build:
      'Build a static profile section using valid JSX rules.',
    project:
      'Mini project step: assemble the static portfolio shell.',
    check:
      'Confirm the learner can distinguish literal text from JavaScript expressions in JSX.',
    examples: reactExample.jsxRules,
  }),
  reactTopicLesson({
    module: 'React fundamentals',
    title: 'Components as UI Functions',
    slug: 'react-components-as-ui-functions',
    summary:
      'Create components that own one clear piece of the rendered tree.',
    concept:
      'A component is a capitalized function that returns UI. Clear components have a narrow responsibility and can be composed into larger screens.',
    example:
      'Split a ProfilePage into Avatar, Bio, SkillList, and ContactLinks components.',
    predict:
      'Given nested component calls, predict the final component tree and visible text.',
    fix:
      'Fix lowercase component names and components that do too many unrelated jobs.',
    build:
      'Build a profile card from three smaller components.',
    project:
      'Mini project step: split the portfolio into reusable static sections.',
    check:
      'Confirm the learner can explain each component boundary.',
    examples: reactExample.componentFunction,
  }),
  reactTopicLesson({
    module: 'React fundamentals',
    title: 'Composition and Project Structure',
    slug: 'react-composition-project-structure',
    summary:
      'Organize small components into a readable app structure.',
    concept:
      'Composition means building large interfaces by nesting small components. Project structure should make those boundaries easy to find without creating folders before they are useful.',
    example:
      'Create App, components/ProfileCard, components/Section, and data/profile files for a static page.',
    predict:
      'Given an import tree, predict which component renders inside which parent.',
    fix:
      'Fix a circular import and a component placed in the wrong ownership layer.',
    build:
      'Refactor one large static page into organized files and composed components.',
    project:
      'Mini project: static developer portfolio page.',
    check:
      'Confirm the learner can navigate from App to leaf components and explain the composition path.',
    examples: reactExample.compositionStructure,
  }),
  reactTopicLesson({
    module: 'Props and reusable components',
    title: 'Passing and Destructuring Props',
    slug: 'react-passing-destructuring-props',
    summary:
      'Pass parent-owned values into child components through explicit props.',
    concept:
      'Props are read-only inputs. The parent decides the values, and the child destructures those values to render one reusable UI shape.',
    example:
      'Render three ProfileCard instances by passing name, role, and accentColor props.',
    predict:
      'Given several component calls, predict what each child receives and displays.',
    fix:
      'Fix a wrong prop name, missing prop, and a child trying to reassign a prop.',
    build:
      'Build a reusable card that renders different people from props.',
    project:
      'Mini project step: replace duplicated cards with one prop-driven card.',
    check:
      'Confirm the learner can trace data from parent JSX into child parameters.',
    examples: reactExample.props,
  }),
  reactTopicLesson({
    module: 'Props and reusable components',
    title: 'Required and Optional Props',
    slug: 'react-required-optional-props',
    summary:
      'Design prop contracts with required data and safe fallbacks.',
    concept:
      'Required props are necessary for the component to make sense. Optional props should have a clear default or conditional rendering path.',
    example:
      'Create a Button with required children and optional variant, disabled, and icon props.',
    predict:
      'Given optional props and defaults, predict which label, class, and disabled state render.',
    fix:
      'Fix optional props used unsafely and a component that hides required data behind defaults.',
    build:
      'Build a typed Button with required label content and optional variant.',
    project:
      'Mini project step: add reusable action buttons to the listing page.',
    check:
      'Confirm the learner can decide what must be required and what can be optional.',
  }),
  reactTopicLesson({
    module: 'Props and reusable components',
    title: 'Rendering Different Data with One Component',
    slug: 'react-one-component-many-items',
    summary:
      'Avoid duplicated components by changing inputs instead of markup.',
    concept:
      'A reusable component captures the repeated UI pattern. Different data should flow through props rather than copied component definitions.',
    example:
      'Render a movie listing page by calling MovieCard for each movie object.',
    predict:
      'Given one card component and multiple prop sets, predict which cards render differently.',
    fix:
      'Fix copy-pasted card components that drift out of sync.',
    build:
      'Refactor duplicated product cards into one reusable ProductCard.',
    project:
      'Mini project: product or movie listing page generated from data.',
    check:
      'Confirm the learner can identify duplication that should become props.',
  }),
  reactTopicLesson({
    module: 'Props and reusable components',
    title: 'The Children Prop',
    slug: 'react-children-prop-layouts',
    summary:
      'Use children to build wrappers and layout components without hiding content ownership.',
    concept:
      'children lets a parent place nested content inside a reusable wrapper. The wrapper owns layout and framing, while the parent owns the content inside.',
    example:
      'Build a Card and PageSection component that render children inside a consistent layout.',
    predict:
      'Given nested JSX, predict which content becomes children and where it appears.',
    fix:
      'Fix a wrapper that ignores children and another that hard-codes content it should receive from the parent.',
    build:
      'Build a reusable layout wrapper using children.',
    project:
      'Mini project step: wrap listing page sections consistently.',
    check:
      'Confirm the learner can explain wrapper ownership versus content ownership.',
  }),
  reactTopicLesson({
    module: 'Rendering collections and conditions',
    title: 'Rendering Arrays with Map',
    slug: 'react-rendering-arrays-map',
    summary:
      'Turn arrays of data into arrays of elements.',
    concept:
      'map is the core list-rendering operation: one input item becomes one rendered element. The mapping should stay readable and preserve the data identity.',
    example:
      'Map contacts into ContactRow elements with name, email, and status.',
    predict:
      'Given an array and a map callback, predict the rendered rows and their order.',
    fix:
      'Fix a map callback missing a return and list markup with repeated hard-coded rows.',
    build:
      'Render a list of tasks from an array.',
    project:
      'Mini project step: render the searchable contact or movie list.',
    check:
      'Confirm the learner can explain the input item to output element transformation.',
    examples: reactExample.mapKeys,
  }),
  reactTopicLesson({
    module: 'Rendering collections and conditions',
    title: 'Stable Keys and Component Identity',
    slug: 'react-stable-keys-identity',
    summary:
      'Use stable keys so React keeps state attached to the right logical item.',
    concept:
      'Keys tell React which previous child corresponds to which next child. Stable IDs preserve local state, focus, and animations when items reorder or disappear.',
    example:
      'Render reorderable tasks with database IDs as keys and compare that with index keys.',
    predict:
      'Given a delete or reorder operation, predict how index keys can attach state to the wrong row.',
    fix:
      'Fix array index keys, random keys generated during render, and duplicate label keys.',
    build:
      'Render a keyed task list using each task id.',
    project:
      'Mini project step: preserve row identity while filtering the list.',
    check:
      'Confirm the learner can choose a key from stable data identity.',
    examples: reactExample.mapKeys,
  }),
  reactTopicLesson({
    module: 'Rendering collections and conditions',
    title: 'Conditional Rendering Patterns',
    slug: 'react-conditional-rendering-patterns',
    summary:
      'Choose clear rendering branches for badges, panels, and alternate states.',
    concept:
      'Conditional rendering is ordinary JavaScript controlling which JSX branch is returned. Major branches deserve if statements; small choices can use ternaries or boolean conditions carefully.',
    example:
      'Render status badges for active, paused, and completed tasks.',
    predict:
      'Given a status value, predict which badge and actions appear.',
    fix:
      'Fix nested ternaries that hide states and count && markup that renders 0.',
    build:
      'Display different badges by status.',
    project:
      'Mini project step: show the correct UI for filtered and selected items.',
    check:
      'Confirm the learner can make branches explicit and readable.',
  }),
  reactTopicLesson({
    module: 'Rendering collections and conditions',
    title: 'Empty, Loading, and Error States',
    slug: 'react-empty-loading-error-states',
    summary:
      'Design collection views for every state, not only the successful one.',
    concept:
      'Real UI has states: loading, error, empty, and success. Each state needs a deliberate branch so the user is never left with a blank or misleading screen.',
    example:
      'Build a ResultsPanel that switches between loading text, error recovery, empty guidance, and a results list.',
    predict:
      'Given loading, error, and results values, predict which state takes priority.',
    fix:
      'Fix a view that shows an empty state while data is still loading and one that hides errors behind an empty list.',
    build:
      'Show loading, error, empty, and success states for a list.',
    project:
      'Mini project: searchable contact or movie list with complete UI states.',
    check:
      'Confirm the learner can order UI state branches by priority.',
  }),
  reactTopicLesson({
    module: 'State and events',
    title: 'useState and Event Handlers',
    slug: 'react-usestate-event-handlers',
    summary:
      'Store changing UI data and update it from explicit user events.',
    concept:
      'useState gives a component memory. Event handlers request updates, and React renders again with the new state value.',
    example:
      'Build a counter and toggle with click handlers passed as function references.',
    predict:
      'Given a click sequence, predict the rendered state after each event.',
    fix:
      'Fix onClick handlers called during render and state values mutated directly.',
    build:
      'Build a counter, toggle, and like button.',
    project:
      'Mini project step: add interactive controls to the habit tracker.',
    check:
      'Confirm the learner can trace event, setter call, rerender, and UI output.',
  }),
  reactTopicLesson({
    module: 'State and events',
    title: 'Functional Updates and Batching',
    slug: 'react-functional-updates-batching',
    summary:
      'Use updater functions when next state depends on previous state.',
    concept:
      'React can batch multiple state updates from the same event. Functional updaters receive the latest queued value, which keeps dependent updates correct.',
    example:
      'Compare setCount(count + 1) twice with setCount(previous => previous + 1) twice.',
    predict:
      'Predict the final count after multiple queued updates.',
    fix:
      'Fix stale state reads in increment, decrement, and append handlers.',
    build:
      'Build controls that correctly update from previous state.',
    project:
      'Mini project step: keep streak and habit counts accurate during rapid clicks.',
    check:
      'Confirm the learner can explain when the updater form is required.',
    examples: reactExample.stateUpdates,
  }),
  reactTopicLesson({
    module: 'State and events',
    title: 'Updating Arrays and Objects Immutably',
    slug: 'react-immutable-array-object-updates',
    summary:
      'Create new arrays and objects when updating state.',
    concept:
      'React state should be treated as immutable. New references let React and humans see what changed without hidden mutation.',
    example:
      'Add, toggle, edit, and delete todo items using spread, map, and filter.',
    predict:
      'Given an immutable update, predict which item changes and which references are replaced.',
    fix:
      'Fix push, splice, direct property assignment, and nested mutation in state.',
    build:
      'Add and delete tasks without mutating the existing array.',
    project:
      'Mini project step: implement habit add/delete/toggle behavior.',
    check:
      'Confirm the learner can choose map, filter, or spread for each update.',
    examples: reactExample.immutableState,
  }),
  reactTopicLesson({
    module: 'State and events',
    title: 'Controlled Inputs and Derived State',
    slug: 'react-controlled-inputs-derived-state',
    summary:
      'Connect input values to state and derive values during rendering.',
    concept:
      'A controlled input receives its value from React state and reports edits with onChange. Values that can be calculated from state should usually be derived during render, not stored separately.',
    example:
      'Build a search field whose query state filters visible tasks and derives the result count.',
    predict:
      'Given query state and tasks, predict the input value, visible rows, and derived count.',
    fix:
      'Fix inputs missing onChange and duplicated filteredResults state that falls out of sync.',
    build:
      'Build a controlled search field with derived visible items.',
    project:
      'Mini project: todo or habit tracker with controlled entry and derived summaries.',
    check:
      'Confirm the learner can identify the smallest source of truth.',
  }),
  reactTopicLesson({
    module: 'Forms',
    title: 'Controlled Text Inputs',
    slug: 'react-controlled-text-inputs',
    summary:
      'Keep form fields synchronized with React state.',
    concept:
      'A controlled input receives its displayed value from state and reports edits through onChange. This makes the input part of the same render loop as the rest of the UI.',
    example:
      'Build a profile name field whose value is stored in state and previewed below the form.',
    predict:
      'Given an input value and a change event, predict the next state and rendered preview.',
    fix:
      'Fix an input with value but no onChange and another input that uses defaultValue when the UI needs live state.',
    build:
      'Build controlled name, email, and role fields.',
    project:
      'Mini project step: add editable fields to the user profile editor.',
    check:
      'Confirm the learner can trace field value, onChange event, setter call, and rerender.',
  }),
  reactTopicLesson({
    module: 'Forms',
    title: 'Multiple Fields and Form Shape',
    slug: 'react-multiple-form-fields',
    summary:
      'Manage several related form fields without losing track of their source of truth.',
    concept:
      'A form can store each field separately or store one object representing the whole form. The right shape depends on how the fields update and validate together.',
    example:
      'Build a profile form object with name, email, and role, updating one field at a time with computed property names.',
    predict:
      'Given a field change, predict which property changes and which properties are preserved.',
    fix:
      'Fix an object state update that replaces the whole form and accidentally drops other fields.',
    build:
      'Build a multi-field profile editor with one form object.',
    project:
      'Mini project step: edit multiple profile fields safely.',
    check:
      'Confirm the learner can preserve object fields while updating one form value.',
  }),
  reactTopicLesson({
    module: 'Forms',
    title: 'Submit Events and preventDefault',
    slug: 'react-form-submit-prevent-default',
    summary:
      'Handle form submission inside React instead of refreshing the page.',
    concept:
      'Submitting a form is a browser event. React handlers usually call preventDefault so validation, saving, and feedback can happen without a full page reload.',
    example:
      'Build a save handler that prevents refresh, validates fields, and displays a saved message.',
    predict:
      'Predict what happens with and without preventDefault when the Save button is clicked.',
    fix:
      'Fix a form that refreshes unexpectedly and loses the typed input values.',
    build:
      'Build a submit handler that validates and renders success feedback.',
    project:
      'Mini project step: save profile edits without leaving the page.',
    check:
      'Confirm the learner can explain the difference between native submission and React-managed submission.',
    examples: reactExample.form,
  }),
  reactTopicLesson({
    module: 'Forms',
    title: 'Validation and Error Messages',
    slug: 'react-form-validation-errors',
    summary:
      'Derive helpful validation messages from current field values.',
    concept:
      'Validation is often derived from current form state. Errors should be visible, specific, and connected to the field or submit action that produced them.',
    example:
      'Validate required name, valid email shape, and minimum bio length, then show field-level messages.',
    predict:
      'Given form values, predict which validation messages render.',
    fix:
      'Fix validation stored in stale state and errors that appear without telling the user how to recover.',
    build:
      'Build required-field and email validation with accessible messages.',
    project:
      'Mini project step: add validation to the profile editor.',
    check:
      'Confirm the learner can derive errors from values and render useful feedback.',
  }),
  reactTopicLesson({
    module: 'Forms',
    title: 'Reusable Form Components and TanStack Form',
    slug: 'react-reusable-form-components-tanstack-form',
    summary:
      'Extract repeated form UI before introducing production form abstractions.',
    concept:
      'Reusable form components keep labels, descriptions, errors, and controls consistent. TanStack Form becomes useful after native controlled form mechanics are clear.',
    example:
      'Extract a Field component that renders a label, input, help text, and error, then compare that with a TanStack Form field definition.',
    predict:
      'Given a reusable Field call, predict the label, input attributes, and error output.',
    fix:
      'Fix a field component that hides labels or disconnects errors from the input.',
    build:
      'Build reusable text field and select field components.',
    project:
      'Mini project: user profile editor with reusable form components.',
    check:
      'Confirm the learner can explain what native React handles and what TanStack Form abstracts.',
  }),
  reactTopicLesson({
    module: 'Component communication',
    title: 'Lifting State to a Common Parent',
    slug: 'react-lifting-state-common-parent',
    summary:
      'Move state to the closest component that needs to coordinate its readers and writers.',
    concept:
      'When siblings need the same changing value, duplicate state creates drift. The closest common parent should own the value and pass it down.',
    example:
      'Lift selectedProductId from two sibling panels into ProductPage so details and recommendations stay in sync.',
    predict:
      'Given a child click, predict which parent state changes and which siblings receive new props.',
    fix:
      'Fix two sibling filters that each store their own copy of the selected category.',
    build:
      'Lift selected item state from children into a parent list page.',
    project:
      'Mini project step: coordinate cart selection and summary from one source of truth.',
    check:
      'Confirm the learner can identify the closest common owner.',
    examples: reactExample.communication,
  }),
  reactTopicLesson({
    module: 'Component communication',
    title: 'Passing Callback Props',
    slug: 'react-passing-callback-props',
    summary:
      'Let children request changes without owning parent state.',
    concept:
      'Callbacks are props that represent actions. A child calls a callback in response to an event, and the parent decides how state changes.',
    example:
      'Pass onQuantityChange to a QuantityControls child that renders increment and decrement buttons.',
    predict:
      'Given onClick={onAdd} versus onClick={onAdd()}, predict when the parent callback runs.',
    fix:
      'Fix callbacks called during render and callbacks that receive the wrong item id.',
    build:
      'Build child controls that notify the parent through callbacks.',
    project:
      'Mini project step: update cart quantities from child buttons.',
    check:
      'Confirm the learner can separate child event handling from parent state ownership.',
  }),
  reactTopicLesson({
    module: 'Component communication',
    title: 'Parent-Controlled Components',
    slug: 'react-parent-controlled-components',
    summary:
      'Build components whose state is owned by their parent.',
    concept:
      'A controlled component receives its value and change callback from a parent. This pattern makes reusable UI predictable when another component owns the decision.',
    example:
      'Build a Modal controlled by isOpen and onClose props from the parent page.',
    predict:
      'Given isOpen and a close click, predict which component owns the next state.',
    fix:
      'Fix a modal that stores internal open state even though the parent needs to open and close it.',
    build:
      'Build a parent-controlled modal and tabs component.',
    project:
      'Mini project step: open cart details from the parent dashboard.',
    check:
      'Confirm the learner can recognize when a component should be controlled by its parent.',
  }),
  reactTopicLesson({
    module: 'Component communication',
    title: 'Sibling Communication Through Shared State',
    slug: 'react-sibling-communication-shared-state',
    summary:
      'Coordinate sibling components through the parent rather than direct sibling calls.',
    concept:
      'Siblings do not talk directly. They communicate through shared parent state: one sibling requests a change, the parent updates, and the other sibling receives new props.',
    example:
      'A SearchBox updates query in the parent while ResultsList receives the filtered results.',
    predict:
      'Given a search input change, predict the parent state and result list output.',
    fix:
      'Fix sibling components that import each other to share data.',
    build:
      'Build a search field controlling a sibling results list.',
    project:
      'Mini project step: coordinate filters and cart results.',
    check:
      'Confirm the learner can describe the parent-mediated communication loop.',
  }),
  reactTopicLesson({
    module: 'Component communication',
    title: 'State Ownership Decisions',
    slug: 'react-state-ownership-decisions',
    summary:
      'Choose between local state, parent state, URL state, context, and server cache.',
    concept:
      'State placement is a design decision. Put state where it has the smallest useful owner, and move it only when another part of the app genuinely needs it.',
    example:
      'Classify modal open state, search filters, authenticated user, fetched issues, and form drafts by their proper home.',
    predict:
      'Given a UI value and its consumers, predict where it should live.',
    fix:
      'Fix a component that moves every value into context and another that keeps shared state too low.',
    build:
      'Refactor a small shopping cart to clearer state ownership.',
    project:
      'Mini project: small shopping cart with explicit ownership decisions.',
    check:
      'Confirm the learner can justify state placement instead of defaulting to useState everywhere.',
  }),
  reactTopicLesson({
    module: 'Effects and external systems',
    title: 'What Effects Are Actually For',
    slug: 'react-effects-purpose',
    summary:
      'Use effects to synchronize with external systems, not to calculate render data.',
    concept:
      'Effects run after React commits a render. They are for synchronizing with systems outside React, such as browser APIs, timers, subscriptions, widgets, and network requests.',
    example:
      'Compare deriving a filtered list during render with using an effect to subscribe to online/offline browser events.',
    predict:
      'Given a task, decide whether it belongs in render, an event handler, or an effect.',
    fix:
      'Remove an unnecessary effect used only to copy derived data into state.',
    build:
      'Build a document title synchronization effect.',
    project:
      'Mini project step: identify the external systems in a dashboard.',
    check:
      'Confirm the learner can state the external system an effect synchronizes with.',
  }),
  reactTopicLesson({
    module: 'Effects and external systems',
    title: 'Dependency Arrays and Stale Closures',
    slug: 'react-effect-dependencies-stale-closures',
    summary:
      'Declare reactive values so effects rerun with the right data.',
    concept:
      'An effect captures values from a render. The dependency array tells React when those captured values should be refreshed by rerunning the effect.',
    example:
      'Build a subscription effect that depends on roomId and logs the correct current room.',
    predict:
      'Given dependencies and state changes, predict whether the effect reruns and which value it sees.',
    fix:
      'Fix missing dependencies, stale interval callbacks, and loops caused by updating the dependency inside the effect.',
    build:
      'Build an effect that responds correctly to a selected id.',
    project:
      'Mini project step: keep profile dashboard synchronization current.',
    check:
      'Confirm the learner can explain why each dependency is present.',
  }),
  reactTopicLesson({
    module: 'Effects and external systems',
    title: 'Cleanup for Timers and Browser APIs',
    slug: 'react-effect-cleanup-timers-browser-apis',
    summary:
      'Undo external synchronization before effects rerun or components unmount.',
    concept:
      'Cleanup prevents old subscriptions, event listeners, timers, and requests from continuing after the render they belonged to is gone.',
    example:
      'Start an interval only while a timer is running and clear it in cleanup.',
    predict:
      'Given running state toggles, predict when setup and cleanup happen.',
    fix:
      'Fix a timer that creates multiple intervals and an event listener that is never removed.',
    build:
      'Build a timer with correct cleanup.',
    project:
      'Mini project step: add live refresh controls without leaks.',
    check:
      'Confirm the learner can name what cleanup must undo.',
    examples: reactExample.effects,
  }),
  reactTopicLesson({
    module: 'Effects and external systems',
    title: 'Fetching Data with Loading and Error States',
    slug: 'react-effect-fetch-loading-error',
    summary:
      'Fetch external data while rendering clear pending, failed, empty, and success states.',
    concept:
      'Fetching is external synchronization. The component needs explicit UI for the request lifecycle and must avoid letting stale responses overwrite newer data.',
    example:
      'Fetch a GitHub profile by username and render loading, error, not found, and success branches.',
    predict:
      'Given request state, predict which UI branch renders.',
    fix:
      'Fix a fetch effect that ignores errors and another where an older response overwrites a newer search.',
    build:
      'Build fetch and display API data with loading and error states.',
    project:
      'Mini project: weather or GitHub profile dashboard.',
    check:
      'Confirm the learner can describe the full request lifecycle in UI terms.',
  }),
  reactTopicLesson({
    module: 'Effects and external systems',
    title: 'Avoiding Unnecessary Effects',
    slug: 'react-avoiding-unnecessary-effects',
    summary:
      'Prefer render calculations and event handlers when no external system is involved.',
    concept:
      'Effects add lifecycle complexity. If a value can be calculated from props or state during render, or an action happens because of a specific user event, an effect is usually the wrong tool.',
    example:
      'Replace effects that copy fullName and filteredItems into state with render-time derivations.',
    predict:
      'Given a code snippet, predict whether removing the effect simplifies the data flow.',
    fix:
      'Fix duplicated derived state and effect-driven event logic.',
    build:
      'Refactor unnecessary effects out of a component.',
    project:
      'Mini project step: simplify dashboard data flow before adding real synchronization.',
    check:
      'Confirm the learner can explain why an effect is not needed.',
  }),
  reactTopicLesson({
    module: 'TanStack Router',
    title: 'Route Definitions and Links',
    slug: 'tanstack-router-route-definitions-links',
    summary:
      'Define routes and navigate with typed links instead of manual URL strings.',
    concept:
      'Routes connect URL paths to components. Links should point to route definitions so navigation stays consistent with the route tree.',
    example:
      'Create /products and /dashboard routes, then link between them from a shared nav.',
    predict:
      'Given a route tree and a Link, predict which component renders after navigation.',
    fix:
      'Fix links pointing to the wrong route and route files placed at the wrong path.',
    build:
      'Create a products route and navigation link.',
    project:
      'Mini project step: add top-level movie discovery routes.',
    check:
      'Confirm the learner can trace URL path to route component.',
  }),
  reactTopicLesson({
    module: 'TanStack Router',
    title: 'Dynamic Route Parameters',
    slug: 'tanstack-router-dynamic-params',
    summary:
      'Use route params to identify resources like products, movies, and users.',
    concept:
      'A dynamic segment captures part of the URL as a parameter. The page uses that parameter to select or load the right resource.',
    example:
      'Build /products/$productId and render the selected product detail.',
    predict:
      'Given /products/abc, predict the param name and value.',
    fix:
      'Fix a detail page that reads the wrong param name or fails when the resource is missing.',
    build:
      'Build /products/$productId with not-found handling.',
    project:
      'Mini project step: add movie detail pages.',
    check:
      'Confirm the learner can distinguish route params from local component state.',
    examples: reactExample.router,
  }),
  reactTopicLesson({
    module: 'TanStack Router',
    title: 'Nested and Layout Routes',
    slug: 'tanstack-router-nested-layout-routes',
    summary:
      'Keep shared shells stable while nested pages change.',
    concept:
      'Layout routes render shared UI around nested route content. They are ideal for dashboards, settings areas, and app shells with persistent navigation.',
    example:
      'Build a dashboard layout with shared sidebar and nested progress, account, and projects pages.',
    predict:
      'Given a nested URL, predict which layout and leaf page render together.',
    fix:
      'Fix repeated layout markup copied into every child route.',
    build:
      'Create a shared dashboard layout route.',
    project:
      'Mini project step: add a movie app shell with nested pages.',
    check:
      'Confirm the learner can explain what stays mounted across nested navigation.',
  }),
  reactTopicLesson({
    module: 'TanStack Router',
    title: 'Search Parameters for View State',
    slug: 'tanstack-router-search-params-view-state',
    summary:
      'Store shareable filters, sort order, and pagination in the URL.',
    concept:
      'Search params are a good home for view state that should survive refresh, browser navigation, and sharing a link.',
    example:
      'Store movie query, genre, and page in search params rather than local-only state.',
    predict:
      'Given a URL with search params, predict the filter state the page should render.',
    fix:
      'Fix filters that reset on refresh and search param parsing without safe defaults.',
    build:
      'Add search filters to the URL.',
    project:
      'Mini project step: make movie search shareable.',
    check:
      'Confirm the learner can decide when URL state beats local state.',
  }),
  reactTopicLesson({
    module: 'TanStack Router',
    title: 'Loaders and Not-Found States',
    slug: 'tanstack-router-loaders-not-found',
    summary:
      'Load route data before rendering and handle missing resources clearly.',
    concept:
      'Loaders prepare route data at the route boundary. Missing resources should produce a deliberate not-found state instead of a broken component.',
    example:
      'Load product detail data in a route loader and throw notFound when the id does not exist.',
    predict:
      'Given a loader result or missing id, predict whether the page, loading, or not-found state renders.',
    fix:
      'Fix a route that renders undefined data and crashes before showing not-found UI.',
    build:
      'Handle missing resources with loader logic.',
    project:
      'Mini project: multi-page movie discovery app.',
    check:
      'Confirm the learner can explain why data loading belongs at the route boundary.',
  }),
  reactTopicLesson({
    module: 'Server state and TanStack Query',
    title: 'Client State Versus Server State',
    slug: 'tanstack-query-client-vs-server-state',
    summary:
      'Choose the right owner for local UI values and remote cached data.',
    concept:
      'Client state is owned by the browser session. Server state is owned elsewhere and borrowed by the UI through fetching, caching, and synchronization.',
    example:
      'Classify modal open state, search text, current user profile, and issue list data.',
    predict:
      'Given a value, predict whether useState, URL search, context, or Query is the best home.',
    fix:
      'Fix server data copied into local state and never refreshed.',
    build:
      'Refactor a fetched list from effect state into query-shaped state.',
    project:
      'Mini project step: define dashboard state ownership before fetching.',
    check:
      'Confirm the learner can describe who owns the data.',
  }),
  reactTopicLesson({
    module: 'Server state and TanStack Query',
    title: 'Queries, Caching, Loading, and Error UI',
    slug: 'tanstack-query-queries-caching-loading-error',
    summary:
      'Fetch server data through queries and render every request state.',
    concept:
      'A query represents a cached asynchronous read. Query keys identify data, and the UI should handle loading, error, empty, and success states.',
    example:
      'Fetch issues with queryKey [issues, filters] and render the request lifecycle.',
    predict:
      'Given a query key change, predict whether cached data can be reused or a new fetch is needed.',
    fix:
      'Fix a query with an unstable key and a component that ignores the error state.',
    build:
      'Fetch a list with loading and error handling.',
    project:
      'Mini project step: load issue tracker rows.',
    check:
      'Confirm the learner can explain what belongs in a query key.',
  }),
  reactTopicLesson({
    module: 'Server state and TanStack Query',
    title: 'Mutations and Invalidation',
    slug: 'tanstack-query-mutations-invalidation',
    summary:
      'Write server data and refresh stale cached reads.',
    concept:
      'Mutations change server state. After a mutation succeeds, related queries often need invalidation so the UI refetches fresh data.',
    example:
      'Add an issue with a mutation, then invalidate the issues query.',
    predict:
      'Given a successful mutation, predict which cached query should become stale.',
    fix:
      'Fix a create action that succeeds on the server but leaves the old list on screen.',
    build:
      'Add and delete records with mutation and invalidation.',
    project:
      'Mini project step: add issue creation and deletion.',
    check:
      'Confirm the learner can connect writes to affected reads.',
    examples: reactExample.query,
  }),
  reactTopicLesson({
    module: 'Server state and TanStack Query',
    title: 'Refetching and Stale Data',
    slug: 'tanstack-query-refetching-stale-data',
    summary:
      'Control when cached data is fresh enough and when it should refetch.',
    concept:
      'Cached data can be fresh, stale, fetching, or invalidated. Query settings and user actions decide when background refetching should happen.',
    example:
      'Tune staleTime for a dashboard summary and add a manual refresh button.',
    predict:
      'Given staleTime and focus events, predict when refetching occurs.',
    fix:
      'Fix over-fetching caused by missing staleTime and under-fetching caused by disabled invalidation.',
    build:
      'Build a refreshable dashboard panel.',
    project:
      'Mini project step: add predictable refetch behavior.',
    check:
      'Confirm the learner can distinguish stale data from absent data.',
  }),
  reactTopicLesson({
    module: 'Server state and TanStack Query',
    title: 'Optimistic Updates',
    slug: 'tanstack-query-optimistic-updates',
    summary:
      'Show immediate UI feedback while preserving rollback safety.',
    concept:
      'Optimistic updates temporarily update the cache before the server confirms the write. They need rollback logic for failures and invalidation for final consistency.',
    example:
      'Favorite an issue immediately, roll back if the request fails, and invalidate after settlement.',
    predict:
      'Given success or failure, predict the optimistic UI, rollback, and final cache state.',
    fix:
      'Fix an optimistic update that cannot restore the previous data after an error.',
    build:
      'Build an optimistic favorite button.',
    project:
      'Mini project: issue tracker or task dashboard connected to an API.',
    check:
      'Confirm the learner can explain the risk and payoff of optimistic UI.',
  }),
  reactTopicLesson({
    module: 'Context and shared application state',
    title: 'Prop Drilling and When Context Helps',
    slug: 'react-context-prop-drilling',
    summary:
      'Recognize when passing props through layers becomes a design smell.',
    concept:
      'Prop drilling happens when intermediate components pass values only so deeper descendants can use them. Context helps when many descendants need the same app-level value.',
    example:
      'Pass a theme value through App, Layout, Header, and ThemeButton, then identify which components actually use it.',
    predict:
      'Given a component tree, predict which props are truly needed by each layer.',
    fix:
      'Fix unnecessary prop forwarding without replacing every prop with context.',
    build:
      'Refactor a deeply forwarded theme prop into a cleaner shared value.',
    project:
      'Mini project step: identify dashboard values that are app-level rather than local.',
    check:
      'Confirm the learner can explain when context helps and when composition or props are enough.',
  }),
  reactTopicLesson({
    module: 'Context and shared application state',
    title: 'Context Providers and Consumers',
    slug: 'react-context-providers-consumers',
    summary:
      'Create providers that make shared values available to descendants.',
    concept:
      'A context provider defines the value available below it in the tree. Components outside that provider cannot read the value.',
    example:
      'Build ThemeContext with a ThemeProvider wrapping the dashboard shell.',
    predict:
      'Given provider placement, predict which components can access the theme value.',
    fix:
      'Fix a component reading context outside the provider and a provider placed too low in the tree.',
    build:
      'Create a ThemeProvider and consume it from nested buttons.',
    project:
      'Mini project step: wrap the authenticated dashboard shell in shared providers.',
    check:
      'Confirm the learner can trace context availability through the tree.',
    examples: reactExample.context,
  }),
  reactTopicLesson({
    module: 'Context and shared application state',
    title: 'Custom Context Hooks',
    slug: 'react-custom-context-hooks',
    summary:
      'Wrap context access in a small hook with useful guardrails.',
    concept:
      'A custom context hook centralizes useContext access, gives consumers a clear API, and can throw a helpful error when the provider is missing.',
    example:
      'Create useTheme that reads ThemeContext and rejects usage outside ThemeProvider.',
    predict:
      'Given a component using useTheme outside the provider, predict the error and why it helps.',
    fix:
      'Fix repeated raw useContext calls and missing provider guard messages.',
    build:
      'Build useTheme and useAuth custom context hooks.',
    project:
      'Mini project step: expose dashboard theme and session through clear hooks.',
    check:
      'Confirm the learner can explain why context hooks improve the consuming API.',
  }),
  reactTopicLesson({
    module: 'Context and shared application state',
    title: 'When Not to Use Context',
    slug: 'react-when-not-to-use-context',
    summary:
      'Avoid context for state that has a better local, URL, or server-state owner.',
    concept:
      'Context is not a universal state manager. Local drafts, route filters, and fetched server records often belong in useState, URL search params, or TanStack Query instead.',
    example:
      'Classify form draft, theme, issue list, movie filters, and modal open state by the best owner.',
    predict:
      'Given a value and its consumers, predict whether context is overkill.',
    fix:
      'Fix a provider that stores every form field and fetched list in global context.',
    build:
      'Refactor misplaced context state into local state, URL state, or query state.',
    project:
      'Mini project: authenticated dashboard shell with only appropriate shared client state.',
    check:
      'Confirm the learner can defend not using context.',
  }),
  reactTopicLesson({
    module: 'Custom hooks',
    title: 'Extracting Reusable Behavior',
    slug: 'react-hooks-extracting-behavior',
    summary:
      'Move repeated stateful logic into a custom hook without changing component output.',
    concept:
      'A custom hook extracts behavior, not UI. Components stay responsible for markup while the hook owns repeated state transitions or synchronization.',
    example:
      'Extract repeated toggle state from two components into useToggle.',
    predict:
      'Given repeated component logic, predict which values and actions the hook should return.',
    fix:
      'Fix an extraction that hides markup inside a hook and makes the caller less flexible.',
    build:
      'Extract useToggle from repeated toggle components.',
    project:
      'Mini project step: collect repeated dashboard behaviors before building a hooks toolkit.',
    check:
      'Confirm the learner can name the behavior being extracted.',
  }),
  reactTopicLesson({
    module: 'Custom hooks',
    title: 'Rules of Hooks',
    slug: 'react-hooks-rules-call-order',
    summary:
      'Call hooks consistently so React can associate state with the right call.',
    concept:
      'Hooks must be called at the top level of components or other hooks. Consistent call order lets React match hook state to hook calls across renders.',
    example:
      'Compare a safe top-level useState call with a conditional hook call that breaks order.',
    predict:
      'Given a conditional render path, predict whether hook call order changes.',
    fix:
      'Fix hooks inside conditions, loops, nested functions, and event handlers.',
    build:
      'Refactor conditional hook logic into unconditional hooks plus conditional rendering.',
    project:
      'Mini project step: audit the hooks toolkit for rule violations.',
    check:
      'Confirm the learner can explain hook call order.',
    examples: reactExample.hooks,
  }),
  reactTopicLesson({
    module: 'Custom hooks',
    title: 'Designing a Hook API',
    slug: 'react-hooks-api-design',
    summary:
      'Return the smallest useful interface from a custom hook.',
    concept:
      'A hook API should fit the caller. It can return values, actions, status objects, or refs, but should avoid exposing internals the component does not need.',
    example:
      'Design useCounter to return count, increment, decrement, and reset rather than the raw internal setter.',
    predict:
      'Given caller requirements, predict whether an array or object return value is clearer.',
    fix:
      'Fix a custom hook that leaks too many implementation details.',
    build:
      'Build useCounter and useToggle with intentional return shapes.',
    project:
      'Mini project step: standardize hooks toolkit APIs.',
    check:
      'Confirm the learner can justify the hook return value.',
  }),
  reactTopicLesson({
    module: 'Custom hooks',
    title: 'useLocalStorage and useDebounce',
    slug: 'react-hooks-local-storage-debounce',
    summary:
      'Build practical hooks that connect state to browser persistence and delayed input.',
    concept:
      'Custom hooks can combine state, effects, and browser APIs behind a focused interface. useLocalStorage synchronizes with storage; useDebounce delays fast-changing values.',
    example:
      'Save a theme preference to localStorage and debounce a search query before fetching.',
    predict:
      'Given typing speed and debounce delay, predict when the debounced value changes.',
    fix:
      'Fix storage reads that run on every render and debounce timers without cleanup.',
    build:
      'Build useLocalStorage and useDebounce.',
    project:
      'Mini project: reusable hooks toolkit used across previous projects.',
    check:
      'Confirm the learner can name the external system and cleanup in each hook.',
  }),
  reactTopicLesson({
    module: 'Performance and rendering',
    title: 'Render Cycles and State Placement',
    slug: 'react-performance-render-cycles-state-placement',
    summary:
      'Reduce unnecessary work by putting state near the components that need it.',
    concept:
      'State updates rerender the component that owns the state and its descendants. Good state placement reduces the amount of UI that must recalculate.',
    example:
      'Move a search input state from App into SearchPanel so the sidebar does not rerender on every keystroke.',
    predict:
      'Given a state owner and component tree, predict which components rerender after an update.',
    fix:
      'Fix state lifted too high and state duplicated from props.',
    build:
      'Refactor a slow page by moving state to a smaller owner.',
    project:
      'Mini project step: improve dashboard state placement before memoization.',
    check:
      'Confirm the learner can trace rerenders from the state owner.',
  }),
  reactTopicLesson({
    module: 'Performance and rendering',
    title: 'Referential Equality and Memoization',
    slug: 'react-performance-referential-equality-memo',
    summary:
      'Understand when memo, useMemo, and useCallback can help.',
    concept:
      'Objects, arrays, and functions created during render have new references each time. Memoization can preserve references or skip expensive recalculation, but only when there is a measured reason.',
    example:
      'Memoize an expensive filtered list and stabilize a callback passed to a memoized child.',
    predict:
      'Given inline objects and callbacks, predict whether referential equality changes.',
    fix:
      'Fix expensive repeated computation without adding memoization everywhere.',
    build:
      'Use useMemo for a measured expensive calculation.',
    project:
      'Mini project step: optimize one proven dashboard bottleneck.',
    check:
      'Confirm the learner can explain both benefit and cost of memoization.',
  }),
  reactTopicLesson({
    module: 'Performance and rendering',
    title: 'Lazy Loading and Code Splitting',
    slug: 'react-performance-lazy-loading-code-splitting',
    summary:
      'Load heavy UI only when the user needs it.',
    concept:
      'Lazy loading splits code into smaller chunks. Route-level splitting is often a practical first optimization because users rarely need every screen immediately.',
    example:
      'Lazy-load an analytics route and show a suspense fallback while it loads.',
    predict:
      'Given a route transition, predict when the lazy chunk is requested and what fallback appears.',
    fix:
      'Fix a heavy component imported eagerly into the initial dashboard bundle.',
    build:
      'Lazy-load a route or heavy panel.',
    project:
      'Mini project step: split dashboard routes by feature.',
    check:
      'Confirm the learner can choose a meaningful split point.',
  }),
  reactTopicLesson({
    module: 'Performance and rendering',
    title: 'Measure Before Optimizing',
    slug: 'react-performance-measure-before-optimizing',
    summary:
      'Use evidence to decide which performance work is worth doing.',
    concept:
      'Performance improvements should target visible bottlenecks. Measuring first prevents premature complexity and teaches when doing nothing is the right choice.',
    example:
      'Profile a searchable table, identify the expensive render, then optimize only that path.',
    predict:
      'Given several possible changes, predict which one addresses the measured bottleneck.',
    fix:
      'Remove unnecessary memoization that makes simple code harder to read.',
    build:
      'Write a short performance review for an earlier component.',
    project:
      'Mini project: improve an earlier dashboard with measured rendering fixes.',
    check:
      'Confirm the learner can explain what was measured and why the optimization fits.',
  }),
  reactTopicLesson({
    module: 'Testing React applications',
    title: 'Testing Behavior, Not Implementation',
    slug: 'react-testing-behavior-not-implementation',
    summary:
      'Write tests that match what users can see and do.',
    concept:
      'Behavior tests survive refactors because they assert accessible output and interactions instead of private variables, component names, or CSS implementation details.',
    example:
      'Test that clicking Save shows a status message instead of testing internal saved state.',
    predict:
      'Given a test assertion, predict whether it depends on implementation details.',
    fix:
      'Fix brittle tests that query class names or inspect component internals.',
    build:
      'Test a counter and form from the user perspective.',
    project:
      'Mini project step: add behavior tests to an earlier component.',
    check:
      'Confirm the learner can rewrite an implementation-detail test as a behavior test.',
    examples: reactExample.testing,
  }),
  reactTopicLesson({
    module: 'Testing React applications',
    title: 'User Events and Form Tests',
    slug: 'react-testing-user-events-forms',
    summary:
      'Simulate realistic interactions with forms and controls.',
    concept:
      'Tests should interact with the app through accessible controls. User events communicate intent better than manually setting implementation state.',
    example:
      'Type into a profile form, submit it, and assert validation or success feedback.',
    predict:
      'Given a sequence of user events, predict the final visible UI.',
    fix:
      'Fix tests that bypass user behavior by calling component functions directly.',
    build:
      'Test form validation and successful submission.',
    project:
      'Mini project step: cover profile editor form behavior.',
    check:
      'Confirm the learner can choose accessible queries for form controls.',
  }),
  reactTopicLesson({
    module: 'Testing React applications',
    title: 'Async Tests, Loading, and Error States',
    slug: 'react-testing-async-loading-error',
    summary:
      'Test UI that changes after asynchronous work.',
    concept:
      'Async UI tests wait for the user-visible result of loading, success, or failure. The test should assert the lifecycle without assuming exact implementation timing.',
    example:
      'Mock an API response, assert loading appears, then wait for loaded data or error feedback.',
    predict:
      'Given a delayed response, predict which assertions need await.',
    fix:
      'Fix async tests that assert too early or never verify the error path.',
    build:
      'Test loading and error states for a fetched panel.',
    project:
      'Mini project step: test dashboard API states.',
    check:
      'Confirm the learner can explain why async tests wait for visible outcomes.',
  }),
  reactTopicLesson({
    module: 'Testing React applications',
    title: 'Modal and Integration Tests',
    slug: 'react-testing-modal-integration',
    summary:
      'Test component flows that cross boundaries.',
    concept:
      'Integration tests verify that several components cooperate correctly. They are useful for modals, routed flows, and parent-child state updates.',
    example:
      'Open a settings modal, change a preference, close it, and assert the dashboard reflects the new value.',
    predict:
      'Given a multi-step interaction, predict which screen state proves the flow worked.',
    fix:
      'Fix tests that only assert the modal component renders without checking the full interaction.',
    build:
      'Test a modal and parent-controlled flow.',
    project:
      'Mini project: add a meaningful test suite to an earlier project.',
    check:
      'Confirm the learner can pick test scope based on the behavior being protected.',
  }),
  reactTopicLesson({
    module: 'Accessibility and production quality',
    title: 'Semantic HTML and Labels',
    slug: 'react-a11y-semantic-html-labels',
    summary:
      'Use the right elements and labels so UI is understandable by default.',
    concept:
      'Semantic HTML gives browsers and assistive technologies meaning for free. Labels connect form controls to the words users hear and click.',
    example:
      'Replace clickable divs with buttons and add labels to profile form fields.',
    predict:
      'Given markup, predict which elements have accessible names and roles.',
    fix:
      'Fix inaccessible buttons and unlabeled inputs.',
    build:
      'Improve form labels and button semantics.',
    project:
      'Mini project step: audit dashboard controls for semantic HTML.',
    check:
      'Confirm the learner can choose semantic elements before adding ARIA.',
    examples: reactExample.accessibility,
  }),
  reactTopicLesson({
    module: 'Accessibility and production quality',
    title: 'Keyboard Navigation and Focus Management',
    slug: 'react-a11y-keyboard-focus-management',
    summary:
      'Make interactions usable without a mouse.',
    concept:
      'Keyboard users need a visible, logical focus path. Modals, menus, and dynamic panels must move focus deliberately and provide a clear escape route.',
    example:
      'Open a modal, focus its heading or first control, close it, and return focus to the opener.',
    predict:
      'Given a keyboard sequence, predict where focus should move.',
    fix:
      'Fix modal controls that cannot be opened, navigated, or closed by keyboard.',
    build:
      'Add keyboard support and focus behavior to a modal.',
    project:
      'Mini project step: polish dashboard modal interactions.',
    check:
      'Confirm the learner can describe focus before, during, and after an interaction.',
  }),
  reactTopicLesson({
    module: 'Accessibility and production quality',
    title: 'Accessible Loading, Errors, and Responsive UI',
    slug: 'react-a11y-loading-errors-responsive',
    summary:
      'Communicate status and errors clearly across devices and assistive tech.',
    concept:
      'Loading and error states should be perceivable, specific, and recoverable. Responsive layouts should preserve content order and usable controls at every width.',
    example:
      'Add role=status for save feedback, field-level errors, retry actions, and responsive dashboard layout constraints.',
    predict:
      'Given a failed request or small viewport, predict the usable recovery path.',
    fix:
      'Fix hidden errors, vague loading text, and layouts that overlap on mobile.',
    build:
      'Build accessible loading and error states.',
    project:
      'Mini project step: production polish pass on dashboard states.',
    check:
      'Confirm the learner can make failure states helpful rather than decorative.',
  }),
  reactTopicLesson({
    module: 'Accessibility and production quality',
    title: 'Environment Variables, Security, and Deployment',
    slug: 'react-production-env-security-deployment',
    summary:
      'Prepare React apps for real environments without leaking secrets or brittle config.',
    concept:
      'Production apps run in different environments. Public config must be separated from secrets, errors should be handled safely, and deployment should be repeatable.',
    example:
      'Use a public API base URL, keep secrets on the server, and document required environment variables.',
    predict:
      'Given an environment variable, predict whether it is safe to expose to the browser.',
    fix:
      'Fix client code that embeds secret keys and deployment code that assumes localhost.',
    build:
      'Prepare deployment configuration and safe environment variable usage.',
    project:
      'Mini project: production polish pass before capstone submission.',
    check:
      'Confirm the learner can distinguish public runtime config from secrets.',
  }),
  reactTopicLesson({
    module: 'Capstone',
    title: 'Capstone Planning and Architecture',
    slug: 'react-capstone-planning-architecture',
    summary:
      'Plan a full-stack learning dashboard before writing screens.',
    concept:
      'A capstone should prove judgment. Start by mapping routes, component boundaries, state owners, server data, forms, accessibility, and tests.',
    example:
      'Sketch dashboard routes for lessons, projects, profile editing, and progress summaries.',
    predict:
      'Given a feature requirement, predict which module concepts it exercises.',
    fix:
      'Fix a capstone plan that starts with implementation details before user workflows.',
    build:
      'Write an implementation plan with routes, data, components, and tests.',
    project:
      'Capstone step: full-stack learning dashboard architecture.',
    check:
      'Confirm the learner can explain why each major piece belongs where it does.',
  }),
  reactTopicLesson({
    module: 'Capstone',
    title: 'Capstone Dashboard Shell and Routes',
    slug: 'react-capstone-dashboard-shell-routes',
    summary:
      'Build the routed app shell and primary dashboard pages.',
    concept:
      'The dashboard shell connects routing, layout, navigation, and stable shared UI. Leaf routes handle focused page work.',
    example:
      'Create dashboard layout, lesson progress route, project route, and profile route.',
    predict:
      'Given a URL, predict which shell and page render.',
    fix:
      'Fix repeated app shell markup and route state that belongs in search params.',
    build:
      'Build the dashboard shell with nested routes.',
    project:
      'Capstone step: routed learning dashboard skeleton.',
    check:
      'Confirm the learner can trace navigation through the route tree.',
  }),
  reactTopicLesson({
    module: 'Capstone',
    title: 'Capstone Forms, Server Data, and Feedback',
    slug: 'react-capstone-forms-server-data-feedback',
    summary:
      'Combine forms, server data, mutations, and clear feedback.',
    concept:
      'Real workflows combine local form state, server reads, server writes, loading states, validation, and success or error feedback.',
    example:
      'Edit a profile, save it through a mutation, invalidate the profile query, and show accessible feedback.',
    predict:
      'Given a save flow, predict form state, mutation state, cache update, and visible feedback.',
    fix:
      'Fix a save flow with stale cached data and invisible validation errors.',
    build:
      'Build profile editing with query, mutation, validation, and feedback.',
    project:
      'Capstone step: profile editor and progress data workflows.',
    check:
      'Confirm the learner can explain every state owner in the workflow.',
  }),
  reactTopicLesson({
    module: 'Capstone',
    title: 'Capstone Review, Testing, and Production Polish',
    slug: 'react-capstone-review-testing-production-polish',
    summary:
      'Finish by reviewing quality, testing behavior, and polishing accessibility.',
    concept:
      'A finished app is more than a working demo. Review behavior, accessibility, performance, error handling, security assumptions, and test coverage.',
    example:
      'Run a review checklist over the dashboard and add tests for core learning workflows.',
    predict:
      'Given a bug report or missing state, predict which quality check should have caught it.',
    fix:
      'Fix duplicated state, inaccessible controls, missing error branches, and brittle tests before submission.',
    build:
      'Add a meaningful test suite and production polish pass.',
    project:
      'Capstone: full-stack learning dashboard using React, TypeScript, TanStack Router, TanStack Query, forms, authentication-ready layout, accessibility, and testing.',
    check:
      'Confirm the learner can defend the final app as usable, tested, and maintainable.',
  }),
] as const

const reactLessonCatalog = [
  {
    module: 'JavaScript and TypeScript prerequisites',
    title: 'React Readiness Diagnostic',
    slug: 'react-readiness-diagnostic',
    summary:
      'Check the JavaScript and TypeScript skills needed before building React components.',
    content: reactStructuredContent({
      mentalModel:
        'React code is ordinary JavaScript with a UI layer. Students should be comfortable transforming arrays, destructuring objects, importing modules, and adding basic TypeScript types before React-specific ideas appear.',
      guidedExample:
        'Start with an array of product objects, use map to produce display labels, filter to keep visible products, destructure the fields a component would receive, and type the helper function input and output.',
      predict:
        'Given a map/filter chain, predict the final array before thinking about JSX. This makes data transformation feel concrete.',
      fix:
        'Repair a helper that mutates an input array or returns the wrong shape for a typed component prop.',
      build:
        'Complete small utilities: transform an array, filter a product list, destructure component data, and type a function signature.',
      miniProject:
        'This is diagnostic and skippable. Passing it should unlock the React fundamentals module without turning the platform into a full JavaScript course.',
      review:
        'Confirm that the student can read and transform component-shaped data before asking them to render it.',
    }),
  },
  {
    module: 'React fundamentals',
    title: 'Components, JSX, and Composition',
    slug: 'react-components-and-props',
    summary:
      'Understand React applications as trees of components before adding state.',
    content: reactStructuredContent({
      mentalModel:
        'A React app is a component tree. Each component is a JavaScript function that returns JSX describing one part of the interface.',
      guidedExample:
        'Build a static profile page by composing Avatar, ProfileHeader, SkillList, and Footer components. No state is needed yet.',
      predict:
        'Read a small component tree and predict the exact headings, paragraphs, and list items that render.',
      fix:
        'Fix invalid JSX, lowercase component names, missing fragments, and components that return adjacent elements without a wrapper.',
      build:
        'Build a profile card, split a static page into reusable components, and compose them into a static developer portfolio page.',
      miniProject:
        'Mini project: static developer portfolio page. The goal is understanding component boundaries and composition.',
      review:
        'Check whether the student can explain what each component owns and why no state is required yet.',
    }),
  },
  {
    module: 'Props and reusable components',
    title: 'Props, Children, and Reuse',
    slug: 'react-props-and-reusable-components',
    summary:
      'Pass data through typed props and remove duplicated component markup.',
    content: reactStructuredContent({
      mentalModel:
        'Props are read-only inputs. A parent owns the values, and a child uses those values to render different output from the same reusable component.',
      guidedExample:
        'Create one MovieCard component with a TypeScript prop interface, then render several movies by passing different titles, ratings, genres, and children content.',
      predict:
        'Given three calls to the same component with different props, predict which text and badges appear in each rendered card.',
      fix:
        'Repair a component receiving the wrong prop name or mutating prop data instead of rendering from it.',
      build:
        'Build a reusable MovieCard, a typed Button, and a Layout wrapper that accepts children.',
      miniProject:
        'Mini project: product or movie listing page generated from data with duplicated card markup removed.',
      review:
        'Confirm that repeated UI is represented by one component with different inputs, not copy-pasted components.',
    }),
  },
  {
    module: 'Rendering collections and conditions',
    title: 'Lists, Keys, and UI States',
    slug: 'react-conditional-rendering-and-lists',
    summary:
      'Render arrays, branches, empty states, loading states, and stable keyed items.',
    content: reactStructuredContent({
      mentalModel:
        'Rendering is data transformation. Arrays become elements with map, conditions choose branches, and keys preserve identity for the same logical item across renders.',
      guidedExample:
        'Render a task list with status badges, an empty-state message, and stable keys from task IDs.',
      predict:
        'Given a list, a filter, and a conditional badge rule, predict which rows and labels appear.',
      fix:
        'Fix incorrect array index keys, generated random keys, hidden empty states, and a count && expression that accidentally renders 0.',
      build:
        'Render tasks, filter visible items, show loading/error/empty states, and display different badges by status.',
      miniProject:
        'Mini project: searchable contact or movie list with clear empty and loading states.',
      review:
        'Check that keys come from stable identity and that every collection view handles more than the happy path.',
    }),
  },
  {
    module: 'State and events',
    title: 'State, Events, and Rerenders',
    slug: 'react-state-and-events',
    summary:
      'Model changing UI with state, event handlers, immutable updates, and controlled inputs.',
    content: reactStructuredContent({
      mentalModel:
        'State is component memory. An event requests a state update, React renders again, and the UI becomes a fresh result of the latest state and props.',
      guidedExample:
        'Build a todo interaction one step at a time: counter, toggle, controlled input, add task, delete task, then update an array without mutation.',
      predict:
        'Predict the rendered count after multiple state setter calls, including when functional updates are required.',
      fix:
        'Fix direct state mutation, handlers called during rendering, duplicated derived state, and inputs without onChange.',
      build:
        'Build a counter, toggle, like button, controlled search field, and add/delete task flow.',
      miniProject:
        'Mini project: todo or habit tracker with replayable state transitions.',
      review:
        'Use the replay model: previous state, event, state update, rerender. The student should be able to name each step.',
    }),
  },
  {
    module: 'Forms',
    title: 'Controlled Forms and Validation',
    slug: 'react-forms-and-validation',
    summary:
      'Handle user input with controlled fields, submission, validation, and reusable form pieces.',
    content: reactStructuredContent({
      mentalModel:
        'A controlled form field displays React state and reports edits through events. Submission is an event, validation derives messages from current values, and reusable form components keep labels and errors consistent.',
      guidedExample:
        'Build a profile editor with name, email, role, validation messages, and preventDefault on submit.',
      predict:
        'Predict what appears after typing invalid input, blurring a field, and submitting the form.',
      fix:
        'Fix a form that refreshes the page unexpectedly, an input without a value, missing labels, and validation stored in duplicated state.',
      build:
        'Build login and registration forms, required-field validation, a dynamic field list, and reusable labeled inputs.',
      miniProject:
        'Mini project: user profile editor. Teach native React form handling first, then TanStack Form as the production abstraction.',
      review:
        'Confirm the student can separate field state, derived validation, submit behavior, and reusable form UI.',
    }),
  },
  {
    module: 'Component communication',
    title: 'Lifting State and Passing Callbacks',
    slug: 'react-component-communication',
    summary:
      'Decide where state belongs when parents, children, and siblings need to coordinate.',
    content: reactStructuredContent({
      mentalModel:
        'State belongs at the lowest common owner that can coordinate every component needing to read or change it. Children communicate upward through callbacks passed by the owning parent.',
      guidedExample:
        'Build shopping-cart quantity controls where Cart owns item quantities, QuantityButton receives callbacks, and CartSummary derives totals from the shared source of truth.',
      predict:
        'Given a parent with two child controls, predict which components rerender after a child calls an update callback.',
      fix:
        'Fix sibling components with duplicated state, a modal that controls itself when the parent needs ownership, and callbacks called during render.',
      build:
        'Build shopping-cart quantity controls, a parent-controlled modal, a search field controlling a list, and shared state between filters and results.',
      miniProject:
        'Mini project: small shopping cart. This is the decision-making bridge between knowing useState and knowing where state belongs.',
      review:
        'Confirm the student can explain why a state value lives in the parent, child, URL, context, or server cache.',
    }),
  },
  {
    module: 'Effects and external systems',
    title: 'Effects, Cleanup, and API Fetching',
    slug: 'react-effects-and-synchronization',
    summary:
      'Use effects only to synchronize React with systems outside React.',
    content: reactStructuredContent({
      mentalModel:
        'Effects synchronize React with external systems: browser APIs, timers, subscriptions, and network requests. They are not the default tool for calculating values.',
      guidedExample:
        'Build a small dashboard that updates document.title, starts a timer with cleanup, and fetches profile data with loading and error states.',
      predict:
        'Predict when an effect runs as props or state dependencies change, and what cleanup runs before the next effect.',
      fix:
        'Fix an infinite effect loop, a stale closure, a missing cleanup, and an unnecessary effect used for derived render data.',
      build:
        'Build document-title sync, timer cleanup, fetch-and-display API data, and loading/error rendering.',
      miniProject:
        'Mini project: weather or GitHub profile dashboard that treats network data as an external system.',
      review:
        'Ask whether the code synchronizes with something outside React. If not, prefer render logic or an event handler.',
    }),
  },
  {
    module: 'TanStack Router',
    title: 'Routes, Params, Layouts, and Loaders',
    slug: 'tanstack-router-foundations',
    summary:
      'Build multi-page React apps with file routes, links, dynamic params, layouts, search params, loaders, and not-found states.',
    content: reactStructuredContent({
      mentalModel:
        'A router maps URLs to UI and data requirements. Route params identify resources, search params preserve view state, layouts keep shared shells stable, and loaders prepare data before rendering.',
      guidedExample:
        'Create a products route, a /products/$productId detail route, a shared dashboard layout, and a loader that handles missing resources.',
      predict:
        'Given a URL and route tree, predict which layout, page, params, and search values are active.',
      fix:
        'Fix links pointing to the wrong route, missing dynamic params, search filters that disappear from the URL, and absent not-found handling.',
      build:
        'Build product routes, URL search filters, nested layout routes, dynamic detail pages, and not-found states.',
      miniProject:
        'Mini project: multi-page movie discovery app connected to the earlier searchable catalog work.',
      review:
        'Confirm the student understands whether a value belongs in local state, URL search state, a route param, or loader data.',
    }),
  },
  {
    module: 'Server state and TanStack Query',
    title: 'Queries, Mutations, and Cache Updates',
    slug: 'tanstack-query-server-state',
    summary:
      'Separate client state from server state with queries, mutations, caching, invalidation, and optimistic updates.',
    content: reactStructuredContent({
      mentalModel:
        'Server state is borrowed data. TanStack Query owns fetching, caching, stale data, refetching, and mutation lifecycle so components can focus on rendering loading, error, and success states.',
      guidedExample:
        'Build an issue list that loads records with a query, adds an issue with a mutation, invalidates the list, and shows a pending optimistic favorite state.',
      predict:
        'Given a cache, staleTime, mutation, and invalidation step, predict when the UI uses cached data, refetches, or shows pending feedback.',
      fix:
        'Fix duplicate fetch state in useEffect, forgotten invalidation after a mutation, missing error UI, and an optimistic update that never rolls back.',
      build:
        'Fetch a list, add a record, delete a record, invalidate a query, and build an optimistic favorite button.',
      miniProject:
        'Mini project: issue tracker or task dashboard connected to an API, with loading, error, empty, mutation, and refetch states.',
      review:
        'Confirm the student can distinguish local UI state, URL state, context state, and server cache state.',
    }),
  },
  {
    module: 'Context and shared application state',
    title: 'Context, Providers, and Shared Client State',
    slug: 'react-context-shared-state',
    summary:
      'Use context for shared client state without turning it into a dumping ground.',
    content: reactStructuredContent({
      mentalModel:
        'Context lets a provider make a value available to descendants without passing props through every layer. It is best for app-level client state such as theme, auth session shape, and selected preferences.',
      guidedExample:
        'Build a ThemeProvider and custom useTheme hook, then consume it from nested layout and button components.',
      predict:
        'Given a provider location and component tree, predict which components can read the context value and which ones cannot.',
      fix:
        'Fix a provider-placement bug, a missing custom hook guard, and global state that should have stayed local or in the server cache.',
      build:
        'Create theme, authentication, and favorites contexts while keeping server state out of context.',
      miniProject:
        'Mini project: authenticated dashboard shell with theme and user-session context around nested routes.',
      review:
        'Ask whether the value is truly shared app state. Prefer props, local state, URL state, or TanStack Query when they fit better.',
    }),
  },
  {
    module: 'Custom hooks',
    title: 'Extracting Reusable Stateful Behavior',
    slug: 'react-custom-hooks',
    summary:
      'Design custom hook APIs that reuse behavior while preserving independent component state.',
    content: reactStructuredContent({
      mentalModel:
        'A custom hook shares stateful logic, not one state instance. Each call gets its own hook state unless the hook explicitly connects to shared external state.',
      guidedExample:
        'Extract useToggle, useDebounce, and useLocalStorage from repeated component logic, then design return values around the caller experience.',
      predict:
        'Given two components calling the same custom hook, predict whether their state is shared or independent.',
      fix:
        'Fix hooks called conditionally, hook APIs that expose too much internal detail, and a useFetch hook that duplicates TanStack Query badly.',
      build:
        'Build useLocalStorage, useDebounce, useToggle, critique useFetch, and extract form behavior into a hook.',
      miniProject:
        'Mini project: reusable hooks toolkit used across previous projects.',
      review:
        'Confirm the student can explain hook rules, API design, and when extraction improves clarity.',
    }),
  },
  {
    module: 'Performance and rendering',
    title: 'Render Cycles, Memoization, and Measurement',
    slug: 'react-performance-rendering',
    summary:
      'Understand render behavior and optimize only after identifying real work.',
    content: reactStructuredContent({
      mentalModel:
        'Rendering is React recalculating UI. Performance work starts by placing state well and measuring bottlenecks, not by adding memoization everywhere.',
      guidedExample:
        'Inspect a slow searchable list, move state closer to where it is needed, memoize an expensive derived calculation, and lazy-load a heavy route.',
      predict:
        'Given a parent state update and child props, predict which components render and whether referential equality changes.',
      fix:
        'Fix expensive work inside rendering, duplicated state from props, unstable callback props, direct mutation, and unnecessary memoization.',
      build:
        'Identify unnecessary renders, fix expensive repeated computation, lazy-load a route, and decide when memoization is unnecessary.',
      miniProject:
        'Mini project: improve an earlier dashboard with measured rendering fixes and route-level code splitting.',
      review:
        'AST feedback should flag risky patterns while reinforcing that memo, useMemo, and useCallback are tools, not defaults.',
    }),
  },
  {
    module: 'Testing React applications',
    title: 'Behavior Tests with Vitest and React Testing Library',
    slug: 'react-testing-applications',
    summary:
      'Test user-visible behavior, async states, forms, modals, and API boundaries without coupling to implementation details.',
    content: reactStructuredContent({
      mentalModel:
        'A good component test asks what a user can see and do. It avoids private implementation details and verifies behavior across realistic interactions.',
      guidedExample:
        'Write tests for a counter, form validation, loading state, error state, and modal interaction using React Testing Library queries and user events.',
      predict:
        'Given a component and test, predict whether the assertion checks behavior or an implementation detail.',
      fix:
        'Fix brittle tests that query class names, forget async waits, miss accessible labels, or mock too much of the component under test.',
      build:
        'Test a counter, form validation, loading and error states, a modal, and repair an implementation-detail test.',
      miniProject:
        'Mini project: add a meaningful test suite to an earlier project.',
      review:
        'Confirm tests would still pass after a valid refactor that preserves user-visible behavior.',
    }),
  },
  {
    module: 'Accessibility and production quality',
    title: 'Accessible, Resilient, Production-Ready UI',
    slug: 'react-accessibility-production-quality',
    summary:
      'Polish React apps with semantic HTML, keyboard support, labels, focus management, responsive design, environment variables, security basics, and deployment readiness.',
    content: reactStructuredContent({
      mentalModel:
        'Production quality is part of the component contract. A feature is not complete until it is usable by keyboard, labeled for assistive tech, resilient to errors, responsive, and safe to deploy.',
      guidedExample:
        'Upgrade a modal, form, and loading panel with semantic elements, labels, focus handling, keyboard behavior, and accessible status messages.',
      predict:
        'Given an interaction sequence using only the keyboard, predict where focus should move and what screen-reader labels should exist.',
      fix:
        'Fix inaccessible buttons, unlabeled inputs, missing modal keyboard support, invisible errors, unsafe env usage, and fragile responsive layout.',
      build:
        'Add keyboard support to a modal, improve form labels, build accessible loading and error states, and prepare deployment configuration.',
      miniProject:
        'Mini project: production polish pass on the dashboard before capstone submission.',
      review:
        'Confirm the student can review accessibility, error handling, responsive behavior, configuration, and deployment readiness as first-class requirements.',
    }),
  },
  {
    module: 'Capstone',
    title: 'Full-Stack Learning Dashboard',
    slug: 'react-learning-dashboard-capstone',
    summary:
      'Combine components, props, lists, state, forms, effects, routing, and tests into a realistic dashboard.',
    content: reactStructuredContent({
      mentalModel:
        'Production React is a series of ownership decisions: component boundaries, local state, URL state, server data, form state, accessibility, and tests all have different jobs.',
      guidedExample:
        'Plan a dashboard shell with routes for lessons, projects, profile editing, progress summaries, and loading/error states.',
      predict:
        'Trace what renders when the user navigates, searches, submits a form, and receives an API response.',
      fix:
        'Review a working but poorly designed dashboard and identify duplicated state, inaccessible controls, unstable keys, unnecessary effects, and missing tests.',
      build:
        'Build the capstone in stages: profile card, todo flow, searchable catalog, dashboard routes, profile form, API panel, and review tests.',
      miniProject:
        'Capstone: full-stack learning dashboard using React, TypeScript, TanStack Router, data loading, forms, authentication-ready layout, accessibility, and testing.',
      review:
        'The final review should test explanation and judgment, not just whether the UI appears on screen.',
    }),
  },
  ...reactIndividualLessonCatalog,
] as const

type SystemDesignLessonSpec = {
  module: string
  title: string
  slug: string
  summary: string
  problem: string
  functional: string[]
  nonFunctional: string[]
  scale: string
  components: string[]
  tradeoffs: string[]
  builder: string
  reference: string
  quiz: string
}

const systemDesignStructuredContent = (spec: SystemDesignLessonSpec) =>
  JSON.stringify(
    {
      format: 'curriculum-v1',
      learningObjectives: [
        `Turn “${spec.title}” into explicit functional and non-functional requirements.`,
        'Estimate scale before choosing components.',
        'Explain architecture tradeoffs instead of memorizing one diagram.',
      ],
      sections: [
        { title: 'Problem statement', body: spec.problem },
        {
          title: 'Functional requirements',
          body: spec.functional.map((item) => `- ${item}`).join('\n'),
        },
        {
          title: 'Non-functional requirements',
          body: spec.nonFunctional.map((item) => `- ${item}`).join('\n'),
        },
        { title: 'Estimate scale', body: spec.scale },
        {
          title: 'Design components',
          body: spec.components.map((item) => `- ${item}`).join('\n'),
        },
        {
          title: 'Discuss tradeoffs',
          body: spec.tradeoffs.map((item) => `- ${item}`).join('\n'),
        },
        {
          title: 'Interactive architecture builder',
          body: `${spec.builder}\n\nStart with boxes, then connect arrows. Label every arrow with what flows through it: HTTP request, cache lookup, event, file bytes, database row, search query, notification, or analytics signal.`,
        },
        {
          title: 'AI design review',
          body:
            'Ask the AI interviewer to review your design for bottlenecks, missing requirements, single points of failure, data modeling, consistency choices, cost, and operational complexity. Good feedback should explain why a choice fails under scale and name a better alternative.',
        },
      ],
      visualization: {
        kind: 'architecture-flow',
        prompt:
          'Trace one user request through the diagram. Hover mentally over each component: what does it do, why does it exist, and when would you add or remove it?',
      },
      workedExample: {
        title: 'Reference solution',
        body: spec.reference,
      },
      practice: {
        problemSlug: '',
        framing:
          'Build the architecture on the canvas, then compare your design to the reference solution and explain each difference as a tradeoff.',
      },
      replay: {
        prompt:
          'Replay the design under a failure or growth scenario: traffic spike, database overload, server crash, regional outage, hot key, queue backlog, cache miss storm, or slow search query.',
      },
      quiz: {
        prompt: spec.quiz,
      },
      aiFeedback: {
        prompt:
          'Use interview mode: answer step by step, then let the AI ask follow-up questions about scale, failures, caching, consistency, and cost.',
      },
    },
    null,
    2,
  )

const systemDesignLesson = (spec: SystemDesignLessonSpec) => ({
  module: spec.module,
  title: spec.title,
  slug: spec.slug,
  summary: spec.summary,
  content: systemDesignStructuredContent(spec),
})

const commonNfr = [
  'Low latency for common user actions',
  'High availability during server or instance failures',
  'Horizontal scalability as traffic grows',
  'Clear observability: logs, metrics, traces, and alerts',
]

const systemDesignLessonCatalog = [
  systemDesignLesson({
    module: 'Foundations',
    title: 'What Is System Design?',
    slug: 'system-design-what-is-system-design',
    summary: 'Learn the repeatable process behind turning product goals into architecture.',
    problem: 'A product idea is not an architecture. System design is the process of identifying requirements, estimating scale, choosing components, and explaining tradeoffs.',
    functional: ['Identify users and core actions', 'Define APIs and data flows', 'Name success and failure states'],
    nonFunctional: commonNfr,
    scale: 'Start with rough numbers: daily active users, reads per second, writes per second, data size, file size, and latency target. Precision matters less than using estimates to guide decisions.',
    components: ['Client', 'API service', 'Database', 'Cache', 'Queue', 'Object storage', 'Monitoring'],
    tradeoffs: ['Simple monoliths are easier to build but can hit scaling limits', 'More services isolate load but add operational complexity', 'Caching improves reads but introduces invalidation problems'],
    builder: 'Place Browser → API Server → Database. Then add Load Balancer, Cache, and Queue only when a requirement justifies each one.',
    reference: 'A beginner reference architecture is Browser → Load Balancer → Application Servers → Database, with Redis for hot reads and a queue for slow background work.',
    quiz: 'What should you clarify before drawing boxes: the database choice or the requirements and scale?',
  }),
  systemDesignLesson({
    module: 'Foundations',
    title: 'Client vs Server',
    slug: 'system-design-client-server',
    summary: 'Explain where work happens in web and mobile applications.',
    problem:
      'A user clicks Save in a notes app. Some work should happen in the browser or mobile app, and some work should happen on the backend. Decide what belongs on each side.',
    functional: [
      'Client collects input, renders UI, and sends requests',
      'Server validates permissions and business rules',
      'Server persists shared data so other devices can see it',
      'Client handles loading, error, and success states',
    ],
    nonFunctional: [
      'Protect trusted logic and secrets on the server',
      'Keep common interactions responsive on the client',
      'Minimize network payload size',
      'Recover gracefully when the network fails',
    ],
    scale:
      'Estimate how often users save, how large each note is, and how often notes are loaded. A client can render instantly from local state, but shared correctness comes from the server response.',
    components: [
      'Browser or mobile client',
      'HTTP API',
      'Application server',
      'Database',
      'Authentication/session store',
    ],
    tradeoffs: [
      'Client-side validation feels fast, but server-side validation is the source of truth',
      'Putting more logic on the client can reduce server work but increases duplicated app logic',
      'Server rendering can improve first load, while client rendering can improve rich interactions',
    ],
    builder:
      'Draw Client → API Server → Database. Add labels: “intent” from client to server, “validated command” inside the server, and “durable state” in the database.',
    reference:
      'A clean notes flow is: the client renders a form, POSTs note text to the server, the server authenticates the user, validates the payload, writes a row, and returns the saved note. The client may optimistically show the note, but it must handle rejection.',
    quiz:
      'Why is client-side validation not enough for a system that stores shared user data?',
  }),
  systemDesignLesson({
    module: 'Foundations',
    title: 'APIs',
    slug: 'system-design-apis',
    summary: 'Design contracts between clients and services.',
    problem:
      'Design the API contract for creating and reading notes. The goal is not just choosing REST or GraphQL; it is making the request, response, errors, and permissions unambiguous.',
    functional: [
      'Create a note',
      'List notes for the signed-in user',
      'Fetch one note by ID',
      'Return clear validation and authorization errors',
    ],
    nonFunctional: [
      'Stable request and response shapes',
      'Backward-compatible changes when possible',
      'Predictable error codes',
      'Rate limits for abusive clients',
    ],
    scale:
      'Estimate requests per second per endpoint. Read endpoints often receive more traffic than write endpoints, so pagination, filtering, and cache headers matter early.',
    components: [
      'Client',
      'API Gateway or router',
      'Application service',
      'Auth middleware',
      'Database',
    ],
    tradeoffs: [
      'REST is simple and cache-friendly for resources',
      'GraphQL lets clients request flexible shapes but can hide expensive queries',
      'Versioned APIs add compatibility but increase maintenance',
    ],
    builder:
      'Place Client → API Gateway → Notes Service → Database. Add example arrows: POST /notes, GET /notes?cursor=abc, 401 Unauthorized, 429 Rate Limited.',
    reference:
      'A beginner reference API: POST /notes with {title, body}; GET /notes with cursor pagination; GET /notes/:id; PATCH /notes/:id; DELETE /notes/:id. Every handler authenticates, validates ownership, and returns structured errors.',
    quiz:
      'What should an API contract define besides the URL path?',
  }),
  systemDesignLesson({
    module: 'Foundations',
    title: 'Databases',
    slug: 'system-design-databases',
    summary: 'Choose storage based on access patterns and consistency needs.',
    problem:
      'A learning platform needs users, lessons, progress, submissions, and feedback. Decide what data is relational, what may be document-shaped, and what should not live in the primary database.',
    functional: [
      'Store durable application records',
      'Query by common access patterns',
      'Update related records safely',
      'Back up and restore important data',
    ],
    nonFunctional: [
      'Correctness for critical writes',
      'Acceptable read latency',
      'Storage growth planning',
      'Migration and schema evolution strategy',
    ],
    scale:
      'Estimate rows created per day and the most common queries. For example: progress writes may be small, submissions may grow quickly, and search over lesson text may need a separate index later.',
    components: [
      'Application service',
      'Primary SQL database',
      'Read replica',
      'Search index',
      'Object storage for large artifacts',
    ],
    tradeoffs: [
      'SQL gives relationships, transactions, and flexible querying',
      'NoSQL can scale certain access patterns but requires careful data modeling',
      'Search indexes make text queries fast but are usually eventually consistent',
    ],
    builder:
      'Draw API → Postgres for core records. Add Object Storage for large files and Search Index for full-text lookup. Label which data is source of truth.',
    reference:
      'A solid beginner design uses SQL for users, courses, lessons, progress, and submissions. Add object storage for large uploaded files, and add a search index when database text search becomes too slow or specialized.',
    quiz:
      'Why should large video or image files usually not be stored directly in a relational database row?',
  }),
  systemDesignLesson({
    module: 'Foundations',
    title: 'Latency and Throughput',
    slug: 'system-design-latency-throughput',
    summary: 'Distinguish fast individual requests from total system capacity.',
    problem:
      'A dashboard feels slow even though the servers are not crashing. Diagnose whether the problem is latency, throughput, or both.',
    functional: [
      'Serve page data to users',
      'Measure response time for each request',
      'Measure total requests handled per second',
      'Identify the slowest dependency in the path',
    ],
    nonFunctional: [
      'p95 latency target for common pages',
      'Enough throughput for peak traffic',
      'Backpressure when traffic exceeds capacity',
      'Timeouts so slow dependencies do not hang forever',
    ],
    scale:
      'Use p95 or p99 latency for user experience, not just average latency. Estimate peak QPS separately from daily traffic: 1 million daily requests can still create sharp spikes.',
    components: [
      'Client',
      'Load balancer',
      'Application servers',
      'Cache',
      'Database',
      'Metrics dashboard',
    ],
    tradeoffs: [
      'Caching can lower latency and increase throughput for repeated reads',
      'Adding servers increases throughput but may not fix a slow database query',
      'Aggressive timeouts protect the system but can fail user requests earlier',
    ],
    builder:
      'Draw Browser → Load Balancer → App → Database. Put a latency label on each arrow, then find the largest contributor.',
    reference:
      'If a request spends 20ms at the app and 900ms in the database, adding more app servers will not make that request fast. Fix the query, add an index, cache the result, or change the access pattern.',
    quiz:
      'What is the difference between latency and throughput?',
  }),
  systemDesignLesson({
    module: 'Foundations',
    title: 'Availability and Scalability',
    slug: 'system-design-availability-scalability',
    summary: 'Understand surviving failure and growing with demand.',
    problem:
      'Your app works on one server. Now users depend on it every day. Design for server failure and traffic growth without making the system impossible to operate.',
    functional: [
      'Route requests to healthy servers',
      'Keep serving reads during one server failure',
      'Scale stateless application capacity horizontally',
      'Detect and alert on failures',
    ],
    nonFunctional: [
      'No single app server should take down the product',
      'Deployments should not cause long downtime',
      'Capacity should increase by adding instances',
      'Database failure plan should be explicit',
    ],
    scale:
      'Estimate peak concurrent users and request rate. If one app server handles 100 requests per second and peak is 800 requests per second, you need multiple instances plus headroom.',
    components: [
      'Load balancer',
      'Multiple app servers',
      'Primary database',
      'Read replica or standby',
      'Health checks',
      'Monitoring',
    ],
    tradeoffs: [
      'More replicas improve availability but add replication lag and operational work',
      'Stateless app servers scale easier than servers with local-only session state',
      'High availability costs money even when nothing is broken',
    ],
    builder:
      'Start with one app server. Duplicate it behind a load balancer. Then add health checks and explain what happens when one server dies.',
    reference:
      'A common first availability design uses a load balancer, at least two stateless app instances, external session/storage state, database backups, and monitoring alerts. Database high availability is a separate design choice, not automatically solved by app replicas.',
    quiz:
      'Why do stateless application servers scale more easily behind a load balancer?',
  }),
  systemDesignLesson({
    module: 'Foundations',
    title: 'CAP Theorem at a High Level',
    slug: 'system-design-cap-theorem',
    summary: 'Reason about consistency, availability, and partitions without overclaiming.',
    problem:
      'Two database replicas cannot communicate for a short time. A user tries to write data. Decide whether the system should reject the write or accept it and risk temporary disagreement.',
    functional: [
      'Accept reads and writes',
      'Replicate data across nodes or regions',
      'Handle network partitions',
      'Reconcile or reject conflicting operations',
    ],
    nonFunctional: [
      'Clear consistency expectation for users',
      'Defined behavior during network partitions',
      'Recovery plan after replicas reconnect',
      'Business-aware choice for critical vs non-critical data',
    ],
    scale:
      'CAP matters when data is replicated across nodes that can lose contact. Ask how often partitions happen, how long they last, and whether stale data is acceptable for this feature.',
    components: [
      'Client',
      'Service',
      'Replica A',
      'Replica B',
      'Replication link',
      'Conflict handling',
    ],
    tradeoffs: [
      'Choosing consistency may reject or delay operations during a partition',
      'Choosing availability may return stale data or require conflict resolution later',
      'Different features in the same product can make different choices',
    ],
    builder:
      'Draw Service → Replica A and Service → Replica B. Break the link between replicas and decide what each side should do with a new write.',
    reference:
      'For bank balances, rejecting writes during uncertainty may be better than conflicting balances. For social likes or view counts, accepting writes and reconciling later may be acceptable.',
    quiz:
      'During a network partition, what practical choice does CAP force a replicated system to make?',
  }),
  systemDesignLesson({
    module: 'Foundations',
    title: 'Load Balancing and Caching Overview',
    slug: 'system-design-load-balancing-caching-overview',
    summary: 'Add the first two scaling tools to the base web architecture.',
    problem:
      'Your app has more users. Some requests fail when one server is overloaded, and the database is repeatedly serving the same expensive reads. Decide where load balancing and caching help.',
    functional: [
      'Distribute requests across app servers',
      'Detect unhealthy instances',
      'Cache hot read results',
      'Fall back to the database on cache miss',
    ],
    nonFunctional: [
      'Lower p95 read latency',
      'Higher request capacity',
      'Avoid routing traffic to dead servers',
      'Prevent stale cache data from confusing users',
    ],
    scale:
      'Estimate app-server capacity and cache hit rate. If 80 percent of reads are for the same hot data, a cache can remove large pressure from the database. If every read is unique, caching helps less.',
    components: [
      'Browser',
      'Load balancer',
      'Application server pool',
      'Redis cache',
      'Database',
      'Health checks',
    ],
    tradeoffs: [
      'Load balancers improve availability and capacity but add routing configuration',
      'Caches reduce latency and DB load but introduce invalidation and stale data risks',
      'A cache outage should degrade performance, not corrupt source-of-truth data',
    ],
    builder:
      'Build Browser → Load Balancer → App Servers → Redis → Database. Show two flows: cache hit returns quickly; cache miss loads from DB and writes back to cache.',
    reference:
      'A standard read path is: request hits load balancer, healthy app server checks Redis, cache hit returns immediately, cache miss reads database and stores the result with a TTL. Writes update the database and invalidate or refresh affected cache keys.',
    quiz:
      'Why does caching help an overloaded read-heavy database more than adding a message queue?',
  }),
  ...['Load Balancer', 'Cache', 'CDN', 'SQL', 'NoSQL', 'Message Queue', 'Blob Storage', 'Search Index', 'Rate Limiter', 'API Gateway'].map((title) =>
    systemDesignLesson({
      module: 'Common Building Blocks',
      title,
      slug: `system-design-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      summary: `Understand the purpose, strengths, costs, and usage of ${title}.`,
      problem: `Your system has a bottleneck or requirement that may call for ${title}. Decide whether this component solves the actual problem or just adds complexity.`,
      functional: ['State the component purpose', 'Identify input and output', 'Place it correctly in the request or data flow'],
      nonFunctional: commonNfr,
      scale: 'Estimate whether the bottleneck is read volume, write volume, file size, global distance, search latency, abusive traffic, or service fan-out.',
      components: [title, 'Client', 'API service', 'Database', 'Monitoring'],
      tradeoffs: ['Pros: better performance, isolation, or scalability for the right workload', 'Cons: operational cost, failure modes, configuration, and debugging overhead', 'Risk: using the component for the wrong bottleneck hides the real problem'],
      builder: `Mini exercise: “Your database is overloaded with reads.” Decide whether ${title} helps, then explain why a cache often helps more than adding another primary database.`,
      reference: `${title} belongs in the architecture only when its purpose matches a requirement. For example, Redis reduces repeated read pressure, queues absorb asynchronous work, CDNs move static content closer to users, and blob storage stores large binary files better than a relational database.`,
      quiz: `What is the main tradeoff introduced by ${title}?`,
    }),
  ),
  ...['Read-Heavy Systems', 'Write-Heavy Systems', 'Event-Driven Architecture', 'Pub/Sub', 'CQRS', 'Sharding', 'Replication', 'Microservices', 'Monoliths'].map((title) =>
    systemDesignLesson({
      module: 'Design Patterns',
      title,
      slug: `system-design-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      summary: `Use ${title.toLowerCase()} as a reusable architecture pattern.`,
      problem: `A growing product needs the ${title.toLowerCase()} pattern. Identify the pressure it solves and the complexity it introduces.`,
      functional: ['Describe the data flow', 'Identify producers and consumers', 'Define how users observe results'],
      nonFunctional: commonNfr,
      scale: 'Estimate peak reads, peak writes, fan-out, event volume, storage growth, and acceptable staleness.',
      components: ['Producer', 'API service', 'Queue or log', 'Worker', 'Cache', 'Database'],
      tradeoffs: ['Patterns improve a specific axis but can hurt simplicity', 'Async designs improve resilience but add delay and retry semantics', 'Distributed data improves scale but complicates consistency'],
      builder: 'Build Producer → Queue → Worker → Database. Then add Cache, Read Model, or Replicas depending on whether reads, writes, or availability are the pressure.',
      reference: 'A strong pattern design names the invariant: where writes are accepted, where reads come from, how failures are retried, and what consistency users can expect.',
      quiz: `What pressure does ${title} mainly address, and what new failure mode does it introduce?`,
    }),
  ),
  ...['URL Shortener', 'Pastebin', 'Notes App', 'Chat App', 'Todo Backend'].map((title) =>
    systemDesignLesson({
      module: 'Beginner Design Problems',
      title,
      slug: `system-design-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      summary: `Design a small but realistic ${title}.`,
      problem: `Design ${title} for a beginner interview. Keep the first design simple, then add scale only where the estimates demand it.`,
      functional: ['Create the main resource', 'Read the main resource', 'Update or delete where appropriate', 'Return clear errors'],
      nonFunctional: commonNfr,
      scale: 'Assume 10k to 1M users. Estimate read/write ratio, storage per item, and whether traffic is bursty.',
      components: ['Client', 'Load Balancer', 'API service', 'Database', 'Cache', 'Background worker'],
      tradeoffs: ['SQL is often simplest for small structured apps', 'Cache hot reads only after measuring pressure', 'Queues are useful for work that does not need to finish inside the request'],
      builder: 'Drag Browser → Load Balancer → API → Database. Add Redis for hot reads and Queue → Worker for slow or asynchronous tasks.',
      reference: `${title} can start as a monolith with a relational database. Add caching for hot reads, queues for async work, and replicas when availability or read scale demands it.`,
      quiz: `What is the simplest architecture that satisfies ${title} before adding advanced scaling tools?`,
    }),
  ),
  ...['YouTube', 'Dropbox', 'Uber', 'Discord', 'Netflix', 'Instagram Feed'].map((title) =>
    systemDesignLesson({
      module: 'Intermediate Designs',
      title,
      slug: `system-design-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      summary: `Scale ${title} with partitioning, queues, CDN, search, and object storage.`,
      problem: `Design ${title} for millions of users. Identify the highest-volume path and design that path first.`,
      functional: ['Support core user actions', 'Serve feeds or media efficiently', 'Store user and object metadata', 'Handle background processing'],
      nonFunctional: ['Low latency in common regions', 'High availability', 'Scalable storage and processing', 'Graceful degradation during partial failure'],
      scale: 'Estimate DAU, peak QPS, media/object size, fan-out, metadata growth, and regional traffic. Separate metadata from large binary objects.',
      components: ['API Gateway', 'Load Balancers', 'Stateless services', 'Cache', 'Queue', 'Workers', 'Object Storage', 'CDN', 'Search Index', 'SQL/NoSQL data stores'],
      tradeoffs: ['CDNs reduce latency but introduce cache invalidation', 'Object storage is excellent for large files but metadata still needs a database', 'Queues smooth spikes but make results eventually consistent'],
      builder: 'Build Client → API Gateway → Services. Split media/files to Object Storage + CDN, async work to Queue + Workers, and high-read data to Cache/Search.',
      reference: `${title} should be decomposed by traffic path: request routing, metadata, large objects, async processing, search/discovery, cache/CDN, and observability.`,
      quiz: `Which part of ${title} should use object storage or CDN rather than the primary database?`,
    }),
  ),
  ...['Google Docs', 'LeetCode', 'Airbnb', 'TikTok', 'Twitter/X Timeline', 'Spotify'].map((title) =>
    systemDesignLesson({
      module: 'Advanced Designs',
      title,
      slug: `system-design-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      summary: `Design ${title} while discussing consistency, availability, replication, and distributed coordination.`,
      problem: `Design ${title} at large scale. The goal is not a perfect diagram; it is a defensible set of tradeoffs under real constraints.`,
      functional: ['Support core product workflows', 'Handle collaboration or personalization where relevant', 'Serve reads at high scale', 'Process writes and events reliably'],
      nonFunctional: ['Regional availability', 'Clear consistency model', 'Resilience to partial failure', 'Cost-aware scaling'],
      scale: 'Estimate hot partitions, global users, write fan-out, read amplification, object size, retention, and acceptable staleness.',
      components: ['Edge/CDN', 'API Gateway', 'Domain services', 'Caches', 'Replicated data stores', 'Queues/logs', 'Workers', 'Search/indexing', 'Object storage', 'Monitoring'],
      tradeoffs: ['Strong consistency simplifies reasoning but can increase latency or reduce availability', 'Eventual consistency improves availability but requires user-facing reconciliation', 'Distributed locks can protect critical sections but are easy to misuse'],
      builder: 'Create the happy path first, then add replicas, queues, caches, indexes, and regional failover. Mark every edge as synchronous or asynchronous.',
      reference: `${title} requires explicit consistency choices. A good reference solution names which data must be strongly consistent, which data can lag, how events are replayed, and how users experience failure.`,
      quiz: `Where would ${title} tolerate eventual consistency, and where would it require stronger guarantees?`,
    }),
  ),
  systemDesignLesson({
    module: 'Capstone',
    title: 'AI Interview Mode: TinyURL',
    slug: 'system-design-ai-interview-tinyurl',
    summary: 'Practice answering follow-up questions like a real system design interview.',
    problem: 'Design TinyURL step by step while an AI interviewer challenges your requirements, scale estimates, data model, caching, and failure handling.',
    functional: ['Create short URLs', 'Redirect short URLs', 'Expire or delete links optionally', 'Track basic analytics optionally'],
    nonFunctional: ['Very low redirect latency', 'High read availability', 'Safe ID generation', 'Abuse prevention'],
    scale: 'Estimate read-heavy traffic: redirects usually dominate writes. Calculate links created per day, redirect QPS, storage for mappings, and cache hit goals.',
    components: ['Browser', 'API Gateway', 'URL service', 'ID generator', 'Redis cache', 'Postgres or NoSQL mapping store', 'Analytics queue', 'Worker'],
    tradeoffs: ['Random IDs are simple but can collide', 'Sequential IDs are easy but predictable unless encoded carefully', 'Caching redirects reduces DB load but cache invalidation matters for deletes/expiration'],
    builder: 'Build Browser → API Gateway → URL Service → Cache → Database, plus URL Service → Queue → Analytics Worker for non-critical tracking.',
    reference: 'A strong TinyURL design separates the redirect hot path from analytics. Redirects should hit cache first, fall back to the mapping store, and enqueue analytics asynchronously.',
    quiz: 'Why should analytics usually be asynchronous in a URL shortener?',
  }),
  systemDesignLesson({
    module: 'Capstone',
    title: 'Capstone: Design a Full Product',
    slug: 'system-design-capstone-full-product',
    summary: 'Design Discord, Uber, YouTube, GitHub, or Spotify and receive a rubric-based review.',
    problem: 'Choose a product and design it end to end. The final goal is a clear architecture plus a written defense of scalability, reliability, simplicity, cost, bottlenecks, and missing components.',
    functional: ['Define core workflows', 'Define APIs and data models', 'Design synchronous and asynchronous paths', 'Plan observability and failure handling'],
    nonFunctional: ['Scalability', 'Reliability', 'Simplicity', 'Cost control', 'Security and abuse resistance'],
    scale: 'Create a table of assumptions: DAU, peak QPS, read/write ratio, data size, media size, fan-out, geographic distribution, and retention.',
    components: ['Clients', 'API Gateway', 'Domain services', 'Databases', 'Caches', 'Queues/logs', 'Workers', 'Object storage', 'CDN', 'Search', 'Monitoring'],
    tradeoffs: ['Every component must earn its place', 'Every optimization should name the bottleneck it addresses', 'Every consistency choice should describe the user-visible behavior'],
    builder: 'Build the architecture canvas in stages: base request path, storage, scaling, async processing, regional strategy, observability, and failure recovery.',
    reference: 'The reference solution is a rubric: clear requirements, realistic estimates, justified components, known bottlenecks, failure handling, and thoughtful tradeoffs.',
    quiz: 'What makes a capstone design strong besides having many boxes on the diagram?',
  }),
] as const

const systemDesignQuestionCatalog = systemDesignLessonCatalog.map((lesson) => ({
  lessonSlug: lesson.slug,
  prompt: `In “${lesson.title}”, what is the best first step before drawing the architecture?`,
  options: [
    'Clarify requirements and estimate scale',
    'Pick microservices immediately',
    'Add every possible cache',
    'Choose the newest database',
  ],
  correctIndex: 0,
  explanation:
    'System design starts with requirements and scale. Components should follow from constraints, not from memorized diagrams.',
}))

const reactChallengeCatalog = [
  {
    lessonSlug: 'react-components-and-props',
    title: 'Build a Profile Card',
    slug: 'build-a-profile-card',
    description:
      'Complete a reusable ProfileCard component that displays different people from props.',
    difficulty: 'easy' as const,
    requirements: [
      'Accept name and role props',
      "Render the person's name and role",
      'Render Maya as a Frontend Developer',
      'Render Theo as a Product Designer',
    ],
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
    lessonSlug: 'react-props-and-reusable-components',
    title: 'Build a Movie Card',
    slug: 'build-a-movie-card',
    description:
      'Create one reusable card component and render different movies through props.',
    difficulty: 'easy' as const,
    requirements: [
      'Create a MovieCard component',
      'Accept title, year, and rating props',
      'Render at least two MovieCard instances',
      'Avoid duplicated movie card markup in App',
    ],
    starterCode: `function MovieCard() {
  return null;
}

export default function App() {
  return (
    <main>
      <h1>Movie night</h1>
    </main>
  );
}`,
    testCode: `import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders multiple movies from the reusable card", () => {
  render(<App />);
  expect(screen.getByText("Arrival")).toBeInTheDocument();
  expect(screen.getByText("Spider-Man: Into the Spider-Verse")).toBeInTheDocument();
});

test("renders year and rating details", () => {
  render(<App />);
  expect(screen.getByText(/2016/)).toBeInTheDocument();
  expect(screen.getByText(/PG/)).toBeInTheDocument();
});`,
  },
  {
    lessonSlug: 'react-conditional-rendering-and-lists',
    title: 'Render Task States',
    slug: 'render-task-states',
    description:
      'Render a task list with stable keys, filters, and an empty state.',
    difficulty: 'easy' as const,
    requirements: [
      'Render tasks with array.map',
      'Use each task id as the key',
      'Show a Done badge for completed tasks',
      'Show No tasks found when the visible list is empty',
    ],
    starterCode: `const tasks = [
  { id: "t1", title: "Read props lesson", done: true },
  { id: "t2", title: "Build task list", done: false },
];

export default function App() {
  return (
    <main>
      <h1>Tasks</h1>
    </main>
  );
}`,
    testCode: `import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders task titles", () => {
  render(<App />);
  expect(screen.getByText("Read props lesson")).toBeInTheDocument();
  expect(screen.getByText("Build task list")).toBeInTheDocument();
});

test("renders a done badge", () => {
  render(<App />);
  expect(screen.getByText("Done")).toBeInTheDocument();
});`,
  },
  {
    lessonSlug: 'react-state-and-events',
    title: 'Build a Toggle',
    slug: 'build-a-toggle',
    description:
      'Use state and an event handler to build an accessible on/off control.',
    difficulty: 'easy' as const,
    requirements: [
      'Create boolean state with useState',
      'Show On or Off from the current state',
      'Toggle state when the button is clicked',
      'Set aria-pressed to the current state',
    ],
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
    lessonSlug: 'react-forms-and-validation',
    title: 'Build a Profile Form',
    slug: 'build-a-profile-form',
    description:
      'Create a controlled form with validation and submit handling.',
    difficulty: 'medium' as const,
    requirements: [
      'Control the name and email inputs with state',
      'Prevent the default submit refresh',
      'Show an error when the name is empty',
      'Show Saved profile after valid submission',
    ],
    starterCode: `import { useState } from "react";

export default function App() {
  // Add controlled inputs, validation, and submit handling.
  return (
    <main>
      <h1>Profile</h1>
      <form>
        <label>
          Name
          <input name="name" />
        </label>
        <label>
          Email
          <input name="email" />
        </label>
        <button>Save</button>
      </form>
    </main>
  );
}`,
    testCode: `import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("shows validation for missing name", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(screen.getByText(/name is required/i)).toBeInTheDocument();
});

test("submits a valid profile", () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Maya" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "maya@example.com" } });
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(screen.getByText("Saved profile")).toBeInTheDocument();
});`,
  },
  {
    lessonSlug: 'react-component-communication',
    title: 'Build Cart Quantity Controls',
    slug: 'build-cart-quantity-controls',
    description:
      'Lift cart item state to the parent and update it through child callbacks.',
    difficulty: 'medium' as const,
    requirements: [
      'Store item quantity in the parent component',
      'Pass increment and decrement callbacks to child buttons',
      'Render the current quantity',
      'Render the derived cart total',
    ],
    starterCode: `import { useState } from "react";

function QuantityControls() {
  return (
    <div>
      <button>-</button>
      <span>1</span>
      <button>+</button>
    </div>
  );
}

export default function App() {
  // Own quantity here and pass callbacks down.
  return (
    <main>
      <h1>Cart</h1>
      <p>Notebook</p>
      <QuantityControls />
      <p>Total: $12</p>
    </main>
  );
}`,
    testCode: `import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("updates quantity and derived total from parent state", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "+" }));
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("Total: $24")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "-" }));
  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("Total: $12")).toBeInTheDocument();
});`,
  },
  {
    lessonSlug: 'react-effects-and-synchronization',
    title: 'Fix an Effect Timer',
    slug: 'fix-effect-timer',
    description:
      'Repair a timer effect so it starts, stops, and cleans up correctly.',
    difficulty: 'medium' as const,
    requirements: [
      'Use useEffect for the interval',
      'Start incrementing after clicking Start',
      'Stop incrementing after clicking Pause',
      'Return cleanup from the effect',
    ],
    starterCode: `import { useEffect, useState } from "react";

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(seconds + 1), 1000);
  }, [running]);

  return (
    <main>
      <h1>Timer</h1>
      <p>{seconds}s</p>
      <button onClick={() => setRunning(value => !value)}>
        {running ? "Pause" : "Start"}
      </button>
    </main>
  );
}`,
    testCode: `import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("increments while running", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Start" }));
  act(() => vi.advanceTimersByTime(1000));
  expect(screen.getByText("1s")).toBeInTheDocument();
});`,
  },
  {
    lessonSlug: 'react-context-shared-state',
    title: 'Build Theme Context',
    slug: 'build-theme-context',
    description:
      'Create a context provider and custom hook for shared theme state.',
    difficulty: 'medium' as const,
    requirements: [
      'Create a ThemeContext',
      'Wrap the app in a provider',
      'Expose theme and toggleTheme',
      'Toggle between Light mode and Dark mode text',
    ],
    starterCode: `import { createContext, useContext, useState } from "react";

// Create the context and provider.

function Toolbar() {
  return <button>Toggle theme</button>;
}

export default function App() {
  return (
    <main>
      <h1>Light mode</h1>
      <Toolbar />
    </main>
  );
}`,
    testCode: `import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("toggles shared theme text", () => {
  render(<App />);
  expect(screen.getByText("Light mode")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));
  expect(screen.getByText("Dark mode")).toBeInTheDocument();
});`,
  },
  {
    lessonSlug: 'react-custom-hooks',
    title: 'Create useToggle',
    slug: 'create-use-toggle',
    description:
      'Extract reusable toggle behavior into a custom hook with independent state per call.',
    difficulty: 'medium' as const,
    requirements: [
      'Create a useToggle custom hook',
      'Return the current value and a toggle function',
      'Use the hook in two separate ToggleRow components',
      'Keep each toggle independent',
    ],
    starterCode: `import { useState } from "react";

function useToggle(initialValue = false) {
  // Return current value and toggle action.
}

function ToggleRow({ label, initialValue }) {
  return <button>{label}: Off</button>;
}

export default function App() {
  return (
    <main>
      <h1>Preferences</h1>
      <ToggleRow label="Hints" initialValue={true} />
      <ToggleRow label="Sound" />
    </main>
  );
}`,
    testCode: `import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("keeps toggle calls independent", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: "Hints: On" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Sound: Off" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Sound: Off" }));
  expect(screen.getByRole("button", { name: "Hints: On" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Sound: On" })).toBeInTheDocument();
});`,
  },
  {
    lessonSlug: 'react-accessibility-production-quality',
    title: 'Fix Accessible Modal Controls',
    slug: 'fix-accessible-modal-controls',
    description:
      'Make a modal interaction understandable to assistive technology and keyboard users.',
    difficulty: 'medium' as const,
    requirements: [
      'Open the modal from a button',
      'Render the modal with role dialog',
      'Provide an accessible name for the dialog',
      'Close the modal from a Close button',
    ],
    starterCode: `import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <main>
      <h1>Settings</h1>
      <div onClick={() => setOpen(true)}>Open settings</div>
      {open && (
        <section>
          <h2>Preferences</h2>
          <button onClick={() => setOpen(false)}>Close</button>
        </section>
      )}
    </main>
  );
}`,
    testCode: `import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("opens and closes an accessible dialog", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Open settings" }));
  expect(screen.getByRole("dialog", { name: "Preferences" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Close" }));
  expect(screen.queryByRole("dialog", { name: "Preferences" })).not.toBeInTheDocument();
});`,
  },
] as const

const reactIndividualQuestionCatalog = reactIndividualLessonCatalog.map(
  (lesson) => ({
    lessonSlug: lesson.slug,
    prompt: `What is the main takeaway from “${lesson.title}”?`,
    options: [
      lesson.summary,
      'React should manually update DOM nodes from component bodies.',
      'Every value should move into global context immediately.',
      'Memoization is required before any component can render.',
    ],
    correctIndex: 0,
    explanation: lesson.summary,
  }),
)

const questionCatalog = [
  {
    lessonSlug: 'understanding-big-o',
    prompt:
      'A function scans an array once and stores every value in a set. What are its expected complexities?',
    options: [
      'O(1) time, O(n) space',
      'O(n) time, O(n) space',
      'O(n²) time, O(1) space',
      'O(log n) time, O(n) space',
    ],
    correctIndex: 1,
    explanation:
      'The single scan is O(n), and a set containing up to n distinct values requires O(n) auxiliary space.',
  },
  {
    lessonSlug: 'arrays-and-indexes',
    prompt: 'Which invariant makes the one-pass stock-profit solution correct?',
    options: [
      'Prices are processed in sorted order',
      'The current price is always the maximum',
      'The minimum price is from an earlier or current day',
      'Every price is compared with every later price',
    ],
    correctIndex: 2,
    explanation:
      'Tracking the minimum price seen so far guarantees that a candidate buy occurs no later than the current sell day.',
  },
  {
    lessonSlug: 'hash-maps-and-sets',
    prompt:
      'You need to remember the first index where each number appeared. Which structure best fits?',
    options: ['A set', 'A hash map', 'A queue', 'A boolean'],
    correctIndex: 1,
    explanation:
      'A hash map associates each number with additional information—its first index. A set stores presence only.',
  },
  {
    lessonSlug: 'complement-lookup',
    prompt:
      'For Two Sum, why should you look up the complement before storing the current value?',
    options: [
      'To sort the array',
      'To avoid using the same element twice',
      'To reduce memory to O(1)',
      'To handle only positive values',
    ],
    correctIndex: 1,
    explanation:
      'Looking up first ensures a match came from an earlier index rather than the current element itself.',
  },
  {
    lessonSlug: 'stacks-and-nested-structure',
    prompt:
      'Why is counting each bracket type insufficient for validating parentheses?',
    options: [
      'Counts require O(n) time',
      'Stacks cannot store characters',
      'Equal counts do not guarantee correct nesting order',
      'Closing brackets should be ignored',
    ],
    correctIndex: 2,
    explanation:
      'A string such as ([)] has balanced counts but invalid order. A stack preserves which opening bracket must close next.',
  },
  {
    lessonSlug: 'two-pointers-and-sliding-windows',
    prompt:
      'Why can a well-designed sliding window often process an array in O(n) time?',
    options: [
      'It sorts every window',
      'Each boundary moves across the array at most once',
      'It stores every possible range',
      'It uses recursion for each element',
    ],
    correctIndex: 1,
    explanation:
      'The left and right boundaries advance rather than restarting for every range, so their total movement is linear.',
  },
  {
    lessonSlug: 'binary-search-foundations',
    prompt: 'What property is required to binary-search an answer space?',
    options: [
      'Every value must be unique',
      'The input must fit in memory',
      'The decision condition must be monotonic',
      'The algorithm must use recursion',
    ],
    correctIndex: 2,
    explanation:
      'A monotonic condition lets a midpoint result prove that one entire side of the search space can be discarded.',
  },
  {
    lessonSlug: 'two-pointer-comparisons',
    prompt: 'Why can two pointers merge two sorted arrays in linear time?',
    options: [
      'Both arrays are sorted again',
      'Each step advances at least one pointer',
      'Every pair is compared',
      'The arrays must have equal lengths',
    ],
    correctIndex: 1,
    explanation:
      'Each comparison consumes one current value, so the two pointers make at most the combined number of advances.',
  },
  {
    lessonSlug: 'sliding-windows-last-seen',
    prompt:
      'When a repeated character was last seen before the active window, what should happen to left?',
    options: [
      'Move left backward',
      'Reset left to zero',
      'Leave left unchanged',
      'Move left to right',
    ],
    correctIndex: 2,
    explanation:
      'Only repeats inside the active window violate uniqueness. Taking max with the current left boundary prevents backward movement.',
  },
  {
    lessonSlug: 'running-best-kadanes-algorithm',
    prompt:
      'Why should Maximum Subarray initialize its best sum from the first element instead of zero?',
    options: [
      'The array is sorted',
      'The answer must be non-empty and can be negative',
      'Zero uses extra memory',
      'The first element is always the answer',
    ],
    correctIndex: 1,
    explanation:
      'For an all-negative array, zero is not the sum of a permitted non-empty subarray; initialization from the input preserves validity.',
  },
  {
    lessonSlug: 'prefix-and-suffix-products',
    prompt:
      'Why is the prefix saved before multiplying by the current array value?',
    options: [
      'To sort the prefix',
      'To exclude the current value from its answer',
      'To avoid negative numbers',
      'To make the output shorter',
    ],
    correctIndex: 1,
    explanation:
      'At index i, the stored prefix must contain only values strictly before i so nums[i] is excluded.',
  },
  {
    lessonSlug: 'read-and-write-pointers',
    prompt:
      'What invariant does the write pointer maintain while moving zeroes?',
    options: [
      'It points at the largest value',
      'Everything before it contains the processed non-zero values in order',
      'Everything after it is sorted',
      'It always equals read',
    ],
    correctIndex: 1,
    explanation:
      'The prefix before write contains exactly the non-zero values discovered so far, preserving their order.',
  },
  {
    lessonSlug: 'monotonic-stacks',
    prompt:
      'Why is the nested while loop in Daily Temperatures still O(n) overall?',
    options: [
      'Temperatures have a small range',
      'Each index is pushed and popped at most once',
      'The stack is always empty',
      'The loop runs only on warm days',
    ],
    correctIndex: 1,
    explanation:
      'Across the complete scan, no index can be popped more than once, so all stack operations total O(n).',
  },
  {
    lessonSlug: 'variable-size-sliding-windows',
    prompt:
      'Which input property makes the minimum-size sum window safe to shrink greedily?',
    options: [
      'The array is sorted',
      'All values are positive',
      'Every value is unique',
      'The target is even',
    ],
    correctIndex: 1,
    explanation:
      'Positive values make the window sum monotonic as either boundary advances, which justifies the pointer decisions.',
  },
  {
    lessonSlug: 'expression-evaluation-stacks',
    prompt: 'When an RPN operator is read, which operand is popped first?',
    options: [
      'The left operand',
      'The right operand',
      'The smallest operand',
      'The oldest operand',
    ],
    correctIndex: 1,
    explanation:
      'The most recently pushed value is the right operand; the next pop is the left operand.',
  },
  {
    lessonSlug: 'binary-search-rotated-data',
    prompt:
      'What remains reliably true inside a rotated sorted search interval with distinct values?',
    options: [
      'The midpoint is the smallest value',
      'At least one half is sorted',
      'The target is in the left half',
      'Both halves are unsorted',
    ],
    correctIndex: 1,
    explanation:
      'The rotation pivot can disrupt only one side around a midpoint, leaving the other side normally sorted.',
  },
  {
    lessonSlug: 'heaps-and-top-k-selection',
    prompt:
      'After processing every value with a min-heap of size k, what does the root represent?',
    options: [
      'The array minimum',
      'The array maximum',
      'The kth largest value',
      'The kth smallest value',
    ],
    correctIndex: 2,
    explanation:
      'The heap retains the k largest candidates, and its smallest retained candidate is the kth largest overall.',
  },
  {
    lessonSlug: 'grid-traversal-connected-components',
    prompt: 'When should the island count increase during a full grid scan?',
    options: [
      'For every land cell',
      'When unvisited land starts a new traversal',
      'For every water cell',
      'Whenever DFS returns',
    ],
    correctIndex: 1,
    explanation:
      'Each traversal from unvisited land consumes exactly one previously uncounted connected component.',
  },
  {
    lessonSlug: 'one-dimensional-dynamic-programming',
    prompt:
      'Why can Climbing Stairs use only two variables instead of a full table?',
    options: [
      'There are only two answers',
      'Each state depends only on the previous two states',
      'Recursion stores the table',
      'The input is sorted',
    ],
    correctIndex: 1,
    explanation:
      'Once ways[i] is computed, states older than i - 1 and i - 2 are no longer needed.',
  },
  {
    lessonSlug: 'react-components-and-props',
    prompt:
      'What is the best mental model for a React component?',
    options: [
      'A function that returns a description of one part of the UI',
      'A database table',
      'A CSS file that stores markup',
      'A function that must always own state',
    ],
    correctIndex: 0,
    explanation:
      'A component is a JavaScript function that returns JSX. Larger interfaces are composed from smaller component functions.',
  },
  {
    lessonSlug: 'react-props-and-reusable-components',
    prompt: 'When should a value be passed as a prop?',
    options: [
      'When a parent owns the value and a child needs it to render',
      'When the child should mutate the value',
      'Only when the value is a string',
      'Only when state is unavailable',
    ],
    correctIndex: 0,
    explanation:
      'Props are read-only inputs from parent to child. They let one component render different data without duplicating markup.',
  },
  {
    lessonSlug: 'react-conditional-rendering-and-lists',
    prompt:
      'Which value makes the best React key for a reorderable list of database records?',
    options: [
      'The array index',
      'A random number generated during render',
      "The record's stable database ID",
      'The visible label, even if labels repeat',
    ],
    correctIndex: 2,
    explanation:
      'A stable ID follows the same logical record across inserts, removals, and reordering, allowing React to preserve the correct component identity.',
  },
  {
    lessonSlug: 'react-state-and-events',
    prompt:
      'How should you increment state twice when both updates depend on the previous count?',
    options: [
      'Call setCount(count + 2) outside an event',
      'Use setCount(previous => previous + 1) twice',
      'Mutate count directly',
      'Copy count into a prop',
    ],
    correctIndex: 1,
    explanation:
      'Functional updaters are processed against the latest queued state, so both increments are preserved even when updates are batched.',
  },
  {
    lessonSlug: 'react-forms-and-validation',
    prompt: 'Why should a React form submit handler usually call preventDefault?',
    options: [
      'To stop the browser page refresh so React can handle the submission',
      'To prevent input values from changing',
      'To disable validation forever',
      'To make every field uncontrolled',
    ],
    correctIndex: 0,
    explanation:
      'Native form submission refreshes the page. preventDefault keeps the interaction inside React so you can validate, submit, and render feedback.',
  },
  {
    lessonSlug: 'react-component-communication',
    prompt: 'Where should shared sibling state usually live?',
    options: [
      'In the closest common parent that owns the coordinated behavior',
      'Duplicated separately in each sibling',
      'Always in context',
      'Inside a random child component',
    ],
    correctIndex: 0,
    explanation:
      'Lifting state to the closest common owner gives siblings one source of truth and lets children request changes through callbacks.',
  },
  {
    lessonSlug: 'react-effects-and-synchronization',
    prompt: 'Which task is an appropriate use of an effect?',
    options: [
      'Calculating a filtered array for rendering',
      'Handling a button click',
      'Synchronizing a browser event listener and cleaning it up',
      'Formatting a prop as text',
    ],
    correctIndex: 2,
    explanation:
      'An external browser event source requires setup and cleanup that follows the component lifecycle, which is exactly what an effect models.',
  },
  {
    lessonSlug: 'tanstack-router-foundations',
    prompt: 'Which kind of state belongs in URL search parameters?',
    options: [
      'View state that should survive refreshes and be shareable, such as filters',
      'A button hover state',
      'A private local input draft that should never leave the component',
      'A timeout ID from an effect',
    ],
    correctIndex: 0,
    explanation:
      'URL search parameters are a good home for shareable navigation state like filters, sort order, and pagination.',
  },
  {
    lessonSlug: 'tanstack-query-server-state',
    prompt: 'What kind of data is TanStack Query designed to manage?',
    options: [
      'Server state that is fetched, cached, refetched, and mutated',
      'Only local button hover state',
      'Static CSS variables',
      'Component names',
    ],
    correctIndex: 0,
    explanation:
      'TanStack Query manages asynchronous server state: loading, error, cache freshness, mutations, invalidation, and refetching.',
  },
  {
    lessonSlug: 'react-context-shared-state',
    prompt: 'When is React context a good fit?',
    options: [
      'For app-level client state needed by many descendants',
      'For every input field draft',
      'For replacing all props',
      'For caching server responses by default',
    ],
    correctIndex: 0,
    explanation:
      'Context is useful for shared client values such as theme or session shape, but local, URL, and server state often have better homes.',
  },
  {
    lessonSlug: 'react-custom-hooks',
    prompt:
      'What happens when two components call the same custom hook that uses useState?',
    options: [
      'They automatically share one state value',
      'Only the first component receives state',
      'Each call receives independent state',
      'React throws an error',
    ],
    correctIndex: 2,
    explanation:
      'Custom hooks reuse stateful logic. Each component call creates its own state unless the hook explicitly connects to shared external state.',
  },
  {
    lessonSlug: 'react-performance-rendering',
    prompt: 'What should usually happen before adding memoization?',
    options: [
      'Measure or identify the actual expensive render work',
      'Wrap every component in memo',
      'Move all state to context',
      'Delete all callbacks',
    ],
    correctIndex: 0,
    explanation:
      'Memoization has costs and complexity. Start with good state placement and measurement, then optimize the specific bottleneck.',
  },
  {
    lessonSlug: 'react-testing-applications',
    prompt: 'What should React Testing Library tests prioritize?',
    options: [
      'User-visible behavior and accessible interactions',
      'Private component variable names',
      'CSS class names only',
      'The exact number of functions in a file',
    ],
    correctIndex: 0,
    explanation:
      'Behavior-focused tests survive refactors because they verify what users can see and do rather than private implementation details.',
  },
  {
    lessonSlug: 'react-accessibility-production-quality',
    prompt: 'Which requirement belongs in production-quality React UI?',
    options: [
      'Keyboard access, labels, focus handling, errors, and responsive behavior',
      'Only mouse interactions',
      'Unlabeled icon buttons',
      'Hiding all error messages',
    ],
    correctIndex: 0,
    explanation:
      'Production UI should be accessible, resilient, responsive, and understandable across interaction modes and failure states.',
  },
  {
    lessonSlug: 'react-learning-dashboard-capstone',
    prompt:
      'What should a capstone review emphasize beyond whether the UI appears?',
    options: [
      'Ownership decisions for components, state, routes, data, accessibility, and tests',
      'Adding memoization to every function',
      'Avoiding TypeScript interfaces',
      'Moving every value into context',
    ],
    correctIndex: 0,
    explanation:
      'A realistic React review should test judgment: where data belongs, how interactions flow, and whether the app is accessible, tested, and maintainable.',
  },
  ...reactIndividualQuestionCatalog,
  ...systemDesignQuestionCatalog,
  ...blind75QuestionCatalog,
] as const

type CourseLessonSeed = {
  module: string
  title: string
  slug: string
  summary: string
  content: string
}

async function seedLessonCourse({
  title,
  slug,
  category,
  description,
  catalog,
}: {
  title: string
  slug: string
  category: string
  description: string
  catalog: readonly CourseLessonSeed[]
}) {
  await db
    .insert(courses)
    .values({ title, slug, category, description })
    .onConflictDoUpdate({
      target: courses.slug,
      set: { title, description },
    })

  const courseRows = await db
    .select({ id: courses.id })
    .from(courses)
    .where(eq(courses.slug, slug))
    .limit(1)
  if (courseRows.length === 0) throw new Error(`${title} course was not created.`)

  const existingModuleRows = await db
    .select({ id: courseModules.id })
    .from(courseModules)
    .where(eq(courseModules.courseId, courseRows[0].id))
  for (const module of existingModuleRows) {
    await db
      .update(lessons)
      .set({ position: sql`${lessons.position} + 1000` })
      .where(eq(lessons.moduleId, module.id))
  }

  const moduleNames = [...new Set(catalog.map((lesson) => lesson.module))]
  for (const [modulePosition, moduleTitle] of moduleNames.entries()) {
    await db
      .insert(courseModules)
      .values({
        courseId: courseRows[0].id,
        title: moduleTitle,
        position: modulePosition,
      })
      .onConflictDoUpdate({
        target: [courseModules.courseId, courseModules.position],
        set: { title: moduleTitle },
      })

    const moduleRows = await db
      .select({ id: courseModules.id })
      .from(courseModules)
      .where(
        and(
          eq(courseModules.courseId, courseRows[0].id),
          eq(courseModules.position, modulePosition),
        ),
      )
      .limit(1)
    if (moduleRows.length === 0)
      throw new Error(`${moduleTitle} module was not created.`)

    const moduleLessons = catalog.filter((lesson) => lesson.module === moduleTitle)
    for (const [position, lesson] of moduleLessons.entries()) {
      await db
        .insert(lessons)
        .values({
          moduleId: moduleRows[0].id,
          title: lesson.title,
          slug: lesson.slug,
          summary: lesson.summary,
          content: lesson.content,
          position,
          practiceProblemSlug: null,
        })
        .onConflictDoUpdate({
          target: lessons.slug,
          set: {
            moduleId: moduleRows[0].id,
            title: lesson.title,
            summary: lesson.summary,
            content: lesson.content,
            position,
            practiceProblemSlug: null,
          },
        })
    }
  }
}

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
      })

    const problemRows = await db
      .select({ id: problems.id })
      .from(problems)
      .where(eq(problems.slug, problemValues.slug))
      .limit(1)
    if (problemRows.length === 0)
      throw new Error(`${problemValues.title} was not created.`)

    const existing = await db
      .select({ id: testCases.id })
      .from(testCases)
      .where(eq(testCases.problemId, problemRows[0].id))
      .limit(1)
    if (existing.length === 0) {
      await db
        .insert(testCases)
        .values(
          tests.map((test, position) => ({
            ...test,
            problemId: problemRows[0].id,
            position,
          })),
        )
    }
  }

  await db
    .insert(courses)
    .values({
      title: 'DSA Foundations',
      slug: 'dsa-foundations',
      category: 'dsa',
      description:
        'Build the core patterns used to solve array, hashing, two-pointer, and stack problems.',
    })
    .onConflictDoUpdate({
      target: courses.slug,
      set: {
        title: 'DSA Foundations',
        description:
          'Build the core patterns used to solve array, hashing, two-pointer, and stack problems.',
      },
    })

  const courseRows = await db
    .select({ id: courses.id })
    .from(courses)
    .where(eq(courses.slug, 'dsa-foundations'))
    .limit(1)
  if (courseRows.length === 0) throw new Error('DSA course was not created.')

  const moduleNames = [...new Set(lessonCatalog.map((lesson) => lesson.module))]
  for (const [modulePosition, moduleTitle] of moduleNames.entries()) {
    await db
      .insert(courseModules)
      .values({
        courseId: courseRows[0].id,
        title: moduleTitle,
        position: modulePosition,
      })
      .onConflictDoUpdate({
        target: [courseModules.courseId, courseModules.position],
        set: { title: moduleTitle },
      })

    const moduleRows = await db
      .select({ id: courseModules.id })
      .from(courseModules)
      .where(
        and(
          eq(courseModules.courseId, courseRows[0].id),
          eq(courseModules.position, modulePosition),
        ),
      )
      .limit(1)
    if (moduleRows.length === 0)
      throw new Error(`${moduleTitle} module was not created.`)
    const currentModule = moduleRows[0]

    const moduleLessons = lessonCatalog.filter(
      (lesson) => lesson.module === moduleTitle,
    )
    for (const [position, lesson] of moduleLessons.entries()) {
      await db
        .insert(lessons)
        .values({
          moduleId: currentModule.id,
          title: lesson.title,
          slug: lesson.slug,
          summary: lesson.summary,
          content: lesson.content,
          position,
          practiceProblemSlug: lesson.practiceProblemSlug,
        })
        .onConflictDoUpdate({
          target: lessons.slug,
          set: {
            moduleId: currentModule.id,
            title: lesson.title,
            summary: lesson.summary,
            content: lesson.content,
            position,
            practiceProblemSlug: lesson.practiceProblemSlug,
          },
        })
    }
  }

  await db
    .insert(courses)
    .values({
      title: 'React Foundations',
      slug: 'react-foundations',
      category: 'react',
      description:
        'Learn the component, state, event, and effect fundamentals behind reliable React interfaces.',
    })
    .onConflictDoUpdate({
      target: courses.slug,
      set: {
        title: 'React Foundations',
        description:
          'Learn the component, state, event, and effect fundamentals behind reliable React interfaces.',
      },
    })

  const reactCourseRows = await db
    .select({ id: courses.id })
    .from(courses)
    .where(eq(courses.slug, 'react-foundations'))
    .limit(1)
  if (reactCourseRows.length === 0)
    throw new Error('React course was not created.')

  const existingReactModuleRows = await db
    .select({ id: courseModules.id })
    .from(courseModules)
    .where(eq(courseModules.courseId, reactCourseRows[0].id))
  for (const module of existingReactModuleRows) {
    await db
      .update(lessons)
      .set({ position: sql`${lessons.position} + 1000` })
      .where(eq(lessons.moduleId, module.id))
  }

  const reactModuleNames = [
    ...new Set(reactLessonCatalog.map((lesson) => lesson.module)),
  ]
  for (const [modulePosition, moduleTitle] of reactModuleNames.entries()) {
    await db
      .insert(courseModules)
      .values({
        courseId: reactCourseRows[0].id,
        title: moduleTitle,
        position: modulePosition,
      })
      .onConflictDoUpdate({
        target: [courseModules.courseId, courseModules.position],
        set: { title: moduleTitle },
      })

    const moduleRows = await db
      .select({ id: courseModules.id })
      .from(courseModules)
      .where(
        and(
          eq(courseModules.courseId, reactCourseRows[0].id),
          eq(courseModules.position, modulePosition),
        ),
      )
      .limit(1)
    if (moduleRows.length === 0)
      throw new Error(`${moduleTitle} React module was not created.`)

    const moduleLessons = reactLessonCatalog.filter(
      (lesson) => lesson.module === moduleTitle,
    )
    for (const [position, lesson] of moduleLessons.entries()) {
      await db
        .insert(lessons)
        .values({
          moduleId: moduleRows[0].id,
          title: lesson.title,
          slug: lesson.slug,
          summary: lesson.summary,
          content: lesson.content,
          position,
          practiceProblemSlug: null,
        })
        .onConflictDoUpdate({
          target: lessons.slug,
          set: {
            moduleId: moduleRows[0].id,
            title: lesson.title,
            summary: lesson.summary,
            content: lesson.content,
            position,
            practiceProblemSlug: null,
          },
        })
    }
  }

  await seedLessonCourse({
    title: 'System Design Foundations',
    slug: 'system-design-foundations',
    category: 'system-design',
    description:
      'Learn a repeatable system design process through architecture lessons, tradeoffs, AI review, and interview-style practice.',
    catalog: systemDesignLessonCatalog,
  })

  for (const question of questionCatalog) {
    const lessonRows = await db
      .select({ id: lessons.id })
      .from(lessons)
      .where(eq(lessons.slug, question.lessonSlug))
      .limit(1)
    if (lessonRows.length === 0)
      throw new Error(`${question.lessonSlug} lesson was not found.`)
    await db
      .insert(lessonQuestions)
      .values({
        lessonId: lessonRows[0].id,
        prompt: question.prompt,
        options: JSON.stringify(question.options),
        correctIndex: question.correctIndex,
        explanation: question.explanation,
      })
      .onConflictDoUpdate({
        target: lessonQuestions.lessonId,
        set: {
          prompt: question.prompt,
          options: JSON.stringify(question.options),
          correctIndex: question.correctIndex,
          explanation: question.explanation,
        },
      })
  }

  for (const [position, challenge] of reactChallengeCatalog.entries()) {
    const lessonRows = await db
      .select({ id: lessons.id })
      .from(lessons)
      .where(eq(lessons.slug, challenge.lessonSlug))
      .limit(1)
    if (lessonRows.length === 0)
      throw new Error(
        `${challenge.lessonSlug} lesson was not found for its React challenge.`,
      )
    await db
      .insert(reactChallenges)
      .values({
        lessonId: lessonRows[0].id,
        title: challenge.title,
        slug: challenge.slug,
        description: challenge.description,
        difficulty: challenge.difficulty,
        starterCode: challenge.starterCode,
        testCode: challenge.testCode,
        requirements: JSON.stringify(challenge.requirements),
        position,
      })
      .onConflictDoUpdate({
        target: reactChallenges.slug,
        set: {
          lessonId: lessonRows[0].id,
          title: challenge.title,
          description: challenge.description,
          difficulty: challenge.difficulty,
          starterCode: challenge.starterCode,
          testCode: challenge.testCode,
          requirements: JSON.stringify(challenge.requirements),
          position,
        },
      })
  }

  console.log(
    `Database seeded with ${catalog.length} problems, ${lessonCatalog.length + reactLessonCatalog.length + systemDesignLessonCatalog.length} lessons, ${questionCatalog.length} knowledge checks, and ${reactChallengeCatalog.length} React challenges.`,
  )
}

seed()
  .catch((error) => {
    console.error('Failed to seed database:', error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
