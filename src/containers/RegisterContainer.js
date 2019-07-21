import React, { useState } from 'react';
import { useSetState } from 'react-use';
import { observer } from 'mobx-react';

import '../styles/register.css';
import { RegisterForm } from '../components/RegisterForm';
import { createUser } from '../services/user';

function RegisterContainer() {
  const [input, setInput] = useSetState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useSetState({
    firstName: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  function inputValidation() {
    setError({});
    if (input.firstName.length < 2) {
      setError({ firstName: 'Enter valid first name' });
    }
    if (!(input.email.includes('.') && input.email.includes('@'))) {
      setError({ email: 'Enter valid username' });
    }
    if (input.password.length < 8) {
      setError({ password: 'Password too short' });
    }
    if (input.password !== input.passwordCheck) {
      setError({ passwordCheck: 'Passwords do not match' });
    }
    return Object.keys(error).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValidation()) {
      createUser({
        user: {
          first_name: input.firstName, //eslint-disable-line
          last_name: input.lastName, //eslint-disable-line
          email: input.email,
          password: input.password,
        },
      }).then(() => {
        setSuccess(true);
        setInput({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordCheck: '',
        });
      });
    }
  }

  function handleInputChange({ target }) {
    setInput({ [target.name]: target.value });
  }

  return (
    <RegisterForm
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      inputValues={input}
      error={error}
      success={success}
    />
  );
}

export const Register = observer(RegisterContainer);
