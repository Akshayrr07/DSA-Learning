class Node:
    def __init__(self,data):
        self.data = data
        self.left = self.right = None

class BST:
    def __init__(self):
        self.root = None
    
    def insert(self,root,data):
        