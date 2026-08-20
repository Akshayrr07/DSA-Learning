class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None
    
    def insert(self, data):
        if self.root is None:
            self.root = Node(data)
        else:
            current = Node(data)
            queue = [self.root]
            while queue:
                node = queue.pop(0)
                if node.left is None:
                    node.left = current
                    break
                else:
                    queue.append(node.left)
                if node.right is None:
                    node.right = current
                    break
                else:
                    queue.append(node.right)
    def pre_order(self, root):
        if root:
            print(root.data, end=" ")
            self.pre_order(root.left)
            self.pre_order(root.right)
    
    def in_order(self, root):
        if root:
            self.in_order(root.left)
            print(root.data, end=" ")
            self.in_order(root.right)
    
    def post_order(self, root):
        if root:
            self.post_order(root.left)
            self.post_order(root.right)
            print(root.data, end=" ")      

b=BinaryTree()
n=int(input())
for i in range(n):
    b.insert(int(input()))
b.pre_order(b.root)
print()
b.in_order(b.root)
print()
b.post_order(b.root)
print()
        
            

