import heapq

def dijkstra(graph, start, num_vertices):
    # Min-priority queue storing tuples of (distance, vertex)
    pq = []
    distances = {i: float('inf') for i in range(num_vertices)}
    
    distances[start] = 0
    heapq.heappush(pq, (0, start))
    
    while pq:
        current_distance, current_vertex = heapq.heappop(pq)
        
        # If we found a shorter path to current_vertex already, skip it
        if current_distance > distances[current_vertex]:
            continue
            
        for neighbor, weight in graph.get(current_vertex, []):
            distance = current_distance + weight
            
            # If a shorter path is found
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
                
    return distances

if __name__ == "__main__":
    # Graph represented as adjacency list
    # Vertex: list of (neighbor, weight)
    graph = {
        0: [(1, 4), (2, 1)],
        1: [(3, 1)],
        2: [(1, 2), (3, 5)],
        3: []
    }
    
    num_vertices = 4
    start_node = 0
    shortest_paths = dijkstra(graph, start_node, num_vertices)
    
    print(f"Shortest distances from vertex {start_node}:")
    for vertex, dist in shortest_paths.items():
        print(f"To vertex {vertex}: {dist}")
