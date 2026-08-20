# Module 02: Linked Lists

A Linked List is a linear data structure where elements are stored in nodes. Unlike arrays, nodes are not stored in contiguous memory but are chained via pointer links.

## Key Structures

### Singly Linked List
Each node contains a data payload and a single pointer (`next`) to the succeeding node.
```text
[ Head: data | next ] ---> [ data | next ] ---> [ data | null ]
```

### Doubly Linked List
Each node contains `data`, `next`, and a `prev` pointer referencing the previous node.
```text
[ null ] <--- [ prev | data | next ] <=> [ prev | data | next ] ---> [ null ]
```

### Circular Linked List
The tail node's `next` pointer links back to the head node.

## Operations Complexity

| Operation | Worst-Case | Best-Case |
|---|---|---|
| Access / Search | $O(N)$ | $O(1)$ |
| Insert at Head | $O(1)$ | $O(1)$ |
| Insert at Tail | $O(N)$ (or $O(1)$ with tail pointer) | $O(1)$ |
| Delete by Value | $O(N)$ | $O(1)$ |
