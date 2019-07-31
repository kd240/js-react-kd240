import React from 'react';
import { observer } from 'mobx-react';
import { useAsync } from 'react-use';
import { action } from 'mobx';

import { Header } from './Header';
import { Search } from '../components/Search';
import { FlightCard } from '../components/FlightCard';
import { getFlighs } from '../services/flights';
import { appContext } from '../state/appContext';

import styles from './Landing.module.scss';
import { Loading } from '../components/Loading';

function LandingContainer({ history }) {
  const { appState } = React.useContext(appContext);
  const { loading } = useAsync(getFlighs.bind(null, appState));

  const handleSearch = action(function(data) {
    appState.flightFilter = data;
    appState.filteredFlights = appState.applyFilter;
  });

  function formatTime(time) {
    return new Date(time).toLocaleTimeString();
  }

  return (
    <div>
      <Header history={history} />
      <div>
        <Search
          inputValues={appState.flightFilter}
          handleSearch={handleSearch}
        />
        <div className={styles.results}>
          {loading && <Loading />}
          {appState.filteredFlights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={{
                id: flight.id,
                freeSeats: flight.no_of_seats - flight.no_of_booked_seats,
                price: flight.current_price,
                company: flight.company_name,
                time: formatTime(flight.flys_at),
                rating: Math.round(Math.random() * 5),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const Landing = observer(LandingContainer);
