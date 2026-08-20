class Node:
    def __init__(self, data):
        self.data = data  # Initialize the node with data
        self.next = None  # Initialize the next pointer to None

class LinkedList:
    def __init__(self):
        self.head = None  # Initialize the head of the linked list to None
    
    def insert(self, data):
        newNode = Node(data)  # Create a new node with the given data
        if self.head is None:
            self.head = newNode  # If the list is empty, set the new node as the head
        else:
            temp = self.head
            while temp.next:
                temp = temp.next  # Traverse to the end of the list
            temp.next = newNode  # Insert the new node at the end of the list
    
    def find_max(self):
        if self.head is None:
            return None  # If the list is empty, return None
        max_value = self.head.data  # Initialize max_value with the head node's data
        temp = self.head.next
        while temp:
            if temp.data > max_value:
                max_value = temp.data  # Update max_value if current node's data is greater
            temp = temp.next  # Move to the next node
        print(max_value)  # Print the maximum value found in the list


linked_list = LinkedList()  # Create a new linked list

values = list(map(int, input().split()))  # Read input values and convert them to a list of integers

for v in values:
    if v < 0:
        break  # Stop inserting if a negative value is encountered
    linked_list.insert(v)  # Insert the value into the linked list

linked_list.find_max()  # Find and print the maximum value in the linked list
