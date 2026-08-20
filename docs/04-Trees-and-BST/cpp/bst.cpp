#include <iostream>

class TreeNode {
public:
    int val;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int value) {
        val = value;
        left = nullptr;
        right = nullptr;
    }
};

class BST {
private:
    TreeNode* root;

    TreeNode* insertRec(TreeNode* node, int val) {
        if (node == nullptr) {
            return new TreeNode(val);
        }
        if (val < node->val) {
            node->left = insertRec(node->left, val);
        } else if (val > node->val) {
            node->right = insertRec(node->right, val);
        }
        return node;
    }

    bool searchRec(TreeNode* node, int val) {
        if (node == nullptr) return false;
        if (node->val == val) return true;
        if (val < node->val) return searchRec(node->left, val);
        return searchRec(node->right, val);
    }

    void inorderRec(TreeNode* node) {
        if (node != nullptr) {
            inorderRec(node->left);
            std::cout << node->val << " ";
            inorderRec(node->right);
        }
    }

    void freeRec(TreeNode* node) {
        if (node != nullptr) {
            freeRec(node->left);
            freeRec(node->right);
            delete node;
        }
    }

public:
    BST() {
        root = nullptr;
    }

    void insert(int val) {
        root = insertRec(root, val);
    }

    bool search(int val) {
        return searchRec(root, val);
    }

    void inorder() {
        inorderRec(root);
        std::cout << "\n";
    }

    ~BST() {
        freeRec(root);
    }
};

int main() {
    BST tree;
    std::cout << "Inserting 50, 30, 20, 40, 70, 60, 80 into BST:\n";
    tree.insert(50);
    tree.insert(30);
    tree.insert(20);
    tree.insert(40);
    tree.insert(70);
    tree.insert(60);
    tree.insert(80);
    
    std::cout << "In-order traversal of BST: ";
    tree.inorder();
    
    std::cout << "Searching for 60: " << (tree.search(60) ? "Found" : "Not Found") << "\n";
    std::cout << "Searching for 90: " << (tree.search(90) ? "Found" : "Not Found") << "\n";
    
    return 0;
}
