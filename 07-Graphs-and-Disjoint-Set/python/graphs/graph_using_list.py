def print_graph(graph, V):
    for i in range(V):
        print(f"vertex {i}:", ' '.join(map(str, graph[i])))

if __name__ == "__main__":
    V = int(input())
    graph = [[] for _ in range(V)]
    while True:
        edge = input()
        if edge.lower() == 'done':
            break
        u, v = map(int, edge.split())
        graph[u].append(v)
        graph[v].append(u)

    print_graph(graph, V)
