import { post, getAuthorized, put } from './API';
import { models } from './model.enum';

const model = models.USER;

/**
 * If user created successfully, appState.userCreated is set to true
 * @param {JSON} userData
 */
export function createUser(userData) {
  return post(model, userData); //eslint-disable-line
}

export function getUserData(appState) {
  return getAuthorized(`${model}/${appState.userId}`, appState)
    .then((response) => response.user)
    .then((user) => {
      appState.user = user;
      return user;
    });
}

export function updateUserData(userData, appState) {
  return put(`${model}/${appState.userId}`, { user: userData }, appState)
    .then((response) => response.user)
    .then((user) => {
      appState.user = user;
      return user;
    });
}

export function logOut(appState) {
  appState.firstName = '';
  appState.sessionToken = '';
  localStorage.setItem('sessionToken', '');
  localStorage.setItem('sessionName', '');
  localStorage.setItem('sessionId', '');
  localStorage.setItem('remember', '');
  sessionStorage.setItem('sessionToken', '');
  sessionStorage.setItem('sessionName', '');
  sessionStorage.setItem('sessionId', '');
  sessionStorage.setItem('loged', '');
}
