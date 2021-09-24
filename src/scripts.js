import './css/base.scss';
import './images/turing-logo.png';
import './images/logo-2.png';
import './images/bg-img-4.png';
import apiCalls from './apiCalls';
import domManipulation from './dom-manipulation.js';
import RoomRepo from './classes/RoomRepo.js';

window.addEventListener('load', getAllRooms);
domManipulation.submitLogin.addEventListener('click', displayPatronDashboard);
domManipulation.guestLoginButton.addEventListener('click', () => getSinglePatron());

function getAllPatrons() {
  getAllPermanentPatrons().then(data => console.log(data));
  // getSinglePatron()
  // may need to put these invocations inside the .then
}

function getSinglePatron() {
  // need Users class holding id's and names + method to iterate through users
  // and return an array of their id's concatenated with 'customer' (customer${id})...call that method here
  const patronID = domManipulation.usernameField.value
  getSinglePermanentPatron(patronID).then(data => console.log(data));
  domManipulation.displayPatronLogin()
  // getRooms()
}

function getAllRooms() {
  getAllRooms().then(roomsData => {
    roomRepo = new RoomRepo(roomsData);
  })
  // getBookings()
}

function getAllBookings() {
  getAllBookings().then(data => console.log(data));
  // addVictim()
}

// function addVictim() {
//   addNewVictIMeanClient().then(data => console.log(data))
//   deleteBookingYeahRight()
// }

// function deleteBookingYeahRight() {
//   deleteSingleBookingAsIfThatWerePossbile().then(data => console.log(data))
// }
