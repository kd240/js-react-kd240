import { getAuthorized } from './API';
import { models } from './model.enum';

const model = models.FLIGHT;

/**
 * Gets flights and stores them in appState.flights
 */
export async function getFlighs(appState) {
  return getAuthorized(model, appState)
    .then((res) => res.flights)
    .then((flights) => {
      appState.flights = flights;
      appState.filteredFlights = flights;
      return flights;
    });
}

/**
 * If flight exists it is stored in appState.flight
 * @param {number} id
 */
export async function getFlightById(id, appState) {
  return getAuthorized(`${model}/${id}`, appState)
    .then((res) => res.flight)
    .then((flight) => {
      appState.flight = flight;
      appState.flight.freeSeats = flight.no_of_seats - flight.no_of_booked_seats;
      return flight;
    });
}
