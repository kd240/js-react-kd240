import { post } from './API';
import { models } from './model.enum';

const model = models.USER;

/**
 * If user created successfully, appState.userCreated is set to true
 * @param {JSON} userData
 */
export function createUser(userData) {
  return post(model, userData); //eslint-disable-line
}

export function logOut(appState) {
  appState.firstName = '';
  appState.sessionToken = '';
  localStorage.setItem('sessionToken', '');
  localStorage.setItem('sessionName', '');
  localStorage.setItem('remember', '');
  sessionStorage.setItem('sessionToken', '');
  sessionStorage.setItem('sessionName', '');
  sessionStorage.setItem('loged', '');
}
