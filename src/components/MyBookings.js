import React from 'react';
import { observer } from 'mobx-react';
import { MyBookingInfo } from './MyBookingInfo';

function MyBookingsComponent({ bookings }) {
  return (
    <div>
      <h1>My bookings</h1>
      {bookings.map((booking) => <MyBookingInfo key={booking.id} info={booking} />)}
    </div>
  );
}

export const MyBookings = observer(MyBookingsComponent);
