import { post, getAuthorized, put, postImage } from './API';
import { checkOldPassword } from './session';
import { models } from './model.enum';

const model = models.USER;

/**
 * If user created successfully, appState.userCreated is set to true
 * @param {JSON} userData
 */
export async function createUser(userData) {
  return post(model, userData); //eslint-disable-line
}

/**
 * Get user's data by ID
 * @param {number} appState
 */
export async function getUserData(appState) {
  return getAuthorized(`${model}/${appState.userId}`, appState)
    .then((response) => response.user)
    .then((user) => {
      appState.user = user;
      return user;
    });
}

/**
 * Used to update user's data after password is correct
 * @param {JSON} userData
 * @param {*} appState
 */
async function updateUserData(userData, appState) {
  return put(`${model}/${appState.userId}`, { user: userData }, appState)
    .then((response) => response.user)
    .then((user) => {
      appState.user = user;
      return user;
    });
}

/**
 * Update users data with password check
 * @param {*} appState
 * @param {JSON} data
 */
export async function updateUser(appState, {
  email,
  firstName,
  lastName,
  newPassword,
  oldPassword,
  selectPhoto,
}) {
  return checkOldPassword(appState.user.email, oldPassword)
    .then(() => {
      if (selectPhoto) {
        const image = new FormData();
        image.append('image', selectPhoto);
        return postImage(appState, image);
      }
      return Promise.resolve({ imageUrl: appState.user.image_url });
    })
    .then(({ imageUrl }) =>
      updateUserData(
        {
          email,
          first_name: firstName, // eslint-disable-line
          last_name: lastName, // eslint-disable-line
          password: newPassword || oldPassword,
          image_url: imageUrl, // eslint-disable-line
        },
        appState
      ))
    .then((user) => {
      appState.user = user;
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
