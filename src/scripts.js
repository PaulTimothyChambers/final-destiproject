import './css/base.scss';
import './images/logo-2.png';
import './images/bg-img.png';
import './images/bg-img-4.png';
import './images/bg-img-3.png';
import './images/bg-img-2.png';
import './images/turing-logo.png';
import './images/patron-4.png';
import Patron from './classes/Patron.js';
import RoomRepo from './classes/RoomRepo.js';
import domManipulation from './dom-manipulation.js';
import {
  getAllPermanentPatrons,
  getSinglePermanentPatron,
  getAllRooms,
  getAllBookings,
  addNewVictIMeanClient
}
from './apiCalls';

let roomRepo;
let filteredListItems;
let bookingStartDate;
let patron;

window.addEventListener('load', instantiateRoomRepo);
patronLoginButton.addEventListener('click', () => domManipulation.displayPatronLogin());
submitLoginInfo.addEventListener('click', initiateChecks);
checkAvailability.addEventListener('click', checkDate);
confirmButton.addEventListener('click', () => domManipulation.changeView(patron))

function instantiateRoomRepo() {
  getAllBookings().then(bookingsData => {
    getRooms(bookingsData);
  })
};

function getRooms(bookingsData) {
  getAllRooms().then(roomsData => {
    roomRepo = new RoomRepo(roomsData, bookingsData);
    roomRepo.findAllRoomBookings()
  })
};

function initiateChecks() {
  if (!usernameField.value) {
    return;

  } else {
    const patronID = usernameField.value;
    const checkBeginningChars = patronID.startsWith('customer');
    const checkEndNumsMin = parseInt(patronID.slice(8)) > 0;
    const checkEndNumsMax = parseInt(patronID.slice(8)) <= 50;
    const checkMinLength = patronID.length >= 9;
    const checkMaxLength = patronID.length < 11;
    const checkPassword = passwordField.value === 'overlook2021';

    checkInputFields(patronID, checkBeginningChars, checkEndNumsMin, checkEndNumsMax, checkMinLength, checkMaxLength, checkPassword)
  }
};

function checkInputFields(patronID, checkBeginningChars, checkEndNumsMin, checkEndNumsMax, checkMinLength, checkMaxLength, checkPassword) {
  if (checkBeginningChars && checkEndNumsMin && checkEndNumsMax && checkMinLength && checkMaxLength && checkPassword) {
      const idToGet = patronID.slice(8);
      parseSinglePatron(idToGet)

  } else if (!checkBeginningChars || !checkEndNumsMin || !checkEndNumsMax || !checkMinLength || !checkMaxLength) {
      domManipulation.displayUsernameErrorMessage();

  } else {
    domManipulation.displayPasswordErrorMessage();
  }
};

function parseSinglePatron(idToGet) {
  getSinglePermanentPatron(idToGet).then(singlePatronData => {
    patron = new Patron(singlePatronData);
    patron.findPatronBookings(roomRepo);
    domManipulation.displayTopCard(patron, roomRepo)
  })
};

function checkDate() {
  let roomsFromFirstCheck = [];
  bookingStartDate = document.getElementById('bookingStartDate');

  roomRepo.rooms.forEach(room => {
    const checkBookedRoomDates = room.daysBookedFor.includes(bookingStartDate.value.split('-').join('/'));
    const checkForDateValue = (bookingStartDate.value === '');
    if (checkForDateValue) {
      domManipulation.displayDateUndefinedMessage()
    } else if (!checkBookedRoomDates && !checkForDateValue) {
      roomsFromFirstCheck.push(room);
    }
  })

  if (roomsFromFirstCheck.length) {
    checkFilters(roomsFromFirstCheck);
  } else {
    domManipulation.displayNoAvailableBookingsMessage()
  }
};

function checkFilters(roomsFromFirstCheck) {
  let roomsFromSecondCheck = [];

  const selectedTag = Object.keys(filteredListItems).map(item => {
    if (filteredListItems[item].classList.value === 'checked') {
      return filteredListItems[item].innerText.toLowerCase()
    }
  }).find(ele => ele !== undefined)

  const matchTagsAndDates = roomRepo.rooms.forEach(room => {
    if (room.roomType === selectedTag) {
      roomsFromSecondCheck.push(room);
    }
  })

  if (roomsFromSecondCheck.length) {
    const roomsFullyFiltered = [];

    roomsFromSecondCheck.forEach(roomByTag => {
      roomsFromFirstCheck.forEach(roomByDate => {
        if (roomByTag === roomByDate) {
          roomsFullyFiltered.push(roomByTag)
        }
      })
    })
    domManipulation.displayRoomsByType(roomsFullyFiltered)

  } else {
    domManipulation.displayRoomsByType(roomsFromFirstCheck)
  }
};

function makePOSTRequest() {
  const roomNumber = parseInt(event.target.closest('article').id)
  const newVictim = {
    userID: patron.id,
    date: bookingStartDate.value.split('-').join('/'),
    roomNumber: roomNumber
  }

  addNewVictIMeanClient(newVictim, patron)
  .then(data => {
    patron.upcoming.push(data.newBooking)
    patron.findPatronBookings(roomRepo)
    domManipulation.changeView(patron)
  });
};

let scripts = {
  makePOSTRequest() {
    const roomNumber = parseInt(event.target.closest('article').id)
    const newVictim = {
      userID: patron.id,
      date: bookingStartDate.value.split('-').join('/'),
      roomNumber: roomNumber
    }

    addNewVictIMeanClient(newVictim, patron)
    .then(data => {
      patron.upcoming.push(data.newBooking)
      patron.findPatronBookings(roomRepo)
      domManipulation.changeView(patron)
    })
  },

  selectNewElements() {
    filteredListItems = document.querySelectorAll('#filteredListItem');
    filteredListItems.forEach(item => {
      item.addEventListener('click', () => domManipulation.toggleClassName(item, filteredListItems));
    })
  }
}

export default scripts;
