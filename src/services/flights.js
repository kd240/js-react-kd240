import { getAuthorized } from './API';

const model = 'flights';

/**
 * Gets flights and stores them in appState.flights
 */
export async function getFlighs(AppState) {
  return getAuthorized(model, AppState)
    .then((res) => res.flights)
    .then((flights) => {
      AppState.flights = flights;
      AppState.filteredFlights = flights;
    });
}

/**
 * If flight exists it is stored in appState.flight
 * @param {number} id
 */
export function getFlightById(id, AppState) {
  return getAuthorized(`${model}/${id}`, AppState)
    .then((res) => res.flight)
    .then((flight) => {
      AppState.flight = flight;
      return flight;
    });
}
