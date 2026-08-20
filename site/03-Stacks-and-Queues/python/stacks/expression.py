def expression(s):
    stack = []

    for i in s:
        if i.isdigit():
            stack.append(int(i))
        else:
            b = stack.pop()
            a = stack.pop()
            if i == '+':
                stack.append(a + b)
            elif i == '-':
                stack.append(a - b)
            elif i == '*':
                stack.append(a * b)
            elif i == '/':
                stack.append(a / b)
    return stack[0]

s=input().strip().split()
print(expression(s))

