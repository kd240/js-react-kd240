import React from 'react';
import { observer } from 'mobx-react';
import { EditForm } from './EditForm';
import { appContext } from '../state/appContext';
import { checkOldPassword } from '../services/session';
import { postImage } from '../services/API';
import { updateUserData } from '../services/user';

function UserModalContainer({ history }) {
  const { appState } = React.useContext(appContext);

  function onSubmit({
    email,
    firstName,
    lastName,
    newPassword,
    oldPassword,
    selectPhoto,
  }) {
    checkOldPassword(appState.user.email, oldPassword)
      .then(() => {
        if (selectPhoto) {
          const image = new FormData();
          image.append('image', selectPhoto);
          return postImage(appState, image);
        }
        return Promise.resolve({ imageUrl: appState.user.image_url });
      })
      .then(({ imageUrl }) => updateUserData(
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
        alert('User updated!'); // eslint-disable-line
        history.push('/user');
      })
      .catch((error) => alert(JSON.stringify(error))); // eslint-disable-line
  }

  return <EditForm onSubmit={onSubmit} userData={appState.user} />;
}

export const UserModal = observer(UserModalContainer);
