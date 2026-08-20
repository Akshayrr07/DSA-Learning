class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(i) { return Math.floor((i - 1) / 2); }
    getLeftChildIndex(i) { return 2 * i + 1; }
    getRightChildIndex(i) { return 2 * i + 2; }

    insert(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const minVal = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return minVal;
    }

    heapifyUp(index) {
        const parent = this.getParentIndex(index);
        if (index > 0 && this.heap[index] < this.heap[parent]) {
            [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
            this.heapifyUp(parent);
        }
    }

    heapifyDown(index) {
        const left = this.getLeftChildIndex(index);
        const right = this.getRightChildIndex(index);
        let smallest = index;

        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }
        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }
        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this.heapifyDown(smallest);
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

// Test Heap
const heap = new MinHeap();
console.log("Inserting 3, 1, 6, 5, 2, 4 into MinHeap:");
[3, 1, 6, 5, 2, 4].forEach(v => heap.insert(v));

const result = [];
while (!heap.isEmpty()) {
    result.push(heap.extractMin());
}
console.log("Extracted order:", result.join(" "));
