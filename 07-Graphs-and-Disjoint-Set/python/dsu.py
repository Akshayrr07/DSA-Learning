class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, i):
        if self.parent[i] == i:
            return i
        # Path compression
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i, j):
        root_i = self.find(i)
        root_j = self.find(j)
        
        if root_i != root_j:
            # Union by rank
            if self.rank[root_i] < self.rank[root_j]:
                self.parent[root_i] = root_j
            elif self.rank[root_i] > self.rank[root_j]:
                self.parent[root_j] = root_i
            else:
                self.parent[root_j] = root_i
                self.rank[root_i] += 1
            return True
        return False

if __name__ == "__main__":
    dsu = DSU(5)
    print("Union(0, 2):", dsu.union(0, 2))
    print("Union(4, 2):", dsu.union(4, 2))
    print("Union(3, 1):", dsu.union(3, 1))
    
    print("Find(4) == Find(0):", dsu.find(4) == dsu.find(0)) # True
    print("Find(1) == Find(0):", dsu.find(1) == dsu.find(0)) # False
