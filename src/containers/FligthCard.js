import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useToggle } from 'react-use';

function printRatingStars(rating) {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<FontAwesomeIcon icon={faStar} color="#FFD700" />);
  }
  return stars;
}

export function FlightCard({ rating }) {
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
      <div className="image" />
      <div className="info">
        <p className="departs">Departs at <span className="departs-time">09:45</span></p>
        <p className="company">Croatia airlines</p>
        <span>
          <span className="rating">
            {printRatingStars(rating)}
          </span>
          <span className="divider"> | </span>
          <span className="tickets">10 tickets available</span>
        </span>
        <p className="price">Price: <span className="price-value">60$</span></p>
      </div>
    </div>
  );
}
