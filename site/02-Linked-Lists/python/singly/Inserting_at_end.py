class Node:
    def __init__(self, data): 
        # Initialize a node with data and set the next pointer to None
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):  
        # Initialize the linked list with head set to None
        self.head = None

    def insert(self, data):
        # Create a new node with the given data
        newNode = Node(data)
        if self.head is None:
            # If the list is empty, set the new node as the head
            self.head = newNode
        else:
            # Otherwise, traverse to the end of the list and insert the new node
            temp = self.head
            while temp.next:
                temp = temp.next
            temp.next = newNode

    def display(self):
        # Display the elements of the linked list
        if self.head is None:
            # If the list is empty, print a message
            print("List is empty")
        else:
            # Otherwise, traverse the list and print each element
            temp = self.head
            while temp:
                print(temp.data, end=" ")
                temp = temp.next
        print() 

# Create a new linked list
list = LinkedList()
# Read input values, split them into a list, and iterate over them
values = input().split()
for val in values:
    val = int(val)
    if val < 0:
        # Stop inserting if a negative value is encountered
        break
    # Insert the value into the linked list
    list.insert(val)
# Display the linked list
list.display()
