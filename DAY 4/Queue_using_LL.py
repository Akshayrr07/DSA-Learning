class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedListQueue:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def enqueue(self, data):
        new_node = Node(data)
        if self.tail is None:  
            self.head = self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node
        self.size += 1

    def dequeue(self):
        if self.head is None: 
            return "Queue is empty"
        temp = self.head
        self.head = self.head.next
        if self.head is None: 
            self.tail = None
        self.size -= 1
        return temp.data

    def front(self):
        if self.head is None:
            return "Queue is empty"
        return self.head.data

    def get_size(self):
        return self.size

    def is_empty(self):
        return self.head is None

    def print_queue(self):
        if self.head is None:
            print("Queue is empty")
        else:
            temp = self.head
            while temp is not None:
                print(temp.data, end=" ")
                temp = temp.next
            print()

n = int(input())
queue = LinkedListQueue()
for _ in range(n):
    query = list(map(int, input().split()))
    if query[0] == 1:
        queue.enqueue(query[1])
    elif query[0] == 2:
        print(queue.dequeue())
    elif query[0] == 3:
        print(queue.front())
    elif query[0] == 4:
        print(queue.get_size())
    elif query[0] == 5:
        print(queue.is_empty())
    else:
        queue.print_queue()