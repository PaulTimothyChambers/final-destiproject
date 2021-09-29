import scripts from './scripts.js';

const main = document.getElementById('main');
const backgroundImage = document.getElementById('backgroundImage');
const usernameField = document.getElementById('usernameField');
const passwordField = document.getElementById('passwordField');
const submitLoginInfo = document.getElementById('submitLoginInfo');
const patronLoginButton = document.getElementById('patronLoginButton');
const usernameFieldLabel = document.getElementById('usernameFieldLabel');
const passwordFieldLabel = document.getElementById('passwordFieldLabel');
const topCard = document.getElementById('topCard');
const leftCard = document.getElementById('leftCard');
const rightCard = document.getElementById('rightCard');
const bottomCard = document.getElementById('bottomCard');
const topCardTop = document.getElementById('topCardTop');
const midCardLeft = document.getElementById('midCardLeft');
const midCardRight = document.getElementById('midCardRight');
const bottomCardBottom = document.getElementById('bottomCardBottom');
const leftCardText = document.getElementById('leftCardText');
const rightCardText = document.getElementById('rightCardText');
const leftCardTextTwo = document.getElementById('leftCardTextTwo');
const rightCardTextTwo = document.getElementById('rightCardTextTwo');
const topCardImage = document.getElementById('imageTopCard');
const leftCardImage = document.getElementById('imageLeftCard');
const rightCardImage = document.getElementById('imageRightCard');
const calendar = document.getElementById('calendar');
const filtered = document.getElementById('filtered');
const availableRooms = document.getElementById('availableRooms');
const dateErrorMessage = document.getElementById('dateErrorMessage');
const checkAvailability = document.getElementById('checkAvailability');
const chooseBookingOptions = document.getElementById('chooseBookingOptions');
const noDatesAvailableApologyMessage = document.getElementById('noDatesAvailableApologyMessage');

function displayPatronDashboard__createSelectorAndListener(patron, roomRepo) {
  const newBookingButton = document.getElementById('newBookingButton');
  newBookingButton.addEventListener('click', () => displayNewBookingView__switchView());

  displayPatronDashboard__displayLeftCard(patron, roomRepo);
};

function displayPatronDashboard__displayLeftCard(patron, roomRepo)
 {
  leftCard.innerHTML = '<p class="outer-text">My Past <a class="inner-text">(yet present, cause I\'m still here)</a> Bookings:</p>';
  patron.bookings.forEach(booking => {
    leftCard.innerHTML += `
      <p>Date: ${booking.date}</p>
      <p>Room: ${booking.roomNumber}</p>`;
  })

  displayPatronDashboard__displayRightCard(patron, roomRepo);
};

function displayPatronDashboard__displayRightCard(patron, roomRepo) {
  rightCard.innerHTML = '<p class="outer-text">My Present Bookings:</p>';
  patron.upcoming.forEach(upcoming => {
    rightCard.innerHTML += `
      <p>Date: ${upcoming.date}</p>
      <p>Room: ${upcoming.room}</p>`;
  })

  displayPatronDashboard__displayBottomCard(patron, roomRepo);
};

function displayPatronDashboard__displayBottomCard(patron, roomRepo) {
  show(bottomCard);
  show(bottomCardBottom);
  topCard.classList.toggle('top-card__top-alt');
  midCardLeft.classList.toggle('mid-card__left-alt')
  midCardRight.classList.toggle('mid-card__right-alt')
  bottomCardBottom.innerHTML = `
    <article class="cost-assessment">
      <p class="total-cost">Total Social Clout Represented in USD (cause it's so #HIP and #JIVE to stay here!):</p>
      <p class="tiny-words">...and that's how you boost SEO, Jonathan, with POPULAR KEYWORDS; if I have to do your job for you one more time it's curtains for you, buster boy...</p>
      <p class="cost">$${patron.findTotalCostOfRooms(roomRepo)}</p>
      <p class="level">Patron LVL: 8</p>
    </article>`;
};

function displayNewBookingView__switchView() {
  hide(main);
  show(checkAvailability);
  show(chooseBookingOptions);

  displayNewBookingView__calendarView();
};

function displayNewBookingView__calendarView() {
  calendar.innerHTML = `
    <label for="bookingStartDate">Start Date:</label>
    <input type="date" id="bookingStartDate" name="booking start date" min="${dayjs().format('YYYY-MM-DD')}">`;

  displayNewBookingView__filteredView();
};

function displayNewBookingView__filteredView() {
  filtered.innerHTML = `
    <ul>
      <li><a href="#">Filter By Room Type</a>
        <ul class="dropdown">
          <li id="filteredListItem"><a href="#">Single Room</a></li>
          <li id="filteredListItem"><a href="#">Suite</a></li>
          <li id="filteredListItem"><a href="#">Junior Suite</a></li>
          <li id="filteredListItem"><a href="#">Residential Suite</a></li>
        </ul>
      </li>
    </ul>`;

  scripts.selectNewElements();
};

function hidePatronLoginFields() {
  hide(usernameField);
  hide(passwordField);
  hide(leftCardText);
  hide(topCardImage)
  hide(leftCardImage);
  hide(rightCardText);
  hide(rightCardImage);
  hide(leftCardTextTwo);
  hide(rightCardTextTwo);
  hide(submitLoginInfo);
  hide(usernameFieldLabel);
  hide(passwordFieldLabel);
};

function emptyField(field) {
  document.getElementById(field).value = '';
};

function hide(ele) {
  ele.classList.add('hidden');
};

function show(ele) {
  ele.classList.remove('hidden');
};

let domManipulation = {
  displayPatronDashboard__changeView(patron, roomRepo) {
    hidePatronLoginFields();
    hide(leftCardText);
    hide(topCardImage);
    hide(leftCardImage);
    hide(rightCardText);
    hide(rightCardImage);
    hide(availableRooms);
    hide(leftCardTextTwo);
    hide(rightCardTextTwo);
    hide(checkAvailability);
    hide(chooseBookingOptions);
    show(main);

    domManipulation.displayPatronDashboard__displayTopCard(patron, roomRepo)
  },

  displayPatronDashboard__displayTopCard(patron, roomRepo) {
    hidePatronLoginFields()
    topCard.innerHTML = `
      <article class="welcome">
        <img class="welcome-image" src="./images/welcome-image.png" alt="">
        <p class="welcome-message">Welcome ${patron.name}</p>
        <button class="new-booking-button" id="newBookingButton">Make "New" Booking<a class="wink-wink">*wink* *wink*</a></button>
      </article>`;

    displayPatronDashboard__createSelectorAndListener(patron, roomRepo);
  },

  displayRoomsByType(filteredRoomsByType, patron) {
    hide(dateErrorMessage);
    hide(noDatesAvailableApologyMessage);
    show(availableRooms);

    availableRooms.innerHTML = '';
    filteredRoomsByType.forEach(room => {
      availableRooms.innerHTML += `
        <article tabindex="0" role="button" class="available-rooms-card" id=${room.number}>
          <p class="available-rooms-card__bed-size">Bed Size: ${room.bedSize.toUpperCase()}</p>
          <p class="available-rooms-card__number-of-beds">Number of Beds: ${room.numBeds}</p>
          <p class="available-rooms-card__cost">Cost Per Night: ${room.costPerNight}</p>
          <p class="available-rooms-card__room-type">Room Type: ${room.roomType.toUpperCase()}</p>
          <button class="submit-booking-button" id="submitBookingButton">Confirm Booking</button>
        </article>`;
    })
    const submitBookingButton = document.querySelectorAll('#submitBookingButton');
    submitBookingButton.forEach(button => {
      button.addEventListener('click', () => scripts.makePOSTRequest())
    })
  },

  displayPatronLogin() {
    hide(patronLoginButton);
    show(newBooking);
    show(usernameField);
    show(passwordField);
    show(submitLoginInfo);
    show(usernameFieldLabel);
    show(passwordFieldLabel);
  },

  displayPasswordErrorMessage() {
    const password = passwordField.value;
    if (password === 'Incorrect Password') {
      return;
    } else {
      passwordField.value = 'Incorrect Password';
      passwordField.addEventListener('click', () => emptyField('passwordField'));
    }
  },

  displayUsernameErrorMessage() {
    const name = usernameField.value;
    if (name.startsWith('No Record of')) {
      return;
    } else {
      usernameField.value = `No Record of ${name}`;
      usernameField.addEventListener('click', () => emptyField('usernameField'));
    }
  },

  displayErrorMessage() {
    hide(dateErrorMessage);
    show(noDatesAvailableApologyMessage);
  },

  displayDateUndefinedMessage() {
    hide(noDatesAvailableApologyMessage);
    show(dateErrorMessage);
  },

  toggleClassName(ele, listItems) {
    listItems.forEach(item => {
      if (item.classList.value.includes('checked')) {
        item.classList.remove('checked');
      }
    })
    ele.classList.toggle('checked');
  },

  usernameField,
  passwordField,
  submitLoginInfo,
  patronLoginButton,
  checkAvailability
}

export default domManipulation;
