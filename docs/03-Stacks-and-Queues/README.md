# Module 03: Stacks and Queues

This module explores linear data structures utilizing restricted access rules.

## Key Concepts

### Stack (LIFO - Last In, First Out)
Elements are inserted and removed from the same end, called the "top".
*   **Push:** Inserts an element on top.
*   **Pop:** Removes the top element.
*   **Peek:** Views the top element without removing it.

### Queue (FIFO - First In, First Out)
Elements are inserted at the back ("rear") and removed from the front ("front").
*   **Enqueue:** Inserts an element at the rear.
*   **Dequeue:** Removes the front element.

### Deque (Double-Ended Queue)
Supports insertions and deletions from both front and rear.

## Complexity Cheat Sheet

| Operation | Stack | Queue | Deque |
|---|---|---|---|
| Push/Enqueue | $O(1)$ | $O(1)$ | $O(1)$ |
| Pop/Dequeue | $O(1)$ | $O(1)$ | $O(1)$ |
| Peek | $O(1)$ | $O(1)$ | $O(1)$ |
