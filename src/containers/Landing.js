import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { Header } from './Header';
import { FlightCard } from './FligthCard';

export function Landing() {
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
          <FlightCard rating='4' />
        </div>
      </div>
    </div>
  );
}
