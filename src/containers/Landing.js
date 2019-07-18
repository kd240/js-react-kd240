import React from 'react';
import { observer } from 'mobx-react';
import { useAsync } from 'react-use';
import { HeaderContainer } from './HeaderContainer';
import { Search } from '../components/SearchComponent';
import { FlightCard } from '../components/FlightCard';

import '../styles/landing.css';
import { getFlighs } from '../services/flights';
import { appState } from '../state/appState';

function LandingContainer() {
  const { loading } = useAsync(getFlighs.bind(null, appState));

  function handleInputChange(e) {
    appState.flightFilter[e.target.name] = e.target.value;
  }

  function handleSearch() {
    appState.applyFilter();
  }

  function formatTime(time) {
    return (new Date(time)).toLocaleTimeString();
  }

  return (
    <div>
      <HeaderContainer />
      <div className="landing-wrapper">
        <Search
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
        />
        <div className="results-wrapper">
          {loading && (
            <p>Loading</p>
          )}
          {appState.filteredFlights
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
