import React, { useState } from 'react';
import { useToggle, useAsync } from 'react-use';
import { HeaderContainer } from './HeaderContainer';

import '../styles/flightDetails.css';
import { getFlightById } from '../services/flights';
import { BookingComponent } from '../components/BookingComponent';
import { createBooking } from '../services/booking';
import { FligthDetailsComponent } from '../components/FlightDetailsComponent';


export function FligthDetails({ match: { params: { id } } }) {
  const [bookState, toogleBook] = useToggle(false);
  const [created, toggleCreated] = useToggle(false);
  const [seats, setSeats] = useState(0);
  const { loading, value } = useAsync(getFlightById.bind(null, id));

  function handleBooking() {
    createBooking({
      booking: {
        no_of_seats: seats, // eslint-disable-line
        flight_id: id, // eslint-disable-line
      },
    }).then(toggleCreated);
  }

  function handleSelectChanged(e) {
    setSeats(e.target.value);
  }
  console.log(value);
  return (
    <div className="wrapper">
      <HeaderContainer />
      {loading && (
        <p>Loading</p>
      )}
      {value && (
        <FligthDetailsComponent
          flight={value}
          handleBookingToggle={toogleBook}
        />
      )}
      {bookState && (
        <BookingComponent
          id={id}
          freeSeats={value.no_of_seats - value.no_of_booked_seats}
          seatsSelected={seats}
          handleBooking={handleBooking}
          handleSelectChanged={handleSelectChanged}
          success={created}
        />
      )}
    </div>
  );
}
