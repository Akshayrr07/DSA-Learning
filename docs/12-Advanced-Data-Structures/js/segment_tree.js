class SegmentTree {
    constructor(arr) {
        this.n = arr.length;
        this.tree = Array(4 * this.n).fill(0);
        if (this.n > 0) {
            this.build(arr, 0, 0, this.n - 1);
        }
    }

    build(arr, node, start, end) {
        if (start === end) {
            this.tree[node] = arr[start];
            return;
        }
        const mid = Math.floor((start + end) / 2);
        this.build(arr, 2 * node + 1, start, mid);
        this.build(arr, 2 * node + 2, mid + 1, end);
        this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }

    update(index, val) {
        this._update(0, 0, this.n - 1, index, val);
    }

    _update(node, start, end, index, val) {
        if (start === end) {
            this.tree[node] = val;
            return;
        }
        const mid = Math.floor((start + end) / 2);
        if (index <= mid) {
            this._update(2 * node + 1, start, mid, index, val);
        } else {
            this._update(2 * node + 2, mid + 1, end, index, val);
        }
        this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }

    query(L, R) {
        return this._query(0, 0, this.n - 1, L, R);
    }

    _query(node, start, end, L, R) {
        if (R < start || end < L) return 0;
        if (L <= start && end <= R) return this.tree[node];
        const mid = Math.floor((start + end) / 2);
        return this._query(2 * node + 1, start, mid, L, R) + this._query(2 * node + 2, mid + 1, end, L, R);
    }
}

// Driver testing
const arr = [1, 3, 5, 7, 9, 11];
const st = new SegmentTree(arr);

console.log("Array:", arr);
console.log("Sum in range [1, 3]:", st.query(1, 3)); // Expected: 15
st.update(1, 10);
console.log("After update, sum in range [1, 3]:", st.query(1, 3)); // Expected: 22
