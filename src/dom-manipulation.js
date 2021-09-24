const guestLoginButton = document.getElementById('guestLoginButton');
const usernameField = document.getElementById('usernameField');
const passwordField = document.getElementById('passwordField');
const submitLoginInfo = document.getElementById('submitLoginInfo');
const topCard = document.getElementById('topCard');
const leftCard = document.getElementById('leftCard');
const rightCard = document.getElementById('rightCard');
const bottomCard = document.getElementById('bottomCard');

let domManipulation = {

  displayPatronDashboard(patron) {

    `<article class=" hidden">
      <img class="" src="" alt="">
      <p class="welcome-message">Welcome ${patron.name}</p>
    </article>`
  }

  displayPatronLogin() {
    hideElement(guestLoginButton);
    showElement(submitLoginInfo);
    showElement(usernameField);
    showElement(passwordField);
  }

  hideElement(ele) {
    ele.classList.add('hidden');
  }

  showElement(ele) {
    ele.classList.remove('hidden');
  }
  guestLoginButton,
  usernameField,
  passwordField,
  submitLoginInfo
}
export default domManipulation;
