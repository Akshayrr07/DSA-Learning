n, m = int(input()), int(input())
a = [list(map(int, input().split())) for _ in range(n)]

for j in range(m):
    col_max = a[0][j]
    for i in range(1, n):
        if a[i][j] > col_max:
            col_max = a[i][j]
    print(col_max)
