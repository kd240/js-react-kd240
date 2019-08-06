import React from 'react';
import { observer } from 'mobx-react';

import styles from './Wishlist.module.scss';

function WishlistComponent({ info }) {
  const flightDestination = React.useMemo(
    () => info.name.split('-')[1].trim(),
    [info]
  );
  const freeSeats = React.useMemo(
    () => info.no_of_seats - info.no_of_booked_seats,
    [info]
  );

  return (
    <div className={styles.wishlist}>
      <img
        alt="City"
        src={`https://loremflickr.com/250/250/${flightDestination}`}
      />
      <p>{flightDestination}</p>
      <p>{freeSeats} flights available!</p>
    </div>
  );
}

export const Wishlist = observer(WishlistComponent);
