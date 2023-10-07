let bills = [125, 555, 44];
let tips = [];
let totals = [];

const calcTip = (bills) => {
  bills.forEach((bill) => {
    let tip;
    bill >= 50 && bill <= 300 ? (tip = 0.15) : (tip = 0.2);
    tips.push(tip);
    let total = bill + bill * tip;
    totals.push(total);

    // console.log(`The bill was ${bill}, the tip was ${tip * bill}, and the total was ${bill + tip * bill}.`);
  });
};

calcTip(bills);

console.log(tips);
console.log(totals);
