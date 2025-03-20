from typing import List
class Solution:
    def findErrorNums(self, nums: List[int]) -> List[int]:
        n,a,b=len(nums), sum(nums), sum(set(nums))
        s = n*(n+1)//2
        return [a-b,s-b]
        
