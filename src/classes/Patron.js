import domManipulation from '../dom-manipulation';

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

  findPatronBookings(roomRepo) {
    const allPatronBookings = roomRepo.bookings.filter(booking => {
      return booking.userID === this.id;
    })
    this.bookings = allPatronBookings;
    this.sortBookings();
  }

  sortBookings() {
    const currentDate = dayjs().format('YYYY-MM-DD').split('-').join(''); //replace with today's date for testing suite (i.e. 20212909)
    this.bookings.forEach(booking => {
      const dateOfBooking = booking.date.split('/').join('');
      if (dateOfBooking > currentDate) {
        const splicedEle = this.bookings.splice(this.bookings.indexOf(booking), 1);

        this.upcoming.push(booking);
      }
    })
  }
}

export default Patron;
