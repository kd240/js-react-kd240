import React, { useState } from 'react';
import { useSetState } from 'react-use';
import { observer } from 'mobx-react';

import '../styles/register.css';
import { RegisterComponent } from '../components/RegisterComponent';
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
  const [error, setError] = useState('');
  function inputValidation() {
    if (!(input.email.includes('.') && input.email.includes('@'))) {
      setError('Enter valid username');
      return false;
    }
    if (input.password !== input.passwordCheck) {
      setError('Passwords do not match');
      return false;
    }
    if (input.password.length < 8) {
      setError('Password too short');
      return false;
    }
    setError('');
    return true;
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

  function handleInputChange(e) {
    setInput({ [e.target.name]: e.target.value });
  }

  return (
    <RegisterComponent
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      inputValues={input}
      error={error}
      success={success}
    />
  );
}

export const Register = observer(RegisterContainer);
