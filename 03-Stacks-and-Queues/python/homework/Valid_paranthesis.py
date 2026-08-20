class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        matching_parenthesis = {')': '(', '}': '{', ']': '['}

        for char in s:
            if char in matching_parenthesis:
                if stack and stack[-1] == matching_parenthesis[char]:
                    stack.pop()
                else:
                    return False
            else:
                stack.append(char)

        return not stack

