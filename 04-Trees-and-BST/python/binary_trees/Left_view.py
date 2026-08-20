from collections import deque

class TreeNode:
    def __init__(self, value):
        self.val = value
        self.left = None
        self.right = None

def build_tree(level_order):
    if not level_order or level_order[0] == -1:
        return None
    
    root = TreeNode(level_order[0])
    queue = deque([root])
    i = 1
    
    while queue and i < len(level_order):
        current = queue.popleft()
        
        if level_order[i] != -1:
            current.left = TreeNode(level_order[i])
            queue.append(current.left)
        i += 1
        
        if i < len(level_order) and level_order[i] != -1:
            current.right = TreeNode(level_order[i])
            queue.append(current.right)
        i += 1
    
    return root

def left_view(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        for i in range(len(queue)):
            node = queue.popleft()
            if i == 0:  
                result.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    
    return result


level_order = list(map(int, input().split()))
root = build_tree(level_order)
print(" ".join(map(str, left_view(root))))