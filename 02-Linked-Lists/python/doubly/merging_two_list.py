class Node:
    def __init__(self, data):
        # Initialize a node with data and a pointer to the next node
        self.data = data
        self.next = None
    
class LinkedList:
    def __init__(self):
        # Initialize an empty linked list with no head
        self.head = None
    
    def insert(self, data):
        # Insert a new node at the beginning of the linked list
        newNode = Node(data)
        if self.head is None:
            # If the list is empty, set the new node as the head
            self.head = newNode
        else:
            # Otherwise, link the new node to the current head and update the head
            newNode.next = self.head
            self.head = newNode
    
    def append(self, data):
        # Append a new node at the end of the linked list
        newNode = Node(data)
        if self.head is None:
            # If the list is empty, set the new node as the head
            self.head = newNode
        else:
            # Traverse to the end of the list and add the new node
            temp = self.head
            while temp.next:
                temp = temp.next
            temp.next = newNode

    def display(self):
        # Display the elements of the linked list
        if self.head is None:
            # If the list is empty, print a message
            print("List is empty")
            return
        temp = self.head
        while temp:
            # Traverse the list and print each node's data
            print(temp.data, end=" ")
            temp = temp.next
        print()

    @staticmethod
    def merge(l1, l2):
        # Merge two sorted linked lists into a single sorted linked list
        a, b = l1.head, l2.head  # Pointers to the heads of the two lists
        l3 = LinkedList()  # Create a new linked list to store the merged result
        tail = None  # Tail pointer for appending nodes in sorted order

        while a and b:
            # Compare the data of the current nodes in both lists
            if a.data < b.data:
                data = a.data  # Take the smaller data
                a = a.next  # Move to the next node in the first list
            else:
                data = b.data  # Take the smaller data
                b = b.next  # Move to the next node in the second list

            if l3.head is None:
                # If the merged list is empty, initialize it with the first node
                l3.head = Node(data)
                tail = l3.head
            else:
                # Otherwise, append the new node to the merged list
                tail.next = Node(data)
                tail = tail.next

        while a:
            # Append the remaining nodes from the first list (if any)
            if l3.head is None:
                l3.head = Node(a.data)
                tail = l3.head
            else:
                tail.next = Node(a.data)
                tail = tail.next
            a = a.next

        while b:
            # Append the remaining nodes from the second list (if any)
            if l3.head is None:
                l3.head = Node(b.data)
                tail = l3.head
            else:
                tail.next = Node(b.data)
                tail = tail.next
            b = b.next

        return l3  # Return the merged sorted linked list


# Read input
a = LinkedList()  # Create the first linked list
b = LinkedList()  # Create the second linked list

# Populate the first linked list with user input
for data in map(int, input().split()):
    a.append(data)

# Populate the second linked list with user input
for data in map(int, input().split()):
    b.append(data)

# Merge the two sorted linked lists and display the result
merged_list = LinkedList.merge(a, b)
merged_list.display()
