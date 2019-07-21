import { postAuthorized } from './API';

const model = 'bookings';

/**
 * If booking created successfully, appState.bookingCreated is set to true
 * @param {JSON} bookingInfo
 */
export function createBooking(bookingInfo, AppState) {
  return postAuthorized(model, bookingInfo, AppState);
}
