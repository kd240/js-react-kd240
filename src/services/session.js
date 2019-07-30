import { post } from './API';
import { models } from './model.enum';

const model = models.SESSION;

/**
 * If user is logged in appState.sessionToken is set
 * @param {string} email
 * @param {string} password
 */
export function getSessionToken(email, password, remember, appState) {
  return post(model, { session: { email, password }})
    .then((res) => res.session)
    .then((session) => {
      appState.email = '';
      appState.password = '';
      appState.firstName = session.user.first_name;
      appState.sessionToken = session.token;
      appState.userId = session.user.id;
      appState.user = session.user;
      if (remember) {
        localStorage.setItem('sessionToken', session.token);
        localStorage.setItem('sessionName', session.user.first_name);
        localStorage.setItem('sessionId', session.user.id);
        localStorage.setItem('remember', true);
      } else {
        sessionStorage.setItem('sessionToken', session.token);
        sessionStorage.setItem('sessionName', session.user.first_name);
        sessionStorage.setItem('sessionId', session.user.id);
        sessionStorage.setItem('loged', true);
      }
    });
}

/**
 * If old password is incorrect error is thrown
 * @param {string} email 
 * @param {string} password 
 */
export function checkOldPassword(email, password) {
  return post(model, { session: { email, password }});
}
