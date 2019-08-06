import React from 'react';
import { observer } from 'mobx-react';
import { SelectElement } from './SelectElement';

import styles from './Booking.module.scss';
import { PopupMessage, PopupMessageTypes } from './PopupMessage';

function BookingComponent({
  refrence,
  freeSeats,
  seatsSelected,
  handleClosing,
  handleBooking,
  handleSelectChanged,
  success,
}) {
  return (
    <div className={styles.bookingModal}>
      <div ref={refrence}>
        <h1>Create booking</h1>
        <p>Number of passangers</p>
        <SelectElement
          start={1}
          size={freeSeats >= 10 ? 10 : freeSeats}
          name="bookingSeats"
          value={seatsSelected}
          onChange={handleSelectChanged}
          append="No. seats"
        />
        <br />
        <button onClick={handleBooking}>Confirm booking</button>
        {success && (
          <PopupMessage
            type={PopupMessageTypes.SUCCESS}
            message="Booking created"
            handleClose={handleClosing}
          />
        )}
      </div>
    </div>
  );
}

export const Booking = observer(BookingComponent);
