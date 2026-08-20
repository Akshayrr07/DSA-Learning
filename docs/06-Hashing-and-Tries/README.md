# Module 06: Hashing and Tries

This module focuses on key-value lookups using Hash Maps, Sets, and prefix matching using Tries.

## Key Concepts

### Hashing
Converts arbitrary keys into indices of a fixed-size table via a Hash Function.
*   **Collision Resolution:** Chaining (linked list buckets) and Open Addressing (linear/quadratic probing, double hashing).

### Trie (Prefix Tree)
A specialized tree structure used to store strings. Each node represents a character, allowing fast prefix-based lookups.

## Complexity Cheat Sheet

| Operation | Hash Map (Average) | Hash Map (Worst) | Trie (Word length $L$) |
|---|---|---|---|
| Insertion | $O(1)$ | $O(N)$ | $O(L)$ |
| Search | $O(1)$ | $O(N)$ | $O(L)$ |
| Deletion | $O(1)$ | $O(N)$ | $O(L)$ |
