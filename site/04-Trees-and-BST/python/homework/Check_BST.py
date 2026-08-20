from collections import deque

class Node:
    def __init__(self, data):
        self.data = data
        self.left = self.right = None
    
class BinaryTree:
    def __init__(self):
        self.root = None
    
    def is_bst(self, root, min_val, max_val):
        if not root:
            return True
        if root.data < min_val or root.data > max_val:
            return False
        return self.is_bst(root.left, min_val, root.data) and self.is_bst(root.right, root.data, max_val)
    
    def build_tree_from_level_order(self, data_list):
        if not data_list or data_list[0] == -1:
            return None
        
        iter_data = iter(data_list)
        root = Node(next(iter_data))
        queue = deque([root])
        
        while queue:
            current = queue.popleft()
            try:
                left_val = next(iter_data)
                if left_val != -1:
                    current.left = Node(left_val)
                    queue.append(current.left)
                
                right_val = next(iter_data)
                if right_val != -1:
                    current.right = Node(right_val)
                    queue.append(current.right)
            except StopIteration:
                break
        
        return root


data = list(map(int, input().split()))
tree = BinaryTree()
tree.root = tree.build_tree_from_level_order(data)
print(tree.is_bst(tree.root))
