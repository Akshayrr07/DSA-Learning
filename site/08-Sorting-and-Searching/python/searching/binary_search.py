def binary_search(a, t):
    l, r = 0, len(a) - 1
    while l <= r:
        m = (l + r) // 2
        if a[m] == t:
            return m
        elif a[m] < t:
            l = m + 1
        else:
            r = m - 1
    return -1
n = int(input())
l = list(map(int,input().split()))
t = int(input())
print(binary_search(l,t))