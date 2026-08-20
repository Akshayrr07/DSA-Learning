#include <iostream>
#include <vector>

std::vector<std::vector<int>> multiply(const std::vector<std::vector<int>>& A, const std::vector<std::vector<int>>& B) {
    int rA = A.size();
    int cA = A[0].size();
    int cB = B[0].size();
    
    std::vector<std::vector<int>> C(rA, std::vector<int>(cB, 0));
    
    for (int i = 0; i < rA; ++i) {
        for (int j = 0; j < cB; ++j) {
            for (int k = 0; k < cA; ++k) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return C;
}

int main() {
    // Default matrix multiplication test
    std::vector<std::vector<int>> A = {
        {1, 2},
        {3, 4}
    };
    std::vector<std::vector<int>> B = {
        {5, 6},
        {7, 8}
    };
    
    std::cout << "Matrix A:\n1 2\n3 4\n\nMatrix B:\n5 6\n7 8\n\nResult:\n";
    auto result = multiply(A, B);
    for (const auto& row : result) {
        for (int val : row) {
            std::cout << val << " ";
        }
        std::cout << "\n";
    }
    return 0;
}
