import { postAuthorized } from './API';
import { models } from './model.enum';

const model = models.BOOKING;

/**
 * If booking created successfully, appState.bookingCreated is set to true
 * @param {JSON} bookingInfo
 */
export async function createBooking(bookingInfo, AppState) {
  return postAuthorized(model, bookingInfo, AppState);
}
