def infix_to_postfix(expression):
    precedence = {'+': 1, '-': 1, '*': 2, '/': 2, '(': 0}
    output = []
    operators = []
    
    for token in expression:
        if token.isalnum():
            output.append(token)
        elif token == '(':
            operators.append(token)
        elif token == ')':
            while operators and operators[-1] != '(':
                output.append(operators.pop())
            operators.pop()
        else:
            while operators and precedence[operators[-1]] >= precedence[token]:
                output.append(operators.pop())
            operators.append(token)
        
        while operators:
            output.append(operators.pop())
        
        return "".join(output)


    if __name__ == "__main__":
        infix_expr = input().strip()
        print(infix_to_postfix(infix_expr))
