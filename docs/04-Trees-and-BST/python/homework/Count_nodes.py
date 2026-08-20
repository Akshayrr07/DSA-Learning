class Solution:
    def countNodes(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        def depth(node):
            d = 0
            while node:
                d += 1
                node = node.left
            return d
        
        l,r = depth(root.left) ,depth(root.right)
        if l == r:
            return (1 << l) + self.countNodes(root.right)
        return (1 << r) + self.countNodes(root.left)
