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

  sortBookings() {
    const currentDate = dayjs().format('YYYY-MM-DD').split('-').join(''); //replace with today's date for testing suite (i.e. 20212909)
    this.bookings.forEach(booking => {
      const dateOfBooking = booking.date.split('/').join('');
      if (parseInt(dateOfBooking) > parseInt(currentDate)) {
        this.bookings.splice(this.bookings[this.bookings.indexOf(booking)], 1);
        this.upcoming.push(booking);
      }
    })
  }
}

export default Patron;
