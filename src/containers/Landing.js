import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Header } from './Header';
import { FlightCard } from './FligthCard';
import { useAsync, useLocalStorage, useSessionStorage } from 'react-use';

function getFlights(sessionToken) {
  const options = {
    headers: {
      Authorization: sessionToken,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  return fetch('https://flighter-hw7.herokuapp.com/api/flights', options)
    .then((res) => (res.ok ? res.json() : new Error('Failed!')));
}

export function Landing() {
  const [sessionS] = useSessionStorage('session', '');
  const [sessionL] = useLocalStorage('session', '');
  const sessionToken = sessionL ? sessionL.token : sessionS.token;
  const { loading, value } = useAsync(getFlights.bind(this, sessionToken));

  return (
    <div>
      <Header />
      <div className="wrapper">
        <div className="search-wrapper">
          <h1>Find best flight for you and your friends!</h1>
          <DatePicker dateFormat="dd. MMM yyyy." placeholderText="Pick date" />
          <input placeholder="City" className="city-input" />
          <select className="">
            <option>1 person</option>
            <option>2 people</option>
            <option>3 people</option>
            <option>4 people</option>
            <option>5 people</option>
            <option>6 people</option>
            <option>7 people</option>
            <option>8 people</option>
            <option>9 people</option>
            <option>10 people</option>
          </select>
          <button className="search-btn">Search</button>
        </div>
        <div className="results-wrapper">
          {loading && (
            <p>Loading</p>
          )}
          {value && value.flights
            .map((flight) => (
              <FlightCard
                key={flight.id}
                id={flight.id}
                freeSeats={flight.no_of_seats - flight.no_of_booked_seats}
                price={flight.current_price}
                company={flight.company_name}
                flysAt={flight.flys_at}
                rating={Math.round(Math.random() * 5)}
              />))}
        </div>
      </div>
    </div>
  );
}
