class Node:
    def __init__(self, data):
        self.data = data  
        self.next = None  

class LinkedList:
    def __init__(self):
        self.head = None

    def insert(self, data):
        newNode = Node(data)
        if self.head is None:
            self.head = newNode
        else:
            temp = self.head
            while temp.next:
                temp = temp.next
            temp.next = newNode

    def delete_at_index(self, index):
        if self.head is None:
            print("List is empty")
            return
        
        if index == 0: 
            self.head = self.head.next
            return
        
        temp = self.head
        prev = None
        for i in range(index):
            prev = temp
            if temp.next is None:
                print("Index out of range")
                return
            temp = temp.next

        prev.next = temp.next  
        

    def display(self):
        if self.head is None:
            print("List is empty")
        else:
            temp = self.head
            while temp:
                print(temp.data, end=" ")
                temp = temp.next
            print()

linked_list = LinkedList()

# Taking input values and inserting into the linked list
values = list(map(int, input().split()))
for val in values:
    if val < 0:
        break
    linked_list.insert(val)

# Read the index to delete
index = int(input())

# Perform deletion at the given index
linked_list.delete_at_index(index)

# Display the modified linked list
linked_list.display()
