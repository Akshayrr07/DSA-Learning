class Graph {
    constructor(vertices) {
        this.numVertices = vertices;
        this.adjList = new Map();
        for (let i = 0; i < vertices; i++) {
            this.adjList.set(i, []);
        }
    }

    addEdge(src, dest) {
        this.adjList.get(src).push(dest);
        this.adjList.get(dest).push(src); // Undirected graph
    }

    BFS(startVertex) {
        const visited = Array(this.numVertices).fill(false);
        const queue = [startVertex];
        const result = [];

        visited[startVertex] = true;

        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current);

            for (const neighbor of this.adjList.get(current)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            }
        }
        console.log(result.join(" "));
    }

    DFS(startVertex) {
        const visited = Array(this.numVertices).fill(false);
        const result = [];
        this._DFSUtil(startVertex, visited, result);
        console.log(result.join(" "));
    }

    _DFSUtil(vertex, visited, result) {
        visited[vertex] = true;
        result.push(vertex);

        for (const neighbor of this.adjList.get(vertex)) {
            if (!visited[neighbor]) {
                this._DFSUtil(neighbor, visited, result);
            }
        }
    }
}

// Driver testing
const g = new Graph(6);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(1, 4);
g.addEdge(2, 4);
g.addEdge(3, 4);
g.addEdge(3, 5);
g.addEdge(4, 5);

console.log("BFS starting from vertex 0:");
g.BFS(0);

console.log("DFS starting from vertex 0:");
g.DFS(0);
