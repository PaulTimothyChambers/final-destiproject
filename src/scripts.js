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
  const patronID = domManipulation.usernameField.value;
  const checkOne = patronID.startsWith('customer');
  const checkTwo = parseInt(patronID.slice(8)) > 0;
  const checkThree = parseInt(patronID.slice(8)) <= 50;
  const checkFour = patronID.length >= 9;
  const checkFive = patronID.length < 11;
  const checkSix = (domManipulation.passwordField.value === 'overlook2021')
  if (checkOne && checkTwo && checkThree && checkFour && checkFive && checkSix) {
    const idToGet = patronID.slice(8);
    getSinglePermanentPatron(idToGet)
    .then(singlePatronData => {
      patron = new Patron(singlePatronData)
      roomRepo.findPatronBookings(patron)
      domManipulation.displayPatronDashboard(patron, roomRepo)
    })
  } else if (!checkOne || !checkTwo || !checkThree || !checkFour || !checkFive){
    domManipulation.displayUsernameErrorMessage();
  } else {
    domManipulation.displayPasswordErrorMessage();
  }
}

function getRoomByType() {

}

function instantiateRoomRepo() {
  getAllBookings()
  .then(bookingsData => getAllRooms(bookingsData)
  .then(roomsData => roomRepo = new RoomRepo(roomsData, bookingsData)))
}
