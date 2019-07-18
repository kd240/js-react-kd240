import { getAuthorized } from './API';

const model = 'flights';

/**
 * Gets flights and stores them in appState.flights
 */
export async function getFlighs(appState) {
  return getAuthorized(model)
    .then((res) => res.flights)
    .then((flights) => {
      appState.flights = flights;
      appState.filteredFlights = flights;
    });
}

/**
 * If flight exists it is stored in appState.flight
 * @param {number} id
 */
export function getFlightById(id, appState) {
  getAuthorized(`${model}/${id}`)
    .then((res) => res.flight)
    .then((flight) => {
      appState.flight = flight;
    });
}
