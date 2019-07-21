import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useSetState } from 'react-use';
import { action } from 'mobx';

import '../styles/login.css';
import { LoginForm } from '../components/LoginForm';
import { getSessionToken } from '../services/session';
import { AppContext } from '../state/appContext';

function LoginContainer(props) {
  const { AppState } = React.useContext(AppContext);
  const [input, setInput] = useSetState({
    email: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState('');

  function handleTextInputChange(e) {
    setInput({ [e.target.name]: e.target.value });
  }

  function handleCheckboxInputChange() {
    setInput({ remember: !input.remember });
  }

  const handleSubmit = action(function(e) {
    e.preventDefault();
    getSessionToken(input.email, input.password, input.remember, AppState)
      .then(props.history.push.bind(null, '/'))
      .catch(() => setError('Invalid credentials'));
  });

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      handleTextInputChange={handleTextInputChange}
      handleCheckboxInputChange={handleCheckboxInputChange}
      inputValues={input}
      error={error}
    />
  );
}

export const Login = observer(LoginContainer);
