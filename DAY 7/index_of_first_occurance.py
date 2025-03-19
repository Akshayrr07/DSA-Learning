class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        n,m = len(haystack), len(needle)
        for i in range(m-n+1):
            if needle == haystack[i:i+n]:
                return i
        return -1
