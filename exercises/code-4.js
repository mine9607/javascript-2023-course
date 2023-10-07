let bill = 275;

const calcTip = (bill) => {
  let tip = 0;
  bill <= 300 ? (tip = 0.15) : (tip = 0.2);
  console.log(`The bill was ${bill}, the tip was ${tip * bill}, and the total was ${bill + tip * bill}.`);
};

calcTip(bill);
