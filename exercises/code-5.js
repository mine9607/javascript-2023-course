const dolphins = [44, 23, 71];
const koalas = [65, 54, 49];

const calcAverage = (array) => {
  let total = 0;
  let count = 0;

  array.forEach((item) => {
    total = total + item;
    count = count + 1;
  });

  const average = total / count;
  console.log(average);
  return average;
};

const scoreDolphins = calcAverage(dolphins);
const scoreKoalas = calcAverage(koalas);
const checkWinner = () => {
  if (scoreDolphins >= 2 * scoreKoalas) {
    console.log(`Dolphins win ${scoreDolphins} vs ${scoreKoalas}`);
  } else if (scoreKoalas >= 2 * scoreDolphins) {
    console.log(`Koalas win ${scoreKoalas} vs ${scoreDolphins}`);
  } else {
    console.log("No team wins...");
  }
};

checkWinner();

// getAverage(dolphins) > getAverage(koalas)
//   ? console.log("Dolphins win the trophy")
//   : console.log("Koalas win the trophy");

// if (Number(getAverage(dolphins)) === Number(getAverage(koalas))) {
//   console.log("Both teams win the trophy");
// }
