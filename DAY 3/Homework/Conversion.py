def infix_to_postfix(e):
    prec = {'+': 1, '-': 1, '*': 2, '/': 2, '(': 0}
    result = ""
    ops = []
    
    for i in e:
        if i.isalnum():
            result+=i
        elif i == '(':
            ops.append(i)
        elif i == ')':
            while ops and ops[-1] != '(':
                result+=ops.pop()
            ops.pop()
        else:
            while ops and prec[ops[-1]] >= prec[i]:
                result+=ops.pop()
            ops.append(i)
    
    while ops:
        result+=ops.pop()
    
    return result


i= input().strip()
print(infix_to_postfix(i))
