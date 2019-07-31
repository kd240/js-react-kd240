import React from 'react';
import { observer } from 'mobx-react';
import { useClickAway } from 'react-use';

import { EditUser } from './EditUser';
import { appContext } from '../state/appContext';
import { updateUser } from '../services/user';
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

  function onSubmit(data) {
    updateUser(appState, data)
      .then(() => {
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
        }));
  }

  return (
    <EditUser
      reference={ref}
      onSubmit={onSubmit}
      userData={appState.user}
      message={message}
    />
  );
}

export const UserModal = observer(UserModalContainer);
