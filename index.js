var x = 'global';
let y = 'global';

function test() {
  var x = 'function';
  let y = 'function';
  console.log(x);  // ?
  console.log(y);  // ?
}

test();
console.log(x);   // ?
console.log(y);   // ?

if (true) {
  var x = 'block';
  let z = 'block';
}
console.log(x);   // ?
// console.log(z); // what happens if you uncomment this?
