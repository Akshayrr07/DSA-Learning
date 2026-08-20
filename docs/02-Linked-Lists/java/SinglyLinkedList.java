public class SinglyLinkedList {
    private static class Node {
        int data;
        Node next;
        
        Node(int val) {
            this.data = val;
            this.next = null;
        }
    }

    private Node head;

    public SinglyLinkedList() {
        this.head = null;
    }

    public void insertAtStart(int val) {
        Node newNode = new Node(val);
        newNode.next = head;
        head = newNode;
    }

    public void insertAtEnd(int val) {
        Node newNode = new Node(val);
        if (head == null) {
            head = newNode;
            return;
        }
        Node temp = head;
        while (temp.next != null) {
            temp = temp.next;
        }
        temp.next = newNode;
    }

    public void deleteNode(int val) {
        if (head == null) return;
        if (head.data == val) {
            head = head.next;
            return;
        }
        Node temp = head;
        while (temp.next != null && temp.next.data != val) {
            temp = temp.next;
        }
        if (temp.next != null) {
            temp.next = temp.next.next;
        }
    }

    public void display() {
        if (head == null) {
            System.out.println("List is empty");
            return;
        }
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }
        System.out.println("null");
    }

    public static void main(String[] args) {
        SinglyLinkedList list = new SinglyLinkedList();
        System.out.println("Inserting 10, 20, 30 at end:");
        list.insertAtEnd(10);
        list.insertAtEnd(20);
        list.insertAtEnd(30);
        list.display();
        
        System.out.println("Inserting 5 at start:");
        list.insertAtStart(5);
        list.display();
        
        System.out.println("Deleting 20:");
        list.deleteNode(20);
        list.display();
    }
}
