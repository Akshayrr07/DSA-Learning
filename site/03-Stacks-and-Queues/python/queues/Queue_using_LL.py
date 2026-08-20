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
            return -1
        temp = self.head
        self.head = self.head.next
        if self.head is None: 
            self.tail = None
        self.size -= 1
        return temp.data

    def front(self):
        if self.head is None:
            return -1
        return self.head.data

    def get_size(self):
        return self.size

    def is_empty(self):
        if self.head is None:
            return True
        else:
            return False

    def print_queue(self):
        if self.head is None:
            return -1
        else:
            temp = self.head
            while temp is not None:
                print(temp.data, end=" ")
                temp = temp.next
            print()

queue = LinkedListQueue()
result = []

q = int(input())
for _ in range(q):
    query_type = int(input())
    if query_type == 1:  
        value = int(input())
        queue.enqueue(value)
    elif query_type == 2:  
        result.append(str(queue.dequeue()))
    elif query_type == 3: 
        result.append(str(queue.front()))
    elif query_type == 4:  
        result.append(str(queue.get_size()))
    elif query_type == 5:
        result.append("true" if queue.is_empty() else "false")
