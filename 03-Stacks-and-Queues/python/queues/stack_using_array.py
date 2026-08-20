class Stack:
    def __init__(self):
        self.stack = []

    def push(self, value):
        self.stack.append(value)

    def pop(self):
        if not self.is_empty():
            return self.stack.pop()
        else:
            return "Stack is empty"

    def print_stack(self):
        if not self.is_empty():
            print("Stack:", self.stack)
        else:
            print("Stack is empty")

    def is_empty(self):
        return len(self.stack) == 0


if __name__ == "__main__":
    stack = Stack()
    n = int(input())

    for _ in range(n):
        operation = input().strip().split()
        if operation[0] == "push":
            value = int(operation[1])
            stack.push(value)
        elif operation[0] == "pop":
            print("Popped:", stack.pop())
        elif operation[0] == "print":
            stack.print_stack()
        else:
            print("Invalid operation")