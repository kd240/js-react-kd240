import React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';

import { LoginForm } from '../components/LoginForm';
import { getSessionToken } from '../services/session';
import { AppContext } from '../state/AppContext';

function LoginContainer(props) {
  const { AppState } = React.useContext(AppContext);

  const onSubmit = action(function(data) {
    getSessionToken(data.email, data.password, data.remember, AppState)
      .then(props.history.push.bind(null, '/'))
      .catch((err) => console.log(err));
  });

  return (
    <LoginForm
      onSubmit={onSubmit}
    />
  );
}

export const Login = observer(LoginContainer);
