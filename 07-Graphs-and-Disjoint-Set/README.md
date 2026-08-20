# Module 07: Graphs and Disjoint Set

Graphs consist of a finite set of vertices (nodes) and edges (connections).

## Key Concepts

### Representation
*   **Adjacency Matrix:** 2D array indicating edges ($O(1)$ lookup, $O(V^2)$ space).
*   **Adjacency List:** Array of lists mapping neighbors ($O(V+E)$ space).

### Traversal
*   **BFS (Breadth-First Search):** Explores neighbors level-by-level using a Queue.
*   **DFS (Depth-First Search):** Explores paths deeply before backtracking using Recursion/Stack.

### Disjoint Set Union (DSU)
A data structure tracking partition groupings, optimized with Path Compression and Union by Rank.

## Traversals Complexity

| Algorithm | Time Complexity | Space Complexity |
|---|---|---|
| BFS | $O(V + E)$ | $O(V)$ |
| DFS | $O(V + E)$ | $O(V)$ |
