function multiply(A, B) {
    const rA = A.length;
    const cA = A[0].length;
    const cB = B[0].length;
    const C = Array.from({ length: rA }, () => Array(cB).fill(0));
    
    for (let i = 0; i < rA; i++) {
        for (let j = 0; j < cB; j++) {
            for (let k = 0; k < cA; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return C;
}

// Test matrix multiplication
const A = [
    [1, 2],
    [3, 4]
];
const B = [
    [5, 6],
    [7, 8]
];

console.log("Matrix A:", A);
console.log("Matrix B:", B);
console.log("Result:", multiply(A, B));
