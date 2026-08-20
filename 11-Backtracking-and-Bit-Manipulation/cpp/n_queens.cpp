#include <iostream>
#include <vector>
#include <string>

bool isSafe(const std::vector<std::string>& board, int row, int col, int n) {
    // Check column
    for (int i = 0; i < row; ++i) {
        if (board[i][col] == 'Q') return false;
    }
    // Check upper left diagonal
    for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) {
        if (board[i][j] == 'Q') return false;
    }
    // Check upper right diagonal
    for (int i = row - 1, j = col + 1; i >= 0 && j < n; --i, ++j) {
        if (board[i][j] == 'Q') return false;
    }
    return true;
}

bool backtrack(std::vector<std::string>& board, int row, int n) {
    if (row == n) return true;
    for (int col = 0; col < n; ++col) {
        if (isSafe(board, row, col, n)) {
            board[row][col] = 'Q';
            if (backtrack(board, row + 1, n)) return true;
            board[row][col] = '.'; // Backtrack
        }
    }
    return false;
}

int main() {
    int n = 4;
    std::vector<std::string> board(n, std::string(n, '.'));
    
    if (backtrack(board, 0, n)) {
        std::cout << "Found a solution for " << n << "-Queens:\n";
        for (const auto& row : board) {
            for (char c : row) {
                std::cout << c << " ";
            }
            std::cout << "\n";
        }
    } else {
        std::cout << "No solution found.\n";
    }
    
    return 0;
}
