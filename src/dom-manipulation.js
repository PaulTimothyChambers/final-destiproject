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

let domManipulation = {

  displayPatronDashboard(patron, roomRepo) {
    domManipulation.hidePatronLogin()
    topCard.innerHTML = `
      <article class="welcome">
        <img class="" src="" alt="">
        <p class="welcome-message">Welcome ${patron.name}</p>
      </article>`
    patron.bookings.map(booking => {
      return leftCard.innerHTML += `
        <p class="outer-text">My Past <a class="inner-text">(yet present, cause I'm still here)</a> Bookings:</p>
        <p>Date: ${booking.date}</p>
        <p>Room: ${booking.roomNumber}</p>`;
    })
    rightCard.innerText = patron.findTotalCostOfRooms(roomRepo)
  },

  hidePatronLogin() {
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
    // submitLoginInfo.addEventListener('click', parseAllPatrons)
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
