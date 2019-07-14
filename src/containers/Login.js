import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSetState, useToggle, useSessionStorage, useLocalStorage } from 'react-use';

export function Login() {
  const [states, setStates] = useSetState({ email: '', password: '', error: { email: false, password: false }});
  const [rememberState, rememberToggle] = useToggle(false);
  const [sessionS, setSessionS] = useSessionStorage('session', '');
  const [sessionL, setSessionL] = useLocalStorage('session', '');

  function handleChangeInput(e) {
    setStates({ [e.target.name]: e.target.value });
    setStates({ error: { [e.target.name]: false }});
  }

  async function handleLogin() {
    if (!states.email || !states.password) {
      setStates({
        error: {
          email: !states.error.password,
          password: !states.error.password,
        },
      });
      return;
    }
    
    const options = {
      method: 'POST',
      body: JSON.stringify({
        session: {
          email: states.email,
          password: states.password,
        },
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    await fetch('https://flighter-hw7.herokuapp.com/api/session', options)
      .then(async(res) => (res.ok ? res.json() : new Error()))
      .then(({ session }) => {
        if (session) {
          if (rememberState) {
            setSessionL(session);
          } else {
            setSessionS(session);
          }
        } else {
          setStates({
            error: {
              email: true,
              password: true,
            },
          });
        }
      })
      .catch((error) => console.log(error)); // eslint-disable-line
  }

  return (
    <div className="wrapper">
      {(sessionS || sessionL) && (
        <Redirect to="/" />
      )}
      <h1>Login</h1>
      <div className="form">
        <input
          className="text-input"
          placeholder="Username"
          name="email"
          value={states.email}
          onChange={handleChangeInput}
        />
        {states.error.email && (
          <p className="error">Invalid username</p>
        )}
        <input
          className="text-input"
          placeholder="Password"
          type="password"
          name="password"
          value={states.password}
          onChange={handleChangeInput}
        />
        {states.error.password && (
          <p className="error">Invalid password</p>
        )}
        <input
          className="checkbox"
          type="checkbox"
          onChange={rememberToggle}
        />
        <span>Remember me</span>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div className="register">
        <h2>Don&apos;t have an account?</h2>
        <Link to='/register'><h2 className="link">Register here</h2></Link>
      </div>
    </div>
  );
}
