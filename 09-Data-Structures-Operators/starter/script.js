'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  restName: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderDelivery({ startIndex, mainIndex, time, address }) {
    console.log(
      `Order received!: ${this.starterMenu[startIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your pasta with: ${ing1}, ${ing2} and ${ing3}.`);
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(
      `Order received!: \nMain: ${mainIngredient}, \nOther Stuff: ${otherIngredients}`
    );
  },
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sol - 21',
  mainIndex: 2,
  startIndex: 2,
});

//destructuring objects
const { restName, openingHours, categories } = restaurant;
console.log(restName, openingHours, categories);

//reassign variable names of destructured objects
const {
  restName: foodPlace,
  openingHours: hours,
  categories: foodTypes,
} = restaurant;
console.log(foodPlace, hours, foodTypes);

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//destructuring arrays
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

//Mutating Variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
//note the wrapping in parenthesis is crucial
// ({ a, b } = obj);
// console.log(a, b);

//nested objects
const { fri } = openingHours;
console.log(fri); // {open: 11, close: 23}
//destructuring nested object with variable reassignment
const {
  fri: { open: o, close },
} = openingHours;
console.log(o, close); // 11 23

// switching variables
// const tmp = main;
// main = secondary;
// secondary = tmp;
// console.log(main, secondary);

// [main, secondary] = [secondary, main];
// console.log(main, secondary);

//Receive two return values from a function
// const [starter, mainCourse] = restaurant.order(1, 0);
// console.log(mainCourse, starter);

//function returns only an array
// function orderFood(index1, index2) {
//   const mainFood = restaurant.mainMenu[index1];
//   const startFood = restaurant.starterMenu[index2];

//   return [mainFood, startFood];
// }

// console.log(orderFood(1, 2));

//nested arrays
// const nested = [2, 4, [5, 6]];

// const [first, , third] = nested;
// console.log(first, third);

//nested destructuring
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

//set default values as destructuring (useful in cases where we don't know the length of array)

// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);

const arr = ['brian', 38, 'Tulsa'];

const newArr = ['USA', ...arr];
console.log(newArr);

const newArr2 = [...newArr, 'Bambu', 3];
console.log(newArr2);

const [a = 1, b = 1, c = 1, d = 1, e = 1, f = 1, g = 1, h = 1] = [...newArr2];
console.log(a, b, c, d, e, f, g, h);

const newMenu = [...restaurant.mainMenu, 'Gnocchi'];

//copy array - shallow copy
const mainMenuCopy = [...restaurant.mainMenu];

//array merge
const wholeMenu = [...restaurant.starterMenu, ...mainMenuCopy];
console.log(wholeMenu);

//Spread an object
const Brian = { ...restaurant };
console.log(Brian);

//Spread a string
const myName = 'Brian';
const letters = [...myName, '', 'M.'];
console.log(letters);
console.log(...myName);

//Using spread to pass arguments to function
// const ingredients = [
//   prompt(`Let\'s make pasta!  Ingredient 1?`),
//   prompt(`Let\'s make pasta!  Ingredient 2?`),
//   prompt(`Let\'s make pasta!  Ingredient 3?`),
// ];
// console.log(ingredients);
// restaurant.orderPasta(...ingredients);

//SPREAD because on RIGHT side of asignment operator(=)
const arr1 = [1, 2, ...[3, 4]];

//REST because on LEFT side of assignment operator (=)
const [one, two, ...others] = [1, 2, 3, 4, 5];
console.log(one, two, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

console.log(pizza, risotto, otherFood);

//REST on objects
const { sat, ...weekdays } = openingHours;
console.log(sat, weekdays);

//REST with functions
const add = (...args) => {
  //note - we want to be able to pass an arbitrary number of arguments to the add function
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum += args[i];
  }
  console.log(sum);
  return sum;
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

//passing individual args to function
restaurant.orderPizza('mushrooms', 'onions', 'bell-pepper', 'cilantro');
//passing a spread array as argument to function
const toppings = ['BBQ', 'mozzarella', 'red onion', 'chicken', 'hot-sauce'];
restaurant.orderPizza(...toppings);

//short circuiting ||
console.log(0 || 'Brian');
console.log(0 || undefined || 'Brian');

//short circuit &&
console.log(0 && 'Brian');
console.log(3 && 7);
console.log(3 && 0 && 7);

//nullish coaslescing operator ??
restaurant.guests = 0;
//only treats null and undefined as falsey to allow 0 to be used
const guestCorrect = restaurant.guests ?? 10;
console.log(guestCorrect);

const rest1 = {
  name: 'Capri',
  numGuests: 20,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Gio',
};
const rest3 = {
  name: 'La La',
  owner: 'Sam',
};
const rest4 = {
  name: 'Hey',
  owner: 'George',
};

rest1.numGuests = rest1.numGuests || 10;
console.log(rest1);
rest2.numGuests = rest2.numGuests || 10;
console.log(rest2);

//Or assignment operator ||=  (treats 0 as falsey and assigns next value)
rest3.numGuest = 0;
rest3.numGuest ||= 15;
console.log(rest3);

//Nullish assignment operator (allows the value to be 0)
rest4.numGuest = 0;
rest4.numGuest ??= 20;
console.log(rest4);

//Optional Chaining (?.)
//when receiving data from an API we often won't know if data is defined or not so we can use the optional chaining to accept the data if it exists and return nothing if it doesn't.

const me = {
  name: 'Brian',
  age: '38',
};

//causes error because location doesn't exist so city cannot exit
// console.log(me.location.city);
console.log(me?.location?.city);

console.log(restaurant);
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
console.log(restaurant.openingHours);
console.log(restaurant.openingHours.thu);
console.log(restaurant.openingHours.thu.open);

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day} we open at ${open}`);
}

console.log(restaurant.order?.(1, 2) ?? "Method doesn't exist");
console.log(restaurant.orderDessert?.(1, 2) ?? "Method doesn't exist");

console.log('-----Practice-------');
const values = Object.values(openingHours);
console.log(values);
const entries = Object.entries(openingHours);
for (const entry of entries) {
  console.log(entry);
}
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we are open at ${open} and close at ${close}`);
}

console.log('-----Practice-------');
//SETS
const ordersSet = new Set(['Pizza', 4, 'Pasta', 'Risotto', 'Pasta', 'Pizza']);
console.log(ordersSet);
console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));

const testArray = ['Pizza', 4, 'Pasta', 'Risotto', 'Pasta', 'Pizza'];
console.log(testArray);
const testSet = [...new Set(testArray)];
console.log(testSet);

//MAPS
//create a new empty map
const rest = new Map();
// console.log(rest);

//fill the map using the .set method
rest.set('name', 'Classico Italiano');
// console.log(rest);
rest.set(1, 'Firenze, Italy');
// console.log(rest);
rest.set(2, 'Lisbon, Portugal');
// console.log(rest);

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

console.log(rest);

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(false));

const time = 23;

console.log(rest.get(time < 11));

rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);

//create a new map without using set - useful for when lots of values

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try Again'],
]);

console.log(question);

//Convert an object to a Map
const openHoursMap = new Map(Object.entries(openingHours));

//Convert a Map to an array
const questionArray = [...question];
console.log(questionArray);
console.log([...question.entries()]);
console.log([...question.keys()]);
console.log([...question.values()]);

console.log(openHoursMap);

//loop over a map
console.log(question.get('question'));
//destructure each key : value pair in the question map
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`${key} : ${value}`);
  }
}
