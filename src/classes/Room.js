class Room {
  constructor(roomData) {
    bedSize: roomData.bedSize,
    bidet: roomData.bidet,
    costPerNight: roomData.costPerNight,
    numBeds: roomData.numBeds,
    number: roomData.number,
    roomType: roomData.roomType,
    daysBookedFor: []
  }

  findRoomBookings(bookingsData) {
    const bookedDays = bookingsData.forEach(booking => {
      if (booking.roomNumber === this.number) {
        this.daysBookedFor.push(booking.date);
      }
    })
  }

}

export default Room;
