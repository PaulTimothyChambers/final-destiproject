import Room from './Room.js';

class RoomRepo {
  constructor(roomsData, bookingsData) {
    this.rooms = roomsData;
    this.bookings = bookingsData;
  }

  findAllRoomBookings(bookingsData, patronsData) {
    this.rooms = this.rooms.rooms.map(room => new Room(room));
    this.rooms.forEach(room => {
      room.findSingleRoomBookings(bookingsData, this);
    })
    console.log()
  }

  findUserBookings(patron) {
    this.bookings.bookings.forEach(booking => {
      if (booking.userID === patron.id){
        patron.bookings.push(booking)
      }
    })
    console.log(patron)
  }
}

export default RoomRepo;
