"use strict";

const bookings = [];

const createBooking = function (flightNum, numPassengers = 1, price = 199 * numPassengers) {
  //set default values to prevent undefined - ES5
  // (flightNum = flightNum || 1), (numPassengers = numPassengers ?? 0), (price = price || 0);

  //ES6 default values are in the function args

  //enhanced object literal = object key name is same as variable name
  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);

  bookings.push(booking);
};

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 2);
createBooking("LH123", 3);
createBooking("LH123", undefined);

const flight = "LH234";
const brian = {
  name: "Brian Miner",
  passport: 123456789,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LJ989";
  passenger.name = "Mr. " + passenger.name;

  if (passenger.passport === 123456789) {
    // alert("check in");
  } else {
    // alert("wrong passport");
  }
};

checkIn(flight, brian);
console.log(flight);
console.log(brian);

//example showing that passing reference values (i.e. objects) to functions which perform mutations on the object properties will change the refernce object property

const newPassport = function (person) {
  person.passport = Math.random() * 91234567;
};

newPassport(brian);
checkIn(flight, brian);

// Functions Accepting Callback Functions (Higher Order Functions)

const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};
//higher order function - takes in a function as an argument
//similar to an interface - the function doesn't care how the tranformation happens - the detail has been abstracted away into other functions.
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer("JavaScript is the best!", upperFirstWord);
transformer("JavaScript is the best!", oneWord);

// Functions Returning Functions
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet("hey");

// greeterHey("Brian");

// greet("HI!!!")("Angela");

//rewrite using only arrow functions
const greet = (greeting) => (name) => console.log(`${greeting} ${name}`);

greet("sup")("Man");

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  //book: function(){}
  book(flightNum, name) {
    console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, "Brian Miner");
lufthansa.book(635, "Brian Miner");
console.log(lufthansa);

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book;
//Note this will not work because now the book function is just a regular function call and the this property of a regular function call resolves to undefined
// book(23, "Sara Williams");

//We need to tell JavaScript that the "this" keyword should point to either Lufthansa or to Eurowings --- here's how using function methods: call, apply, bind

book.call(eurowings, 23, "Sara Williams");
console.log(eurowings);
book.call(lufthansa, 23, "Mary Williams");
console.log(lufthansa);

const swiss = {
  airline: "Swiss Airlines",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 456, "Brian Miner");
console.log(swiss);

//Apply method - does not recieve a list of objects but insted an array of arguments

book.apply(swiss, [333, "Sam Smith"]);
console.log(swiss);

const flightData = [687, "Tony Tomlin"];
book.call(swiss, ...flightData);
console.log(swiss);

//Bind Method
//book.call(eurowings, 23, "Sara Williams")

const bookEW = book.bind(eurowings);
bookEW(231, "Steve Williams");
console.log(eurowings);

//Note the bind method can also take arguments that locks in those function arguments so they are alwasys called

const bookEW23 = book.bind(eurowings, 23);
bookEW23("Brian Jefferson");
console.log(eurowings);

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;

  console.log(this.planes);
};

//note - remember that the "this" keyword of event listeners points to the DOM object it is attached to so lufthansa.buyPlane must be bound to the lufthansa object to access the lufthansa.planes property value and increment by 1
document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// Partial application - we can preset params

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//we need to set the first arg = null because we do not care about setting the "this" keyword, only the first parameter value
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

//Rewrite using higher order functions
const addVAT_v2 = function (VAT) {
  return function (value) {
    console.log(value + value * VAT);
  };
};

addVAT_v2(0.23)(100);

//rewrite higher order function as arrow function

const addVATArr = (VAT) => (value) => console.log(value + value * VAT);
addVATArr(0.23)(50);
