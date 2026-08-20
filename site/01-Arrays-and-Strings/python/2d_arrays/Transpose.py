n = int(input())
a = [list(map(int, input().split())) for _ in range(n)]
for row in a:
    print(*row)
t=[[a[j][i] for j in range(n)] for i in range(n)]
print("Transpose of the matrix is:")
for row in t:
    print(*row)