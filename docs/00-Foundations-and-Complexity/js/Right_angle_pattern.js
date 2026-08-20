// Run using: node Right_angle_pattern.js [size]
const args = process.argv.slice(2);
const n = args.length > 0 ? parseInt(args[0], 10) : 5;

if (args.length === 0) {
    console.log("Usage: node Right_angle_pattern.js [size]");
    console.log("Defaulting to size 5:\n");
}

for (let i = 1; i <= n; i++) {
    console.log('*'.repeat(i));
}
