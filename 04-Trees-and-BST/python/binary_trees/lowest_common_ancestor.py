class Node:
    def __init__(self, data):
        self.data = data
        self.left = self.right = None

class BST:
    def insert(self, root, data):
        if not root:
            return Node(data)
        if data < root.data:
            root.left = self.insert(root.left, data)
        else:
            root.right = self.insert(root.right, data)
        return root
    
    def build_tree(self, arr, n):
        root = None
        for i in range(n):
            root = self.insert(root, arr[i])
        return root

    def lca(self, root, v1, v2):
        if root is None:
            return None
        if root.data > v1 and root.data > v2:
            return self.lca(root.left, v1, v2)
        if root.data < v1 and root.data < v2:
            return self.lca(root.right, v1, v2)
        return root

t = BST()
n=int(input())
arr=list(map(int,input().split()))
root = t.build_tree(arr, n)
v1, v2 = map(int, input().split())
print(t.lca(root, v1, v2).data)