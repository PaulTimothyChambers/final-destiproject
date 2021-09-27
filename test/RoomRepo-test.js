import { assert } from 'chai';
import Room from '../src/classes/Room.js';
import RoomRepo from '../src/classes/RoomRepo.js';
import Patron from '../src/classes/Patron.js';
import { roomsSampleData } from './rooms-sample-data.js';
import { bookingsSampleData } from './bookings-sample-data.js';
import { patronsSampleData } from './patrons-sample-data.js';

describe('Room Repo', () => {
  let roomRepo;

  beforeEach(() => {
    roomRepo = new RoomRepo(roomsSampleData, bookingsSampleData);
  });

  it('should be a function', () => {
    assert.isFunction(RoomRepo);
  });

  it('should be an instance of RoomRepo', () => {
    assert.instanceOf(roomRepo, RoomRepo);
  });

  it('should hold a list of rooms', () => {
    assert.equal(roomRepo.rooms, roomsSampleData.rooms);
  });

  it('should hold a list of bookings', () => {
    assert.equal(roomRepo.bookings, bookingsSampleData.bookings);
  });

  it('should be able to instantiate then find all bookings for each of its rooms', () => {
    assert.equal(roomRepo.rooms[4].daysBookedFor, undefined);
    roomRepo.findAllRoomBookings(bookingsSampleData, patronsSampleData);
    assert.equal(roomRepo.rooms[4].daysBookedFor, '2020/02/06');
  });
})
