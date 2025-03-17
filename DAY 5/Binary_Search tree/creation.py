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
        if data <= root.data:  
            root.left = self.insert(root.left, data)
        else:
            root.right = self.insert(root.right, data)
        return root

    def search(self, root, data):
        if not root:
            return False
        if root.data == data:
            return True
        if data < root.data:
            return self.search(root.left, data)
        return self.search(root.right, data)

    def find_min(self, root):
        while root.left:
            root = root.left
        return root

    def delete(self, root, data):
        if not root:
            return root
        if data < root.data:
            root.left = self.delete(root.left, data)
        elif data > root.data:
            root.right = self.delete(root.right, data)
        else:

            if not root.left:
                return root.right
            elif not root.right:
                return root.left
     
            temp = self.find_min(root.right)
            root.data = temp.data
            root.right = self.delete(root.right, temp.data)
        return root

    def printTree(self, root):
        if not root:
            return
        print(f"{root.data}:", end="")
        if root.left:
            print(f"L:{root.left.data}", end=",")
        if root.right:
            print(f"R:{root.right.data}", end="")
        print()
        self.printTree(root.left)
        self.printTree(root.right)


bst = BST()
q = int(input())
for _ in range(q):
    query = input().split()
    if query[0] == "1":  
        bst.root = bst.insert(bst.root, int(query[1]))
    elif query[0] == "2": 
        print(bst.search(bst.root, int(query[1])))
    elif query[0] == "3":  
        bst.root = bst.delete(bst.root, int(query[1]))
    elif query[0] == "4":  
        bst.printTree(bst.root)   