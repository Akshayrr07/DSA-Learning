def print_matrix(matrix):
    for row in matrix:
        print(" ".join(map(str, row)))

def main():
    V = int(input("Please enter the number of nodes in the graph: "))
    E = int(input("Please enter the number of edges in the graph: "))
    
    adj_matrix = [[0] * V for _ in range(V)]
    
    is_directed = input("Is the graph directed? ").strip().lower() == "yes"
    
    for i in range(E):
        s, d, w = map(int, input(f"Enter the start node, end node and weight of edge no {i + 1}: ").split())
        adj_matrix[s - 1][d - 1] = w
        if not is_directed:
            adj_matrix[d - 1][s - 1] = w
    
    print("Adjacency Matrix Representation:")
    print_matrix(adj_matrix)

if __name__ == "__main__":
    main()