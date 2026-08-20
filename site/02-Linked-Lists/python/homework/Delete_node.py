class Node:
    def _init_(self, data):
        self.data = data
        self.next = None

def deleteNodeRecursively(head, i):
   
    if head is None:
        return None
    if i == 0:
        return head.next  
  
    head.next = deleteNodeRecursively(head.next, i - 1)
    return head  
def printLinkedList(head):
    while head is not None:
        print(head.data, end=" ")
        head = head.next
    print()

def takeInput():
    values = list(map(int, input().split()))
    head = None
    tail = None
    for val in values:
        if val == -1:
            break
        newNode = Node(val)
        if head is None:
            head = newNode
            tail = newNode
        else:
            tail.next = newNode
            tail = newNode
    return head
head = takeInput()
i = int(input())
head = deleteNodeRecursively(head, i)
printLinkedList(head)