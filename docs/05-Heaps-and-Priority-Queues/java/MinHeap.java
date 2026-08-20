import java.util.ArrayList;

public class MinHeap {
    private ArrayList<Integer> heap;

    public MinHeap() {
        heap = new ArrayList<>();
    }

    private int getParentIndex(int i) { return (i - 1) / 2; }
    private int getLeftChildIndex(int i) { return 2 * i + 1; }
    private int getRightChildIndex(int i) { return 2 * i + 2; }

    public void insert(int val) {
        heap.add(val);
        heapifyUp(heap.size() - 1);
    }

    public int extractMin() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }
        int minVal = heap.get(0);
        int lastVal = heap.remove(heap.size() - 1);
        if (!heap.isEmpty()) {
            heap.set(0, lastVal);
            heapifyDown(0);
        }
        return minVal;
    }

    private void heapifyUp(int index) {
        int parent = getParentIndex(index);
        if (index > 0 && heap.get(index) < heap.get(parent)) {
            swap(index, parent);
            heapifyUp(parent);
        }
    }

    private void heapifyDown(int index) {
        int left = getLeftChildIndex(index);
        int right = getRightChildIndex(index);
        int smallest = index;

        if (left < heap.size() && heap.get(left) < heap.get(smallest)) {
            smallest = left;
        }
        if (right < heap.size() && heap.get(right) < heap.get(smallest)) {
            smallest = right;
        }
        if (smallest != index) {
            swap(index, smallest);
            heapifyDown(smallest);
        }
    }

    private void swap(int i, int j) {
        int temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }

    public boolean isEmpty() {
        return heap.isEmpty();
    }

    public static void main(String[] args) {
        MinHeap heap = new MinHeap();
        System.out.println("Inserting 3, 1, 6, 5, 2, 4 into MinHeap:");
        for (int v : new int[]{3, 1, 6, 5, 2, 4}) {
            heap.insert(v);
        }
        
        System.out.print("Extracting elements: ");
        while (!heap.isEmpty()) {
            System.out.print(heap.extractMin() + " ");
        }
        System.out.println();
    }
}
