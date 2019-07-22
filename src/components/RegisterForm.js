import React from 'react';
import { observer } from 'mobx-react';

import { InputTextField } from './InputTextField';

import styles from './RegisterForm.module.scss';
import message from '../styles/statusMessages.module.scss';

function RegisterComponent({
  handleSubmit,
  handleInputChange,
  inputValues,
  error,
  success,
}) {

  function registerButtonDisable() {
    return !(inputValues.firstName && inputValues.lastName && inputValues.email && inputValues.password && inputValues.passwordCheck);
  }

  return (
    <div className={styles.register}>
      <h1>Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        <InputTextField
          placeholder="First name"
          name="firstName"
          value={inputValues.firstName}
          onChange={handleInputChange}
          error={error.firstName}
        />
        <InputTextField
          placeholder="Last name"
          name="lastName"
          value={inputValues.lastName}
          onChange={handleInputChange}
          error={error.lastName}
        />
        <InputTextField
          placeholder="Username"
          name="email"
          value={inputValues.email}
          onChange={handleInputChange}
          error={error.email}
        />
        <InputTextField
          placeholder="Password"
          type="password"
          name="password"
          value={inputValues.password}
          onChange={handleInputChange}
          error={error.password}
        />
        <InputTextField
          placeholder="Confirm password"
          type="password"
          name="passwordCheck"
          value={inputValues.passwordCheck}
          onChange={handleInputChange}
          error={error.passwordCheck}
        />
        <button type="submit" disabled={registerButtonDisable()}>Register</button>
      </form>
      {success && (
        <div className={message.success}>
          <p>User created successfully</p>
          <a href="/login">Login here</a>
        </div>
      )}
    </div>
  );
}

export const RegisterForm = observer(RegisterComponent);
