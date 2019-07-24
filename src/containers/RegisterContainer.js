import React, { useState } from 'react';
import { observer } from 'mobx-react';

import { RegisterForm } from '../components/RegisterForm';
import { createUser } from '../services/user';

function RegisterContainer() {
  const [success, setSuccess] = useState(false);

  function onSubmit(data) {
    createUser({
      user: {
        first_name: data.firstName, //eslint-disable-line
        last_name: data.lastName, //eslint-disable-line
        email: data.email,
        password: data.password,
      },
    }).then(() => {
      setSuccess(true);
    });
  }

  return (
    <RegisterForm
      onSubmit={onSubmit}
      success={success}
    />
  );
}

export const Register = observer(RegisterContainer);
