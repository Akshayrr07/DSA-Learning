import java.util.Arrays;

public class MatrixMultiplication {
    public static int[][] multiply(int[][] A, int[][] B) {
        int rA = A.length;
        int cA = A[0].length;
        int cB = B[0].length;
        int[][] C = new int[rA][cB];
        
        for (int i = 0; i < rA; i++) {
            for (int j = 0; j < cB; j++) {
                for (int k = 0; k < cA; k++) {
                    C[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return C;
    }

    public static void main(String[] args) {
        int[][] A = {
            {1, 2},
            {3, 4}
        };
        int[][] B = {
            {5, 6},
            {7, 8}
        };
        
        System.out.println("Matrix A: " + Arrays.deepToString(A));
        System.out.println("Matrix B: " + Arrays.deepToString(B));
        
        int[][] result = multiply(A, B);
        System.out.println("Result matrix:");
        for (int[] row : result) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
}
