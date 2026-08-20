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
    
    def search(self,root,data):
        if not root:
            return False
        if root.data == data:
            return True
        if data < root.data:
            return self.search(root.left,data)
        return self.search(root.right,data)
    
