class Room {
  constructor(roomData) {
    this.bedSize = roomData.bedSize;
    this.bidet = roomData.bidet;
    this.costPerNight = roomData.costPerNight;
    this.numBeds = roomData.numBeds;
    this.number = roomData.number;
    this.roomType = roomData.roomType;
    this.daysBookedFor = [];
  }

  findSingleRoomBookings(bookingsData, roomRepo) {
    roomRepo.bookings.forEach(booking => {
      if (booking.roomNumber === this.number) {
        this.daysBookedFor.push(booking.date);
      }
    })
  }
}

export default Room;
