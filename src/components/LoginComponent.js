import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

function Login({
  handleSubmit,
  handleTextInputChange,
  handleCheckboxInputChange,
  inputValues,
  error,
}) {

  function loginButtonDisable() {
    return !(Boolean(inputValues.email) && Boolean(inputValues.password));
  }

  return (
    <div className="login-wrapper">
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="text-input"
          placeholder="Username"
          name="email"
          value={inputValues.email}
          onChange={handleTextInputChange}
        />
        <input
          className="text-input"
          placeholder="Password"
          type="password"
          name="password"
          value={inputValues.password}
          onChange={handleTextInputChange}
        />
        <div className="remember">
          <label>
            <input
              className="checkbox"
              type="checkbox"
              name="remember"
              value={inputValues.remember}
              onChange={handleCheckboxInputChange}
            />
            <span>Remember me</span>
          </label>
        </div>
        <button type="submit" disabled={loginButtonDisable()}>Login</button>
        {error && (
          <div className="error">
            {error}
          </div>
        )}
      </form>
      <div className="register">
        <h2>Don&apos;t have an account?</h2>
        <Link to='/register'><h2 className="link">Register here</h2></Link>
      </div>
    </div>
  );
}

export const LoginComponent = observer(Login);
