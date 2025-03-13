def is_upper_triangle(matrix):
    n = len(matrix)
    for i in range(1,n):
        for j in range(i):
            if matrix[i][j] != 0:
                return False
    return True

n = int(input())
matrix = [list(map(int, input().split())) for _ in range(n)]

if is_upper_triangle(matrix):
    print("Upper triangle matrix")
else:
    print("Not an upper triangle matrix")