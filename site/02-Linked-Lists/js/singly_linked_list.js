class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
    }

    insertAtStart(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }

    insertAtEnd(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let temp = this.head;
        while (temp.next) {
            temp = temp.next;
        }
        temp.next = newNode;
    }

    deleteNode(data) {
        if (!this.head) return;
        if (this.head.data === data) {
            this.head = this.head.next;
            return;
        }
        let temp = this.head;
        while (temp.next && temp.next.data !== data) {
            temp = temp.next;
        }
        if (temp.next) {
            temp.next = temp.next.next;
        }
    }

    display() {
        if (!this.head) {
            console.log("List is empty");
            return;
        }
        let temp = this.head;
        const result = [];
        while (temp) {
            result.push(temp.data);
            temp = temp.next;
        }
        console.log(result.join(" -> ") + " -> null");
    }
}

// Driver testing
const list = new SinglyLinkedList();
console.log("Inserting 10, 20, 30 at end:");
list.insertAtEnd(10);
list.insertAtEnd(20);
list.insertAtEnd(30);
list.display();

console.log("Inserting 5 at start:");
list.insertAtStart(5);
list.display();

console.log("Deleting 20:");
list.deleteNode(20);
list.display();
