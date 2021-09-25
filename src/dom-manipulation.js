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

  displayPatronDashboard(patron) {
    topCard.innerHTML =
    `<article class="">
      <img class="" src="" alt="">
      <p class="welcome-message">Welcome ${patron.name}</p>
    </article>`
    domManipulation.hidePatronLogin()
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
