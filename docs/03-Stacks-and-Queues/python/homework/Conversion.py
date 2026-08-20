def precedence(ch):
	if ch in ('+', '-'):
		return 1
	elif ch in ('*', '/'):
		return 2
	elif ch == '^':
		return 3
	else:
		return -1

def IPE(s):
	res = ''
	st = []
	for ch in s:
		if ch.isalnum():
			res += ch
		elif ch == '(':
			st.append(ch)
		elif ch == ')':
			while st and st[-1] != '(':
				res += st.pop()
			st.pop()
		else:
			while st and precedence(st[-1]) >= precedence(ch):
				res += st.pop()
			st.append(ch)
	while st:
		res += st.pop()
	return res

s = input()
print(IPE(s))