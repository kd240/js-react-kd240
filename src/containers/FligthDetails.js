import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faBabyCarriage, faTv, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { useToggle, useAsync, useSessionStorage, useLocalStorage } from 'react-use';
import { HeaderComponent } from '../components/HeaderComponent';

import '../styles/flightDetails.css';

function getFlight(id, sessionToken) {
  const options = {
    method: 'GET',
    headers: {
      Authorization: sessionToken,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  return fetch(`https://flighter-hw7.herokuapp.com/api/flights/${id}`, options)
    .then((res) => (res.ok ? res.json() : new Error('Failed!')));
}

function printSeatsOption(maxSeats, selectChanged) {
  return (
    <select value={seats} onChange={selectChanged}> {/* eslint-disable-line */}
      {Array
        .from({ length: maxSeats > 10 ? 10 : maxSeats })
        .map((el, i) => i)
        .map((el) => (
          <option key={el}>{el} persons</option>
        ))}
    </select>
  );
}

export function FligthDetails({ match: { params: { id }}}) {
  const [bookState, bookToggle] = useToggle(false);
  const [sessionS] = useSessionStorage('session', '');
  const [sessionL] = useLocalStorage('session', '');
  const sessionToken = sessionL ? sessionL.token : sessionS.token;
  const [seats, setSeats] = useState(0);
  const { loading, value } = useAsync(getFlight.bind(this, id, sessionToken));
  
  function selectChanged(e) {
    setSeats(e.target.value);
  }

  function formatTime(date) {
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    const hours = date.substring(11, 13);
    const minutes = date.substring(14, 16);
    return `${day}. ${month}. ${year}, ${hours}:${minutes}`;
  }

  function handleBooking() {
    const options = {
      method: 'POST',
      headers: {
        Authorization: sessionToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        booking: {
          no_of_seats: seats, // eslint-disable-line
          flight_id: id, // eslint-disable-line
        },
      }),
    };
    fetch('https://flighter-hw7.herokuapp.com/api/bookings', options)
      .then((res) => (res.ok ? res.json() : new Error('Failed!')))
      .then(() => {
        alert('Booked!'); // eslint-disable-line
      });
  }

  return (
    <div className="wrapper">
      <HeaderComponent />
      {loading && (
        <p>Loading</p>
      )}
      {value && (
        <div className="details-container">
          <h1>{value.flight.name}</h1>
          <div className="info-container">
            <div className="info">
              <p>Company:</p>
              <p>{value.flight.company_name}</p>
            </div>
            <div className="info">
              <p>Available seats:</p>
              <p>{value.flight.no_of_seats - value.flight.no_of_booked_seats}</p>
            </div>
            <div className="info">
              <p>Departs at:</p>
              <p>{formatTime(value.flight.flys_at)}</p>
            </div>
            <div className="info">
              <p>Lands at:</p>
              <p>{formatTime(value.flight.lands_at)}</p>
            </div>
            <div className="info">
              <p>Base price:</p>
              <p>{value.flight.base_price}</p>
            </div>
            <div className="info">
              <p>Current price:</p>
              <p>{value.flight.current_price}</p>
            </div>
          </div>
          <div className="flight-img" />
          <div className="flight-features">
            <div className="feature">
              <FontAwesomeIcon icon={faWifi} color={Math.random() >= 0.5 ? 'blue' : ''} />
              <span className={Math.random() >= 0.5 ? 'enabled' : ''}>Wireless internet</span>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faBabyCarriage} color={Math.random() >= 0.5 ? 'blue' : ''} />
              <span className={Math.random() >= 0.5 ? 'enabled' : ''}>Kids friendly</span>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faTv} color={Math.random() >= 0.5 ? 'blue' : ''} />
              <span className={Math.random() >= 0.5 ? 'enabled' : ''}>TV available</span>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faUtensils} color={Math.random() >= 0.5 ? 'blue' : ''} />
              <span className={Math.random() >= 0.5 ? 'enabled' : ''}>Meal included</span>
            </div>
          </div>
          <button onClick={bookToggle}>Book now</button>
        </div>
      )}
      {bookState && (
        <div className="book">
          <h1>Create booking</h1>
          <p>Number of passangers</p>
          {printSeatsOption(value.flight.no_of_seats - value.flight.no_of_booked_seats, selectChanged)}
          <button onClick={handleBooking}>Confirm booking</button>
        </div>
      )}
    </div>
  );
}
