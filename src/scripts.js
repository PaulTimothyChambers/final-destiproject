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
  addNewVictIMeanClient
}
from './apiCalls';

let filteredListItems;
let bookingStartDate;
const bookingsSampleData = {
  bookings: [
    {
      "id":"5fwrgu4i7k55hl6sz",
      "userID":3,
      "date":"2020/04/22",
      "roomNumber":15,
      "roomServiceCharges":[]
    },
    {
      "id":"5fwrgu4i7k55hl6t5",
      "userID":43,
      "date":"2020/01/24",
      "roomNumber":24,
      "roomServiceCharges":[]
    },
    {
      "id":"5fwrgu4i7k55hl6t6",
      "userID":13,
      "date":"2020/01/10",
      "roomNumber":12,
      "roomServiceCharges":[]
    },
    {
      "id":"5fwrgu4i7k55hl6t7",
      "userID":20,
      "date":"2020/02/16",
      "roomNumber":7,
      "roomServiceCharges":[]
    },
    {
      "id":"5fwrgu4i7k55hl6t8",
      "userID":1,
      "date":"2020/02/05",
      "roomNumber":1,
      "roomServiceCharges":[]
    },
    {
      "id":"5fwrgu4i7k55hl6t9",
      "userID":38,
      "date":"2020/02/14",
      "roomNumber":14,
      "roomServiceCharges":[]
    },
    {
      "id":"5fwrgu4i7k55hl6ta",
      "userID":25,
      "date":"2020/01/11",
      "roomNumber":1,
      "roomServiceCharges":[]
    },
    {
      "id":"5fwrgu4i7k55hl6tb",
      "userID":49,
      "date":"2020/02/06",
      "roomNumber":5,
      "roomServiceCharges":[]
    },
    {
      "id":"5fwrgu4i7k55hl6tc",
      "userID":3,
      "date":"2020/01/30",
      "roomNumber":13,
      "roomServiceCharges":[]
    },{
      "id":"5fwrgu4i7k55hl6td",
      "userID":27,
      "date":"2020/01/31",
      "roomNumber":20,
      "roomServiceCharges":[]
    },{
      "id":"5fwrgu4i7k55hl6te",
      "userID":3,
      "date":"2022/01/19",
      "roomNumber":8,
      "roomServiceCharges":[]
    }
  ]
}

const roomsSampleData = {
  rooms: [
    {
      "number":15,
      "roomType":"residential suite",
      "bidet":true,
      "bedSize":"queen",
      "numBeds":1,
      "costPerNight":358.4
    },
    {
      "number":2,
      "roomType":"suite",
      "bidet":false,
      "bedSize":"full",
      "numBeds":2,
      "costPerNight":477.38
    },
    {
      "number":13,
      "roomType":"single room",
      "bidet":false,
      "bedSize":"king",
      "numBeds":1,
      "costPerNight":491.14
    },
    {
      "number":4,
      "roomType":"single room",
      "bidet":false,
      "bedSize":"queen",
      "numBeds":1,
      "costPerNight":429.44
    },
    {
      "number":8,
      "roomType":"single room",
      "bidet":true,
      "bedSize":"queen",
      "numBeds":2,
      "costPerNight":340.17
    }
  ]
}
const roomRepo = new RoomRepo(roomsSampleData, bookingsSampleData)
roomRepo.findAllRoomBookings(roomRepo)
const patron = new Patron(3, "Kelvin Schiller")
const newBookingButton = document.getElementById('newBookingButton');



// window.addEventListener('load', instantiateRoomRepo);
// domManipulation.submitLoginInfo.addEventListener('click', parseAllPatrons);
domManipulation.checkAvailability.addEventListener('click', () => scripts.selectNewElements());
// domManipulation.patronLoginButton.addEventListener('click', () => domManipulation.displayPatronLogin());
newBookingButton.addEventListener('click', () => domManipulation.displayNewBookingView__switchView())
function instantiateRoomRepo() {
  getAllBookings().then(bookingsData => {
    getRooms(bookingsData);
  })
};

function getRooms(bookingsData) {
  getAllRooms().then(roomsData => {
    roomRepo = new RoomRepo(roomsData, bookingsData);
  })
};

function parseAllPatrons() {
  getAllPermanentPatrons()
  .then(patronsData => {
    roomRepo.findAllRoomBookings();
    if (patron === undefined) {
      parseSinglePatron__initiateChecks(patronsData);
    } else {
      const idToGet = patron.id
      parseSinglePatron(idToGet)
    }
  })
};

function parseSinglePatron__initiateChecks(patronsData) {
  if (!domManipulation.usernameField.value) {
    return;
  } else {
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
  }
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
    parseSinglePatron(idToGet)

  } else if (!checkBeginningChars || !checkEndNumsMin || !checkEndNumsMax
    || !checkMinLength || !checkMaxLength) {
    domManipulation.displayUsernameErrorMessage();

  } else {
    domManipulation.displayPasswordErrorMessage();
  }
};

function parseSinglePatron(idToGet) {
  getSinglePermanentPatron(idToGet)
  .then(singlePatronData => {
    patron = new Patron(singlePatronData);
    patron.findPatronBookings(roomRepo);
  })
};

function filterAvailableRooms__checkDate() {
  let filteredRoomsByType = [];
  bookingStartDate = document.getElementById('bookingStartDate');

  roomRepo.rooms.forEach(room => {
    const checkBookedRoomDates = room.daysBookedFor.includes(bookingStartDate.value.split('-').join('/'));
    const checkForDateValue = (bookingStartDate.value === '');
    if (checkForDateValue || checkBookedRoomDates) {
      console.log('first')
      domManipulation.displayDateUndefinedMessage()
      return

    } else if (!checkBookedRoomDates && !checkForDateValue) {
      console.log('here')
      filteredRoomsByType.push(room);
    }
  })
  filterAvailableRooms__checkFilters(filteredRoomsByType);
};

function filterAvailableRooms__checkFilters(filteredRoomsByType) {
  filteredListItems.forEach(item => {
    const checkClassListValue = (item.classList.value === 'checked');

    if (checkClassListValue) {
      filteredRoomsByType = roomRepo.rooms.filter(room => {
        return room.roomType === item.innerText.toLowerCase()
      })

    } else if (filteredRoomsByType.length > 0) {
      domManipulation.displayRoomsByType(filteredRoomsByType, patron)

    } else {
      domManipulation.displayErrorMessage()
    }
  })
};

let scripts = {
  selectNewElements() {
    filteredListItems = document.querySelectorAll('#filteredListItem');
    filteredListItems.forEach(item => {
      item.addEventListener('click', () => domManipulation.toggleClassName(item, filteredListItems));
    })
    filterAvailableRooms__checkDate()
  },

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
      domManipulation.displayPatronDashboard__changeView(patron, roomRepo)
    });
  }
}

export default scripts;
