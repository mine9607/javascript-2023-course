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
  const markHigherBMI = calcBMI(Mark.mass, Mark.height) > calcBMI(John.mass, John.height);

  markHigherBMI === true
    ? console.log(`Mark's BMI is higher than John's (${calcBMI(Mark.mass, Mark.height)})`)
    : console.log(`Mark's BMI is higher than John's (${calcBMI(John.mass, John.height)})`);
}

compareBMI();
