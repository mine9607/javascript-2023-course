'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

for (let i = 0; i < btnsOpenModal.length; i++) {
  console.log(btnsOpenModal[i].textContent);
}

//option 1 for opening and closing modal on click
// const openModal = () => {
//   document.querySelector('.modal').className = ' modal';
//   document.querySelector('.overlay').className = 'overlay';
// };
// const closeModal = () => {
//   document.querySelector('.modal').className = 'modal hidden';
//   document.querySelector('.overlay').className = 'overlay hidden';
// };

//option 2 for opening and closing modal on click
const openModal = () => {
  document.querySelector('.modal').classList.remove('hidden');
  document.querySelector('.overlay').classList.remove('hidden');
};
const closeModal = () => {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
};

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// const handleKeyPress = e => {
//   if (e.key === 'Escape') {
//     closeModal();
//   }
// };
