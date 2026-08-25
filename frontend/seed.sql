-- Seed data for competitive programming problems

INSERT INTO problems (title, slug, difficulty, acceptance_rate, tags, description, examples, constraints, hints, sample_test_cases, hidden_test_cases, starter_code)
VALUES (
  'Two Sum',
  'two-sum',
  'Easy',
  49.5,
  '["Arrays","Hash Table"]',
  'Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*.

You may assume that each input would have ***exactly* one solution**, and you may not use the *same* element twice.

You can return the answer in any order.',
  '[{"input":"nums = [2,7,11,15], target = 9","output":"[0,1]","explanation":"Because nums[0] + nums[1] == 9, we return [0, 1]."},{"input":"nums = [3,2,4], target = 6","output":"[1,2]","explanation":"Because nums[1] + nums[2] == 6, we return [1, 2]."}]',
  '["2 <= nums.length <= 10^4","-10^9 <= nums[i] <= 10^9","-10^9 <= target <= 10^9","Only one valid answer exists."]',
  '["A really brute force way would be to search for all possible pairs of numbers but that would be O(N^2) time. Can we do better?","Can we use a hash map to look up the complement target - nums[i] in O(1) time?"]',
  '[{"input":"[2,7,11,15]\n9","expected_output":"[0,1]"},{"input":"[3,2,4]\n6","expected_output":"[1,2]"}]',
  '[{"input":"[3,3]\n6","expected_output":"[0,1]"},{"input":"[1,5,3,10,2,8]\n18","expected_output":"[3,5]"},{"input":"[-1,-2,-3,-4,-5]\n-8","expected_output":"[2,4]"}]',
  '{"python":"class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Write your code here\n        pass","javascript":"class Solution {\n    twoSum(nums, target) {\n        // Write your code here\n        \n    }\n}","cpp":"#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n        \n    }\n};","java":"import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[0];\n    }\n}","go":"func twoSum(nums []int, target int) []int {\n    // Write your code here\n    return nil\n}","rust":"impl Solution {\n    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n        // Write your code here\n        vec![]\n    }\n}"}'
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  difficulty = excluded.difficulty,
  acceptance_rate = excluded.acceptance_rate,
  tags = excluded.tags,
  description = excluded.description,
  examples = excluded.examples,
  constraints = excluded.constraints,
  hints = excluded.hints,
  sample_test_cases = excluded.sample_test_cases,
  hidden_test_cases = excluded.hidden_test_cases,
  starter_code = excluded.starter_code;

INSERT INTO problems (title, slug, difficulty, acceptance_rate, tags, description, examples, constraints, hints, sample_test_cases, hidden_test_cases, starter_code)
VALUES (
  'Reverse Linked List',
  'reverse-linked-list',
  'Easy',
  73.2,
  '["Linked List","Recursion"]',
  'Given the `head` of a singly linked list, reverse the list, and return *the reversed list*.',
  '[{"input":"head = [1,2,3,4,5]","output":"[5,4,3,2,1]","explanation":"The linked list traversal order is reversed."}]',
  '["The number of nodes in the list is the range [0, 5000].","-5000 <= Node.val <= 5000"]',
  '["A linked list can be reversed either iteratively or recursively. Try to implement both!"]',
  '[{"input":"[1,2,3,4,5]","expected_output":"[5,4,3,2,1]"},{"input":"[1,2]","expected_output":"[2,1]"}]',
  '[{"input":"[]","expected_output":"[]"},{"input":"[7]","expected_output":"[7]"},{"input":"[10,20,30,40,50,60,70]","expected_output":"[70,60,50,40,30,20,10]"}]',
  '{"python":"# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\n\nclass Solution:\n    def reverseList(self, head: ListNode) -> ListNode:\n        # Write your code here\n        pass","javascript":"/*\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\nclass Solution {\n    reverseList(head) {\n        // Write your code here\n        \n    }\n}","cpp":"/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Write your code here\n        \n    }\n};","java":"/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        // Write your code here\n        return null;\n    }\n}","go":"/**\n * Definition for singly-linked list.\n * type ListNode struct {\n *     Val int\n *     Next *ListNode\n * }\n */\nfunc reverseList(head *ListNode) *ListNode {\n    // Write your code here\n    return nil\n}","rust":"// Definition for singly-linked list.\n// #[derive(PartialEq, Eq, Clone, Debug)]\n// pub struct ListNode {\n//   pub val: i32,\n//   pub next: Option<Box<ListNode>>\n// }\n\nimpl Solution {\n    pub fn reverse_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {\n        // Write your code here\n        None\n    }\n}"}'
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  difficulty = excluded.difficulty,
  acceptance_rate = excluded.acceptance_rate,
  tags = excluded.tags,
  description = excluded.description,
  examples = excluded.examples,
  constraints = excluded.constraints,
  hints = excluded.hints,
  sample_test_cases = excluded.sample_test_cases,
  hidden_test_cases = excluded.hidden_test_cases,
  starter_code = excluded.starter_code;

INSERT INTO problems (title, slug, difficulty, acceptance_rate, tags, description, examples, constraints, hints, sample_test_cases, hidden_test_cases, starter_code)
VALUES (
  'Merge Intervals',
  'merge-intervals',
  'Medium',
  46.1,
  '["Arrays","Sorting"]',
  'Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return *an array of the non-overlapping intervals that cover all the intervals in the input*.',
  '[{"input":"intervals = [[1,3],[2,6],[8,10],[15,18]]","output":"[[1,6],[8,10],[15,18]]","explanation":"Since intervals [1,3] and [2,6] overlap, merge them into [1,6]."},{"input":"intervals = [[1,4],[4,5]]","output":"[[1,5]]","explanation":"Intervals [1,4] and [4,5] are considered overlapping."}]',
  '["1 <= intervals.length <= 10^4","intervals[i].length == 2","0 <= start_i <= end_i <= 10^4"]',
  '["Sort the intervals by their start times first. This will align overlapping intervals sequentially.","Maintain a list of merged intervals. For each interval, check if it overlaps with the last merged interval."]',
  '[{"input":"[[1,3],[2,6],[8,10],[15,18]]","expected_output":"[[1,6],[8,10],[15,18]]"},{"input":"[[1,4],[4,5]]","expected_output":"[[1,5]]"}]',
  '[{"input":"[[1,4],[0,4]]","expected_output":"[[0,4]]"},{"input":"[[1,4],[2,3]]","expected_output":"[[1,4]]"},{"input":"[[2,3],[4,5],[6,7],[8,9],[1,10]]","expected_output":"[[1,10]]"}]',
  '{"python":"class Solution:\n    def merge(self, intervals: list[list[int]]) -> list[list[int]]:\n        # Write your code here\n        pass","javascript":"class Solution {\n    merge(intervals) {\n        // Write your code here\n        \n    }\n}","cpp":"#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        // Write your code here\n        \n    }\n};","java":"import java.util.*;\n\nclass Solution {\n    public int[][] merge(int[][] intervals) {\n        // Write your code here\n        return new int[0][0];\n    }\n}","go":"func merge(intervals [][]int) [][]int {\n    // Write your code here\n    return nil\n}","rust":"impl Solution {\n    pub fn merge(intervals: Vec<Vec<i32>>) -> Vec<Vec<i32>> {\n        // Write your code here\n        vec![]\n    }\n}"}'
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  difficulty = excluded.difficulty,
  acceptance_rate = excluded.acceptance_rate,
  tags = excluded.tags,
  description = excluded.description,
  examples = excluded.examples,
  constraints = excluded.constraints,
  hints = excluded.hints,
  sample_test_cases = excluded.sample_test_cases,
  hidden_test_cases = excluded.hidden_test_cases,
  starter_code = excluded.starter_code;

INSERT INTO problems (title, slug, difficulty, acceptance_rate, tags, description, examples, constraints, hints, sample_test_cases, hidden_test_cases, starter_code)
VALUES (
  'Valid Parentheses',
  'valid-parentheses',
  'Easy',
  40.2,
  '["Stack","String"]',
  'Given a string `s` containing just the characters `''(''`, `'')''`, `''{''`, `''}''`, `''[''` and `'']''`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.',
  '[{"input":"s = \"()\"","output":"true","explanation":"The brackets match correctly."},{"input":"s = \"()[]{}\"","output":"true","explanation":"All sets of brackets match correctly."},{"input":"s = \"(]\"","output":"false","explanation":"The closing bracket '']'' does not match the opening ''(''."}]',
  '["1 <= s.length <= 10^4","s consists of parentheses only: ''()[]{}''"]',
  '["Use a stack to store the opening brackets as you scan the string.","When you encounter a closing bracket, check if it matches the bracket at the top of the stack."]',
  '[{"input":"\"()\"","expected_output":"true"},{"input":"\"()[]{}\"","expected_output":"true"},{"input":"\"(]\"","expected_output":"false"}]',
  '[{"input":"\"{[]}\"","expected_output":"true"},{"input":"\"[\"","expected_output":"false"},{"input":"\"]\"","expected_output":"false"},{"input":"\"([)]\"","expected_output":"false"}]',
  '{"python":"class Solution:\n    def isValid(self, s: str) -> bool:\n        # Write your code here\n        pass","javascript":"class Solution {\n    isValid(s) {\n        // Write your code here\n        \n    }\n}","cpp":"#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // Write your code here\n        \n    }\n};","java":"import java.util.*;\n\nclass Solution {\n    public boolean isValid(String s) {\n        // Write your code here\n        return false;\n    }\n}","go":"func isValid(s string) bool {\n    // Write your code here\n    return false\n}","rust":"impl Solution {\n    pub fn is_valid(s: String) -> bool {\n        // Write your code here\n        false\n    }\n}"}'
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  difficulty = excluded.difficulty,
  acceptance_rate = excluded.acceptance_rate,
  tags = excluded.tags,
  description = excluded.description,
  examples = excluded.examples,
  constraints = excluded.constraints,
  hints = excluded.hints,
  sample_test_cases = excluded.sample_test_cases,
  hidden_test_cases = excluded.hidden_test_cases,
  starter_code = excluded.starter_code;

INSERT INTO problems (title, slug, difficulty, acceptance_rate, tags, description, examples, constraints, hints, sample_test_cases, hidden_test_cases, starter_code)
VALUES (
  'Longest Substring Without Repeating Characters',
  'longest-substring-without-repeating-characters',
  'Medium',
  33.8,
  '["Hash Table","String","Sliding Window"]',
  'Given a string `s`, find the length of the **longest substring** without repeating characters.',
  '[{"input":"s = \"abcabcbb\"","output":"3","explanation":"The answer is \"abc\", with the length of 3."},{"input":"s = \"bbbbb\"","output":"1","explanation":"The answer is \"b\", with the length of 1."},{"input":"s = \"pwwkew\"","output":"3","explanation":"The answer is \"wke\", with the length of 3. Note that the answer must be a substring, \"pwke\" is a subsequence and not a substring."}]',
  '["0 <= s.length <= 5 * 10^4","s consists of English letters, digits, symbols and spaces."]',
  '["Use a sliding window approach with two pointers representing the current substring bounds.","Store indices of characters in a hash map to quickly jump the left boundary when a duplicate is found."]',
  '[{"input":"\"abcabcbb\"","expected_output":"3"},{"input":"\"bbbbb\"","expected_output":"1"},{"input":"\"pwwkew\"","expected_output":"3"}]',
  '[{"input":"\"\"","expected_output":"0"},{"input":"\" \"","expected_output":"1"},{"input":"\"dvdf\"","expected_output":"3"},{"input":"\"tmmzuxt\"","expected_output":"5"}]',
  '{"python":"class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Write your code here\n        pass","javascript":"class Solution {\n    lengthOfLongestSubstring(s) {\n        // Write your code here\n        \n    }\n}","cpp":"#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your code here\n        \n    }\n};","java":"import java.util.*;\n\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your code here\n        return 0;\n    }\n}","go":"func lengthOfLongestSubstring(s string) int {\n    // Write your code here\n    return 0\n}","rust":"impl Solution {\n    pub fn length_of_longest_substring(s: String) -> i32 {\n        // Write your code here\n        0\n    }\n}"}'
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  difficulty = excluded.difficulty,
  acceptance_rate = excluded.acceptance_rate,
  tags = excluded.tags,
  description = excluded.description,
  examples = excluded.examples,
  constraints = excluded.constraints,
  hints = excluded.hints,
  sample_test_cases = excluded.sample_test_cases,
  hidden_test_cases = excluded.hidden_test_cases,
  starter_code = excluded.starter_code;

INSERT INTO problems (title, slug, difficulty, acceptance_rate, tags, description, examples, constraints, hints, sample_test_cases, hidden_test_cases, starter_code)
VALUES (
  'Container With Most Water',
  'container-with-most-water',
  'Medium',
  54,
  '["Arrays","Two Pointers"]',
  'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i^th` line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return *the maximum amount of water a container can store*.

**Notice** that you may not slant the container.',
  '[{"input":"height = [1,8,6,2,5,4,8,3,7]","output":"49","explanation":"The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49."}]',
  '["n == height.length","2 <= n <= 10^5","0 <= height[i] <= 10^4"]',
  '["Start with two pointers, one at the beginning and one at the end of the array, forming the widest container.","To find a larger container, move the pointer pointing to the shorter line inward, as it limits the height of the container."]',
  '[{"input":"[1,8,6,2,5,4,8,3,7]","expected_output":"49"},{"input":"[1,1]","expected_output":"1"}]',
  '[{"input":"[4,3,2,1,4]","expected_output":"16"},{"input":"[1,2,1]","expected_output":"2"},{"input":"[2,3,4,5,18,17,6]","expected_output":"17"}]',
  '{"python":"class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        # Write your code here\n        pass","javascript":"class Solution {\n    maxArea(height) {\n        // Write your code here\n        \n    }\n}","cpp":"#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Write your code here\n        \n    }\n};","java":"import java.util.*;\n\nclass Solution {\n    public int maxArea(int[] height) {\n        // Write your code here\n        return 0;\n    }\n}","go":"func maxArea(height []int) int {\n    // Write your code here\n    return 0\n}","rust":"impl Solution {\n    pub fn max_area(height: Vec<i32>) -> i32 {\n        // Write your code here\n        0\n    }\n}"}'
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  difficulty = excluded.difficulty,
  acceptance_rate = excluded.acceptance_rate,
  tags = excluded.tags,
  description = excluded.description,
  examples = excluded.examples,
  constraints = excluded.constraints,
  hints = excluded.hints,
  sample_test_cases = excluded.sample_test_cases,
  hidden_test_cases = excluded.hidden_test_cases,
  starter_code = excluded.starter_code;

INSERT INTO problems (title, slug, difficulty, acceptance_rate, tags, description, examples, constraints, hints, sample_test_cases, hidden_test_cases, starter_code)
VALUES (
  '3Sum',
  '3sum',
  'Medium',
  32.5,
  '["Arrays","Two Pointers","Sorting"]',
  'Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

Notice that the solution set must not contain duplicate triplets.',
  '[{"input":"nums = [-1,0,1,2,-1,-4]","output":"[[-1,-1,2],[-1,0,1]]","explanation":"nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. The distinct triplets are [-1,0,1] and [-1,-1,2]."}]',
  '["3 <= nums.length <= 3000","-10^5 <= nums[i] <= 10^5"]',
  '["Sort the array first to make duplicate avoidance and two-pointer traversal straightforward.","Iterate through the array, fixing the first element, and use a two-pointer approach for the remaining elements to find pairs that sum to its negative."]',
  '[{"input":"[-1,0,1,2,-1,-4]","expected_output":"[[-1,-1,2],[-1,0,1]]"},{"input":"[0,1,1]","expected_output":"[]"}]',
  '[{"input":"[0,0,0]","expected_output":"[[0,0,0]]"},{"input":"[-2,0,1,1,2]","expected_output":"[[-2,0,2],[-2,1,1]]"},{"input":"[-1,0,1,2,-1,-4,-2,-3,3,0,4]","expected_output":"[[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]]"}]',
  '{"python":"class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        # Write your code here\n        pass","javascript":"class Solution {\n    threeSum(nums) {\n        // Write your code here\n        \n    }\n}","cpp":"#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};","java":"import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}","go":"func threeSum(nums []int) [][]int {\n    // Write your code here\n    return nil\n}","rust":"impl Solution {\n    pub fn three_sum(nums: Vec<i32>) -> Vec<Vec<i32>> {\n        // Write your code here\n        vec![]\n    }\n}"}'
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  difficulty = excluded.difficulty,
  acceptance_rate = excluded.acceptance_rate,
  tags = excluded.tags,
  description = excluded.description,
  examples = excluded.examples,
  constraints = excluded.constraints,
  hints = excluded.hints,
  sample_test_cases = excluded.sample_test_cases,
  hidden_test_cases = excluded.hidden_test_cases,
  starter_code = excluded.starter_code;

INSERT INTO problems (title, slug, difficulty, acceptance_rate, tags, description, examples, constraints, hints, sample_test_cases, hidden_test_cases, starter_code)
VALUES (
  'Binary Tree Inorder Traversal',
  'binary-tree-inorder-traversal',
  'Easy',
  74.1,
  '["Tree","Depth-First Search","Binary Tree"]',
  'Given the `root` of a binary tree, return *the inorder traversal of its nodes'' values*.',
  '[{"input":"root = [1,null,2,3]","output":"[1,3,2]","explanation":"Inorder traversal goes Left -> Root -> Right."}]',
  '["The number of nodes in the tree is in the range [0, 100].","-100 <= Node.val <= 100"]',
  '["Inorder traversal visits the left subtree, then the root node, then the right subtree.","Can you implement this both recursively and iteratively using a stack?"]',
  '[{"input":"[1,null,2,3]","expected_output":"[1,3,2]"},{"input":"[]","expected_output":"[]"}]',
  '[{"input":"[1]","expected_output":"[1]"},{"input":"[1,2,3,4,5,null,null]","expected_output":"[4,2,5,1,3]"},{"input":"[10,5,15,3,7,null,18]","expected_output":"[3,5,7,10,15,18]"}]',
  '{"python":"# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def inorderTraversal(self, root: TreeNode) -> list[int]:\n        # Write your code here\n        pass","javascript":"/*\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\nclass Solution {\n    inorderTraversal(root) {\n        // Write your code here\n        \n    }\n}","cpp":"/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    vector<int> inorderTraversal(TreeNode* root) {\n        // Write your code here\n        \n    }\n};","java":"/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode() {}\n *     TreeNode(int val) { this.val = val; }\n *     TreeNode(int val, TreeNode left, TreeNode right) {\n *         this.val = val;\n *         this.left = left;\n *         this.right = right;\n *     }\n * }\n */\nclass Solution {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}","go":"/**\n * Definition for a binary tree node.\n * type TreeNode struct {\n *     Val int\n *     Left *TreeNode\n *     Right *TreeNode\n * }\n */\nfunc inorderTraversal(root *TreeNode) []int {\n    // Write your code here\n    return nil\n}","rust":"// Definition for a binary tree node.\n// #[derive(Debug, PartialEq, Eq)]\n// pub struct TreeNode {\n//   pub val: i32,\n//   pub left: Option<Rc<RefCell<TreeNode>>>,\n//   pub right: Option<Rc<RefCell<TreeNode>>>,\n// }\n\nimpl Solution {\n    pub fn inorder_traversal(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {\n        // Write your code here\n        vec![]\n    }\n}"}'
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  difficulty = excluded.difficulty,
  acceptance_rate = excluded.acceptance_rate,
  tags = excluded.tags,
  description = excluded.description,
  examples = excluded.examples,
  constraints = excluded.constraints,
  hints = excluded.hints,
  sample_test_cases = excluded.sample_test_cases,
  hidden_test_cases = excluded.hidden_test_cases,
  starter_code = excluded.starter_code;

INSERT INTO problems (title, slug, difficulty, acceptance_rate, tags, description, examples, constraints, hints, sample_test_cases, hidden_test_cases, starter_code)
VALUES (
  'Clone Graph',
  'clone-graph',
  'Medium',
  52.8,
  '["Hash Table","Depth-First Search","Breadth-First Search","Graph"]',
  'Given a reference of a node in a **connected undirected graph**.

Return a **deep copy** (clone) of the graph.

Each node in the graph contains a value (`int`) and a list (`List[Node]`) of its neighbors.',
  '[{"input":"adjList = [[2,4],[1,3],[2,4],[1,3]]","output":"[[2,4],[1,3],[2,4],[1,3]]","explanation":"There are 4 nodes in the graph. The neighbors for each node are shown."}]',
  '["The number of nodes in the graph is in the range [0, 100].","1 <= Node.val <= 100","Node.val is unique for each node.","The Graph is connected and all edges are simple."]',
  '["Use a Depth-First Search (DFS) or Breadth-First Search (BFS) to traverse the graph.","Use a hash map to map original nodes to their corresponding cloned nodes to handle cycles."]',
  '[{"input":"[[2,4],[1,3],[2,4],[1,3]]","expected_output":"[[2,4],[1,3],[2,4],[1,3]]"},{"input":"[]","expected_output":"[]"}]',
  '[{"input":"[[]]","expected_output":"[[]]"},{"input":"[[2],[1]]","expected_output":"[[2],[1]]"}]',
  '{"python":"\"\"\"\n# Definition for a Node.\nclass Node:\n    def __init__(self, val = 0, neighbors = None):\n        self.val = val\n        self.neighbors = neighbors if neighbors is not None else []\n\"\"\"\n\nclass Solution:\n    def cloneGraph(self, node: ''Node'') -> ''Node'':\n        # Write your code here\n        pass","javascript":"/*\n * Definition for a Node.\n * function Node(val, neighbors) {\n *    this.val = val === undefined ? 0 : val;\n *    this.neighbors = neighbors === undefined ? [] : neighbors;\n * };\n */\nclass Solution {\n    cloneGraph(node) {\n        // Write your code here\n        \n    }\n}","cpp":"/*\n// Definition for a Node.\nclass Node {\npublic:\n    int val;\n    vector<Node*> neighbors;\n    Node() {\n        val = 0;\n        neighbors = vector<Node*>();\n    }\n    Node(int _val) {\n        val = _val;\n        neighbors = vector<Node*>();\n    }\n    Node(int _val, vector<Node*> _neighbors) {\n        val = _val;\n        neighbors = _neighbors;\n    }\n};\n*/\nclass Solution {\npublic:\n    Node* cloneGraph(Node* node) {\n        // Write your code here\n        \n    }\n};","java":"/*\n// Definition for a Node.\nclass Node {\n    public int val;\n    public List<Node> neighbors;\n    public Node() {\n        val = 0;\n        neighbors = new ArrayList<Node>();\n    }\n    public Node(int _val) {\n        val = _val;\n        neighbors = new ArrayList<Node>();\n    }\n    public Node(int _val, ArrayList<Node> _neighbors) {\n        val = _val;\n        neighbors = _neighbors;\n    }\n}\n*/\nclass Solution {\n    public Node cloneGraph(Node node) {\n        // Write your code here\n        return null;\n    }\n}","go":"/**\n * Definition for a Node.\n * type Node struct {\n *     Val int\n *     Neighbors []*Node\n * }\n */\nfunc cloneGraph(node *Node) *Node {\n    // Write your code here\n    return nil\n}","rust":"// Definition for a Node in Rust is represented differently,\n// but we will maintain standard structures.\n"}'
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  difficulty = excluded.difficulty,
  acceptance_rate = excluded.acceptance_rate,
  tags = excluded.tags,
  description = excluded.description,
  examples = excluded.examples,
  constraints = excluded.constraints,
  hints = excluded.hints,
  sample_test_cases = excluded.sample_test_cases,
  hidden_test_cases = excluded.hidden_test_cases,
  starter_code = excluded.starter_code;

INSERT INTO problems (title, slug, difficulty, acceptance_rate, tags, description, examples, constraints, hints, sample_test_cases, hidden_test_cases, starter_code)
VALUES (
  'Longest Common Subsequence',
  'longest-common-subsequence',
  'Medium',
  59.1,
  '["String","Dynamic Programming"]',
  'Given two strings `text1` and `text2`, return *the length of their longest common subsequence*. If there is no common subsequence, return `0`.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, `"ace"` is a subsequence of `"abcde"`. A **common subsequence** of two strings is a subsequence that is common to both strings.',
  '[{"input":"text1 = \"abcde\", text2 = \"ace\"","output":"3","explanation":"The longest common subsequence is \"ace\" and its length is 3."},{"input":"text1 = \"abc\", text2 = \"abc\"","output":"3","explanation":"The longest common subsequence is \"abc\" and its length is 3."},{"input":"text1 = \"abc\", text2 = \"def\"","output":"0","explanation":"There is no such common subsequence, so the result is 0."}]',
  '["1 <= text1.length, text2.length <= 1000","text1 and text2 consist of lowercase English characters only."]',
  '["Let dp[i][j] represent the length of the longest common subsequence of text1[0...i-1] and text2[0...j-1].","If text1[i-1] == text2[j-1], then dp[i][j] = dp[i-1][j-1] + 1. Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1])."]',
  '[{"input":"\"abcde\"\n\"ace\"","expected_output":"3"},{"input":"\"abc\"\n\"abc\"","expected_output":"3"},{"input":"\"abc\"\n\"def\"","expected_output":"0"}]',
  '[{"input":"\"ezupkr\"\n\"ubmra\"","expected_output":"2"},{"input":"\"bsbininm\"\n\"jmjspfcqcdywomyo\"","expected_output":"1"},{"input":"\"oxcpqrsvut\"\n\"tobxocpqrst\"","expected_output":"8"}]',
  '{"python":"class Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        # Write your code here\n        pass","javascript":"class Solution {\n    longestCommonSubsequence(text1, text2) {\n        // Write your code here\n        \n    }\n}","cpp":"#include <string>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        // Write your code here\n        \n    }\n};","java":"import java.util.*;\n\nclass Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        // Write your code here\n        return 0;\n    }\n}","go":"func longestCommonSubsequence(text1 string, text2 string) int {\n    // Write your code here\n    return 0\n}","rust":"impl Solution {\n    pub fn longest_common_subsequence(text1: String, text2: String) -> i32 {\n        // Write your code here\n        0\n    }\n}"}'
) ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  difficulty = excluded.difficulty,
  acceptance_rate = excluded.acceptance_rate,
  tags = excluded.tags,
  description = excluded.description,
  examples = excluded.examples,
  constraints = excluded.constraints,
  hints = excluded.hints,
  sample_test_cases = excluded.sample_test_cases,
  hidden_test_cases = excluded.hidden_test_cases,
  starter_code = excluded.starter_code;
