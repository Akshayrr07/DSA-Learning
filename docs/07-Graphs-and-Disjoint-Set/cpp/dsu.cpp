#include <iostream>
#include <vector>
#include <numeric>

class DSU {
private:
    std::vector<int> parent;
    std::vector<int> rank;

public:
    DSU(int n) {
        parent.resize(n);
        std::iota(parent.begin(), parent.end(), 0);
        rank.assign(n, 0);
    }

    int find(int i) {
        if (parent[i] == i)
            return i;
        return parent[i] = find(parent[i]); // Path compression
    }

    bool unionSets(int i, int j) {
        int root_i = find(i);
        int root_j = find(j);

        if (root_i != root_j) {
            if (rank[root_i] < rank[root_j]) {
                parent[root_i] = root_j;
            } else if (rank[root_i] > rank[root_j]) {
                parent[root_j] = root_i;
            } else {
                parent[root_j] = root_i;
                rank[root_i]++;
            }
            return true;
        }
        return false;
    }
};

int main() {
    DSU dsu(5);
    std::cout << std::boolalpha;
    std::cout << "Union(0, 2): " << dsu.unionSets(0, 2) << "\n";
    std::cout << "Union(4, 2): " << dsu.unionSets(4, 2) << "\n";
    std::cout << "Union(3, 1): " << dsu.unionSets(3, 1) << "\n";
    
    std::cout << "Find(4) == Find(0): " << (dsu.find(4) == dsu.find(0)) << "\n"; // True
    std::cout << "Find(1) == Find(0): " << (dsu.find(1) == dsu.find(0)) << "\n"; // False

    return 0;
}
