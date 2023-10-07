const dolphins = [96, 108, 89];
const koalas = [88, 91, 110];

function getAverage(array) {
  let total = 0;
  let count = 0;

  array.forEach((item) => {
    total = total + item;
    count = count + 1;
  });

  const average = total / count;
  console.log(average);
}

getAverage(dolphins);
getAverage(koalas);

getAverage(dolphins) > getAverage(koalas)
  ? console.log("Dolphins win the trophy")
  : console.log("Koalas win the trophy");

if (Number(getAverage(dolphins)) === Number(getAverage(koalas))) {
  console.log("Both teams win the trophy");
}
