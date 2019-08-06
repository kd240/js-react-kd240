import React from 'react';
import { observer } from 'mobx-react';
import { useToggle, useClickAway } from 'react-use';
import { action } from 'mobx';

import { Booking } from '../components/Booking';
import { appContext } from '../state/appContext';
import { createBooking } from '../services/booking';
import { getFlightById } from '../services/flights';

function BookingModalContainer({
  history,
  match: {
    params: { id },
  },
}) {
  const { appState } = React.useContext(appContext);
  const [seats, setSeats] = React.useState(0);
  const [created, toggleCreated] = useToggle(false);
  const ref = React.useRef(null);

  useClickAway(ref, () => {
    toggleCreated(false);
    history.push(`/flight/${id}`);
  });

  function handleClosing() {
    toggleCreated(false);
  }

  const handleBooking = action(function() {
    createBooking(
      {
        booking: {
          no_of_seats: seats, // eslint-disable-line
          flight_id: id, // eslint-disable-line
        },
      },
      appState
    )
      .then(toggleCreated(true))
      .then(getFlightById(id, appState))
      .catch((err) => console.log(err)); // eslint-disable-line
  });

  function handleSelectChanged({ target }) {
    setSeats(target.value);
  }
  return (
    <Booking
      refrence={ref}
      freeSeats={appState.flight.freeSeats}
      seatsSelected={seats}
      handleClosing={handleClosing}
      handleBooking={handleBooking}
      handleSelectChanged={handleSelectChanged}
      success={created}
    />
  );
}

export const BookingModal = observer(BookingModalContainer);
