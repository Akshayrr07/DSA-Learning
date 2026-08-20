class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        if self.n > 0:
            self.build(arr, 0, 0, self.n - 1)

    def build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
            return
        mid = (start + end) // 2
        left_node = 2 * node + 1
        right_node = 2 * node + 2
        
        self.build(arr, left_node, start, mid)
        self.build(arr, right_node, mid + 1, end)
        self.tree[node] = self.tree[left_node] + self.tree[right_node]

    def update(self, index, val):
        self._update(0, 0, self.n - 1, index, val)

    def _update(self, node, start, end, index, val):
        if start == end:
            self.tree[node] = val
            return
        mid = (start + end) // 2
        left_node = 2 * node + 1
        right_node = 2 * node + 2
        
        if index <= mid:
            self._update(left_node, start, mid, index, val)
        else:
            self._update(right_node, mid + 1, end, index, val)
            
        self.tree[node] = self.tree[left_node] + self.tree[right_node]

    def query(self, L, R):
        return self._query(0, 0, self.n - 1, L, R)

    def _query(self, node, start, end, L, R):
        if R < start or end < L:
            return 0
        if L <= start and end <= R:
            return self.tree[node]
            
        mid = (start + end) // 2
        left_node = 2 * node + 1
        right_node = 2 * node + 2
        
        sum_left = self._query(left_node, start, mid, L, R)
        sum_right = self._query(right_node, mid + 1, end, L, R)
        return sum_left + sum_right

if __name__ == "__main__":
    arr = [1, 3, 5, 7, 9, 11]
    tree = SegmentTree(arr)
    
    print("Array:", arr)
    print("Sum of values in range [1, 3]:", tree.query(1, 3)) # Expected: 3+5+7 = 15
    
    print("Updating index 1 to value 10...")
    tree.update(1, 10)
    print("Sum of values in range [1, 3]:", tree.query(1, 3)) # Expected: 10+5+7 = 22
