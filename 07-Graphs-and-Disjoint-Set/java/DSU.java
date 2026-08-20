public class DSU {
    private final int[] parent;
    private final int[] rank;

    public DSU(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    public int find(int i) {
        if (parent[i] == i) {
            return i;
        }
        return parent[i] = find(parent[i]); // Path compression
    }

    public boolean union(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);

        if (rootI != rootJ) {
            if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else {
                parent[rootJ] = rootI;
                rank[rootI]++;
            }
            return true;
        }
        return false;
    }

    public static void main(String[] args) {
        DSU dsu = new DSU(5);
        System.out.println("Union(0, 2): " + dsu.union(0, 2));
        System.out.println("Union(4, 2): " + dsu.union(4, 2));
        System.out.println("Union(3, 1): " + dsu.union(3, 1));
        
        System.out.println("Find(4) == Find(0): " + (dsu.find(4) == dsu.find(0))); // true
        System.out.println("Find(1) == Find(0): " + (dsu.find(1) == dsu.find(0))); // false
    }
}
