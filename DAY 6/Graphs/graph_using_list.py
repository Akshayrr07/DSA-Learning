def print_graph(graph, V):
    for i in range(V):
        print(i, '->', '->'.join(map(str, graph[i])))

if __name__ == "__main__":
    T = int(input())
    for _ in range(T):
        V, E = map(int, input().split())
        graph = [[] for _ in range(V)]
        for _ in range(E):
            s, d = map(int, input().split())
            graph[s].append(d)
            graph[d].append(s)

        print_graph(graph, V)
