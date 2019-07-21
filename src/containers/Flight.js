import React from 'react';
import { useAsync } from 'react-use';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import { Header } from './Header';
import '../styles/flightDetails.css';
import { getFlightById } from '../services/flights';
import { FligthDetails } from '../components/FlightDetails';
import { AppContext } from '../state/appContext';

function FligthContainer({ history, match: { params: { id } } }) {
  const { AppState } = React.useContext(AppContext);
  
  const { loading, value } = useAsync(action(() => {
    if (AppState.flight.id !== id) {
      return getFlightById(id, AppState);
    }
    return Promise.resolve(AppState.flight);
  }));

  function openBookingModal() {
    history.push(`/flight/${id}/book`);
  }

  return (
    <div className="wrapper">
      <Header />
      {loading && (
        <p>Loading</p>
      )}
      {value && (
        <FligthDetails
          id={id}
          flight={value}
          openBookingModal={openBookingModal}
        />
      )}
    </div>
  );
}

export const Flight = observer(FligthContainer);
