# Module 00: Foundations and Complexity Analysis

Welcome to the Foundations and Complexity Analysis module. This section covers basic language constructs (patterns, loops, condition handling) and focuses on the theoretical groundwork of Big-O complexity analysis.

## Key Concepts

### Time Complexity
Refers to the computation time required by an algorithm as a function of input size ($N$).
*   **Worst-Case ($O$)**: Maximum time taken (upper bound).
*   **Best-Case ($\Omega$)**: Minimum time taken (lower bound).
*   **Average-Case ($\Theta$)**: Expected average execution time.

### Space Complexity
Memory required by an algorithm to execute, including input space and auxiliary space (extra space utilized during execution, such as recursion stack frames).

## Complexity Cheat Sheet

| Time Complexity | Name | Example Algorithm |
|---|---|---|
| $O(1)$ | Constant | Array indexing, basic arithmetic |
| $O(\log N)$ | Logarithmic | Binary Search, Heap operations |
| $O(N)$ | Linear | Linear Search, Array traversal |
| $O(N \log N)$ | Linearithmic | Merge Sort, Quick Sort (avg) |
| $O(N^2)$ | Quadratic | Bubble Sort, Selection Sort |
| $O(2^N)$ | Exponential | Recursive Fibonacci, Subsets generation |
| $O(N!)$ | Factorial | N-Queens backtracking, permutations |
