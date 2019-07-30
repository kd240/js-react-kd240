import React from 'react';
import { observer } from 'mobx-react';

function WishlistComponent({ info }) {
  const flightDestination = React.useMemo(
    () => info.name.split('-')[1].trim(),
    [info]
  );
  const freeSeats = React.useMemo(() => info.no_of_seats - info.no_of_booked_seats, [info]);
  
  return (
    <div>
      <img alt="City" src="https://loremflickr.com/200/200/city" />
      <p>
        {flightDestination}
      </p>
      <p>{freeSeats} available!</p>
    </div>
  );
}

export const Wishlist = observer(WishlistComponent);
