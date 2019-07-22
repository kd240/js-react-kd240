import React from 'react';
import { observer } from 'mobx-react';
import { useToggle } from 'react-use';
import { action } from 'mobx';

import { Booking } from '../components/Booking';
import { AppContext } from '../state/AppContext';
import { createBooking } from '../services/booking';

function BookingModalContainer({ history, match: { params: { id }}}) {
  const { AppState } = React.useContext(AppContext);
  const [seats, setSeats] = React.useState(0);
  const [created, toggleCreated] = useToggle(false);

  function handleClosing() {
    history.push(`/flight/${id}`);
    toggleCreated(false);
  }

  const handleBooking = action(function() {
    createBooking({
      booking: {
        no_of_seats: seats, // eslint-disable-line
        flight_id: id, // eslint-disable-line
      },
    }, AppState).then(toggleCreated);
  });

  function handleSelectChanged({ target }) {
    setSeats(target.value);
  }
  return (
    <Booking
      freeSeats={AppState.flight.no_of_seats - AppState.flight.no_of_booked_seats}
      seatsSelected={seats}
      handleClosing={handleClosing}
      handleBooking={handleBooking}
      handleSelectChanged={handleSelectChanged}
      success={created}
    />
  );
}

export const BookingModal = observer(BookingModalContainer);
