import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faBabyCarriage, faTv, faUtensils } from '@fortawesome/free-solid-svg-icons';

export function FligthDetailsComponent({ flight, handleBookingToggle }) {

  function formatTime(date) {
    return (new Date(date)).toLocaleDateString();
  }

  return (
    <div className="details-container">
      <h1>{flight.name}</h1>
      <div className="info-container">
        <div className="info">
          <p>Company:</p>
          <p>{flight.company_name}</p>
        </div>
        <div className="info">
          <p>Available seats:</p>
          <p>{flight.no_of_seats - flight.no_of_booked_seats}</p>
        </div>
        <div className="info">
          <p>Departs at:</p>
          <p>{formatTime(flight.flys_at)}</p>
        </div>
        <div className="info">
          <p>Lands at:</p>
          <p>{formatTime(flight.lands_at)}</p>
        </div>
        <div className="info">
          <p>Base price:</p>
          <p>{flight.base_price}</p>
        </div>
        <div className="info">
          <p>Current price:</p>
          <p>{flight.current_price}</p>
        </div>
      </div>
      <div className="flight-img" />
      <div className="flight-features">
        <div className="feature">
          <FontAwesomeIcon icon={faWifi} color={Math.random() >= 0.5 ? 'blue' : ''} />
          <span className={Math.random() >= 0.5 ? 'enabled' : ''}>Wireless internet</span>
        </div>
        <div className="feature">
          <FontAwesomeIcon icon={faBabyCarriage} color={Math.random() >= 0.5 ? 'blue' : ''} />
          <span className={Math.random() >= 0.5 ? 'enabled' : ''}>Kids friendly</span>
        </div>
        <div className="feature">
          <FontAwesomeIcon icon={faTv} color={Math.random() >= 0.5 ? 'blue' : ''} />
          <span className={Math.random() >= 0.5 ? 'enabled' : ''}>TV available</span>
        </div>
        <div className="feature">
          <FontAwesomeIcon icon={faUtensils} color={Math.random() >= 0.5 ? 'blue' : ''} />
          <span className={Math.random() >= 0.5 ? 'enabled' : ''}>Meal included</span>
        </div>
      </div>
      <button onClick={handleBookingToggle}>Book now</button>
    </div>
  );
}
