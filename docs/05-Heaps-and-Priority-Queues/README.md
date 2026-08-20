# Module 05: Heaps and Priority Queues

A Heap is a complete binary tree structure used for fast minimum/maximum retrieval.

## Heap Properties
*   **Min Heap:** The key at the root must be the minimum among all keys present in the Binary Heap. This property holds recursively for all subtrees.
*   **Max Heap:** The key at the root must be the maximum among all keys.

## Complexity Cheat Sheet

| Operation | Time Complexity | Details |
|---|---|---|
| Peek Min/Max | $O(1)$ | Direct access to root |
| Insert | $O(\log N)$ | Adds to end, then heapifies up |
| Extract Min/Max | $O(\log N)$ | Replaces root with last element, then heapifies down |
| Heapify (Build) | $O(N)$ | Bottom-up heap construction |
