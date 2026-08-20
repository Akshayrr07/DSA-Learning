class Node:
    def __init__(self, data):
        self.data = data
        self.before = None

class LinkedList:
    # Initializes the linked list with an empty head.
    def __init__(self):
        self.head = None
    
    # Inserts a new node with the given data at the start of the linked list.
    def insert(self, data):
        newNode = Node(data)
        if self.head is None:
            self.head = newNode
        else:
            newNode.before = self.head
            self.head = newNode
    
    # Prints the data in the linked list from head to the last node.
    def display(self):
        if self.head is None:
            print("List is empty")
        else:
            temp = self.head
            while temp:
                print(temp.data, end=" ")
                temp = temp.before
        print()

list = LinkedList()
values = input().split()
for val in values:
    val = int(val)
    if val < 0:
        break
    list.insert(val)
list.display()
