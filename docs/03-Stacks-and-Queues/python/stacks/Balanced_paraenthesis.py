def is_balanced_parenthesis(expression):
    # Initialize an empty stack to keep track of opening parentheses
    stack = []
    # Define a dictionary to map closing parentheses to their corresponding opening parentheses
    matching_parenthesis = {')': '(', '}': '{', ']': '['}

    # Iterate through each character in the input expression
    for char in expression:
        # If the character is a closing parenthesis
        if char in matching_parenthesis:
            # Check if the stack is not empty and the top of the stack matches the corresponding opening parenthesis
            if stack and stack[-1] == matching_parenthesis[char]:
                # If it matches, pop the top element from the stack
                stack.pop()
            else:
                # If it doesn't match, the parentheses are unbalanced
                return False
        # If the character is an opening parenthesis
        elif char in matching_parenthesis.values():
            # Push it onto the stack
            stack.append(char)

    # If the stack is empty, all parentheses are balanced; otherwise, they are not
    return not stack

# Read the input expression, strip any leading/trailing whitespace, and check if it is balanced
expression = input().strip()
# Print "true" if balanced, otherwise "false"
print("true" if is_balanced_parenthesis(expression) else "false")
