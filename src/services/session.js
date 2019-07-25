import { post } from './API';
import { models } from './model.enum';

const model = models.SESSION;

/**
 * If user is logged in appState.sessionToken is set
 * @param {string} email
 * @param {string} password
 */
export function getSessionToken(email, password, remember, AppState) {
  return post(model, { session: { email, password }})
    .then((res) => res.session)
    .then((session) => {
      AppState.email = '';
      AppState.password = '';
      AppState.firstName = session.user.first_name;
      AppState.sessionToken = session.token;
      if (remember) {
        localStorage.setItem('sessionToken', session.token);
        localStorage.setItem('sessionName', session.user.first_name);
        localStorage.setItem('remember', true);
      } else {
        sessionStorage.setItem('sessionToken', session.token);
        sessionStorage.setItem('sessionName', session.user.first_name);
        sessionStorage.setItem('loged', true);
      }
    });
}
