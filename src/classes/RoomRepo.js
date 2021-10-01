import Room from './Room.js';

class RoomRepo {
  constructor(roomsData, bookingsData) {
    this.rooms = roomsData.rooms;
    this.bookings = bookingsData.bookings;
  }

  findAllRoomBookings() {
    this.rooms = this.rooms.map(room => new Room(room));
    this.rooms.forEach(room => {
      room.findSingleRoomBookings(this);
    })
  }
}

export default RoomRepo;
