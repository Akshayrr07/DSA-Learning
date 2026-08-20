class DSU {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = Array(n).fill(0);
    }

    find(i) {
        if (this.parent[i] === i) {
            return i;
        }
        return this.parent[i] = this.find(this.parent[i]); // Path compression
    }

    union(i, j) {
        const rootI = this.find(i);
        const rootJ = this.find(j);

        if (rootI !== rootJ) {
            if (this.rank[rootI] < this.rank[rootJ]) {
                this.parent[rootI] = rootJ;
            } else if (this.rank[rootI] > this.rank[rootJ]) {
                this.parent[rootJ] = rootI;
            } else {
                this.parent[rootJ] = rootI;
                this.rank[rootI]++;
            }
            return true;
        }
        return false;
    }
}

// Driver testing
const dsu = new DSU(5);
console.log("Union(0, 2):", dsu.union(0, 2));
console.log("Union(4, 2):", dsu.union(4, 2));
console.log("Union(3, 1):", dsu.union(3, 1));

console.log("Find(4) == Find(0):", dsu.find(4) === dsu.find(0)); // True
console.log("Find(1) == Find(0):", dsu.find(1) === dsu.find(0)); // False
