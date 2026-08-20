# 🌌 Multi-Language DSA Learning Vault & Master Roadmap

Welcome to the ultimate **Data Structures & Algorithms (DSA) Learning Vault**. This repository is a topic-driven curriculum designed to take you from core computational foundations to advanced query optimizations. 

Every topic contains clean, well-documented implementations across four primary interview languages: **Python**, **C++**, **Java**, and **JavaScript (Node.js)**. Each solution comes with a built-in test driver so it can be run out of the box immediately.

---

## 🗺️ Master Curriculum Roadmap

| Module | Core Topics Covered | Languages Available |
| :--- | :--- | :--- |
| **[00-Foundations-and-Complexity](./00-Foundations-and-Complexity)** | Big-O analysis, memory models, math basics, pattern printing. | 🐍 Python, 🟦 C++, ☕ Java, 🟨 JS |
| **[01-Arrays-and-Strings](./01-Arrays-and-Strings)** | 1D/2D arrays, matrix operations, two-pointers, sliding window. | 🐍 Python, 🟦 C++, ☕ Java, 🟨 JS |
| **[02-Linked-Lists](./02-Linked-Lists)** | Singly, Doubly, and Circular Linked Lists. | 🐍 Python, 🟦 C++, ☕ Java, 🟨 JS |
| **[03-Stacks-and-Queues](./03-Stacks-and-Queues)** | Stacks, Queues, Deques, Balanced parentheses. | 🐍 Python, 🟦 C++, ☕ Java, 🟨 JS |
| **[04-Trees-and-BST](./04-Trees-and-BST)** | Tree traversals (In/Pre/Post), Binary Search Trees. | 🐍 Python, 🟦 C++, ☕ Java, 🟨 JS |
| **[05-Heaps-and-Priority-Queues](./05-Heaps-and-Priority-Queues)** | Min/Max Heaps, Heapify, extraction. | 🐍 Python, 🟦 C++, ☕ Java, 🟨 JS |
| **[06-Hashing-and-Tries](./06-Hashing-and-Tries)** | Hash Maps, Hash Sets, Prefix Trie search. | 🐍 Python, 🟦 C++, ☕ Java, 🟨 JS |
| **[07-Graphs-and-Disjoint-Set](./07-Graphs-and-Disjoint-Set)** | Adjacency lists/matrices, BFS, DFS, Disjoint Set (DSU). | 🐍 Python, 🟦 C++, ☕ Java, 🟨 JS |
| **[08-Sorting-and-Searching](./08-Sorting-and-Searching)** | Binary search, Merge Sort, Quick Sort, Bubble/Selection. | 🐍 Python, 🟦 C++, ☕ Java, 🟨 JS |
| **[09-Greedy-Algorithms](./09-Greedy-Algorithms)** | Fractional Knapsack, Activity Selection. | 🐍 Python, 🟦 C++, ☕ Java, 🟨 JS |
| **[10-Dynamic-Programming](./10-Dynamic-Programming)** | Overlapping subproblems, Memoization, Tabulation, LCS. | 🐍 Python, 🟦 C++, ☕ Java, 🟨 JS |
| **[11-Backtracking-and-Bit-Manipulation](./11-Backtracking-and-Bit-Manipulation)** | N-Queens, subsets generation, bitwise tricks. | 🐍 Python, 🟦 C++, ☕ Java, 🟨 JS |
| **[12-Advanced-Data-Structures](./12-Advanced-Data-Structures)** | Segment Trees, Fenwick Trees (BIT). | 🐍 Python, 🟦 C++, ☕ Java, 🟨 JS |

---

## 📁 Directory Structure Model

Each module folder is structured cleanly as follows:
```text
📂 <module-name>/
├── 📝 README.md               # Visual concept guide, cheat sheets & complexity tables
├── 📂 python/                 # Python implementations (.py)
├── 📂 cpp/                    # C++ source files (.cpp)
├── 📂 java/                   # Java class source files (.java)
└── 📂 js/                     # JavaScript files runnable via Node.js (.js)
```

---

## 🚀 Execution Quickstart Guide

All implementations include self-contained test cases. To run any implementation, follow these steps:

### 🐍 Python 3
```bash
python3 python/solution.py
```

### 🟦 C++ (GCC Compiler)
Compile and execute using any standard C++ compiler:
```bash
g++ -std=c++17 cpp/solution.cpp -o solution
./solution
```

### ☕ Java
Compile and run the Java source file:
```bash
javac java/Solution.java
java Solution
```

### 🟨 JavaScript (Node.js)
Execute the script using Node.js:
```bash
node js/solution.js
```

---

## ⚡ Big-O Complexity Summary Reference

Here is a quick cheat sheet for data structure operations:

| Data Structure | Access | Search | Insertion | Deletion | Space |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Array** | $O(1)$ | $O(N)$ | $O(N)$ | $O(N)$ | $O(N)$ |
| **Stack** | $O(N)$ | $O(N)$ | $O(1)$ | $O(1)$ | $O(N)$ |
| **Queue** | $O(N)$ | $O(N)$ | $O(1)$ | $O(1)$ | $O(N)$ |
| **Singly Linked List** | $O(N)$ | $O(N)$ | $O(1)$ | $O(1)$ | $O(N)$ |
| **Doubly Linked List** | $O(N)$ | $O(N)$ | $O(1)$ | $O(1)$ | $O(N)$ |
| **Binary Search Tree (BST)**| $O(\log N)$| $O(\log N)$| $O(\log N)$| $O(\log N)$| $O(N)$ |
| **Min/Max Heap** | - | $O(N)$ | $O(\log N)$| $O(\log N)$| $O(N)$ |
| **Hash Table** | - | $O(1)$ | $O(1)$ | $O(1)$ | $O(N)$ |
