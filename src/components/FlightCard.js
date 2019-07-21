import React from 'react';
import { useToggle } from 'react-use';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import '../styles/flightCard.css';
import { Rating } from './Rating';

export function FlightCardComponent({
  id, freeSeats, price, company, time, rating,
}) {
  const [optionState, optionToggle] = useToggle(false);

  return (
    <div className="result-card">
      <div className="options">
        <span className="option-button" onClick={optionToggle} role="presentation">&#10247;</span>
        {optionState && (
          <div className="option-menu">
            <ul>
              <li><Link to={`/flight/${id}`}>Book</Link></li>
              <li>Add to wishlist</li>
            </ul>
          </div>
        )}
      </div>
      <Link to={`/flight/${id}`}>
        <div className="image" />
        <div className="info">
          <p className="departs">Departs at <span className="departs-time">{time}</span></p>
          <p className="company">{company}</p>
          <span>
            <Rating rating={rating} />
            <span className="divider"> | </span>
            <span className="tickets">{freeSeats} tickets available</span>
          </span>
          <p className="price">Price: <span className="price-value">{price}$</span></p>
        </div>
      </Link>
    </div>
  );
}

export const FlightCard = observer(FlightCardComponent);
