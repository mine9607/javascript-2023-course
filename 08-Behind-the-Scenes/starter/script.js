'use strict';

function calcAge(birthyear) {
  const age = 2037 - birthyear;

  function printAge() {
    const output = `You are ${age}, born in ${birthyear}`;
    console.log(output);
  }

  const printName = () => {
    const print = `Your name is ${firstName}`;
    console.log(print);
  };

  printAge();
  printName();
  return age;
}

const firstName = 'Brian';
calcAge(1985);

console.log(age);
