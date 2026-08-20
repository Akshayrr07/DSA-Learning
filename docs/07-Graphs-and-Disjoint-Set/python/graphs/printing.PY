def print_matrix(matrix):
    for row in matrix:
        print(" ".join(map(str, row)))

def main():
    v = int(input())
    e = int(input())

    adj_matrix = [[0]* v for _ in range(v)]

    is_directed = input("D/UD").strip().upper() =="D"

    for i in range(e):
        s,d,w = map(int,input(f"Enter the node {i+i}:").split())
        adj_matrix[s-1][d-1] = w
        if not is_directed:
            adj_matrix[d-1][s-1] = w
    
    print_matrix(adj_matrix)

main()
