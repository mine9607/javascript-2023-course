'use strict';

// NOTE - UI is not updating on login as new user
// NOTE - Request loan is processing loans of 0

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Arrays - Section 11 Data Set
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// Numbers - Section 12 Data Set
console.log('--------Numbers Data Set-------');
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const dateFormat = (date, locale, options) => {
  return new Intl.DateTimeFormat(locale, options).format(date);
};

const moneyFormat = (money, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(money);
};

const displayMovements = (acct, sort = false) => {
  containerMovements.innerHTML = '';

  const sortedMovements = sort
    ? acct.movements.slice().sort((a, b) => a - b)
    : acct.movements;

  sortedMovements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acct.movementsDates[i]);
    const displayDate = dateFormat(date, acct.locale);

    const displayMoney = moneyFormat(mov, acct.locale, acct.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}
        </div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${displayMoney}</div>
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
  labelBalance.textContent = `${moneyFormat(
    acct.balance,
    acct.locale,
    acct.currency
  )}`;
};

// note - could refactor to use ternary operator to apply the chained methods based on if the movement is negative or positive?
const calcDisplaySummary = acct => {
  const depositTotal = acct.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${moneyFormat(
    depositTotal,
    acct.locale,
    acct.currency
  )}`;

  const withdrawalTotal = acct.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${moneyFormat(
    Math.abs(withdrawalTotal),
    acct.locale,
    acct.currency
  )}`;

  const interest = acct.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * currentAccount.interestRate) / 100)
    .reduce((acc, curr) => (curr > 1 ? acc + curr : acc + 0));

  labelSumInterest.textContent = `${moneyFormat(
    interest,
    acct.locale,
    acct.currency
  )}`;
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

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;
////UNDO ABOVE LATER//////

// const locale = navigator.language;

// labelDate.textContent = now.toDateString();
// labelDate.textContent = new Intl.DateTimeFormat(
//   currentAccount.locale,
//   options
// ).format(now);

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(
    acct => acct.username === inputLoginUsername.value
  );

  labelDate.textContent = dateFormat(now, currentAccount.locale, options);

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
  setTimeout(
    () => (
      (containerApp.style.opacity = 0),
      (labelWelcome.textContent = 'Log in to get started')
    ),
    60000
  );
  // const timer = min => {
  //   const time = min * 1000 * 60;
  //   while (time > 0) {
  //     setTimeout(time => time - 1, 1000);
  //     labelTimer.textContent = time;
  //   }
  // };

  const timer = min => {
    const time = min * 60; // Convert minutes to seconds
    let remainingTime = time; // Create a variable to track remaining time

    const interval = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(interval); // Stop the timer when it reaches zero
      } else {
        labelTimer.textContent = remainingTime;
        remainingTime--;
      }
    }, 1000); // Update the timer every second
  };

  timer(5);
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
    currentAccount.movementsDates.push(new Date().toISOString());
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

  const loan = Math.floor(inputLoanAmount.value);

  const checkDeposits = currentAccount.movements
    .filter(mov => mov > 0)
    .some(mov => mov >= 0.1 * loan);

  const maxDeposit = currentAccount.movements.reduce(
    (acc, curr) => (acc > curr ? acc : curr),
    0
  );

  checkDeposits
    ? (currentAccount.movements.push(loan),
      currentAccount.movementsDates.push(new Date().toISOString()))
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

// Numbers in JS are inherently floats which is why the following is true
console.log(23 === 23.0);

// Numbers are 64 base 2 formatted (binary) - difficult to represent fractions

// Base 10 : 0 to 9
// Base 2 : 0 and 1

//  This is the explanation for the weird result below
console.log(`This is a weird result of JS number format: ${0.1 + 0.2}`);
console.log('0.1 + 0.2 === 0.3 \nResult:');
console.log(0.1 + 0.2 === 0.3);
// We see this problem in Base 10 with some fractions as well: 3/10 = 0.33333333

// This is why JavaScript is not good for really precise scientific or financial calculations in JS

// Type coercion using "+"
console.log(+'25');

// Parsing - note the string must start with a number
console.log('----------parseInt--------');
console.log(parseInt('30px'));
console.log(Number.parseInt('45px'));
console.log(parseInt('e55'));

// Parse Integer - takes a second argument to define the reddix or base of the numeral system we are using (e.g. - 10)
console.log(parseInt('50px', 10));

// Parse Float - doesn't have a second argument
console.log('---------parseFloat--------');
console.log(parseFloat('2.5 dogs'));

// Not a number - isNaN
console.log('---------isNaN---------');
console.log(isNaN(20)); //false
console.log(isNaN('23')); //false
console.log(isNaN('dog')); //true
console.log(isNaN('25dogs')); //true
console.log(isNaN('2.2')); //false
console.log(isNaN(23 / 0)); //false - weird case

// isFinite - best way to check if a number is not a number
console.log('---------isFinite-----');
console.log(isFinite(20)); //true
console.log(isFinite('23')); //true
console.log(isFinite('dog')); //false
console.log(isFinite('25dogs')); //false
console.log(isFinite('2.2')); //true
console.log(isFinite(+'20px')); //false
console.log(isFinite(23 / 0)); //false - weird case

//  Write a function to calculate a randomInt between a min and max value
const randIntInclusive = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min) + min);

const diceRolls = Array.from({ length: 10 }, curr => randIntInclusive(2, 4));

console.log(diceRolls);

// Rounding decimals - returns a string that should be corrected with parse or type coercion
console.log((25.324234).toFixed(2));
console.log(+(25.324234).toFixed(2));
console.log(parseFloat((25.324234).toFixed(2)));

// Finding max of an array - 2 ways
const arrayMax = [1, 4, 662, 23];
console.log(Math.max(...arrayMax));
console.log(arrayMax.reduce((acc, curr) => (acc > curr ? acc : curr)));

const evenMovementRowsColor = () =>
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (i % 2 == 0) {
      row.style.backgroundColor = 'orangered';
    }
    if (i % 2 !== 0) {
      row.style.backgroundColor = 'yellow';
    }
  });

// labelBalance.addEventListener('click', evenMovementRowsColor);
// labelBalance.addEventListener('click', oddMovementRowsColor);

// Numeric Separators
const diameter = 287460000000;
const diameter2 = 287_460_000_000;

console.log(diameter);
console.log(diameter2);

// Numeric separators in strings
console.log('------numeric separators in strings-------');
console.log('23000');
console.log('23_000');
console.log(+'23_000');
console.log(parseInt('23_000'));

// Max number size in JS for normal integers - notice the max value is not correct
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);
console.log(typeof (2 ** 53 + 0));
console.log(2 ** 53 + 0);
console.log(typeof (2 ** 53 + 1));
console.log(2 ** 53 + 1);
console.log(typeof (2 ** 53 + 2));
console.log(2 ** 53 + 2);
console.log(typeof (2 ** 53 + 10));
console.log(2 ** 53 + 10);

// BigInt
console.log(200000);
console.log(typeof 200000);
console.log(200000n);
console.log(typeof 200000n);
console.log(40000000000000000000000000000000000n);
console.log(typeof 40000000000000000000000000000000000n);
const int = BigInt(40000000000000000000000000000000000n);
console.log(int);

console.log('------------Creating Dates-----------');
// Dates
console.log('---Using the new Date Constructor---');
// const now = new Date();
// console.log(now);
console.log('---From parsing a date string---');
console.log(new Date('Aug 02, 2023'));

console.log(new Date(account1.movementsDates[0]));

const future = new Date(2023, 10, 5, 10, 30, 59);
console.log(future);

console.log(future.getTime());
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toDateString());
console.log(future.toTimeString());
console.log(future.toISOString());
const past = new Date(0);
console.log(past);

console.log(new Intl.DateTimeFormat('en-US').format(now));

const me = {
  name: 'Brian',
  age: 38,
};

console.log(Object.hasOwnProperty('name'));
console.log(Object.getOwnPropertyDescriptors(me));
console.log(Object.getOwnPropertyDescriptor(me));
console.log(me.hs);
console.log(Object.hasOwnProperty('name'));
