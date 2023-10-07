const Mark = {
  fullName: "Mark Miller",
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    const BMI = this.mass / (this.height * this.height);
    return BMI;
  },
};
const John = {
  fullName: "John Smith",
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    const BMI = this.mass / (this.height * this.height);
    return BMI;
  },
};

Mark.calcBMI > John.calcBMI
  ? console.log(`${Mark.fullName}'s BMI (${Mark.calcBMI()}) is higher than ${John.fullName}'s (${John.calcBMI()})`)
  : console.log(`${John.fullName}'s BMI (${John.calcBMI()}) is higher than ${Mark.fullName}'s (${Mark.calcBMI()})`);

// console.log(calcBMI(Mark.mass, Mark.height));
// console.log(calcBMI(John.mass, John.height));
// console.log(compareBMI());

// Mark.mass = 95;
// Mark.height = 1.88;
// John.mass = 85;
// John.height = 1.76;

// console.log(calcBMI(Mark.mass, Mark.height));
// console.log(calcBMI(John.mass, John.height));
// console.log(compareBMI());
