import React, { useState } from 'react';

import styles from '../styles/statusMessages.module.css';

export function BookingComponent({
  freeSeats,
  seatsSelected,
  handleBooking,
  handleSelectChanged,
  success,
}) {

  function printSeatsOption() {
    console.log(freeSeats);
    return (
      <select value={seatsSelected} onChange={handleSelectChanged}> {/* eslint-disable-line */}
        {Array
          .from({ length: freeSeats > 10 ? 10 : freeSeats })
          .map((el, i) => i + 1)
          .map((el) => (
            <option key={el}>{el}</option>
          ))}
      </select>
    );
  }
  
  return (
    <div className="book">
      <h1>Create booking</h1>
      <p>Number of passangers</p>
      {printSeatsOption()}
      <button onClick={handleBooking}>Confirm booking</button>
      {success && (
        <div className={styles.success}>
          <p>User created successfully</p>
          <a href="/login">Login here</a>
        </div>
      )}
    </div>
  );
}
