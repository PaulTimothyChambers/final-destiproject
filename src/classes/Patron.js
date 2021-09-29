class Patron {
  constructor(patronsData) {
    this.id = patronsData.id;
    this.name = patronsData.name;
    this.bookings = [];
    this.upcoming = [];
  }

  findTotalCostOfRooms(roomRepo) {
    const totalCost = this.bookings.reduce((acc, booking) => {
      roomRepo.rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          acc += room.costPerNight;
        }
        return acc
      })
      return acc
    }, 0)
    return totalCost
  }

  findPatronBookings(patron, roomRepo) {
    roomRepo.bookings.forEach(booking => {
      if (booking.userID === patron.id){
        patron.bookings.push(booking)
      }
    })
  }
}

export default Patron;
