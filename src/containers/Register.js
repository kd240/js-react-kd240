import React from 'react';
import { observer } from 'mobx-react';
import { useToggle } from 'react-use';

import { RegisterForm } from '../components/RegisterForm';
import { createUser } from '../services/user';

function RegisterContainer({ history }) {
  const [success, toggleSuccess] = useToggle(false);
  const [error, setError] = React.useState('');

  function onSubmit(data) {
    createUser({
      user: {
        first_name: data.firstName, //eslint-disable-line
        last_name: data.lastName, //eslint-disable-line
        email: data.email,
        password: data.password,
      },
    })
      .then(() => {
        toggleSuccess(true);
      })
      .catch((err) => setError('User already exists')); // eslint-disable-line
  }

  function handleCloseError() {
    setError('');
  }

  function handleCloseSucces() {
    toggleSuccess(false);
    history.push('/login');
  }

  return (
    <RegisterForm
      onSubmit={onSubmit}
      success={success}
      error={error}
      handleCloseError={handleCloseError}
      handleCloseSucces={handleCloseSucces}
    />
  );
}

export const Register = observer(RegisterContainer);
