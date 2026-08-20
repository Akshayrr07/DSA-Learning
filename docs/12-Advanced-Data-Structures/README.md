# Module 12: Advanced Data Structures

Welcome to Advanced Data Structures, which covers query optimization on intervals.

## Key Structures

### Segment Tree
A binary tree used for storing intervals or segments. It allows querying a range and updating a point in $O(\log N)$ time.
```text
            [0-5] (Sum=36)
           /              \
     [0-2] (16)         [3-5] (20)
     /        \        /        \
  [0-1] (9)  [2] (7) [3-4] (14) [5] (6)
```

### Fenwick Tree (Binary Indexed Tree - BIT)
A compact data structure representing prefix sum frequencies in $O(\log N)$ time with minimal memory overhead ($O(N)$ space).
