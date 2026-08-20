def sp(n):
    while n >= 10:
        d = n % 10
        t = n // 10
        f = d + t
        g = d * t
        if f + g == n:
            return True
        else:
            return False
    return False

l = int(input())
u = int(input())
for i in range(l, u + 1):
    if sp(i):
        print(i, end=" ")