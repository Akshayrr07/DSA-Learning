class Node:
    def __init__(self, data):
        self.data = data
        self.left = self.right = None
    
class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, root, data):
        if not root:
            return Node(data)
        else:
            if data < root.data:
                root.left = self.insert(root.left, data)
            else:
                root.right = self.insert(root.right, data)
        return root
    
    def leafsum(self, root):
        if root is None:
            return 0
        if root.left is None and root.right is None:
            return root.data
        return self.leafsum(root.left) + self.leafsum(root.right)

b=BST()
n=int(input())
for i in range(n):
    b.root = b.insert(b.root, int(input()))
print(b.leafsum(b.root))