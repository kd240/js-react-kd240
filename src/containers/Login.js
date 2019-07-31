import React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';

import { LoginForm } from '../components/LoginForm';
import { getSessionToken } from '../services/session';
import { appContext } from '../state/appContext';

function LoginContainer(props) {
  const { appState } = React.useContext(appContext);
  const [error, setError] = React.useState('');

  const onSubmit = action(function(data) {
    getSessionToken(data.email, data.password, data.remember, appState)
      .then(props.history.push.bind(null, '/'))
      .catch(() => setError('Credentials are invalid'));
  });

  return (
    <LoginForm
      onSubmit={onSubmit}
      error={error}
      handleClosing={() => setError('')} /* eslint-disable-line */
    />
  );
}

export const Login = observer(LoginContainer);
