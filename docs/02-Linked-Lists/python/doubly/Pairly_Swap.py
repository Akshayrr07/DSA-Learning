class Node:
    def __init__(self):
        # Initialize a node with data and a pointer to the next node
        self.data = None
        self.next = None

class LinkedList:
    def __init__(self):
        # Initialize the linked list with a head pointer
        self.head = None
    
    def insert(self, data):
        # Create a new node with the given data
        new_node = Node()
        new_node.data = data
        if self.head is None:
            # If the list is empty, set the new node as the head
            self.head = new_node
        else:
            # Traverse to the end of the list and append the new node
            temp = self.head
            while temp.next is not None:
                temp = temp.next
            temp.next = new_node
    
    def display(self):
        # Display the elements of the linked list
        if self.head is None:
            # If the list is empty, print a message
            print("list is empty")
        else:
            # Traverse the list and print each node's data
            temp = self.head
            while temp:
                print(temp.data, end=" ")
                temp = temp.next
    
    def swap(self):
        # Swap data of adjacent nodes in the linked list
        temp = self.head
        while temp and temp.next:
            # Swap the data of the current node and the next node
            temp.data, temp.next.data = temp.next.data, temp.data
            # Move to the next pair of nodes
            temp = temp.next.next

# Create a linked list instance
list = LinkedList()

# Take input values from the user
values = input().split()
for val in values:
    val = int(val)
    if val < 0:
        # Stop inserting values if a negative number is encountered
        break
    list.insert(val)

# Display the original list
print("The original List:\n")
list.display()

# Perform the pairwise swap of nodes
list.swap()

# Display the swapped list
print("\nThe swapped List:\n")
list.display()