from collections import deque
class Solution:
    def zigzagLevelOrder(self, root):
        if not root: 
            return []
        q = deque([root])
        result, direction = [], 1
        
        while q:
            level = []
            for i in range(len(q)):
                node = q.popleft()
                level.append(node.val)
                if node.left:  q.append(node.left)
                if node.right: q.append(node.right)
            result.append(level[::direction])
            direction *= (-1)
        return result