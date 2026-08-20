# Node class to represent each element in the doubly linked list
class Node:
    def __init__(self, data):  
        self.data = data  # Data to store in the node
        self.prev = None  # Pointer to the previous node
        self.next = None  # Pointer to the next node

# DoublyLinkedList class to manage the linked list
class DoublyLinkedList:
    def __init__(self):  
        self.head = None  # Pointer to the first node
        self.tail = None  # Pointer to the last node

    # Method to insert a node at the end of the doubly linked list
    def insert(self, data):
        new_node = Node(data)  # Create a new node with the given data
        if self.head is None:  # If the list is empty
            self.head = self.tail = new_node  # Set both head and tail to the new node
        else:
            self.tail.next = new_node  # Link the current tail to the new node
            new_node.prev = self.tail  # Link the new node back to the current tail
            self.tail = new_node  # Update the tail to the new node

    # Method to display the list in forward direction
    def display_forward(self):
        if self.head is None:  # If the list is empty
            print("List is empty")
            return
        temp = self.head  # Start from the head
        while temp:  # Traverse until the end of the list
            print(temp.data, end=" ")  # Print the data of the current node
            temp = temp.next  # Move to the next node
        print()

    # Method to display the list in reverse direction
    def display_reverse(self):
        if self.tail is None:  # If the list is empty
            print("List is empty")
            return
        temp = self.tail  # Start from the tail
        while temp:  # Traverse until the start of the list
            print(temp.data, end=" ")  # Print the data of the current node
            temp = temp.prev  # Move to the previous node
        print()

# Main function to demonstrate the functionality
if __name__ == "__main__": 
    dll = DoublyLinkedList()  # Create an instance of DoublyLinkedList
    
    # Take user input until a negative value is entered
    print()
    while True:
        try:
            val = int(input())  # Read input from the user
            if val < 0:  # Stop if a negative value is entered
                break
            dll.insert(val)  # Insert the value into the list
        except ValueError:
            print("Please enter a valid integer.")  # Handle invalid input

    # Display the linked list in forward and reverse directions
    print("Forward List:")
    dll.display_forward()

    print("Reverse List:")
    dll.display_reverse()