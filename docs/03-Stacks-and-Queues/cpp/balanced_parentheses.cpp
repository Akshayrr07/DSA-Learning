#include <iostream>
#include <stack>
#include <string>

bool isBalanced(const std::string& s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top();
            if ((c == ')' && top == '(') ||
                (c == '}' && top == '{') ||
                (c == ']' && top == '[')) {
                st.pop();
            } else {
                return false;
            }
        }
    }
    return st.empty();
}

int main() {
    std::string test1 = "{[()]}";
    std::string test2 = "{[(])}";
    std::string test3 = "{{[[]]}}";
    
    std::cout << "Testing: \"" << test1 << "\" -> " << (isBalanced(test1) ? "Balanced" : "Not Balanced") << "\n";
    std::cout << "Testing: \"" << test2 << "\" -> " << (isBalanced(test2) ? "Balanced" : "Not Balanced") << "\n";
    std::cout << "Testing: \"" << test3 << "\" -> " << (isBalanced(test3) ? "Balanced" : "Not Balanced") << "\n";
    
    return 0;
}
