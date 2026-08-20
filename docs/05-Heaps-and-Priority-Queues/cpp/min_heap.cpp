#include <iostream>
#include <vector>
#include <stdexcept>

class MinHeap {
private:
    std::vector<int> heap;

    int getParentIndex(int i) { return (i - 1) / 2; }
    int getLeftChildIndex(int i) { return 2 * i + 1; }
    int getRightChildIndex(int i) { return 2 * i + 2; }

    void heapifyUp(int index) {
        int parent = getParentIndex(index);
        if (index > 0 && heap[index] < heap[parent]) {
            std::swap(heap[index], heap[parent]);
            heapifyUp(parent);
        }
    }

    void heapifyDown(int index) {
        int left = getLeftChildIndex(index);
        int right = getRightChildIndex(index);
        int smallest = index;

        if (left < heap.size() && heap[left] < heap[smallest]) {
            smallest = left;
        }
        if (right < heap.size() && heap[right] < heap[smallest]) {
            smallest = right;
        }
        if (smallest != index) {
            std::swap(heap[index], heap[smallest]);
            heapifyDown(smallest);
        }
    }

public:
    void insert(int val) {
        heap.push_back(val);
        heapifyUp(heap.size() - 1);
    }

    int extractMin() {
        if (heap.empty()) {
            throw std::out_of_range("Heap is empty");
        }
        int minVal = heap[0];
        heap[0] = heap.back();
        heap.pop_back();
        if (!heap.empty()) {
            heapifyDown(0);
        }
        return minVal;
    }

    bool empty() {
        return heap.empty();
    }
};

int main() {
    MinHeap heap;
    std::cout << "Inserting 3, 1, 6, 5, 2, 4 into MinHeap:\n";
    for (int v : {3, 1, 6, 5, 2, 4}) {
        heap.insert(v);
    }
    
    std::cout << "Extracting elements from MinHeap:\n";
    while (!heap.empty()) {
        std::cout << heap.extractMin() << " ";
    }
    std::cout << "\n";
    
    return 0;
}
