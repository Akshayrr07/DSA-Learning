const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.resolve(__dirname, '..', 'frontend', 'seed.sql');

const problems = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    acceptance_rate: 49.5,
    tags: ['Arrays', 'Hash Table'],
    description: 'Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*.\n\nYou may assume that each input would have ***exactly* one solution**, and you may not use the *same* element twice.\n\nYou can return the answer in any order.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    hints: [
      'A really brute force way would be to search for all possible pairs of numbers but that would be O(N^2) time. Can we do better?',
      'Can we use a hash map to look up the complement target - nums[i] in O(1) time?'
    ],
    sample_test_cases: [
      { input: '[2,7,11,15]\n9', expected_output: '[0,1]' },
      { input: '[3,2,4]\n6', expected_output: '[1,2]' }
    ],
    hidden_test_cases: [
      { input: '[3,3]\n6', expected_output: '[0,1]' },
      { input: '[1,5,3,10,2,8]\n18', expected_output: '[3,5]' },
      { input: '[-1,-2,-3,-4,-5]\n-8', expected_output: '[2,4]' }
    ],
    starter_code: {
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Write your code here
        pass`,
      javascript: `class Solution {
    twoSum(nums, target) {
        // Write your code here
        
    }
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[0];
    }
}`,
      go: `func twoSum(nums []int, target int) []int {
    // Write your code here
    return nil
}`,
      rust: `impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        // Write your code here
        vec![]
    }
}`
    }
  },
  {
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    difficulty: 'Easy',
    acceptance_rate: 73.2,
    tags: ['Linked List', 'Recursion'],
    description: 'Given the `head` of a singly linked list, reverse the list, and return *the reversed list*.',
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]',
        explanation: 'The linked list traversal order is reversed.'
      }
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    hints: [
      'A linked list can be reversed either iteratively or recursively. Try to implement both!'
    ],
    sample_test_cases: [
      { input: '[1,2,3,4,5]', expected_output: '[5,4,3,2,1]' },
      { input: '[1,2]', expected_output: '[2,1]' }
    ],
    hidden_test_cases: [
      { input: '[]', expected_output: '[]' },
      { input: '[7]', expected_output: '[7]' },
      { input: '[10,20,30,40,50,60,70]', expected_output: '[70,60,50,40,30,20,10]' }
    ],
    starter_code: {
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        # Write your code here
        pass`,
      javascript: `/*
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
class Solution {
    reverseList(head) {
        // Write your code here
        
    }
}`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Write your code here
        
    }
};`,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        // Write your code here
        return null;
    }
}`,
      go: `/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reverseList(head *ListNode) *ListNode {
    // Write your code here
    return nil
}`,
      rust: `// Definition for singly-linked list.
// #[derive(PartialEq, Eq, Clone, Debug)]
// pub struct ListNode {
//   pub val: i32,
//   pub next: Option<Box<ListNode>>
// }

impl Solution {
    pub fn reverse_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // Write your code here
        None
    }
}`
    }
  },
  {
    title: 'Merge Intervals',
    slug: 'merge-intervals',
    difficulty: 'Medium',
    acceptance_rate: 46.1,
    tags: ['Arrays', 'Sorting'],
    description: 'Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return *an array of the non-overlapping intervals that cover all the intervals in the input*.',
    examples: [
      {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]',
        explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].'
      },
      {
        input: 'intervals = [[1,4],[4,5]]',
        output: '[[1,5]]',
        explanation: 'Intervals [1,4] and [4,5] are considered overlapping.'
      }
    ],
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i <= end_i <= 10^4'
    ],
    hints: [
      'Sort the intervals by their start times first. This will align overlapping intervals sequentially.',
      'Maintain a list of merged intervals. For each interval, check if it overlaps with the last merged interval.'
    ],
    sample_test_cases: [
      { input: '[[1,3],[2,6],[8,10],[15,18]]', expected_output: '[[1,6],[8,10],[15,18]]' },
      { input: '[[1,4],[4,5]]', expected_output: '[[1,5]]' }
    ],
    hidden_test_cases: [
      { input: '[[1,4],[0,4]]', expected_output: '[[0,4]]' },
      { input: '[[1,4],[2,3]]', expected_output: '[[1,4]]' },
      { input: '[[2,3],[4,5],[6,7],[8,9],[1,10]]', expected_output: '[[1,10]]' }
    ],
    starter_code: {
      python: `class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        # Write your code here
        pass`,
      javascript: `class Solution {
    merge(intervals) {
        // Write your code here
        
    }
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Write your code here
        
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        // Write your code here
        return new int[0][0];
    }
}`,
      go: `func merge(intervals [][]int) [][]int {
    // Write your code here
    return nil
}`,
      rust: `impl Solution {
    pub fn merge(intervals: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // Write your code here
        vec![]
    }
}`
    }
  },
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    acceptance_rate: 40.2,
    tags: ['Stack', 'String'],
    description: 'Given a string `s` containing just the characters `\'(\'`, `\')\'`, `\'{\'`, `\'}\'`, `\'[\'` and `\']\'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    examples: [
      {
        input: 's = "()"',
        output: 'true',
        explanation: 'The brackets match correctly.'
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
        explanation: 'All sets of brackets match correctly.'
      },
      {
        input: 's = "(]"',
        output: 'false',
        explanation: 'The closing bracket \']\' does not match the opening \'(\'.'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only: \'()[]{}\''
    ],
    hints: [
      'Use a stack to store the opening brackets as you scan the string.',
      'When you encounter a closing bracket, check if it matches the bracket at the top of the stack.'
    ],
    sample_test_cases: [
      { input: '"()"', expected_output: 'true' },
      { input: '"()[]{}"', expected_output: 'true' },
      { input: '"(]"', expected_output: 'false' }
    ],
    hidden_test_cases: [
      { input: '"{[]}"', expected_output: 'true' },
      { input: '"["', expected_output: 'false' },
      { input: '"]"', expected_output: 'false' },
      { input: '"([)]"', expected_output: 'false' }
    ],
    starter_code: {
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        # Write your code here
        pass`,
      javascript: `class Solution {
    isValid(s) {
        // Write your code here
        
    }
}`,
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Write your code here
        
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean isValid(String s) {
        // Write your code here
        return false;
    }
}`,
      go: `func isValid(s string) bool {
    // Write your code here
    return false
}`,
      rust: `impl Solution {
    pub fn is_valid(s: String) -> bool {
        // Write your code here
        false
    }
}`
    }
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'Medium',
    acceptance_rate: 33.8,
    tags: ['Hash Table', 'String', 'Sliding Window'],
    description: 'Given a string `s`, find the length of the **longest substring** without repeating characters.',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    hints: [
      'Use a sliding window approach with two pointers representing the current substring bounds.',
      'Store indices of characters in a hash map to quickly jump the left boundary when a duplicate is found.'
    ],
    sample_test_cases: [
      { input: '"abcabcbb"', expected_output: '3' },
      { input: '"bbbbb"', expected_output: '1' },
      { input: '"pwwkew"', expected_output: '3' }
    ],
    hidden_test_cases: [
      { input: '""', expected_output: '0' },
      { input: '" "', expected_output: '1' },
      { input: '"dvdf"', expected_output: '3' },
      { input: '"tmmzuxt"', expected_output: '5' }
    ],
    starter_code: {
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Write your code here
        pass`,
      javascript: `class Solution {
    lengthOfLongestSubstring(s) {
        // Write your code here
        
    }
}`,
      cpp: `#include <string>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Write your code here
        
    }
};`,
      java: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your code here
        return 0;
    }
}`,
      go: `func lengthOfLongestSubstring(s string) int {
    // Write your code here
    return 0
}`,
      rust: `impl Solution {
    pub fn length_of_longest_substring(s: String) -> i32 {
        // Write your code here
        0
    }
}`
    }
  },
  {
    title: 'Container With Most Water',
    slug: 'container-with-most-water',
    difficulty: 'Medium',
    acceptance_rate: 54.0,
    tags: ['Arrays', 'Two Pointers'],
    description: 'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i^th` line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn *the maximum amount of water a container can store*.\n\n**Notice** that you may not slant the container.',
    examples: [
      {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation: 'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.'
      }
    ],
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4'
    ],
    hints: [
      'Start with two pointers, one at the beginning and one at the end of the array, forming the widest container.',
      'To find a larger container, move the pointer pointing to the shorter line inward, as it limits the height of the container.'
    ],
    sample_test_cases: [
      { input: '[1,8,6,2,5,4,8,3,7]', expected_output: '49' },
      { input: '[1,1]', expected_output: '1' }
    ],
    hidden_test_cases: [
      { input: '[4,3,2,1,4]', expected_output: '16' },
      { input: '[1,2,1]', expected_output: '2' },
      { input: '[2,3,4,5,18,17,6]', expected_output: '17' }
    ],
    starter_code: {
      python: `class Solution:
    def maxArea(self, height: list[int]) -> int:
        # Write your code here
        pass`,
      javascript: `class Solution {
    maxArea(height) {
        // Write your code here
        
    }
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        // Write your code here
        
    }
};`,
      java: `import java.util.*;

class Solution {
    public int maxArea(int[] height) {
        // Write your code here
        return 0;
    }
}`,
      go: `func maxArea(height []int) int {
    // Write your code here
    return 0
}`,
      rust: `impl Solution {
    pub fn max_area(height: Vec<i32>) -> i32 {
        // Write your code here
        0
    }
}`
    }
  },
  {
    title: '3Sum',
    slug: '3sum',
    difficulty: 'Medium',
    acceptance_rate: 32.5,
    tags: ['Arrays', 'Two Pointers', 'Sorting'],
    description: 'Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.',
    examples: [
      {
        input: 'nums = [-1,0,1,2,-1,-4]',
        output: '[[-1,-1,2],[-1,0,1]]',
        explanation: 'nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. The distinct triplets are [-1,0,1] and [-1,-1,2].'
      }
    ],
    constraints: [
      '3 <= nums.length <= 3000',
      '-10^5 <= nums[i] <= 10^5'
    ],
    hints: [
      'Sort the array first to make duplicate avoidance and two-pointer traversal straightforward.',
      'Iterate through the array, fixing the first element, and use a two-pointer approach for the remaining elements to find pairs that sum to its negative.'
    ],
    sample_test_cases: [
      { input: '[-1,0,1,2,-1,-4]', expected_output: '[[-1,-1,2],[-1,0,1]]' },
      { input: '[0,1,1]', expected_output: '[]' }
    ],
    hidden_test_cases: [
      { input: '[0,0,0]', expected_output: '[[0,0,0]]' },
      { input: '[-2,0,1,1,2]', expected_output: '[[-2,0,2],[-2,1,1]]' },
      { input: '[-1,0,1,2,-1,-4,-2,-3,3,0,4]', expected_output: '[[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]]' }
    ],
    starter_code: {
      python: `class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        # Write your code here
        pass`,
      javascript: `class Solution {
    threeSum(nums) {
        // Write your code here
        
    }
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        // Write your code here
        
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // Write your code here
        return new ArrayList<>();
    }
}`,
      go: `func threeSum(nums []int) [][]int {
    // Write your code here
    return nil
}`,
      rust: `impl Solution {
    pub fn three_sum(nums: Vec<i32>) -> Vec<Vec<i32>> {
        // Write your code here
        vec![]
    }
}`
    }
  },
  {
    title: 'Binary Tree Inorder Traversal',
    slug: 'binary-tree-inorder-traversal',
    difficulty: 'Easy',
    acceptance_rate: 74.1,
    tags: ['Tree', 'Depth-First Search', 'Binary Tree'],
    description: 'Given the `root` of a binary tree, return *the inorder traversal of its nodes\' values*.',
    examples: [
      {
        input: 'root = [1,null,2,3]',
        output: '[1,3,2]',
        explanation: 'Inorder traversal goes Left -> Root -> Right.'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].',
      '-100 <= Node.val <= 100'
    ],
    hints: [
      'Inorder traversal visits the left subtree, then the root node, then the right subtree.',
      'Can you implement this both recursively and iteratively using a stack?'
    ],
    sample_test_cases: [
      { input: '[1,null,2,3]', expected_output: '[1,3,2]' },
      { input: '[]', expected_output: '[]' }
    ],
    hidden_test_cases: [
      { input: '[1]', expected_output: '[1]' },
      { input: '[1,2,3,4,5,null,null]', expected_output: '[4,2,5,1,3]' },
      { input: '[10,5,15,3,7,null,18]', expected_output: '[3,5,7,10,15,18]' }
    ],
    starter_code: {
      python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def inorderTraversal(self, root: TreeNode) -> list[int]:
        # Write your code here
        pass`,
      javascript: `/*
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
class Solution {
    inorderTraversal(root) {
        // Write your code here
        
    }
}`,
      cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        // Write your code here
        
    }
};`,
      java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        // Write your code here
        return new ArrayList<>();
    }
}`,
      go: `/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func inorderTraversal(root *TreeNode) []int {
    // Write your code here
    return nil
}`,
      rust: `// Definition for a binary tree node.
// #[derive(Debug, PartialEq, Eq)]
// pub struct TreeNode {
//   pub val: i32,
//   pub left: Option<Rc<RefCell<TreeNode>>>,
//   pub right: Option<Rc<RefCell<TreeNode>>>,
// }

impl Solution {
    pub fn inorder_traversal(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        // Write your code here
        vec![]
    }
}`
    }
  },
  {
    title: 'Clone Graph',
    slug: 'clone-graph',
    difficulty: 'Medium',
    acceptance_rate: 52.8,
    tags: ['Hash Table', 'Depth-First Search', 'Breadth-First Search', 'Graph'],
    description: 'Given a reference of a node in a **connected undirected graph**.\n\nReturn a **deep copy** (clone) of the graph.\n\nEach node in the graph contains a value (`int`) and a list (`List[Node]`) of its neighbors.',
    examples: [
      {
        input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]',
        output: '[[2,4],[1,3],[2,4],[1,3]]',
        explanation: 'There are 4 nodes in the graph. The neighbors for each node are shown.'
      }
    ],
    constraints: [
      'The number of nodes in the graph is in the range [0, 100].',
      '1 <= Node.val <= 100',
      'Node.val is unique for each node.',
      'The Graph is connected and all edges are simple.'
    ],
    hints: [
      'Use a Depth-First Search (DFS) or Breadth-First Search (BFS) to traverse the graph.',
      'Use a hash map to map original nodes to their corresponding cloned nodes to handle cycles.'
    ],
    sample_test_cases: [
      { input: '[[2,4],[1,3],[2,4],[1,3]]', expected_output: '[[2,4],[1,3],[2,4],[1,3]]' },
      { input: '[]', expected_output: '[]' }
    ],
    hidden_test_cases: [
      { input: '[[]]', expected_output: '[[]]' },
      { input: '[[2],[1]]', expected_output: '[[2],[1]]' }
    ],
    starter_code: {
      python: `"""
# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        # Write your code here
        pass`,
      javascript: `/*
 * Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */
class Solution {
    cloneGraph(node) {
        // Write your code here
        
    }
}`,
      cpp: `/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};
*/
class Solution {
public:
    Node* cloneGraph(Node* node) {
        // Write your code here
        
    }
};`,
      java: `/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> neighbors;
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}
*/
class Solution {
    public Node cloneGraph(Node node) {
        // Write your code here
        return null;
    }
}`,
      go: `/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Neighbors []*Node
 * }
 */
func cloneGraph(node *Node) *Node {
    // Write your code here
    return nil
}`,
      rust: `// Definition for a Node in Rust is represented differently,
// but we will maintain standard structures.
`
    }
  },
  {
    title: 'Longest Common Subsequence',
    slug: 'longest-common-subsequence',
    difficulty: 'Medium',
    acceptance_rate: 59.1,
    tags: ['String', 'Dynamic Programming'],
    description: 'Given two strings `text1` and `text2`, return *the length of their longest common subsequence*. If there is no common subsequence, return `0`.\n\nA **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.\n\nFor example, `"ace"` is a subsequence of `"abcde"`. A **common subsequence** of two strings is a subsequence that is common to both strings.',
    examples: [
      {
        input: 'text1 = "abcde", text2 = "ace"',
        output: '3',
        explanation: 'The longest common subsequence is "ace" and its length is 3.'
      },
      {
        input: 'text1 = "abc", text2 = "abc"',
        output: '3',
        explanation: 'The longest common subsequence is "abc" and its length is 3.'
      },
      {
        input: 'text1 = "abc", text2 = "def"',
        output: '0',
        explanation: 'There is no such common subsequence, so the result is 0.'
      }
    ],
    constraints: [
      '1 <= text1.length, text2.length <= 1000',
      'text1 and text2 consist of lowercase English characters only.'
    ],
    hints: [
      'Let dp[i][j] represent the length of the longest common subsequence of text1[0...i-1] and text2[0...j-1].',
      'If text1[i-1] == text2[j-1], then dp[i][j] = dp[i-1][j-1] + 1. Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]).'
    ],
    sample_test_cases: [
      { input: '"abcde"\n"ace"', expected_output: '3' },
      { input: '"abc"\n"abc"', expected_output: '3' },
      { input: '"abc"\n"def"', expected_output: '0' }
    ],
    hidden_test_cases: [
      { input: '"ezupkr"\n"ubmra"', expected_output: '2' },
      { input: '"bsbininm"\n"jmjspfcqcdywomyo"', expected_output: '1' },
      { input: '"oxcpqrsvut"\n"tobxocpqrst"', expected_output: '8' }
    ],
    starter_code: {
      python: `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        # Write your code here
        pass`,
      javascript: `class Solution {
    longestCommonSubsequence(text1, text2) {
        // Write your code here
        
    }
}`,
      cpp: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        // Write your code here
        
    }
};`,
      java: `import java.util.*;

class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        // Write your code here
        return 0;
    }
}`,
      go: `func longestCommonSubsequence(text1 string, text2 string) int {
    // Write your code here
    return 0
}`,
      rust: `impl Solution {
    pub fn longest_common_subsequence(text1: String, text2: String) -> i32 {
        // Write your code here
        0
    }
}`
    }
  }
];

// Generate SQL seed script
let sqlContent = `-- Seed data for competitive programming problems
`;

for (const prob of problems) {
  const tagsStr = JSON.stringify(prob.tags).replace(/'/g, "''");
  const descStr = prob.description.replace(/'/g, "''");
  const examplesStr = JSON.stringify(prob.examples).replace(/'/g, "''");
  const constraintsStr = JSON.stringify(prob.constraints).replace(/'/g, "''");
  const hintsStr = JSON.stringify(prob.hints).replace(/'/g, "''");
  const sampleTestCasesStr = JSON.stringify(prob.sample_test_cases).replace(/'/g, "''");
  const hiddenTestCasesStr = JSON.stringify(prob.hidden_test_cases).replace(/'/g, "''");
  const starterCodeStr = JSON.stringify(prob.starter_code).replace(/'/g, "''");

  sqlContent += `
INSERT INTO problems (title, slug, difficulty, acceptance_rate, tags, description, examples, constraints, hints, sample_test_cases, hidden_test_cases, starter_code)
VALUES (
  '${prob.title.replace(/'/g, "''")}',
  '${prob.slug.replace(/'/g, "''")}',
  '${prob.difficulty}',
  ${prob.acceptance_rate},
  '${tagsStr}',
  '${descStr}',
  '${examplesStr}',
  '${constraintsStr}',
  '${hintsStr}',
  '${sampleTestCasesStr}',
  '${hiddenTestCasesStr}',
  '${starterCodeStr}'
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
`;
}

fs.writeFileSync(OUTPUT_FILE, sqlContent, 'utf-8');
console.log(`Successfully generated seed.sql at ${OUTPUT_FILE}`);
