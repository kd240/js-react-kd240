import { post } from "./API";

const model = 'users';

/**
 * If user created successfully, appState.userCreated is set to true
 * @param {JSON} userData
 */
export function createUser(userData) {
  return post(model, userData); //eslint-disable-line
}
