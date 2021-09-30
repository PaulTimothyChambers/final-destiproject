// import scripts from './scripts';
//
// const main = document.getElementById('main');
// const backgroundImage = document.getElementById('backgroundImage');
// const usernameField = document.getElementById('usernameField');
// const passwordField = document.getElementById('passwordField');
// const submitLoginInfo = document.getElementById('submitLoginInfo');
// const patronLoginButton = document.getElementById('patronLoginButton');
// const usernameFieldLabel = document.getElementById('usernameFieldLabel');
// const passwordFieldLabel = document.getElementById('passwordFieldLabel');
// const topCard = document.getElementById('topCard');
// const leftCard = document.getElementById('leftCard');
// const rightCard = document.getElementById('rightCard');
// const bottomCard = document.getElementById('bottomCard');
// const topCardTop = document.getElementById('topCardTop');
// const midCardLeft = document.getElementById('midCardLeft');
// const midCardRight = document.getElementById('midCardRight');
// const bottomCardBottom = document.getElementById('bottomCardBottom');
// const leftCardText = document.getElementById('leftCardText');
// const rightCardText = document.getElementById('rightCardText');
// const leftCardTextTwo = document.getElementById('leftCardTextTwo');
// const rightCardTextTwo = document.getElementById('rightCardTextTwo');
// const topCardImage = document.getElementById('imageTopCard');
// const leftCardImage = document.getElementById('imageLeftCard');
// const rightCardImage = document.getElementById('imageRightCard');
// const calendar = document.getElementById('calendar');
// const filtered = document.getElementById('filtered');
// const availableRooms = document.getElementById('availableRooms');
// const dateErrorMessage = document.getElementById('dateErrorMessage');
// const checkAvailability = document.getElementById('checkAvailability');
// const chooseBookingOptions = document.getElementById('chooseBookingOptions');
// const noDatesAvailableApologyMessage = document.getElementById('noDatesAvailableApologyMessage');
// const confirmButton = document.getElementById('confirmButton');
//
// function hidePatronLoginFields() {
//   hide(usernameField);
//   hide(passwordField);
//   hide(leftCardText);
//   hide(topCardImage)
//   hide(leftCardImage);
//   hide(rightCardText);
//   hide(rightCardImage);
//   hide(leftCardTextTwo);
//   hide(rightCardTextTwo);
//   hide(submitLoginInfo);
//   hide(usernameFieldLabel);
//   hide(passwordFieldLabel);
// };
//
// function createSelectorAndListener(patron, roomRepo) {
//   const newBookingButton = document.getElementById('newBookingButton');
//   newBookingButton.addEventListener('click', switchView);
//
//   displayLeftCard(patron, roomRepo);
// };
//
// function displayLeftCard(patron, roomRepo) {
//   leftCard.innerHTML = '';
//   leftCard.innerHTML = '<p class="outer-text">My Past <a class="inner-text">(yet present, cause I\'m still here)</a> Bookings:</p>';
//   patron.bookings.map(booking => {
//     return leftCard.innerHTML += `
//       <p>Date: ${booking.date}</p>
//       <p>Room: ${booking.roomNumber}</p>`;
//   })
//
//   displayRightCard(patron, roomRepo);
// };
//
// function displayRightCard(patron, roomRepo) {
//   rightCard.innerHTML = '';
//   rightCard.innerHTML = '<p class="outer-text">My Present Bookings:</p>';
//   patron.upcoming.map(upcomings => {
//     return rightCard.innerHTML += `
//       <p>Date: ${upcomings.date}</p>
//       <p>Room: ${upcomings.roomNumber}</p>`;
//   })
//
//   displayBottomCard(patron, roomRepo);
// };
//
// function displayBottomCard(patron, roomRepo) {
//   show(bottomCard);
//   show(bottomCardBottom);
//   topCard.classList.toggle('top-card__top-alt');
//   midCardLeft.classList.toggle('mid-card__left-alt');
//   midCardRight.classList.toggle('mid-card__right-alt');
//
//   bottomCardBottom.innerHTML = `
//     <article class="cost-assessment">
//       <p class="total-cost">Total Social Clout Represented in USD (cause it's so #HIP and #JIVE to stay here!):</p>
//       <p class="tiny-words">...and that's how you boost SEO, Jonathan, with POPULAR KEYWORDS; if I have to do your job for you one more time it's curtains for you, buster boy...</p>
//       <p class="cost">$${patron.findTotalCostOfRooms(roomRepo)}</p>
//       <p class="level">Patron LVL: 8</p>
//     </article>`;
// };
//
// function switchView() {
//   hide(main);
//   show(checkAvailability);
//   show(chooseBookingOptions);
//   show(calendar)
//   show(filtered)
//
//   calendarView();
// };
//
// function calendarView() {
//   calendar.innerHTML = `
//     <label class="calendar-label" for="bookingStartDate">Start Date:</label>
//     <input class="calendar-input" type="date" id="bookingStartDate" name="booking start date" min="${dayjs().format('YYYY-MM-DD')}">`;
//
//   filteredView();
// };
//
// function filteredView() {
//   filtered.innerHTML = `
//     <ul>
//       <li><a href="#">Filter By Room Type</a>
//         <ul class="dropdown">
//           <li id="filteredListItem"><a href="#">Single Room</a></li>
//           <li id="filteredListItem"><a href="#">Suite</a></li>
//           <li id="filteredListItem"><a href="#">Junior Suite</a></li>
//           <li id="filteredListItem"><a href="#">Residential Suite</a></li>
//         </ul>
//       </li>
//     </ul>`;
//
//   scripts.selectNewElements();
// };
//
// function displayConfirmButton() {
//   hide(checkAvailability);
//   hide(chooseBookingOptions);
//   hide(calendar)
//   hide(filtered)
//   hide(availableRooms)
//   show(confirmButton)
// }
//
// function changeView() {
//   hidePatronLoginFields();
//   hide(leftCardText);
//   hide(topCardImage);
//   hide(leftCardImage);
//   hide(rightCardText);
//   hide(rightCardImage);
//   hide(availableRooms);
//   hide(leftCardTextTwo);
//   hide(rightCardTextTwo);
//   hide(checkAvailability);
//   hide(chooseBookingOptions);
//   show(main);
//
//   displayTopCard();
// };
//
// function emptyField(field) {
//   document.getElementById(field).value = '';
// };
//
// function hide(ele) {
//   ele.classList.add('hidden');
// };
//
// function show(ele) {
//   ele.classList.remove('hidden');
// };
//
// function displayDateUndefinedMessage() {
//   show(dateErrorMessage);
// };
//
// function displayPasswordErrorMessage() {
//   const password = passwordField.value;
//   if (password === 'Incorrect Password') {
//     return;
//   } else {
//     passwordField.value = 'Incorrect Password';
//     passwordField.addEventListener('click', () => emptyField('passwordField'));
//   }
// };
//
// function displayUsernameErrorMessage() {
//   const name = usernameField.value;
//   if (name.startsWith('No Record of')) {
//     return;
//   } else {
//     usernameField.value = `No Record of ${name}`;
//     usernameField.addEventListener('click', () => emptyField('usernameField'));
//   }
// };
//
// function displayNoAvailableBookingsMessage() {
//   hide(noDatesAvailableApologyMessage);
//   show(dateErrorMessage);
// };
//
// let domManipulation = {
//   changeView() {
//     hidePatronLoginFields();
//     hide(leftCardText);
//     hide(topCardImage);
//     hide(leftCardImage);
//     hide(rightCardText);
//     hide(rightCardImage);
//     hide(availableRooms);
//     hide(leftCardTextTwo);
//     hide(rightCardTextTwo);
//     hide(checkAvailability);
//     hide(chooseBookingOptions);
//     show(main);
//
//     domManipulation.displayTopCard();
//   },
//
//   displayTopCard(patron, roomRepo) {
//     hidePatronLoginFields()
//
//     topCard.innerHTML = '';
//     topCard.innerHTML = `
//       <article class="welcome">
//         <img class="welcome-image" src="./images/patron-4.png" alt="">
//         <p class="welcome-message">Welcome ${patron.name}</p>
//         <button class="new-booking-button" id="newBookingButton">Make "New" Booking<a class="wink-wink">*wink* *wink*</a></button>
//       </article>`;
//
//     createSelectorAndListener(patron, roomRepo);
//   },
//
//   displayPatronLogin() {
//     hide(patronLoginButton);
//     show(newBooking);
//     show(usernameField);
//     show(passwordField);
//     show(submitLoginInfo);
//     show(usernameFieldLabel);
//     show(passwordFieldLabel);
//   },
//
//   toggleClassName(ele, listItems) {
//     listItems.forEach(item => {
//       if (item.classList.value.includes('checked')) {
//         item.classList.remove('checked');
//       }
//     })
//     ele.classList.toggle('checked');
//   },
//
//   displayRoomsByType(filteredRoomsByType) {
//     hide(dateErrorMessage);
//     hide(noDatesAvailableApologyMessage);
//     show(availableRooms);
//
//     availableRooms.innerHTML = '';
//     filteredRoomsByType.map(room => {
//       return availableRooms.innerHTML += `
//         <article tabindex="0" role="button" class="available-rooms-card" id=${room.number}>
//           <p class="available-rooms-card__bed-size">Bed Size: ${room.bedSize.toUpperCase()}</p>
//           <p class="available-rooms-card__number-of-beds">Number of Beds: ${room.numBeds}</p>
//           <p class="available-rooms-card__cost">Cost Per Night: ${room.costPerNight}</p>
//           <p class="available-rooms-card__room-type">Room Type: ${room.roomType.toUpperCase()}</p>
//           <button class="submit-booking-button" id="submitBookingButton">Confirm Booking</button>
//         </article>`;
//     })
//     const submitBookingButton = document.querySelectorAll('#submitBookingButton');
//     submitBookingButton.forEach(button => {
//       button.addEventListener('click', () => scripts.makePOSTRequest())
//     })
//   }
// }
//
// export default domManipulation;
