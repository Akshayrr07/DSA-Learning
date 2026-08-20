# Module 09: Greedy Algorithms

Greedy algorithms build up a solution piece by piece, always choosing the next piece that offers the most immediate benefit.

## Key Properties
1.  **Greedy Choice Property:** A global optimal solution can be arrived at by making locally optimal (greedy) choices.
2.  **Optimal Substructure:** An optimal solution to the problem contains optimal solutions to its subproblems.

## Classic Problems
*   **Activity Selection:** Maximize non-overlapping intervals (Sorted by end time, $O(N \log N)$).
*   **Fractional Knapsack:** Maximize knapsack value by sorting items by value-to-weight ratio and picking fractions.
