import React from 'react';
import { observer } from 'mobx-react';
import { useClickAway } from 'react-use';

import { EditForm } from './EditForm';
import { appContext } from '../state/appContext';
import { checkOldPassword } from '../services/session';
import { postImage } from '../services/API';
import { updateUserData } from '../services/user';
import { PopupMessageTypes } from '../components/PopupMessage';

function UserModalContainer({ history }) {
  const { appState } = React.useContext(appContext);
  const [message, setMessage] = React.useState({
    show: false,
    type: null,
    message: '',
    onClose: null,
  });
  const ref = React.useRef(null);
  useClickAway(ref, () => history.push('/user'));

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
        setMessage({
          show: true,
          type: PopupMessageTypes.SUCCESS,
          message: 'User updated',
          onClose: () => {
            setMessage({
              show: false,
            });
            history.push('/user');
          },
        });
      })
      .catch(() =>
        setMessage({
          show: true,
          type: PopupMessageTypes.ERROR,
          message: 'Old password incorrect',
          onClose: () =>
            setMessage({
              show: false,
            }),
        })
      ); // eslint-disable-line
  }

  return (
    <EditForm
      reference={ref}
      onSubmit={onSubmit}
      userData={appState.user}
      message={message}
    />
  );
}

export const UserModal = observer(UserModalContainer);
