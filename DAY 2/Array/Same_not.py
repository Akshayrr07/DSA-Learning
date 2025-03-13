n, m = int(input()), int(input())
a = [int(input()) for _ in range(n)]
b = [int(input()) for _ in range(m)]

if n == m and sum(a) == sum(b):
    print("Same")
else:
    print("Not Same")
