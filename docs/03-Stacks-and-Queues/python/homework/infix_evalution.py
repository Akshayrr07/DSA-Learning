def precedence(op):
    if op in ('+', '-'):
        return 1
    if op in ('*', '/'):
        return 2
    return 0

def apply_operation(a, b, op):
    if op == '+':
        return a + b
    elif op == '-':
        return a - b
    elif op == '*':
        return a * b
    elif op == '/':
        return a / b

def evaluate_infix(expression):
    values = []
    operators = []

    i = 0
    while i < len(expression):
        if expression[i].isdigit():
            values.append(int(expression[i]))
        elif expression[i] == '(':
            operators.append(expression[i])
        elif expression[i] == ')':
            while operators and operators[-1] != '(':
                if len(values) < 2:
                    raise ValueError("Invalid expression")
                op = operators.pop()
                b = values.pop()
                a = values.pop()
                values.append(apply_operation(a, b, op))
            if not operators:
                raise ValueError("Mismatched parentheses")
            operators.pop()
        else:
            while (operators and precedence(operators[-1]) >= precedence(expression[i])):
                if len(values) < 2:
                    raise ValueError("Invalid expression")
                op = operators.pop()
                b = values.pop()
                a = values.pop()
                values.append(apply_operation(a, b, op))
            operators.append(expression[i])
        i += 1

    while operators:
        if len(values) < 2:
            raise ValueError("Invalid expression")
        op = operators.pop()
        b = values.pop()
        a = values.pop()
        values.append(apply_operation(a, b, op))

    if len(values) != 1:
        raise ValueError("Invalid expression")
    return values[0]

s = input().strip().split()
try:
    print(evaluate_infix(s))
except ValueError as e:
    print(f"Error: {e}")
