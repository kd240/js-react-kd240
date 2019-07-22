import React from 'react';
import { observer } from 'mobx-react';
import { SelectElement } from './SelectElement';
import { AppContext } from '../state/appContext';

import styles from './Search.module.scss';

function SearchComponent({ handleInputChange, handleSearch }) {

  const { AppState } = React.useContext(AppContext);

  return (
    <div className={styles.search}>
      <h1>Find best flight for you and your friends!</h1>
      <input
        name="date"
        value={AppState.flightFilter.date}
        type="date"
        onChange={handleInputChange}
      />
      <input
        name="city"
        value={AppState.flightFilter.city}
        placeholder="City"
        onChange={handleInputChange}
        className="city-input"
      />
      <SelectElement
        start={1}
        size={10}
        name="freeSeats"
        value={AppState.flightFilter.freeSeats}
        onChange={handleInputChange}
        append={['No. persons']}
      />
      <button className="search-btn" onClick={handleSearch}>Search</button>
    </div>
  );
}

export const Search = observer(SearchComponent);
