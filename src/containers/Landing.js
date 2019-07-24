import React from 'react';
import { observer } from 'mobx-react';
import { useAsync } from 'react-use';
import { action } from 'mobx';

import { Header } from './Header';
import { Search } from '../components/Search';
import { FlightCard } from '../components/FlightCard';
import { getFlighs } from '../services/flights';
import { AppContext } from '../state/AppContext';

import styles from './Landing.module.scss';

function LandingContainer() {
  const { AppState } = React.useContext(AppContext);
  const { loading } = useAsync(getFlighs.bind(null, AppState));

  const handleInputChange = action(function(e) {
    AppState.flightFilter[e.target.name] = e.target.value;
  });

  const handleSearch = action(function(data) {
    AppState.flightFilter = data;
    AppState.filteredFlights = AppState.applyFilter;
  });

  function formatTime(time) {
    return (new Date(time)).toLocaleTimeString();
  }

  return (
    <div>
      <Header />
      <div className={styles.landing}>
        <Search
          inputValues={AppState.flightFilter}
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
        />
        <div className={styles.results}>
          {loading && (
            <p>Loading</p>
          )}
          {AppState.filteredFlights
            .map((flight) => (
              <FlightCard
                key={flight.id}
                id={flight.id}
                name={flight.name}
                freeSeats={flight.no_of_seats - flight.no_of_booked_seats}
                price={flight.current_price}
                company={flight.company_name}
                time={formatTime(flight.flys_at)}
                rating={Math.round(Math.random() * 5)}
              />))}
        </div>
      </div>
    </div>
  );
}

export const Landing = observer(LandingContainer);
