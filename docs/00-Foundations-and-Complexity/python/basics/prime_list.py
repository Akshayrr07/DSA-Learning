def is_prime(n):
    if n <= 1:
        return False
    for i in range(2,int(n/2)+1):
        if n % i == 0:
            return False
    return True
n=int(input())
for i in range(1,n+1):
    if is_prime(i):
        print(i,end=" ")
