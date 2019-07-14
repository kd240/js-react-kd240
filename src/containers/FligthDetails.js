import React from 'react';
import { Header } from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faBabyCarriage, faTv, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { useToggle } from 'react-use';

export function FligthDetails({
  match: {
    params: {
      id,
    },
  },
}) {
  const [bookState, bookToggle] = useToggle(false);

  return (
    <div className="wrapper">
      <Header />
      <div className="details-container">
        <h1>FlightName</h1>
        <div className="info-container">
          <div className="info">
            <p className="info-title">Company:</p>
            <p className="info-value">CompanyName</p>
          </div>
          <div className="info">
            <p>Available seats:</p>
            <p>AvailableSeats</p>
          </div>
          <div className="info">
            <p>Departs at:</p>
            <p>Time</p>
          </div>
          <div className="info">
            <p>Lands at:</p>
            <p>Time</p>
          </div>
          <div className="info">
            <p>Base price:</p>
            <p>Price</p>
          </div>
          <div className="info">
            <p>Current price:</p>
            <p>Price</p>
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
        <button className="button" onClick={bookToggle}>Book now</button>
      </div>
      {bookState && (
        <div className="book">
          <h1>Create booking</h1>
          <p>Number of passangers</p>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
        </div>
      )}
    </div>
  );
}
