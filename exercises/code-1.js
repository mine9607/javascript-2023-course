const Mark = {
  mass: "",
  height: "",
};
const John = {
  mass: "",
  height: "",
};

Mark.mass = 78;
Mark.height = 1.69;
John.mass = 92;
John.height = 1.95;

function calcBMI(mass, height) {
  const BMI = mass / height ** 2;
  return BMI;
}

function compareBMI() {
  let markHigherBMI = "";
  if (calcBMI(Mark.mass, Mark.height) > calcBMI(John.mass, John.height)) {
    markHigherBMI = true;
  } else {
    markHigherBMI = false;
  }
  return markHigherBMI;
}

console.log(calcBMI(Mark.mass, Mark.height));
console.log(calcBMI(John.mass, John.height));
console.log(compareBMI());

Mark.mass = 95;
Mark.height = 1.88;
John.mass = 85;
John.height = 1.76;

console.log(calcBMI(Mark.mass, Mark.height));
console.log(calcBMI(John.mass, John.height));
console.log(compareBMI());
