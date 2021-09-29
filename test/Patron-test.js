import { assert } from 'chai';
import Patron from '../src/classes/Patron.js';
import RoomRepo from '../src/classes/RoomRepo.js';
import { patronsSampleData } from './patrons-sample-data.js';
import { roomsSampleData } from './rooms-sample-data.js';
import { bookingsSampleData } from './bookings-sample-data.js';

describe('Patron', () => {
  let patron;
  let roomRepo;

  beforeEach(() => {
    patron = new Patron(patronsSampleData.patrons[0])
  });

  it('should be a function', () => {
    assert.isFunction(Patron);
  });

  it('should be an instance of Room', () => {
    assert.instanceOf(patron, Patron);
  });

  it('should have an ID', () => {
    assert.equal(patron.id, 3);
  });

  it('should have a name', () => {
    assert.equal(patron.name, 'Kelvin Schiller');
  });

  it('should have a property of all bookings it had', () => {
    assert.deepEqual(patron.bookings, []);
  });

  it('should have a property of bookings it has scheduled', () => {
    assert.deepEqual(patron.upcoming, []);
  });

  it('should be able to find all past/present bookings for any logged-in patron', () => {
    roomRepo = new RoomRepo(roomsSampleData, bookingsSampleData);
    assert.deepEqual(patron.bookings, []);
    patron.findPatronBookings(patron, roomRepo);
    assert.deepEqual(patron.bookings[0].date, '2020/04/22');
  });

  it('should be able to sort/separate out all upcoming bookings for any logged-in patron', () => {
    roomRepo = new RoomRepo(roomsSampleData, bookingsSampleData);
    assert.deepEqual(patron.upcoming, []);
    patron.sortBookings();
    assert.deepEqual(patron.upcoming[0], bookingsSampleData[10]);
  });
})
