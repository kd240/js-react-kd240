import React from 'react';
import { observer } from 'mobx-react';
import useForm from 'react-hook-form';

import { SelectElement } from './SelectElement';

import styles from './Search.module.scss';

function SearchComponent({ handleSearch }) {
  const { register, handleSubmit } = useForm({});

  return (
    <form className={styles.search} onSubmit={handleSubmit(handleSearch)}>
      <h1>Find best flight for you and your friends!</h1>
      <input name="date" type="date" ref={register} />
      <input
        name="city"
        placeholder="City"
        className="city-input"
        ref={register}
      />
      <SelectElement
        start={1}
        size={10}
        name="freeSeats"
        append="No. persons"
        defaultValue="0"
        register={register}
      />
      <button className="search-btn" type="submit">
        Search
      </button>
    </form>
  );
}

export const Search = observer(SearchComponent);
