class Node:
    def _init_(self,data):
        self.data = data
        self.next = None
def removeDuplicates(head):
    if head is None:
        return None
    seen = set()
    current = head
    seen.add(current.data)
    while current.next is not None:
        if current.next.data in seen:
            current.next = current.next.next
        else:
            seen.add(current.next.data)
            current = current.next
    return head
def printLinkedList(head):
    while head is not None:
        print(head.data,end=" ")
        head = head.next
    print()
def takeInput():
    values = list(map(int,input().split()))
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
head = removeDuplicates(head)
printLinkedList(head)