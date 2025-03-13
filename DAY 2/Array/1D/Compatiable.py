n = int(input())
a = [int(input()) for _ in range(n)]
m = int(input())
b = [int(input()) for _ in range(m)]

if n == m:
    c=False
    if all(a[i]>=b[i] for i in range(n)):
        c=True
    else:
        c=False
    print("Compatible" if c else "Incompatible")
else:
    print("Incompatible")
