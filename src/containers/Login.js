import React from 'react';
import { Link } from 'react-router-dom';
import { useSetState, useToggle } from 'react-use';

export function Login() {
  const [states, setStates] = useSetState({ email: '', password: '' });
  const [rememberState, rememberToggle] = useToggle(false);

  function handleChangeInput(e) {
    setStates({ [e.target.name]: e.target.value });
  }

  return (
    <div className="wrapper">
      <h1>Login</h1>
      <div className="form">
        <input
          className="text-input"
          placeholder="Username"
          name="email"
          value={states.email}
          onChange={handleChangeInput}
        />
        <input
          className="text-input"
          placeholder="Password"
          type="password"
          name="password"
          value={states.password}
          onChange={handleChangeInput}
        />
        <input
          className="checkbox"
          type="checkbox"
          onChange={rememberToggle}
        />
        <span>Remember me</span>
        <button>Login</button>
      </div>
      <div className="register">
        <h2>Don't have an account?</h2>
        <Link to='/register'><h2 className="link">Register here</h2></Link>
      </div>
    </div>
  );
}
