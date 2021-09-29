const apiEndpoint = 'http://localhost:3009';

function getAllPermanentPatrons() {
  return fetch(`${apiEndpoint}/api/v1/customers`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
}

function getSinglePermanentPatron(id) {
  return fetch(`${apiEndpoint}/api/v1/customers/${id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
}

function getAllRooms() {
  return fetch(`${apiEndpoint}/api/v1/rooms`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
}

function getAllBookings() {
  return fetch(`${apiEndpoint}/api/v1/bookings`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
}

function addNewVictIMeanClient(newVictim, patron) {
  return fetch(`${apiEndpoint}/api/v1/bookings`, {
    method: 'POST',
    body: JSON.stringify(newVictim),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => checkResponse(response))
  .then(data => patron.upcoming.push({date: data.newBooking.date, room: data.newBooking.roomNumber}))
  .catch(error => console.log(error))
}

function checkResponse(response) {
  if (!response.ok) {
    throw new Error("Uh oh, Spaghetti-O's™®©!")
  }
  return response.json()
}

export {
  getAllPermanentPatrons,
  getSinglePermanentPatron,
  getAllRooms,
  getAllBookings,
  addNewVictIMeanClient
}
