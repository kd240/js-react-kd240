import React from 'react';
import { observer } from 'mobx-react';

import styles from './MyBookingInfo.module.scss';

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
    <div className={styles.bookingInfo}>
      <img alt="City" src="https://loremflickr.com/250/250/city" />
      <p>
        <span>{flightDestination}</span> | {info.company_name}
      </p>
      <p>{flyAt}</p>
    </div>
  );
}

export const MyBookingInfo = observer(MyBookingInfoComponent);
