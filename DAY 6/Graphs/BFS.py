1. Initialize an empty set `visited` to keep track of visited nodes.
2. Initialize a queue (using `deque`) with the starting node.
3. Initialize an empty list `result` to store the order of visited nodes.
4. While the queue is not empty:
    a. Dequeue a node from the front of the queue.
    b. If the node is not in `visited`:
        i. Mark the node as visited by adding it to `visited`.
        ii. Append the node to `result`.
        iii. Enqueue all unvisited neighbors of the node.
5. Return the `result` list containing the BFS traversal order.
