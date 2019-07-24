import React from 'react';
import { useAsync } from 'react-use';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import { Header } from './Header';
import { getFlightById } from '../services/flights';
import { FligthDetails } from '../components/FlightDetails';
import { AppContext } from '../state/AppContext';

function FligthContainer({ history, match: { params: { id } } }) {
  const { AppState } = React.useContext(AppContext);
  
  const { loading, value } = useAsync(action(() => getFlightById(id, AppState)));

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
