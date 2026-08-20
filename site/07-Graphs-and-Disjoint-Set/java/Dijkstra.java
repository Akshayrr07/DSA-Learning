import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;

public class Dijkstra {
    static class Edge {
        int dest, weight;
        Edge(int dest, int weight) {
            this.dest = dest;
            this.weight = weight;
        }
    }

    static class Node {
        int vertex, dist;
        Node(int vertex, int dist) {
            this.vertex = vertex;
            this.dist = dist;
        }
    }

    public static void dijkstra(ArrayList<ArrayList<Edge>> graph, int start, int numVertices) {
        PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingInt(n -> n.dist));
        int[] distances = new int[numVertices];
        Arrays.fill(distances, Integer.MAX_VALUE);

        distances[start] = 0;
        pq.add(new Node(start, 0));

        while (!pq.isEmpty()) {
            Node current = pq.poll();
            int u = current.vertex;

            if (current.dist > distances[u]) continue;

            for (Edge edge : graph.get(u)) {
                int v = edge.dest;
                int weight = edge.weight;

                if (distances[u] + weight < distances[v]) {
                    distances[v] = distances[u] + weight;
                    pq.add(new Node(v, distances[v]));
                }
            }
        }

        System.out.println("Shortest distances from vertex " + start + ":");
        for (int i = 0; i < numVertices; i++) {
            System.out.println("To vertex " + i + ": " + distances[i]);
        }
    }

    public static void main(String[] args) {
        int numVertices = 4;
        ArrayList<ArrayList<Edge>> graph = new ArrayList<>(numVertices);
        for (int i = 0; i < numVertices; i++) {
            graph.add(new ArrayList<>());
        }

        graph.get(0).add(new Edge(1, 4));
        graph.get(0).add(new Edge(2, 1));
        graph.get(1).add(new Edge(3, 1));
        graph.get(2).add(new Edge(1, 2));
        graph.get(2).add(new Edge(3, 5));

        dijkstra(graph, 0, numVertices);
    }
}
