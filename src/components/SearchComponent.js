import React from 'react';
import { observer } from 'mobx-react';
import { appState } from '../state/appState';

function SearchComponent({ handleInputChange, handleSearch }) {

  function printSelect() {
    return (
      <select
        name="freeSeats"
        onChange={handleInputChange}
        value={appState.flightFilter.freeSeats}
      >
        <option>No. persons</option>
        <option>1</option>
        {Array
          .from({ length: 9 })
          .map((el, i) => i + 2)
          .map((el) => (
            <option key={el}>{el}</option>
          ))}
      </select>
    );
  }

  return (
    <div className="search-wrapper">
      <h1>Find best flight for you and your friends!</h1>
      <input
        name="date"
        value={appState.flightFilter.date}
        type="date"
        onChange={handleInputChange}
      />
      <input
        name="city"
        value={appState.flightFilter.city}
        placeholder="City"
        onChange={handleInputChange}
        className="city-input"
      />
      {printSelect()}
      <button className="search-btn" onClick={handleSearch}>Search</button>
    </div>
  );
}

export const Search = observer(SearchComponent);
