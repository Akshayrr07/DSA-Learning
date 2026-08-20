def solve_n_queens(n):
    board = [['.' for _ in range(n)] for _ in range(n)]
    
    def is_safe(row, col):
        # Check column
        for i in range(row):
            if board[i][col] == 'Q':
                return False
        # Check main diagonal
        i, j = row - 1, col - 1
        while i >= 0 and j >= 0:
            if board[i][j] == 'Q':
                return False
            i -= 1
            j -= 1
        # Check anti diagonal
        i, j = row - 1, col + 1
        while i >= 0 and j < n:
            if board[i][j] == 'Q':
                return False
            i -= 1
            j += 1
        return True

    def backtrack(row):
        if row == n:
            return True
        for col in range(n):
            if is_safe(row, col):
                board[row][col] = 'Q'
                if backtrack(row + 1):
                    return True
                board[row][col] = '.' # Backtrack
        return False

    if backtrack(0):
        return board
    return None

if __name__ == "__main__":
    n = 4
    solution = solve_n_queens(n)
    if solution:
        print(f"Found a solution for {n}-Queens:")
        for row in solution:
            print(" ".join(row))
    else:
        print(f"No solution found for {n}-Queens.")
