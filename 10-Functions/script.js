"use strict";

// const bookings = [];

// const createBooking = function (flightNum, numPassengers = 1, price = 199 * numPassengers) {
//   //set default values to prevent undefined - ES5
//   // (flightNum = flightNum || 1), (numPassengers = numPassengers ?? 0), (price = price || 0);

//   //ES6 default values are in the function args

//   //enhanced object literal = object key name is same as variable name
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };

//   console.log(booking);

//   bookings.push(booking);
// };

// createBooking("LH123");
// createBooking("LH123", 2, 800);
// createBooking("LH123", 2);
// createBooking("LH123", 3);
// createBooking("LH123", undefined);

// const flight = "LH234";
// const brian = {
//   name: "Brian Miner",
//   passport: 123456789,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = "LJ989";
//   passenger.name = "Mr. " + passenger.name;

//   if (passenger.passport === 123456789) {
//     // alert("check in");
//   } else {
//     // alert("wrong passport");
//   }
// };

// checkIn(flight, brian);
// console.log(flight);
// console.log(brian);

// //example showing that passing reference values (i.e. objects) to functions which perform mutations on the object properties will change the refernce object property

// const newPassport = function (person) {
//   person.passport = Math.random() * 91234567;
// };

// newPassport(brian);
// checkIn(flight, brian);

// // Functions Accepting Callback Functions (Higher Order Functions)

// const oneWord = function (str) {
//   return str.replace(/ /g, "").toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(" ");
//   return [first.toUpperCase(), ...others].join(" ");
// };
// //higher order function - takes in a function as an argument
// //similar to an interface - the function doesn't care how the tranformation happens - the detail has been abstracted away into other functions.
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by: ${fn.name}`);
// };

// transformer("JavaScript is the best!", upperFirstWord);
// transformer("JavaScript is the best!", oneWord);

// // Functions Returning Functions
// // const greet = function (greeting) {
// //   return function (name) {
// //     console.log(`${greeting} ${name}`);
// //   };
// // };

// // const greeterHey = greet("hey");

// // greeterHey("Brian");

// // greet("HI!!!")("Angela");

// //rewrite using only arrow functions
// const greet = (greeting) => (name) => console.log(`${greeting} ${name}`);

// greet("sup")("Man");

// const lufthansa = {
//   airline: "Lufthansa",
//   iataCode: "LH",
//   bookings: [],
//   //book: function(){}
//   book(flightNum, name) {
//     console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// lufthansa.book(239, "Brian Miner");
// lufthansa.book(635, "Brian Miner");
// console.log(lufthansa);

// const eurowings = {
//   airline: "Eurowings",
//   iataCode: "EW",
//   bookings: [],
// };

// const book = lufthansa.book;
// //Note this will not work because now the book function is just a regular function call and the this property of a regular function call resolves to undefined
// // book(23, "Sara Williams");

// //We need to tell JavaScript that the "this" keyword should point to either Lufthansa or to Eurowings --- here's how using function methods: call, apply, bind

// book.call(eurowings, 23, "Sara Williams");
// console.log(eurowings);
// book.call(lufthansa, 23, "Mary Williams");
// console.log(lufthansa);

// const swiss = {
//   airline: "Swiss Airlines",
//   iataCode: "LX",
//   bookings: [],
// };

// book.call(swiss, 456, "Brian Miner");
// console.log(swiss);

// //Apply method - does not recieve a list of objects but insted an array of arguments

// book.apply(swiss, [333, "Sam Smith"]);
// console.log(swiss);

// const flightData = [687, "Tony Tomlin"];
// book.call(swiss, ...flightData);
// console.log(swiss);

// //Bind Method
// //book.call(eurowings, 23, "Sara Williams")

// const bookEW = book.bind(eurowings);
// bookEW(231, "Steve Williams");
// console.log(eurowings);

// //Note the bind method can also take arguments that locks in those function arguments so they are alwasys called

// const bookEW23 = book.bind(eurowings, 23);
// bookEW23("Brian Jefferson");
// console.log(eurowings);

// // With Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;

//   console.log(this.planes);
// };

// //note - remember that the "this" keyword of event listeners points to the DOM object it is attached to so lufthansa.buyPlane must be bound to the lufthansa object to access the lufthansa.planes property value and increment by 1
// document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// // Partial application - we can preset params

// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// //we need to set the first arg = null because we do not care about setting the "this" keyword, only the first parameter value
// const addVAT = addTax.bind(null, 0.23);
// console.log(addVAT(100));

// //Rewrite using higher order functions
// const addVAT_v2 = function (VAT) {
//   return function (value) {
//     console.log(value + value * VAT);
//   };
// };

// addVAT_v2(0.23)(100);

// //rewrite higher order function as arrow function
// const addVATArr = (VAT) => (value) => console.log(value + value * VAT);
// addVATArr(0.23)(50);

///////////////////////////////////////
// Coding Challenge #1

//1.1

const answers = [0, 0, 0, 0];

const poll = {
  registerNewAnswer: function () {
    const answer = +prompt(
      "What is your favorite programming language?\n0: JavaScript\n1: Python\n2: Rust\n3: C++\n(Write option number)"
    );

    if (typeof answer === "number" && answer >= 0 && answer <= 3) {
      answers[answer]++;
    } else {
      alert("Not a valid answer: Please enter a number between 0 and 3");
    }
    this.displayResults();
    this.displayResults("string");
  },
  displayResults: function (type = "array") {
    if (type === "array") {
      console.log(answers);
    } else if (type === "string") {
      console.log(`Poll Results are: ${answers.join(", ")}`);
    } else {
      alert("Input type to displayResults method invald");
    }
  },
};

//Step 2 - Call the poll method on click
document.querySelector(".poll").addEventListener("click", poll.registerNewAnswer.bind(poll));

//Step 3 -

// Let's build a simple poll app!

// A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

// Here are your tasks:

// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
//   1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
//         What is your favourite programming language?
//         0: JavaScript
//         1: Python
//         2: Rust
//         3: C++
//         (Write option number)

//   1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

// HINT: Use many of the tools you learned about in this and the last section 😉

// BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

// GOOD LUCK 😀

const runOnce = function () {
  console.log("This will never run again");
};
// runOnce();

// IIFE Immediately invoked expression note that it is wrapped in () and then called using ();
(function () {
  console.log("This will never run again");
  const isPrivate = 23;
})();

(() => console.log("ANother function to run only once"))();

//Testing a closure - SUCCESS
const createFunction = function () {
  let name = "Sara";
  let age = 24;
  console.log(`Name: ${name} Age: ${age}`);
  return function () {
    name = prompt("What is the new name:") || name;
    age++;
    console.log(`Name: ${name} Age: ${age}`);
  };
};

const setName = createFunction();
// setName();
// setName();
// setName();

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups each with ${perGroup} passengers`);
    console.log(perGroup);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

//proving that closures take priority over the scope chain we assign the perGroup variable to be 1000 and notice that after the callback function of the setTimeout is executed the logged the per group is still shown to use the perGroup value defined in the closure (n/3)
const perGroup = 1000;
boardPassengers(180, 3);
console.log(perGroup);

// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();
