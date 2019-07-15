import React from 'react';
import { Link } from 'react-router-dom';
import { useSetState } from 'react-use';

import '../styles/register.css'

export function Register() {
  const [errors, setErrors] = useSetState({
    name: false,
    email: false,
    password: false,
    passwordMatch: true,
  });
  const [states, setStates] = useSetState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    userCreated: false,
  });

  function handleChangeInput(e) {
    setStates({ [e.target.name]: e.target.value });
    setErrors({
      name: false,
      email: false,
      password: false,
      passwordMatch: true,
    });
  }

  async function handleRegister() {
    if (states.password !== states.passwordConfirm) {
      setErrors({passwordMatch: false});
      return;
    } if (!states.name.includes(' ')) {
      setErrors({ name: true });
      return;
    }
    const options = {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: states.email,
          first_name: states.name.split(' ')[0], // eslint-disable-line
          last_name: states.name.split(' ')[1], // eslint-disable-line
          password: states.password,
        },
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    await fetch('https://flighter-hw7.herokuapp.com/api/users', options)
      .then(async(res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.user) {
          setStates({ userCreated: true });
        } else {
          if (res.errors.password) {
            setErrors({ password: true });
          } if (res.errors.email) {
            setErrors({ email: true });
          } if (res.errors.first_name) {
            setErrors({ name: true });
          }
        }
      });
  }

  return (
    <div className="register-wrapper">
      <h1>Register</h1>
      <div className="form">
        <input
          className="text-input"
          placeholder="Full name"
          name="name"
          value={states.name}
          onChange={handleChangeInput}
        />
        {errors.name && (
          <p className="error">Invalid name</p>
        )}
        <input
          className="text-input"
          placeholder="Username"
          name="email"
          value={states.email}
          onChange={handleChangeInput}
        />
        {errors.email && (
          <p className="error">Invalid username/email</p>
        )}
        <input
          className="text-input"
          placeholder="Password"
          type="password"
          name="password"
          value={states.password}
          onChange={handleChangeInput}
        />
        {errors.password && (
          <p className="error">Invalid password</p>
        )}
        <input
          className="text-input"
          placeholder="Confirm password"
          type="password"
          name="passwordConfirm"
          value={states.passwordConfirm}
          onChange={handleChangeInput}
        />
        {!errors.passwordMatch && (
          <p className="error">Passwords don&apos;t match</p>
        )}
        <button onClick={handleRegister}>Register</button>
      </div>
      {states.userCreated && (
        <div className="create-success">
          <p>Account created successfully</p>
          <p>Go to <Link to="/login">Login</Link></p>
        </div>
      )}
    </div>
  );
}
