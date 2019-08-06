import React from 'react';
import { useToggle } from 'react-use';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { Rating } from './Rating';

import useWishlist from '../hooks/useWishlist';

import styles from './FlightCard.module.scss';

export function FlightCardComponent({ flight }) {
  const [optionState, optionToggle] = useToggle(false);
  const [wishlistState, toggleWishlist] = useWishlist(flight.id);

  return (
    <div className={styles.result}>
      <div className={styles.options}>
        <span onClick={optionToggle} role="presentation">
          &#10247;
        </span>
        {optionState && (
          <div>
            <ul onClick={optionToggle}>
              <Link to={`/flight/${flight.id}/book`}>
                <li>Book</li>
              </Link>
              <li onClick={toggleWishlist}>
                {wishlistState ? 'Remove from wishlist' : 'Add to wishlist'}
              </li>{' '}
              {/* eslint-disable-line */}
            </ul>
          </div>
        )}
      </div>
      <Link to={`/flight/${flight.id}`}>
        <div className={styles.image} />
        <div className={styles.info}>
          <p className="departs">
            Departs at <span className="departs-time">{flight.time}</span>
          </p>
          <p className="company">{flight.company}</p>
          <span>
            <Rating rating={flight.rating} />
            <span className="divider"> | </span>
            <span className="tickets">
              {flight.freeSeats} tickets available
            </span>
          </span>
          <p className="price">
            Price: <span className="price-value">{flight.price}$</span>
          </p>
        </div>
      </Link>
    </div>
  );
}

export const FlightCard = observer(FlightCardComponent);
