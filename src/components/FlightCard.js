import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useToggle } from 'react-use';
import { Link } from 'react-router-dom';

import '../styles/flightCard.css';

function printRatingStars(rating) {
  return (
    <span className="rating">
      {Array
        .from({ length: rating })
        .map((el, i) => (
          <FontAwesomeIcon key={i} icon={faStar} color="#FFD700" /> // eslint-disable-line
        ))}
    </span>
  );
}

export function FlightCard({
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
              <li>Book</li>
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
            {printRatingStars(rating)}
            <span className="divider"> | </span>
            <span className="tickets">{freeSeats} tickets available</span>
          </span>
          <p className="price">Price: <span className="price-value">{price}$</span></p>
        </div>
      </Link>
    </div>
  );
}
