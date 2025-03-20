def LIS(a,n):
    if n == 0:
        return 0
    dp = [1] * n
    for i in range(1,n):
        for j in range(i):
            if a[i] > a[j] and dp[i] < dp[j] + 1:
                dp[i] = dp[j] + 1
    return max(dp)

n=int(input())
a=list(map(int,input().split()))
print(LIS(a,n))