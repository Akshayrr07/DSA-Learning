from collections import deque

class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None

    def build_tree(self, arr):
        if not arr:
            return None
        self.root = Node(arr[0])
        queue = deque([self.root])
        i = 1
        while i < len(arr):
            curr = queue.popleft()
            if i < len(arr):
                curr.left = Node(arr[i])
                queue.append(curr.left)
                i += 1
            if i < len(arr):
                curr.right = Node(arr[i])
                queue.append(curr.right)
                i += 1

    def level_order_traversal(self):
        if not self.root:
            return
        queue = deque([self.root])
        while queue:
            curr = queue.popleft()
            print(curr.data, end=" ")
            if curr.left:
                queue.append(curr.left)
            if curr.right:
                queue.append(curr.right)


n = int(input())  
arr = list(map(int, input().split())) 
tree = BinaryTree()
tree.build_tree(arr)
tree.level_order_traversal()    