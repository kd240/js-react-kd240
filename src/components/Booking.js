import React from 'react';
import { observer } from 'mobx-react';

import message from '../styles/statusMessages.module.scss';
import { SelectElement } from './SelectElement';

import styles from './Booking.module.scss';

function BookingComponent({
  freeSeats,
  seatsSelected,
  handleClosing,
  handleBooking,
  handleSelectChanged,
  success,
}) {
  
  return (
    <div className={styles.bookingModal}>
      <div>
        <h1>Create booking</h1>
        <p>Number of passangers</p>
        <SelectElement
          start={1}
          size={freeSeats > 10 ? 10 : freeSeats}
          name="bookingSeats"
          value={seatsSelected}
          onChange={handleSelectChanged}
          append="No. seats"
        />
        <br />
        <button onClick={handleBooking}>Confirm booking</button>
        {success && (
          <div className={message.success}>
            <p>Booking created successfully</p>
          </div>
        )}
        {success && (
          <button onClick={handleClosing}>Close</button>
        )}
      </div>
    </div>
  );
}

export const Booking = observer(BookingComponent);
