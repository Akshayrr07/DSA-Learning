# Module 01: Arrays and Strings

This module covers 1D and 2D arrays, matrix operations, two-pointers, sliding window patterns, and string parsing.

## Key Concepts

### 1D and 2D Arrays
An array is a collection of elements identified by index or key. In memory, arrays are stored in contiguous blocks, which allows $O(1)$ lookup but makes insertion/deletion $O(N)$.
*   **1D Arrays:** Standard flat sequences of values.
*   **2D Arrays (Matrices):** Grid structures stored in row-major or column-major form.

### Algorithmic Patterns
*   **Two Pointers:** Using two variables pointing to different array indices to optimize nested loops. (e.g., palindrome validation, subset finding).
*   **Sliding Window:** Maintaining a subsegment (window) that expands or shrinks to find subarrays matching criteria (e.g., maximum sum subarray of size K).

## Operations Complexity

| Operation | Time Complexity (Array) | Time Complexity (String) |
|---|---|---|
| Access | $O(1)$ | $O(1)$ |
| Search | $O(N)$ | $O(N)$ |
| Insertion | $O(N)$ (requires shifting) | $O(N)$ |
| Deletion | $O(N)$ (requires shifting) | $O(N)$ |
