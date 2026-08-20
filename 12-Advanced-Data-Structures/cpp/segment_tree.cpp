#include <iostream>
#include <vector>

class SegmentTree {
private:
    int n;
    std::vector<int> tree;

    void build(const std::vector<int>& arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
            return;
        }
        int mid = (start + end) / 2;
        build(arr, 2 * node + 1, start, mid);
        build(arr, 2 * node + 2, mid + 1, end);
        tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
    }

    void update(int node, int start, int end, int index, int val) {
        if (start == end) {
            tree[node] = val;
            return;
        }
        int mid = (start + end) / 2;
        if (index <= mid) {
            update(2 * node + 1, start, mid, index, val);
        } else {
            update(2 * node + 2, mid + 1, end, index, val);
        }
        tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
    }

    int query(int node, int start, int end, int L, int R) {
        if (R < start || end < L) return 0;
        if (L <= start && end <= R) return tree[node];
        int mid = (start + end) / 2;
        return query(2 * node + 1, start, mid, L, R) + query(2 * node + 2, mid + 1, end, L, R);
    }

public:
    SegmentTree(const std::vector<int>& arr) {
        n = arr.size();
        tree.assign(4 * n, 0);
        if (n > 0) build(arr, 0, 0, n - 1);
    }

    void update(int index, int val) {
        update(0, 0, n - 1, index, val);
    }

    int query(int L, int R) {
        return query(0, 0, n - 1, L, R);
    }
};

int main() {
    std::vector<int> arr = {1, 3, 5, 7, 9, 11};
    SegmentTree st(arr);
    
    std::cout << "Sum in range [1, 3]: " << st.query(1, 3) << "\n"; // Expected: 15
    st.update(1, 10);
    std::cout << "After update, sum in range [1, 3]: " << st.query(1, 3) << "\n"; // Expected: 22
    
    return 0;
}
