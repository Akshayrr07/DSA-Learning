def fibonacci(n):
    dp = [0] * (n + 1)
    dp[0] = 0
    if n > 0:
        dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[i]
n = int(input("Enter the value of n: "))
print(*fibonacci(n))
# a,b =0,1 
# a,b = b , a+b