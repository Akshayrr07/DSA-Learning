class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    startsWith(prefix) {
        let node = this.root;
        for (let i = 0; i < prefix.length; i++) {
            const char = prefix[i];
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return true;
    }
}

// Driver testing
const trie = new Trie();
console.log("Inserting 'apple', 'app', 'apricot':");
trie.insert("apple");
trie.insert("app");
trie.insert("apricot");

console.log("Search 'apple':", trie.search("apple"));
console.log("Search 'app':", trie.search("app"));
console.log("Search 'appl':", trie.search("appl"));
console.log("StartsWith 'ap':", trie.startsWith("ap"));
