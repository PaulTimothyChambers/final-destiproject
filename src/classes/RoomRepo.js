import Room from './Room.js';

class RoomRepo {
  constructor(rooms, bookingsData) {
    this.rooms = rooms.rooms;
    this.bookings = bookingsData.bookings;
  }

  findAllRoomBookings(patronsData) {
    this.rooms = this.rooms.map(room => new Room(room));
    this.rooms.forEach(room => {
      room.findSingleRoomBookings(this);
    })
  }
}

export default RoomRepo;
