# s='malayalam'
# d=''
# for i in s:
#     d=i+d
# print("Yes" if d==s else "No")
def is_palindrome(s):
    i=0
    j=len(s)-1
    while i<j:
        if s[i]!=s[j]:
            return False
        i+=1
        j-=1
    return True
print("Yes" if is_palindrome(input()) else "No")
