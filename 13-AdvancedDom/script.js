'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// [...btnsOpenModal].map(btn => btn.addEventListener('click', openModal));
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Learning
// Selecting DOM Elements
console.log('---Selecting DOM Elements---');
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

console.log(document.querySelector('p'));
console.log(document.querySelectorAll('a'));

console.log(document.querySelectorAll('.nav--link'));

const allButtons = document.querySelectorAll('button');
const allbtns = document.getElementsByTagName('button');

console.log(allButtons);
console.log(allbtns);

[...allButtons].map(button => console.log('allButtons click'));
[...allbtns].map(button => console.log('allbtns click'));

console.log(document.getElementsByTagName('button'));
console.log(document.querySelectorAll('button'));

// Creating DOM Elements
console.log('---Creating DOM Elements---');
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// add text content to an element
// message.textContent('We use cookies for improved functionality and analytics.');

// add text content and html that will be inserted to the DOM
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// Append message to header
const header = document.querySelector('.header');
// header.prepend(message);
header.append(message);
// note - the element is live and so append moved it from the first element in the header to the last element in the header

// to add multiple nodes we first need to clone the node element
// header.append(message.cloneNode(true));

// Insert as a sibling of header (i.e. before or after the header element)
// header.before(message);
// header.after(message);

// Deleting DOM Elements
console.log('---Deleting DOM Elements---');
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());
