import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useToggle } from 'react-use';
import { Link } from 'react-router-dom';

import '../styles/flightCard.css';

function printRatingStars(rating) {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={faStar} color="#FFD700" />);
  }
  return stars;
}

export function FlightCard({
  id, freeSeats, price, company, flysAt, rating,
}) {
  const [optionState, optionToggle] = useToggle(false);

  function formatTime(time) {
    return time.substring(11, 16);
  }

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
          <p className="departs">Departs at <span className="departs-time">{formatTime(flysAt, 1)}</span></p>
          <p className="company">{company}</p>
          <span>
            <span className="rating">
              {printRatingStars(rating)}
            </span>
            <span className="divider"> | </span>
            <span className="tickets">{freeSeats} tickets available</span>
          </span>
          <p className="price">Price: <span className="price-value">{price}$</span></p>
        </div>
      </Link>
    </div>
  );
}
