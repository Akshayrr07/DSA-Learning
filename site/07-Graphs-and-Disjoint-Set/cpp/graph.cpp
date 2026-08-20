#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>

class Graph {
private:
    int numVertices;
    std::vector<std::vector<int>> adjList;

public:
    Graph(int vertices) {
        numVertices = vertices;
        adjList.resize(vertices);
    }

    void addEdge(int src, int dest) {
        adjList[src].push_back(dest);
        adjList[dest].push_back(src); // Undirected graph
    }

    void BFS(int startVertex) {
        std::vector<bool> visited(numVertices, false);
        std::queue<int> q;

        visited[startVertex] = true;
        q.push(startVertex);

        while (!q.empty()) {
            int current = q.front();
            q.pop();
            std::cout << current << " ";

            for (int neighbor : adjList[current]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
        std::cout << "\n";
    }

    void DFSUtil(int vertex, std::vector<bool>& visited) {
        visited[vertex] = true;
        std::cout << vertex << " ";

        for (int neighbor : adjList[vertex]) {
            if (!visited[neighbor]) {
                DFSUtil(neighbor, visited);
            }
        }
    }

    void DFS(int startVertex) {
        std::vector<bool> visited(numVertices, false);
        DFSUtil(startVertex, visited);
        std::cout << "\n";
    }
};

int main() {
    Graph g(6);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
    g.addEdge(2, 4);
    g.addEdge(3, 4);
    g.addEdge(3, 5);
    g.addEdge(4, 5);

    std::cout << "BFS starting from vertex 0: ";
    g.BFS(0);

    std::cout << "DFS starting from vertex 0: ";
    g.DFS(0);

    return 0;
}
