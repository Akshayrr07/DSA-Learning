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
            newNode.next = self.head
            self.head = newNode
    
    def display(self):
        if self.head is None:
            print("List is empty")
        else:
            temp = self.head
            while temp:
                print(temp.data, end=" ")
                temp = temp.next
        print()

    def merge(l1, l2):
        a = l1.head
        b = l2.head
        l3 = LinkedList()
        while l1 and l2:
            if a.data < b.data:
                l3.insert(l1.data)
                l1 = l1.next
            else:
                l3.insert(l2.data)
                l2 = l2.next
        while l1:
            l3.insert(l1.data)
            l1 = l1.next
        while l2:
            l3.insert(l2.data)
            l2 = l2.next
        return l3


a = LinkedList()
b = LinkedList()


for data in map(int, input().split()):
    a.insert(data)


for data in map(int, input().split()):
    b.insert(data)


LinkedList.merge(a, b).display()
