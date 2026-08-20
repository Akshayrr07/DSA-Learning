public class BST {
    private static class TreeNode {
        int val;
        TreeNode left, right;
        
        TreeNode(int value) {
            this.val = value;
            this.left = this.right = null;
        }
    }

    private TreeNode root;

    public BST() {
        this.root = null;
    }

    public void insert(int val) {
        root = insertRec(root, val);
    }

    private TreeNode insertRec(TreeNode node, int val) {
        if (node == null) {
            return new TreeNode(val);
        }
        if (val < node.val) {
            node.left = insertRec(node.left, val);
        } else if (val > node.val) {
            node.right = insertRec(node.right, val);
        }
        return node;
    }

    public boolean search(int val) {
        return searchRec(root, val);
    }

    private boolean searchRec(TreeNode node, int val) {
        if (node == null) return false;
        if (node.val == val) return true;
        if (val < node.val) return searchRec(node.left, val);
        return searchRec(node.right, val);
    }

    public void inorder() {
        inorderRec(root);
        System.out.println();
    }

    private void inorderRec(TreeNode node) {
        if (node != null) {
            inorderRec(node.left);
            System.out.print(node.val + " ");
            inorderRec(node.right);
        }
    }

    public static void main(String[] args) {
        BST tree = new BST();
        System.out.println("Inserting 50, 30, 20, 40, 70, 60, 80 into BST:");
        tree.insert(50);
        tree.insert(30);
        tree.insert(20);
        tree.insert(40);
        tree.insert(70);
        tree.insert(60);
        tree.insert(80);
        
        System.out.print("In-order traversal: ");
        tree.inorder();
        
        System.out.println("Searching for 60: " + (tree.search(60) ? "Found" : "Not Found"));
        System.out.println("Searching for 90: " + (tree.search(90) ? "Found" : "Not Found"));
    }
}
