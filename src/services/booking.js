import { post } from "./API";
import { appState } from "../state/appState";

const model = 'bookings';

/**
 * If booking created successfully, appState.bookingCreated is set to true
 * @param {JSON} bookingInfo 
 */
export function createBooking(bookingInfo) {
  post(model, bookingInfo).then(appState.bookingCreated = true);
}
