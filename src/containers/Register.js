import React from 'react';
import { useSetState } from 'react-use';

export function Register() {
  const [states, setStates] = useSetState({ name: '', email: '', password: '', passwordConfirm: ''});

  function handleChangeInput(e) {
    setStates({ [e.target.name]: e.target.value });
  }

  return (
    <div className="wrapper">
      <h1>Register</h1>
      <div className="form">
        <input
          className="text-input"
          placeholder="Full name"
          name="name"
          value={states.name}
          onChange={handleChangeInput}
        />
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
          className="text-input"
          placeholder="Confirm password"
          type="password"
          name="passwordConfirm"
          value={states.passwordConfirm}
          onChange={handleChangeInput}
        />
        <button>Register</button>
      </div>
    </div>
  );
}
