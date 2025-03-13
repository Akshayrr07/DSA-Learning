r, c = int(input()), int(input())
m = [list(map(int, input().split())) for _ in range(r)]
s = 0
s += sum(m[0]) + sum(m[r-1])
for i in range(1, r-1):
    s += m[i][c-i-1]
print(s)