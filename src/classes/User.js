class Patron {
  constructor(patronsData) {
    this.id = patronsData.id;
    this.name = patronsData.name;
    this.bookings = [];
  }

  findTotalCostOfRooms(roomRepo) {
    const totalCost = this.bookings.reduce((acc, booking) => {
      roomRepo.rooms.rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          acc += room.costPerNight;
        }
        return acc
      })
      return acc
    }, 0)
    console.log('this', totalCost)
    return totalCost
  }
}

export default Patron;
