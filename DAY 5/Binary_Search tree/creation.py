class Node:
    def __init__(self,data):
        self.data = data
        self.left = self.right = None

class BST:
    def __init__(self):
        self.root = None
    
    def insert(self,root,data):
        if not root:
            return Node(data)
        if data < root.data:
            root.left = self.insert(root.left,data)
        else:
            root.right = self.insert(root.right,data)
        return root
    
    def inorder(self,root):
        if not root:
            return []
        return self.inorder(root.left) + [root.data] + self.inorder(root.right)
    
    def preorder(self,root):
        if not root:
            return []
        return [root.data] + self.preorder(root.left) + self.preorder(root.right)
    
    def postorder(self,root):
        if not root:
            return []
        return self.postorder(root.left) + self.postorder(root.right) + [root.data]
    
bs= BST()
arr = list(map(int,input().split()))
for i in arr:
    bs.root = bs.insert(bs.root,i)
print(bs.inorder(bs.root))
print(bs.preorder(bs.root))
print(bs.postorder(bs.root))