import './css/base.scss';
import './images/turing-logo.png'
import './images/logo-2.png'
import './images/bg-img-4.png'
import {
  getAllPermanentPatrons,
  getSinglePermanentPatron,
  getAllRooms,
  getAllBookings,
  addNewVictIMeanClient,
  deleteSingleBookingAsIfThatWerePossbile
} from './apiCalls';
import RoomRepo from './classes/RoomRepo.js'

// let patron;

function getAllPatrons() {
  getAllPermanentPatrons().then(data => console.log(data));
  // getSinglePatron()
  //may need to put these invocations inside the .then
}

function getSinglePatron(patronID) {
  getSinglePermanentPatron(patronID).then(data => console.log(data))
  // getRooms()
}

function getRooms() {
  getAllRooms().then(roomsData => {
    roomRepo = new RoomRepo(roomsData)
  })
  // getBookings()
}

function getBookings() {
  getAllBookings().then(data => console.log(data))
  // addVictim()
}

// function addVictim() {
//   addNewVictIMeanClient().then(data => console.log(data))
//   deleteBookingYeahRight()
// }

// function deleteBookingYeahRight() {
//   deleteSingleBookingAsIfThatWerePossbile().then(data => console.log(data))
// }

window.addEventListener('load', getAllPatrons)
