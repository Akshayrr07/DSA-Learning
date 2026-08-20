function isBalanced(s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === '(' || c === '{' || c === '[') {
            stack.push(c);
        } else {
            if (stack.length === 0) return false;
            const top = stack[stack.length - 1];
            if ((c === ')' && top === '(') ||
                (c === '}' && top === '{') ||
                (c === ']' && top === '[')) {
                stack.pop();
            } else {
                return false;
            }
        }
    }
    return stack.length === 0;
}

// Test cases
const test1 = "{[()]}";
const test2 = "{[(])}";
console.log(`Testing: "${test1}" -> ${isBalanced(test1) ? "Balanced" : "Not Balanced"}`);
console.log(`Testing: "${test2}" -> ${isBalanced(test2) ? "Balanced" : "Not Balanced"}`);
