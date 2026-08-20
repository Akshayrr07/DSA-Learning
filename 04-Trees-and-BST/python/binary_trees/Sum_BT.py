class Node:
    def __init__(self, data):
        self.data = data
        self.left = self.right = None
    
class BinaryTree:
    def __init__(self):
        self.root = None
    
    def insert(self, root, data):
        if not root:
            return Node(data)
        else:
            queue = [root]
            while queue:
                node = queue.pop(0)
                if node.left is None:
                    node.left = Node(data)
                    break
                else:
                    queue.append(node.left)
                if node.right is None:
                    node.right = Node(data)
                    break
                else:
                    queue.append(node.right)
        return root
    
    def sum(self, root):
        if root is None:
            return 0
        else:
            return root.data + self.sum(root.left) + self.sum(root.right)

b=BinaryTree()
n=int(input())
for i in range(n):
    b.root = b.insert(b.root, int(input()))
print(b.sum(b.root))