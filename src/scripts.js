import './css/base.scss';
import './images/turing-logo.png';
import './images/logo-2.png';
import './images/bg-img-4.png';
import { getAllPermanentPatrons,
  getSinglePermanentPatron,
  getAllRooms,
  getAllBookings,
  addNewVictIMeanClient,
  deleteSingleBookingAsIfThatWerePossbile } from './apiCalls';
import domManipulation from './dom-manipulation.js';
import RoomRepo from './classes/RoomRepo.js';
import Patron from './classes/User.js';

let roomRepo;
let patron;
let bookings;

window.addEventListener('load', instantiateRoomRepo);
domManipulation.submitLoginInfo.addEventListener('click', parseAllPatrons);
domManipulation.patronLoginButton.addEventListener('click', () => domManipulation.displayPatronLogin());

function parseAllPatrons() {
  getAllPermanentPatrons().then(patronsData => {
    parseSinglePatron(patronsData);
  })
}

function parseSinglePatron(patronsData) {
  const patronID = domManipulation.usernameField.value
  const checkOne = patronID.startsWith('customer');
  const checkTwo = parseInt(patronID.slice(8)) > 0;
  const checkThree = parseInt(patronID.slice(8)) <= 50;
  const checkFour = (domManipulation.passwordField.value === 'overlook2021')
  if (checkOne && checkTwo && checkThree && checkFour) {
    const idToGet = patronID.slice(8);
    console.log(idToGet);
    getSinglePermanentPatron(idToGet).then(singlePatronData => {
      domManipulation.displayPatronDashboard(singlePatronData)
      patron = new Patron(singlePatronData)
      console.log(roomRepo)
      roomRepo.findUserBookings(patron);
    });
  } else if (!checkOne || ! checkTwo || !checkThree){
    domManipulation.displayUsernameErrorMessage();
  } else {
    domManipulation.displayPasswordErrorMessage();
  }
}

function instantiateRoomRepo() {
  console.log('it fired')
  getAllBookings()
  .then(bookingsData => getAllRooms(bookingsData)
  .then(roomsData => roomRepo = new RoomRepo(roomsData, bookingsData)))
  // getBookings()
  // addVictim()
}

// function addVictim() {
//   addNewVictIMeanClient().then(data => console.log(data))
//   deleteBookingYeahRight()
// }

// function deleteBookingYeahRight() {
//   deleteSingleBookingAsIfThatWerePossbile().then(data => console.log(data))
// }
