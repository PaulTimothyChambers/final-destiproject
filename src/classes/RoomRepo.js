import Room from './Room.js';

class RoomRepo {
  constructor(roomsData, bookingsData) {
    this.rooms = roomsData;
    this.bookings = bookingsData;
  }

  findAllRoomBookings(bookingsData) {
    this.rooms = this.rooms.map(room => new Room(room));
    this.rooms.forEach(room => {
      room.findSingleRoomBookings(bookingsData);
    })
  }
}
