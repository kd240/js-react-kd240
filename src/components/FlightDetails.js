import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faBabyCarriage, faTv, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react';

import styles from './FlightDetails.module.scss';

function FligthDetailsComponent({ flight, openBookingModal }) {

  function formatTime(date) {
    return (new Date(date)).toLocaleDateString();
  }

  return (
    <div className={styles.details}>
      <h1>{flight.name}</h1>
      <div className={styles.info}>
        <div>
          <p>Company:</p>
          <p>{flight.company_name}</p>
        </div>
        <div>
          <p>Available seats:</p>
          <p>{flight.no_of_seats - flight.no_of_booked_seats}</p>
        </div>
        <div>
          <p>Departs at:</p>
          <p>{formatTime(flight.flys_at)}</p>
        </div>
        <div>
          <p>Lands at:</p>
          <p>{formatTime(flight.lands_at)}</p>
        </div>
        <div>
          <p>Base price:</p>
          <p>{flight.base_price}</p>
        </div>
        <div>
          <p>Current price:</p>
          <p>{flight.current_price}</p>
        </div>
      </div>
      <div className={styles.flightImg} />
      <div className={styles.flightFeatures}>
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
      <button onClick={openBookingModal}>Book now</button>
    </div>
  );
}

export const FligthDetails = observer(FligthDetailsComponent);
