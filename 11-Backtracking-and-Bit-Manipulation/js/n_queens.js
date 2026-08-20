function solveNQueens(n) {
    const board = Array.from({ length: n }, () => Array(n).fill('.'));

    function isSafe(row, col) {
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        return true;
    }

    function backtrack(row) {
        if (row === n) return true;
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q';
                if (backtrack(row + 1)) return true;
                board[row][col] = '.'; // Backtrack
            }
        }
        return false;
    }

    if (backtrack(0)) return board;
    return null;
}

// Test cases
const n = 4;
const result = solveNQueens(n);
if (result) {
    console.log(`Found a solution for ${n}-Queens:`);
    result.forEach(row => console.log(row.join(" ")));
} else {
    console.log(`No solution found for ${n}-Queens.`);
}
