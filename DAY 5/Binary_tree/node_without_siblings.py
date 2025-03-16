class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None

    def build_tree(self, data_list):
        if not data_list or data_list[0] == -1:
            return None

        self.root = Node(data_list[0])
        queue = [self.root]
        i = 1

        while queue and i < len(data_list):
            current = queue.pop(0)

            if data_list[i] != -1:
                current.left = Node(data_list[i])
                queue.append(current.left)
            i += 1


            if i < len(data_list) and data_list[i] != -1:
                current.right = Node(data_list[i])
                queue.append(current.right)
            i += 1
    
    def without_siblings(self,root):
        if root is None:
            return False
        if root.left is not None and root.right is not None:
            return False
        if root.left is not None:
            print(root.left.data,end=" ")
        if root.right is not None:
            print(root.right.data,end=" ")
        self.is_without_siblings(root.left) 
        self.is_without_siblings(root.right)
    

data = list(map(int, input().split()))
tree = BinaryTree()
tree.build_tree(data)
tree.without_siblings(tree.root)
