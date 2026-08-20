n=int(input())
i=1
p=0
while i<=n:
    print((i*i) - 2 if(i%2==0) else (i*i) - 1,end=" ")       
    i+=1