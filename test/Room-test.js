import { assert } from 'chai';
import Room from '../src/classes/Room.js';
import RoomRepo from '../src/classes/RoomRepo.js';
import { roomsSampleData } from './rooms-sample-data.js';
import { bookingsSampleData } from './bookings-sample-data.js';

describe('Room', () => {
  let room;
  let roomRepo;

  beforeEach(() => {
    room = new Room(roomsSampleData.rooms[0]);
  });

  it('should be a function', () => {
    assert.isFunction(Room);
  });

  it('should be an instance of Room', () => {
    assert.instanceOf(room, Room);
  });

  it('should have a property of bedsize', () => {
    assert.equal(room.bedSize, 'queen');
  });

  it('should have a property of bidet set to true or false', () => {
    assert.equal(room.bidet, true);
  });

  it('should have a property of cost per night', () => {
    assert.equal(room.costPerNight, 358.4);
  });

  it('should have a property of the number of beds it conatins', () => {
    assert.equal(room.numBeds, 1);
  });

  it('should have a room number', () => {
    assert.equal(room.number, 1);
  });

  it('should have a room type', () => {
    assert.equal(room.roomType, 'residential suite');
  });

  it('should have a property containing days it is/was booked for', () => {
    assert.deepEqual(room.daysBookedFor, []);
  });

  it('should be able to find all days it is/was booked for', () => {
    roomRepo = new RoomRepo(roomsSampleData, bookingsSampleData)
    assert.deepEqual(room.daysBookedFor, []);
    room.findSingleRoomBookings(bookingsSampleData.bookings, roomRepo)
    assert.deepEqual(room.daysBookedFor, ['2020/02/05', '2020/01/11']);
  });
})
