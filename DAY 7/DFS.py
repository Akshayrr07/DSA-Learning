def dfs_stack (adj, visited, V, source):
    stack = [source]

    while stack:
        node = stack.pop()
        
        if not visited[node]:
            print(node, end=" ")
            visited[node] = True
        for n in range(V-1, -1, -1):
            if adj[node][n] == 1 and not visited[n]:
                stack.append(n)

def dfs_disconnected(adj,V):
    visited = [False] * V

    for source in range(V):
        if not visited[source]:
            dfs_stack(adj, visited, V, source)

V,E =map(int,input().split())
adj = [[0 for _ in range(V)] for _ in range(E)]

for _ in range(E):
    u,v = map(int,input().split())
    adj[u][v] = 1

dfs_disconnected(adj,V)

