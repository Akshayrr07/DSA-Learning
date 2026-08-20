#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

// Tabulation approach (Bottom-Up)
int lcsTabulation(const std::string& X, const std::string& Y) {
    int m = X.length();
    int n = Y.length();
    std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));

    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (X[i - 1] == Y[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = std::max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}

int main() {
    std::string X = "AGGTAB";
    std::string Y = "GXTXAYB";
    
    std::cout << "String X: " << X << "\n";
    std::cout << "String Y: " << Y << "\n";
    std::cout << "Length of LCS (Tabulation): " << lcsTabulation(X, Y) << "\n"; // Expected: 4 ("GTAB")
    
    return 0;
}
