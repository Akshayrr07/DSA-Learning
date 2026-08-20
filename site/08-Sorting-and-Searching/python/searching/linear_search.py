def Ls(l, t):
    for i in range(len(l)):
        if l[i] == t:
            return i
    return -1

n = int(input())
l = list(map(int, input().split()))
t = int(input())

print(Ls(l, t))
