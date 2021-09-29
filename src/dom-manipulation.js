import scripts from './scripts.js';

const patronLoginButton = document.getElementById('patronLoginButton');
const usernameFieldLabel = document.getElementById('usernameFieldLabel');
const passwordFieldLabel = document.getElementById('passwordFieldLabel');
const usernameField = document.getElementById('usernameField');
const passwordField = document.getElementById('passwordField');
const submitLoginInfo = document.getElementById('submitLoginInfo');
const topCard = document.getElementById('topCard');
const leftCard = document.getElementById('leftCard');
const rightCard = document.getElementById('rightCard');
const bottomCard = document.getElementById('bottomCard');
const chooseBookingOptions = document.getElementById('chooseBookingOptions');
const main = document.getElementById('main');
const availableRooms = document.getElementById('availableRooms');
const calendar = document.getElementById('calendar');
const filtered = document.getElementById('filtered');

let newBookingButton;
let filteredListItemA;
let filteredListItemB;
let filteredListItemC;
let filteredListItemD;
let bookingStartDate;

let domManipulation = {

  displayPatronDashboard(patron, roomRepo) {
    domManipulation.hidePatronLoginFields();
    topCard.innerHTML = `
      <article class="welcome">
        <img class="welcome-image" src="./images/welcome-image.png" alt="">
        <p class="welcome-message">Welcome ${patron.name}</p>
        <button class="new-booking-button" id="newBookingButton">Make "New" Booking<a class="wink-wink">*wink* *wink*</a></button>
      </article>`;

    newBookingButton = document.getElementById('newBookingButton');
    newBookingButton.addEventListener('click', () => domManipulation.displayNewBookingView());

    leftCard.innerHTML = '<p class="outer-text">My Past <a class="inner-text">(yet present, cause I\'m still here)</a> Bookings:</p>'
    patron.bookings.forEach(booking => {
      leftCard.innerHTML += `
        <p>Date: ${booking.date}</p>
        <p>Room: ${booking.roomNumber}</p>`;
    })

    // rightCard.innerHTML =

    bottomCard.innerHTML = `
      <article class="cost-assessment">
        <p class="total-cost">Total Social Clout:</p>
        <p class="cost">${patron.findTotalCostOfRooms(roomRepo)}</p>
        <p class="level">Patron LVL: 8</p>
      </article>`;
  },

  displayNewBookingView() {
    domManipulation.hide(main);
    domManipulation.show(chooseBookingOptions);

    calendar.innerHTML = `
      <label for="bookingStartDate">Start Date:</label>
      <input type="date" id="bookingStartDate" name="booking start date" value="${dayjs().format('YYYY-MM-DD')}" min="${dayjs().format('YYYY-MM-DD')}">`;
    bookingStartDate = document.getElementById('bookingStartDate');
    let dateSelected = event.target.value
    bookingStartDate.addEventListener('focus', () => scripts.checkDate(dateSelected));

    filtered.innerHTML = `
      <ul>
        <li><a href="#">Filter By Room Type</a>
          <ul class="dropdown">
            <li id="filteredListItemA"><a href="#">Single Room</a></li>
            <li id="filteredListItemB"><a href="#">Suite</a></li>
            <li id="filteredListItemC"><a href="#">Junior Suite</a></li>
            <li id="filteredListItemD"><a href="#">Residential Suite</a></li>
          </ul>
        </li>
      </ul>`

    filteredListItemA = document.getElementById('filteredListItemA');
    filteredListItemA.addEventListener('click', () => scripts.filterAvailableRooms('Single Room'));
    filteredListItemB = document.getElementById('filteredListItemB');
    filteredListItemB.addEventListener('click', () => scripts.filterAvailableRooms('Suite'));
    filteredListItemC = document.getElementById('filteredListItemC');
    filteredListItemC.addEventListener('click', () => scripts.filterAvailableRooms('Junior Suite'));
    filteredListItemD = document.getElementById('filteredListItemD');
    filteredListItemD.addEventListener('click', () => scripts.filterAvailableRooms('Residential Suite'));
  },

  displayRoomsByType(filteredRoomsByType) {
    availableRooms.innerHTML = '';
    filteredRoomsByType.forEach(room => {
      availableRooms.innerHTML += `
        <article tabindex="0" role="button" class="available-rooms-card" id=${room.number}>
          <p class="available-rooms-card__bed-size">Bed Size: ${room.bedSize}</p>
          <p class="available-rooms-card__number-of-beds">Number of Beds: ${room.numBeds}</p>
          <p class="available-rooms-card__cost">Cost Per Night: ${room.costPerNight}</p>
        </article>`
    })
  },

  hidePatronLoginFields() {
    domManipulation.hide(usernameFieldLabel);
    domManipulation.hide(passwordFieldLabel);
    domManipulation.hide(submitLoginInfo);
    domManipulation.hide(usernameField);
    domManipulation.hide(passwordField);
  },

  displayPatronLogin() {
    domManipulation.hide(patronLoginButton);
    domManipulation.show(usernameFieldLabel);
    domManipulation.show(passwordFieldLabel);
    domManipulation.show(submitLoginInfo);
    domManipulation.show(usernameField);
    domManipulation.show(passwordField);
    domManipulation.show(newBooking);
  },

  displayPasswordErrorMessage() {
    const password = passwordField.value;
    if (password === 'Incorrect Password') {
      return;
    } else {
      passwordField.value = 'Incorrect Password';
      passwordField.addEventListener('click', () => domManipulation.emptyField('passwordField'));
    }
  },

  displayUsernameErrorMessage() {
    const name = usernameField.value;
    if (name.startsWith('No Record of')) {
      return;
    } else {
      usernameField.value = `No Record of ${name}`;
      usernameField.addEventListener('click', () => domManipulation.emptyField('usernameField'));
    }
  },

  emptyField(field) {
    document.getElementById(field).value = '';
  },

  hide(ele) {
    ele.classList.add('hidden');
  },

  show(ele) {
    ele.classList.remove('hidden');
  },

  patronLoginButton,
  usernameField,
  passwordField,
  submitLoginInfo,
  topCard,
  leftCard,
  rightCard,
  bottomCard
}

export default domManipulation;
