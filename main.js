// Import Named Exports

import {
    add,
    subtract,
    multiply,
    divide
} from './calculator.js';

console.log("Using Named Exports:");
console.log("Add:", add(10, 5));
console.log("Subtract:", subtract(10, 5));
console.log("Multiply:", multiply(10, 5));
console.log("Divide:", divide(10, 5));

// Import Default Export

import calculator from './calculator.js';

console.log("\nUsing Default Export:");
console.log("Add:", calculator.add(20, 10));
console.log("Subtract:", calculator.subtract(20, 10));
console.log("Multiply:", calculator.multiply(20, 10));
console.log("Divide:", calculator.divide(20, 10));