#include <iostream>
#include <vector>
#include <queue>
#include <utility>

const int INF = 1e9;

void dijkstra(const std::vector<std::vector<std::pair<int, int>>>& graph, int start, int numVertices) {
    // Min priority queue: pair of (distance, vertex)
    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<std::pair<int, int>>> pq;
    std::vector<int> distances(numVertices, INF);

    distances[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        int current_dist = pq.top().first;
        int u = pq.top().second;
        pq.pop();

        if (current_dist > distances[u]) continue;

        for (const auto& neighbor : graph[u]) {
            int v = neighbor.first;
            int weight = neighbor.second;

            if (distances[u] + weight < distances[v]) {
                distances[v] = distances[u] + weight;
                pq.push({distances[v], v});
            }
        }
    }

    std::cout << "Shortest distances from vertex " << start << ":\n";
    for (int i = 0; i < numVertices; ++i) {
        std::cout << "To vertex " << i << ": " << distances[i] << "\n";
    }
}

int main() {
    int numVertices = 4;
    std::vector<std::vector<std::pair<int, int>>> graph(numVertices);
    
    // Adjacency list: {neighbor, weight}
    graph[0].push_back({1, 4});
    graph[0].push_back({2, 1});
    graph[1].push_back({3, 1});
    graph[2].push_back({1, 2});
    graph[2].push_back({3, 5});

    dijkstra(graph, 0, numVertices);

    return 0;
}
