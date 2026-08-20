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

    def display(self):
        if not self.head:
            print("List is empty")
            return
        temp = self.head
        while temp:
            print(temp.data, end=" ")
            temp = temp.next
        print()

    def reverse_k_group(self, head, k):
        if not head:
            return None
        current = head
        prev = None
        next_node = None
        count = 0

        while current and count < k:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node
            count += 1

        if next_node:
            head.next = self.reverse_k_group(next_node, k)

        return prev

    def reverse_in_groups(self, k):
        if k <= 0:
            print("Invalid value of k. List remains unchanged.")
            return
        self.head = self.reverse_k_group(self.head, k)


arr = list(map(int, input().split()))
k = int(input())
l = LinkedList()
for val in arr:
    if val < 0:
        break
    l.insert(val)
l.reverse_in_groups(k)
l.display()