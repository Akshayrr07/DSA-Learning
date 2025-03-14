class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
        else:
            temp = self.head
            while temp.next is not None:
                temp = temp.next
            temp.next = new_node
    
    def display(self):
        if self.head is None:
            print("list is empty")
        else:
            temp = self.head
            while temp:
                print(temp.data, end=" ")
                temp =temp.next
    
    def delete_before_tail(self):
        if self.head is None or self.head.next is None:
            print("No element")
            return
        temp = self.head
        if temp.next.next is None:  
            self.head = self.head.next
            return
        while temp.next.next.next is not None:
            temp = temp.next
        temp.next = temp.next.next

l=LinkedList()
values = input().split()
for val in values:
    val = int(val)
    if val < 0:
        break
    l.insert(val)
l.delete_before_tail()
l.display()
