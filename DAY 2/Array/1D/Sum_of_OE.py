n=int(input())
a=[int(input()) for _ in range(n)]
o=0
e=0
for i in a:
    if i%2==0:
        e+=i
    else:
        o+=i
print("The sum of the even numbers in the array is",e)
print("The sum of the odd numbers in the array is",o)
