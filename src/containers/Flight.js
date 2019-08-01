import React from 'react';
import { useAsync } from 'react-use';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import { Header } from './Header';
import { getFlightById } from '../services/flights';
import { FligthDetails } from '../components/FlightDetails';
import { appContext } from '../state/appContext';
import { Loading } from '../components/Loading';

function FligthContainer({
  history,
  match: {
    params: { id },
  },
}) {
  const { appState } = React.useContext(appContext);

  const { loading, value, error } = useAsync(action(() => getFlightById(id, appState)));

  function openBookingModal() {
    history.push(`/flight/${id}/book`);
  }

  React.useEffect(() => {
    if (error) {
      history.push('/error404');
    }
  }, [error]);

  return (
    <div>
      <Header history={history} />
      {loading && <Loading />}
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
