import { post } from './API';
import { appState } from '../state/appState';

const model = 'session';

/**
 * If user is logged in appState.sessionToken is set
 * @param {string} email
 * @param {string} password
 */
export function getSessionToken(email, password, remember) {
  return post(model, { session: { email, password }})
    .then((res) => res.session)
    .then((session) => {
      appState.email = '';
      appState.password = '';
      appState.firstName = session.user.first_name;
      appState.sessionToken = session.token;
      if (remember) {
        localStorage.setItem('sessionToken', session.token);
        localStorage.setItem('sessionName', session.user.first_name);
      }
    });
}
