class MinHeap:
    def __init__(self):
        self.heap = []

    def get_parent_index(self, index):
        return (index - 1) // 2

    def get_left_child_index(self, index):
        return 2 * index + 1

    def get_right_child_index(self, index):
        return 2 * index + 2

    def insert(self, val):
        self.heap.append(val)
        self.heapify_up(len(self.heap) - 1)

    def extract_min(self):
        if not self.heap:
            return None
        if len(self.heap) == 1:
            return self.heap.pop()
        
        min_val = self.heap[0]
        self.heap[0] = self.heap.pop()
        self.heapify_down(0)
        return min_val

    def peek(self):
        return self.heap[0] if self.heap else None

    def heapify_up(self, index):
        parent = self.get_parent_index(index)
        if index > 0 and self.heap[index] < self.heap[parent]:
            self.heap[index], self.heap[parent] = self.heap[parent], self.heap[index]
            self.heapify_up(parent)

    def heapify_down(self, index):
        left = self.get_left_child_index(index)
        right = self.get_right_child_index(index)
        smallest = index
        
        if left < len(self.heap) and self.heap[left] < self.heap[smallest]:
            smallest = left
        if right < len(self.heap) and self.heap[right] < self.heap[smallest]:
            smallest = right
            
        if smallest != index:
            self.heap[index], self.heap[smallest] = self.heap[smallest], self.heap[index]
            self.heapify_down(smallest)

if __name__ == "__main__":
    heap = MinHeap()
    print("Inserting 3, 1, 6, 5, 2, 4 into MinHeap:")
    for v in [3, 1, 6, 5, 2, 4]:
        heap.insert(v)
        
    print("Heap contents peek:", heap.peek())
    print("Extracting minimum elements in order:")
    while len(heap.heap) > 0:
        print(heap.extract_min(), end=" ")
    print()
