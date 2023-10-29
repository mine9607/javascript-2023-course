'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const displayMovements = (acct, sort = false) => {
  containerMovements.innerHTML = '';

  const sortedMovements = sort
    ? acct.movements.slice().sort((a, b) => a - b)
    : acct.movements;

  sortedMovements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}\u20AC</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// const calcDisplayBalance = movements => {
//   const balance = movements.reduce((acc, mov, i) => acc + mov, 0);
//   labelBalance.textContent = `${balance}\u20AC`;
// };
// --------Refactor----- the function above to accept the current account as input instead of the movements
const calcDisplayBalance = acct => {
  acct.balance = acct.movements.reduce((acc, mov, i) => acc + mov, 0);
  labelBalance.textContent = `${acct.balance}\u20AC`;
};

// note - could refactor to use ternary operator to apply the chained methods based on if the movement is negative or positive?
const calcDisplaySummary = acct => {
  const depositTotal = acct.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${depositTotal}\u20AC`;
  const withdrawalTotal = acct.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(withdrawalTotal)}\u20AC`;

  const interest = acct.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * currentAccount.interestRate) / 100)
    .reduce((acc, curr) => (curr > 1 ? acc + curr : acc + 0));

  labelSumInterest.textContent = `${interest.toFixed(2)}\u20AC`;
};

const createUsernames = accounts => {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

const users = createUsernames(accounts);

const updateUI = acct => {
  // Display movements
  displayMovements(acct);
  // Display balance
  calcDisplayBalance(acct);
  // Display Summary
  calcDisplaySummary(acct);
};

// Event Handler
let currentAccount;
btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(
    acct => acct.username === inputLoginUsername.value
  );

  currentAccount?.pin === +inputLoginPin.value
    ? (containerApp.style.opacity = 1)
    : alert('Incorrect Login. Please Try again');

  //empy input fields and set opacity to 0
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginUsername.blur();
  inputLoginPin.blur();

  // Display UI and message
  labelWelcome.textContent = `Welcome back, ${
    currentAccount.owner.split(' ')[0]
  }!`;

  // update UI
  updateUI(currentAccount);
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiverAcct = accounts.find(
    acct => acct.username === inputTransferTo.value
  );

  // Add negative movement to current acct
  // note we could refactor to ensure that the money is only transferred to valid accounts
  if (amount <= 0) {
    alert('Please input an amount to transfer');
    return;
  } else if (currentAccount.balance <= Math.abs(amount)) {
    alert('Insufficient funds to process transfer');
    return;
  } else if (receiverAcct?.username === currentAccount.username) {
    alert('Incorrect transfer account - please choose a valid account');
    return;
  } else {
    currentAccount.movements.push(-amount);
  }
  // Add positive movement to receiver acct
  receiverAcct.movements.push(amount);

  //Display new Acct Balance, Summary and Movments
  updateUI(currentAccount);

  //Clear out input fields
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();
  inputTransferAmount.blur();
});

// Create a Bank Loan that is only approved if there is a deposit > 10% of loan amount requested
btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const loan = +inputLoanAmount.value;

  const checkDeposits = currentAccount.movements
    .filter(mov => mov > 0)
    .some(mov => mov >= 0.1 * loan);

  const maxDeposit = currentAccount.movements.reduce(
    (acc, curr) => (acc > curr ? acc : curr),
    0
  );

  checkDeposits
    ? currentAccount.movements.push(loan)
    : alert(`You may only take out a loan up to ${maxDeposit / 0.1}`);

  updateUI(currentAccount);

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

// where are we accessing the current account

//Close Account
btnClose.addEventListener('click', e => {
  e.preventDefault();

  // find the account to close
  if (inputCloseUsername.value !== currentAccount.username) {
    alert('invalid user.  Please try again');
  } else if (+inputClosePin.value !== currentAccount.pin) {
    alert('invalid pin.  Please try again');
  } else {
    // Find index of user account
    const userAccountIndex = accounts.findIndex(
      acct => acct.username === currentAccount.username
    );
    // Remove user account from accounts array
    accounts.splice(userAccountIndex, 1);
  }
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
  inputCloseUsername.blur();

  containerApp.style.opacity = 0;
  console.log(accounts);
});

let sorted = false;

btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////

// Array Methods
// Slice
// const arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = arr.slice(2, 4);
// const arr3 = [...arr2, ...arr];
// console.log(arr);
// console.log(arr2);
// console.log(arr3);

// Splice
// console.log(arr.splice(-1));
// commonly used to remove elements from an array

// Reverse
// const arrLong = ['j', 'i', 'h', 'g', 'f'];
// console.log(arrLong[0]);
// console.log(arrLong.reverse());
// console.log(arrLong[0]);

// Concat
// const letters = arr.concat(arrLong);
// console.log(letters);
// console.log([...arr, ...arrLong]);

// Join
// const numArray = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log(numArray.join('+'));
// console.log(numArray);

// At
// console.log(numArray.at(3)); // 4
// using at to get value at last element
// console.log(numArray[-1]); // undefined
// console.log(numArray[numArray.length - 1]); //8
// console.log(numArray.slice(-1)[0]); //8
// console.log(numArray.at(-1)); // 8

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for of Loop
// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }
// console.log('--------------FOR EACH METHOD--------------');
// // forEach method to Loop
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// });
// console.log('--------For Of Looping with Indices---------');
// // for of loop which accesses indices
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement: ${i + 1} You deposited ${movement}`);
//   } else {
//     console.log(`Movement: ${i + 1} You withdrew ${Math.abs(movement)}`);
//   }
// }
// console.log('------FOR EACH METHOD with Indices--------');
// // forEach method to Loop
// movements.forEach(function (movement, i, arr) {
//   if (movement > 0) {
//     console.log(`Movement: ${i + 1} You deposited ${movement}`);
//   } else {
//     console.log(`Movement: ${i + 1} You withdrew ${Math.abs(movement)}`);
//   }
// });

// Note - the continue and break statements do not work in a forEach loop

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDogs = (juliaDogs, kateDogs) => {
//   const juliaDogsCorrect = juliaDogs.slice();
//   juliaDogsCorrect.splice(0, 1);
//   juliaDogsCorrect.splice(-2);
//   const dogs = juliaDogsCorrect.concat(kateDogs);

//   dogs.forEach(function (dog, i) {
//     if (dog < 3) {
//       console.log(`Dog ${i + 1} is a puppy, it is ${dog} year's old`);
//     } else {
//       console.log(`Dog ${i + 1} is an adult, it is ${dog} year's old`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// console.log('--------------Coding 2---------------');
// const calcAverageHumanAge = dogs =>
//   //Refactor by chaining
//   dogs
//     .map(age => (age <= 2 ? age * 2 : age * 4 + 16))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// // return humanAges;

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// Practice using map method
const eurToUSD = 1.1;
// const movUSD = movements.map(mov => mov * eurToUSD);

// repeat with for of loop
const USDArray = [];
for (const mov of movements) USDArray.push(mov * eurToUSD);
// console.log(USDArray);

// recreate the for each loop below using map method
// const movementsDescriptions = movements.map((mov, i) => {
//   if (mov > 0) {
//     return `Movement: ${i + 1} You deposited ${mov}`;
//   } else {
//     return `Movement: ${i + 1} You withdrew ${Math.abs(mov)}`;
//   }
// });

// Refactor to use Ternary Operator
// const movementsDescriptions = movements.map((mov, i) => {
//   return mov > 0
//     ? `Movement: ${i + 1} You deposited ${mov}`
//     : `Movement: ${i + 1} You withdrew ${Math.abs(mov)}`;
// });

// Refactor again to take advantage of similar return words
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement: ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

// console.log(movementsDescriptions);
// forEach method to Loop
// movements.forEach(function (movement, i, arr) {
//   if (movement > 0) {
//     console.log(`Movement: ${i + 1} You deposited ${movement}`);
//   } else {
//     console.log(`Movement: ${i + 1} You withdrew ${Math.abs(movement)}`);
//   }
// });

// filter method
const deposits = movements.filter((mov, i) => mov > 0);
// console.log(deposits);

const withdrawals = movements.filter((mov, i) => mov < 0);
// console.log(withdrawals);

// reduce method - note: you can leave off the initial value if it is expected to be 0
const balance = movements.reduce((acc, curr, i) => acc + curr, 0);
// console.log(balance);

// use Reduce method to get max value
const arrMax = movements.reduce((acc, curr) => (acc > curr ? acc : curr));
// console.log(arrMax);

// CHaining methods

const totalDepositsUSD = movements
  .filter(mov => mov > 0) //returns a new array
  .map(mov => mov * eurToUSD) //returns a new array
  // .map((mov, i, arr) => {
  //can inspect the steps of the chaining by accessing the arr property
  // console.log(arr);
  // return mov * eurToUSD;
  //returns a new array
  .reduce((acc, curr) => {
    return acc + curr;
  }, 0); //returns a value - cannot chain after reduce

// console.log(totalDepositsUSD);

const findDeposits = movements.find((mov, i) => mov > 0);

// console.log(findDeposits);
// console.log(accounts);

//can be used to loop over an array of users to find the userID associated with a class or an account

// note this code is somehow assigning the name Jessica Davis to the account1.owner
// const account = accounts.find(acc => (acc.owner = 'Jessica Davis'));
// console.log(account);

const arrTest = [[1, 2, 3], [4, 5, 6], 7, 8, 9];

const [a, b, ...c] = arrTest;
const newArray = [...a, ...b, ...c];
console.log(newArray);

console.log(arrTest.flat());

const acctMovements = accounts.map(acct => acct.movements);
console.log(acctMovements);
const flatMovements = acctMovements.flat();
console.log(flatMovements);
const bankBalance = flatMovements.reduce((acc, curr) => acc + curr, 0);
console.log(bankBalance);
// FlatMaps
const flatMap = accounts.flatMap(acc => acc.movements);
console.log(flatMap);
const chainedbankBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, curr) => acc + curr, 0);
console.log(chainedbankBalance);

// Sort Method
// const sortedArray1 = movements.sort((a, b) => a - b);
// console.log(sortedArray1);

// const sortedArray2 = movements.sort((a, b) => b - a);
// console.log(sortedArray2);

// return < 0 A, B (keep order)
// return > 0 A, B (switch order)

// Ascending
console.log(movements);
movements.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
});
console.log(movements);

// Descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (b > a) return 1;
});
console.log(movements);

const testArray = [1, 2, 3, 4, 5, 6, 7];
console.log(testArray);

const testArrayv2 = Array.from(testArray);
console.log(testArrayv2);

const testArrayv3 = Array.from(
  { length: testArray.length },
  (curr, i) => i + 1
);
console.log(testArrayv3);

const diceRolls = Array.from(
  { length: 100 },
  (curr, i) => Math.floor(Math.random() * 6) + 1
);

console.log(diceRolls);

// Note - this can be used on iterables like the DOM nodes
// Getting deposit values from the HTML
labelBalance.addEventListener('click', e => {
  e.preventDefault();
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => +el.textContent.replace('\u20AC', '')
  ).reduce((curr, acc) => curr + acc, 0);
  console.log(movementsUI);
});
