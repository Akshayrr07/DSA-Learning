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
        if data < root.data:
            root.left = self.insert(root.left, data)
        else:
            root.right = self.insert(root.right, data)
        return root
    
    def in_range(self, root, l, h):
        if not root:
            return
        if l < root.data:
            self.in_range(root.left, l, h)
        if l <= root.data <= h:
            print(root.data, end=" ")
        if h > root.data:
            self.in_range(root.right, l, h)

t=BST()
n=int(input())
e=list(map(int,input().split()))
for i in range(n):
    t.root=t.insert(t.root,e[i])
try:
    l, h = map(int, input().split())
except ValueError:
    exit()
t.in_range(t.root,l,h)            
