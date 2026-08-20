class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

class CircularLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
    
    def insert(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = self.tail = new_node
            new_node.next = self.head
        else:
            self.tail.next = new_node
            new_node.prev = self.tail
            self.tail = new_node
            new_node.next = self.head
            self.head.prev = self.tail

    def display(self):
        if self.head is None:
            print("The list is empty.")
            return
        temp = self.head
        while True:
            print(temp.data, end=" ")
            temp = temp.next
            if temp == self.head:
                break
        print()
    
ccl = CircularLinkedList()
n1 = int(input())
ccl.insert(n1)
while True:
    c = int(input())
    if c == 1:
        v = int(input())
        ccl.insert(v)
    elif c == 0:
        print()
        ccl.sort()
        ccl.display()
        break


