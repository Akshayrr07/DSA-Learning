class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
        else:
            temp = self.head
            while temp.next:
                temp = temp.next
            temp.next = new_node

    def insert_at(self, i, x):
        new_node = Node(x)
        if i == 0:  
            new_node.next = self.head
            self.head = new_node
            return

        temp = self.head
        count = 0
        while temp and count < i - 1:
            temp = temp.next
            count += 1

        if not temp:
            return

        new_node.next = temp.next
        temp.next = new_node

    def display(self):
        temp = self.head
        while temp:
            print(temp.data, end=" ")
            temp = temp.next
        print()

if __name__ == "__main__":
    values = list(map(int, input().split()))
    index, x = map(int, input().split())

    ll = LinkedList()
    for val in values:
        if val == -1:
            break
        ll.insert(val)

    ll.insert_at(index, x)
    ll.display()
