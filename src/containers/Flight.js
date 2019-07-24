import React from 'react';
import { useAsync } from 'react-use';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import { Header } from './Header';
import { getFlightById } from '../services/flights';
import { FligthDetails } from '../components/FlightDetails';
import { appContext } from '../state/appContext';

function FligthContainer({ history, match: { params: { id } } }) {
  const { appState } = React.useContext(appContext);
  
  const { loading, value } = useAsync(action(() => getFlightById(id, appState)));

  function openBookingModal() {
    history.push(`/flight/${id}/book`);
  }

  return (
    <div>
      <Header history={history} />
      {loading && (
        <p>Loading</p>
      )}
      {value && (
        <FligthDetails
          id={id}
          flight={appState.flight}
          openBookingModal={openBookingModal}
        />
      )}
    </div>
  );
}

export const Flight = observer(FligthContainer);
