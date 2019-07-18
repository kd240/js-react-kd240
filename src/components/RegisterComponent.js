import React from 'react';
import { observer } from 'mobx-react';

import styles from '../styles/statusMessages.module.css';
import '../styles/register.css';

function Register({
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
    <div className="register-wrapper">
      <h1>Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="text-input"
          placeholder="First name"
          name="firstName"
          value={inputValues.firstName}
          onChange={handleInputChange}
        />
        <input
          className="text-input"
          placeholder="Last name"
          name="lastName"
          value={inputValues.lastName}
          onChange={handleInputChange}
        />
        <input
          className="text-input"
          placeholder="Username"
          name="email"
          value={inputValues.email}
          onChange={handleInputChange}
        />
        <input
          className="text-input"
          placeholder="Password"
          type="password"
          name="password"
          value={inputValues.password}
          onChange={handleInputChange}
        />
        <input
          className="text-input"
          placeholder="Confirm password"
          type="password"
          name="passwordCheck"
          value={inputValues.passwordCheck}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={registerButtonDisable()}>Register</button>
        {error && (
          <div className="error">
            {error}
          </div>
        )}
      </form>
      {success && (
        <div className={styles.success}>
          <p>User created successfully</p>
          <a href="/login">Login here</a>
        </div>
      )}
    </div>
  );
}

export const RegisterComponent = observer(Register);
