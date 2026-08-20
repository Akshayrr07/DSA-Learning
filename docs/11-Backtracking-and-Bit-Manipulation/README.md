# Module 11: Backtracking and Bit Manipulation

This module combines exhaustive state search patterns and bitwise algorithmic tricks.

## Key Concepts

### Backtracking
Systematically searches all configurations of a state space. It abandons a candidate path ("backtracks") as soon as it determines the candidate cannot lead to a valid solution (e.g. N-Queens, Subsets, Permutations).

### Bit Manipulation
Performs operations directly on binary bits ($O(1)$ time complexity).
*   **Check Power of Two:** `n & (n - 1) == 0`
*   **Toggle Bit:** `n ^ (1 << i)`
*   **Single Number Detection:** `XOR` accumulator properties (`x ^ x = 0`).
