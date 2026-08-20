def gcd(a,b,c):
    while b:
        a, b = b, a % b
    while c:
        a, c = c, a % c
    return a
a=int(input())
b=int(input())
c=int(input())
s=[a,b,c]
s.sort()
print("The treasure is in the box which has number:",s[1])
print("The code to open the box is:",gcd(a,b,c))

