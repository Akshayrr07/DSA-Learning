# Module 04: Trees and Binary Search Trees (BST)

Trees are hierarchical structures containing nodes connected by edges, starting from a single "root" node.

## Key Concepts

### Binary Tree
Each node has at most two children (`left` and `right`).
*   **Traversals:**
    *   **Pre-order (DFS):** Root -> Left -> Right
    *   **In-order (DFS):** Left -> Root -> Right (Produces sorted order in BST)
    *   **Post-order (DFS):** Left -> Right -> Root
    *   **Level-order (BFS):** Layer by layer from top to bottom

### Binary Search Tree (BST)
A binary tree enforcing:
$$\text{Left Child} < \text{Parent} < \text{Right Child}$$

## Complexity Cheat Sheet

| Operation | Average Case (BST) | Worst Case (Skewed BST) |
|---|---|---|
| Search | $O(\log N)$ | $O(N)$ |
| Insertion | $O(\log N)$ | $O(N)$ |
| Deletion | $O(\log N)$ | $O(N)$ |
