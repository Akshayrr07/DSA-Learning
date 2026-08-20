#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
    int n = 5;
    if (argc > 1) {
        try {
            n = std::stoi(argv[1]);
        } catch (...) {
            std::cout << "Invalid argument. Defaulting to 5.\n";
        }
    } else {
        std::cout << "Usage: ./Right_angle_pattern [size]\n";
        std::cout << "Defaulting to size 5:\n\n";
    }
    
    for (int i = 1; i <= n; ++i) {
        std::cout << std::string(i, '*') << "\n";
    }
    return 0;
}
