import React from 'react';
import useForm from 'react-hook-form';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { InputTextField } from './InputTextField';

import styles from './LoginForm.module.scss';
import { PopupMessage, PopupMessageTypes } from './PopupMessage';

function LoginComponent({ onSubmit, error, handleClosing }) {
  const {
    register,
    handleSubmit,
    errors,
    formState,
  } = useForm({
    mode: 'onChange',
  });

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <InputTextField
          placeholder="Username"
          name="email"
          type="email"
          register={register({
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Please enter valid username',
            },
            required: 'Please provide your username',
          })}
          error={errors.email}
        />
        <InputTextField
          placeholder="Password"
          type="password"
          name="password"
          register={register({ required: 'Please provide your password' })}
          error={errors.password}
        />
        <div className={styles.remember}>
          <input
            className="checkbox"
            type="checkbox"
            name="remember"
            ref={register}
          />
          <label htmlFor="remember"><span>Remember me</span></label>
        </div>
        <button type="submit" disabled={!formState.isValid}>Login</button>
      </form>
      <div className={styles.register}>
        <h2>Don&apos;t have an account?</h2>
        <Link to='/register'><h2 className="link">Register here</h2></Link>
      </div>
      {error && <PopupMessage type={PopupMessageTypes.ERROR} message={error} handleClose={handleClosing} />}
    </div>
  );
}

export const LoginForm = observer(LoginComponent);
