class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }
    dequeue() {
        return this.values.shift();
    }
    isEmpty() {
        return this.values.length === 0;
    }
    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

function dijkstra(graph, start, numVertices) {
    const distances = Array(numVertices).fill(Infinity);
    const pq = new PriorityQueue();

    distances[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const { val: u, priority: dist } = pq.dequeue();

        if (dist > distances[u]) continue;

        const neighbors = graph[u] || [];
        for (const neighbor of neighbors) {
            const { dest: v, weight } = neighbor;

            if (distances[u] + weight < distances[v]) {
                distances[v] = distances[u] + weight;
                pq.enqueue(v, distances[v]);
            }
        }
    }

    return distances;
}

// Driver testing
const graph = {
    0: [{ dest: 1, weight: 4 }, { dest: 2, weight: 1 }],
    1: [{ dest: 3, weight: 1 }],
    2: [{ dest: 1, weight: 2 }, { dest: 3, weight: 5 }],
    3: []
};

const startNode = 0;
const numVertices = 4;
const shortestPaths = dijkstra(graph, startNode, numVertices);

console.log(`Shortest distances from vertex ${startNode}:`);
shortestPaths.forEach((dist, vertex) => {
    console.log(`To vertex ${vertex}: ${dist}`);
});
