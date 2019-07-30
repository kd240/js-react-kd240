import React from 'react';
import { observer } from 'mobx-react';

function MyBookingInfoComponent({ info }) {
  const flightDestination = React.useMemo(
    () => info.flight_name.split('-')[1].trim(),
    [info]
  );
  const flyAt = React.useMemo(() => {
    const date = new Date(info.flys_at);
    return `${date.toLocaleDateString()} | ${date.toLocaleTimeString()}`;
  }, [info]);
  
  return (
    <div>
      <img alt="City" src="https://loremflickr.com/200/200/city" />
      <p>
        {flightDestination} | {info.company_name}
      </p>
      <p>{flyAt}</p>
    </div>
  );
}

export const MyBookingInfo = observer(MyBookingInfoComponent);
