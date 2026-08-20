class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(val) {
        this.root = this._insertRec(this.root, val);
    }

    _insertRec(node, val) {
        if (!node) {
            return new TreeNode(val);
        }
        if (val < node.val) {
            node.left = this._insertRec(node.left, val);
        } else if (val > node.val) {
            node.right = this._insertRec(node.right, val);
        }
        return node;
    }

    search(val) {
        return this._searchRec(this.root, val);
    }

    _searchRec(node, val) {
        if (!node) return false;
        if (node.val === val) return true;
        if (val < node.val) return this._searchRec(node.left, val);
        return this._searchRec(node.right, val);
    }

    inorder() {
        const result = [];
        this._inorderRec(this.root, result);
        console.log(result.join(" "));
    }

    _inorderRec(node, result) {
        if (node) {
            this._inorderRec(node.left, result);
            result.push(node.val);
            this._inorderRec(node.right, result);
        }
    }
}

// Driver testing
const tree = new BST();
console.log("Inserting 50, 30, 20, 40, 70, 60, 80 into BST:");
tree.insert(50);
tree.insert(30);
tree.insert(20);
tree.insert(40);
tree.insert(70);
tree.insert(60);
tree.insert(80);

console.print = console.log;
console.print("In-order traversal: ");
tree.inorder();

console.log("Searching for 60:", tree.search(60));
console.log("Searching for 90:", tree.search(90));
