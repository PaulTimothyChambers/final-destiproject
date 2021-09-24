const apiEndpoint = 'http://localhost:3009';

let apiCalls = {

  getAllPermanentPatrons() {
    return fetch(`${apiEndpoint}/api/v1/customers`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error))
  }

  getSinglePermanentPatron(id) {
    return fetch(`${apiEndpoint}/api/v1/customers/${id}`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error))
  }

  getAllRooms() {
    return fetch(`${apiEndpoint}/api/v1/rooms`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error))
  }

  getAllBookings() {
    return fetch(`${apiEndpoint}/api/v1/bookings`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error))
  }

  addNewVictIMeanClient(newVictim) {
    return fetch(`${apiEndpoint}/api/v1/bookings`, {
      method: 'POST',
      body: JSON.stringify(newVictim),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
  }

  deleteSingleBookingAsIfThatWerePossbile() {
    return fetch(`${apiEndpoint}/api/v1/bookings/<id>`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => checkResponse(response))
    .then(data => data)
    .catch(error => console.log(error))
  }

  checkResponse(response) {
    if (!response.ok) {
      throw new Error("Uh oh, Spaghetti-O's™®©!")
    }
    return response.json()
  }
}

export default apiCalls;
