def r_s(s):
    # Initialize an empty list to use as a stack
    stack = []
    # Iterate through each character in the input string
    for i in s:
        # Push each character onto the stack
        stack.append(i)
    # Initialize an empty string to store the reversed result
    r = ""
    # While the stack is not empty
    while len(stack) != 0:
        # Pop the top character from the stack and append it to the result string
        r += stack.pop()
    # Print the reversed string
    print(r)

# Take input from the user
s = input()
# Call the function to reverse the string
r_s(s)