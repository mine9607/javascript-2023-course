const jonasArray = ["jonas", "schmedtmann", 2037 - 1991, "teacher", ["Michael", "Peter", "Steven"]];

jonasArray.forEach((item) => {
  console.log(item);
});

console.log("====Break====");

for (let i = 0; i <= jonasArray.length - 1; ++i) {
  console.log(jonasArray[i]);
}

console.log("====Break2====");

let i = 0;

for (; i < jonasArray.length; ++i) {
  console.log(jonasArray[i]);
}

console.log("====Break3====");

for (let i = jonasArray.length - 1; i >= 0; i--) {
  console.log(jonasArray[i]);
}

console.log("====Break3====");

let rep =1;
while (; rep <=10; i++) {
  console.log(jonasArray[i]);
}
