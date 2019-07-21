import React from 'react';
import { observer } from 'mobx-react';

import styles from '../styles/statusMessages.module.css';
import { SelectElement } from './SelectElement';

function BookingComponent({
  freeSeats,
  seatsSelected,
  handleClosing,
  handleBooking,
  handleSelectChanged,
  success,
}) {
  
  return (
    <div className="book">
      <h1>Create booking</h1>
      <p>Number of passangers</p>
      <SelectElement
        start={1}
        size={freeSeats > 10 ? 10 : freeSeats}
        name="bookingSeats"
        value={seatsSelected}
        onChange={handleSelectChanged}
        append={['No. seats']}
      />
      <button onClick={handleBooking}>Confirm booking</button>
      {success && (
        <div className={styles.success}>
          <p>Booking created successfully</p>
        </div>
      )}
      <button onClick={handleClosing}>Close</button>
    </div>
  );
}

export const Booking = observer(BookingComponent);
