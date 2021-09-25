class Patron {
  constructor(patronsData) {
    this.id = patronsData.id;
    this.name = patronsData.name;
    this.bookings = [];
  }
}

export default Patron;
