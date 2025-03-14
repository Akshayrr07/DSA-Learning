class Node:
    def __init__(self):
        self.data = None
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert(self, data):
        new_node = Node()
        new_node.data = data
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
    
    def swap(self):
            temp = self.head
            while temp and temp.next:
                temp.data, temp.next.data = temp.next.data, temp.data
                temp = temp.next.next

list = LinkedList()
values = input().split()
for val in values:
    val = int(val)
    if val < 0:
        break
    list.insert(val)
print("The original List:\n")
list.display()
list.swap()
print("\nThe swapped List:\n")
list.display()