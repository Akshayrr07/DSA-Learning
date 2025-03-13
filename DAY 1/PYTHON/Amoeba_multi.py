def amoeba_multiplication(n):
    a, b = 0, 1
    for i in range(n-1):
        a, b = b, a + b
    return a
n = int(input())
print(amoeba_multiplication(n))


