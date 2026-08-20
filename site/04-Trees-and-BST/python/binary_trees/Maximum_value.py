class Node:
    def __init__(self, data):
        self.data = data
        self.left = self.right = None

class BST:
    def __init__(self):
        self.root = None
    
    def insert(self,root,data):
        if not root:
            return Node(data)
        if data <root.data:
            root.left = self.insert(root.left,data)
        else:
            root.right = self.insert(root.right, data)
        return root
    
    def build_tree(self,arr):
        if not arr:
            return None
        self.root = Node(arr[0])
        for i in range(1,len(arr)):
            self.insert(self.root,arr[i])
    
    def max_value(self,root):
        if not root:
            return None
        while root.right:
            root = root.right
        return root.data

bs=BST()
n=int(input())
e=list(map(int,input().split()))
bs.build_tree(e)
print(bs.max_value(bs.root))

