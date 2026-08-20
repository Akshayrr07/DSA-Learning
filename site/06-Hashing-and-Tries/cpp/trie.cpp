#include <iostream>
#include <string>
#include <vector>

class TrieNode {
public:
    TrieNode* children[26];
    bool isEndOfWord;

    TrieNode() {
        isEndOfWord = false;
        for (int i = 0; i < 26; ++i) {
            children[i] = nullptr;
        }
    }
};

class Trie {
private:
    TrieNode* root;

    void deleteNode(TrieNode* node) {
        if (!node) return;
        for (int i = 0; i < 26; ++i) {
            deleteNode(node->children[i]);
        }
        delete node;
    }

public:
    Trie() {
        root = new TrieNode();
    }

    void insert(const std::string& word) {
        TrieNode* node = root;
        for (char c : word) {
            int index = c - 'a';
            if (node->children[index] == nullptr) {
                node->children[index] = new TrieNode();
            }
            node = node->children[index];
        }
        node->isEndOfWord = true;
    }

    bool search(const std::string& word) {
        TrieNode* node = root;
        for (char c : word) {
            int index = c - 'a';
            if (node->children[index] == nullptr) {
                return false;
            }
            node = node->children[index];
        }
        return node->isEndOfWord;
    }

    bool startsWith(const std::string& prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            int index = c - 'a';
            if (node->children[index] == nullptr) {
                return false;
            }
            node = node->children[index];
        }
        return true;
    }

    ~Trie() {
        deleteNode(root);
    }
};

int main() {
    Trie trie;
    std::cout << "Inserting 'apple', 'app', 'apricot':\n";
    trie.insert("apple");
    trie.insert("app");
    trie.insert("apricot");
    
    std::cout << std::boolalpha;
    std::cout << "Search 'apple': " << trie.search("apple") << "\n";
    std::cout << "Search 'app': " << trie.search("app") << "\n";
    std::cout << "Search 'appl': " << trie.search("appl") << "\n";
    std::cout << "StartsWith 'ap': " << trie.startsWith("ap") << "\n";
    
    return 0;
}
