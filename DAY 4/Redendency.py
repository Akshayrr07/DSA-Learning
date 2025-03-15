def is_redendancy(s):
    stack = []
    o = ['+', '-', '*', '/']
    for i in s:
        if i == ')':
            t = stack.pop()
            flag = True
            while t != '(':
                if t in o:
                    flag = False
                t = stack.pop()
            if flag:
                return True
        else:
            stack.append(i)
    return False

s=input().strip()
print(is_redendancy(s))