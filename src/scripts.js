import './css/base.scss';
import './images/logo-2.png';
import './images/bg-img.png';
import './images/bg-img-4.png';
import './images/bg-img-3.png';
import './images/bg-img-2.png';
import './images/turing-logo.png';
import Patron from './classes/Patron.js';
import RoomRepo from './classes/RoomRepo.js';
import domManipulation from './dom-manipulation.js';
import {
  getAllPermanentPatrons,
  getSinglePermanentPatron,
  getAllRooms,
  getAllBookings,
  addNewVictIMeanClient,
  deleteSingleBookingAsIfThatWerePossbile
} from './apiCalls';

let rooms;
let roomRepo;
let filteredListItems;
let bookingStartDate;
let patron;

window.addEventListener('load', instantiateRoomRepo);
domManipulation.submitLoginInfo.addEventListener('click', parseAllPatrons);
domManipulation.checkAvailability.addEventListener('click', () => filterAvailableRooms__setupChecks());
domManipulation.patronLoginButton.addEventListener('click', () => domManipulation.displayPatronLogin());

function instantiateRoomRepo() {
  getAllBookings()
  .then(bookingsData => rooms = getAllRooms(bookingsData)
  .then(roomsData => roomRepo = new RoomRepo(roomsData, bookingsData)))
};

function parseAllPatrons() {
  getAllPermanentPatrons().then(patronsData => {
    parseSinglePatron__initiateChecks(patronsData);
  })
};

function parseSinglePatron__initiateChecks(patronsData) {
  roomRepo.findAllRoomBookings(patronsData);

  const patronID = domManipulation.usernameField.value;
  const checkBeginningChars = patronID.startsWith('customer');
  const checkEndNumsMin = parseInt(patronID.slice(8)) > 0;
  const checkEndNumsMax = parseInt(patronID.slice(8)) <= 50;
  const checkMinLength = patronID.length >= 9;
  const checkMaxLength = patronID.length < 11;
  const checkPassword = (domManipulation.passwordField.value === 'overlook2021');

  parseSinglePatron__checkInputFields(
    patronID,
    checkBeginningChars,
    checkEndNumsMin,
    checkEndNumsMax,
    checkMinLength,
    checkMaxLength,
    checkPassword
  )
};

function parseSinglePatron__checkInputFields(
  patronID,
  checkBeginningChars,
  checkEndNumsMin,
  checkEndNumsMax,
  checkMinLength,
  checkMaxLength,
  checkPassword
) {

  if (checkBeginningChars && checkEndNumsMin && checkEndNumsMax
    && checkMinLength && checkMaxLength && checkPassword) {
    const idToGet = patronID.slice(8);

    getSinglePermanentPatron(idToGet)
    .then(singlePatronData => {
      patron = new Patron(singlePatronData)
      patron.findPatronBookings(patron, roomRepo)
      domManipulation.displayPatronDashboard__displayTopCard(patron, roomRepo)
    })

  } else if (!checkBeginningChars || !checkEndNumsMin || !checkEndNumsMax
    || !checkMinLength || !checkMaxLength) {
    domManipulation.displayUsernameErrorMessage();

  } else {
    domManipulation.displayPasswordErrorMessage();
  }
};

function filterAvailableRooms__setupChecks() {
  bookingStartDate = document.getElementById('bookingStartDate');
  const filteredRoomsByType = [];

  filterAvailableRooms__checkFields(bookingStartDate, filteredRoomsByType);
};

function filterAvailableRooms__checkFields(bookingStartDate, filteredRoomsByType) {
  roomRepo.rooms.forEach(room => {
    filteredListItems.forEach(item => {
      const checkClassListValue = (item.classList.value === 'checked');
      const checkInnerText = (item.innerText.toLowerCase() === room.roomType);
      const checkBookedRoomDates = room.daysBookedFor.includes(bookingStartDate.value.split('-').join('/'));
      const checkForDateValue = !bookingStartDate.value;
      const checkForDuplicates = filteredRoomsByType.includes(room)

      if (!checkClassListValue || checkBookedRoomDates) {
        return

      } else if (checkClassListValue && checkInnerText && !checkBookedRoomDates
        && !checkForDateValue) {
          filteredRoomsByType.push(room);

      } else if (!checkClassListValue && !checkInnerText && !checkBookedRoomDates && !checkForDateValue) {
        filteredRoomsByType.push(room);

      }
    })
  })

  filterAvailableRooms__finalCheck(filteredRoomsByType)
};

function  filterAvailableRooms__finalCheck(filteredRoomsByType) {
  if (filteredRoomsByType.length > 0) {
    domManipulation.displayRoomsByType(filteredRoomsByType, patron);
  } else {
    domManipulation.displayErrorMessage();
  }
};

let scripts = {

  selectNewElements() {
    filteredListItems = document.querySelectorAll('#filteredListItem');
    filteredListItems.forEach(item => {
      item.addEventListener('click', () => domManipulation.toggleClassName(item, filteredListItems));
    })
  },

  makePOSTRequest() {
    let roomNumber = parseInt(event.target.closest('article').id)
    const newVictim = {
      userID: patron.id,
      date: bookingStartDate.value.split('-').join('/'),
      roomNumber: roomNumber
    }

    addNewVictIMeanClient(newVictim, patron)
    .then(data => patron = new Patron(data))
    .then(domManipulation.displayPatronDashboard__displayTopCard(patron, roomRepo));
  }
}

export default scripts;
