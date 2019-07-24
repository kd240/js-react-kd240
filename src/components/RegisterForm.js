import React from 'react';
import { observer } from 'mobx-react';
import useForm from 'react-hook-form';

import { InputTextField } from './InputTextField';

import styles from './RegisterForm.module.scss';
import message from '../styles/statusMessages.module.scss';

function RegisterComponent({
  onSubmit,
  success,
}) {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    errors,
    formState,
  } = useForm({
    mode: 'onChange',
  });
  
  React.useEffect(() => {
    if (success) {
      Object.keys(getValues()).forEach((key) => setValue(key, ''));
    }
  }, [success]);

  return (
    <div className={styles.register}>
      <h1>Register</h1>
      <form autoComplete="off" className="form" onSubmit={handleSubmit(onSubmit)}>
        <InputTextField
          placeholder="First name"
          name="firstName"
          error={errors.firstName}
          register={register({ required: 'Please provide your first name' })}
        />
        <InputTextField
          placeholder="Last name"
          name="lastName"
          error={errors.lastName}
          register={register({ required: 'Please provide your last name' })}
        />
        <InputTextField
          placeholder="Username"
          name="email"
          error={errors.email}
          register={register({
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Please enter valid username',
            },
            required: 'Please provide your username',
          })}
        />
        <InputTextField
          placeholder="Password"
          type="password"
          name="password"
          register={register({ required: 'Please provide your password' })}
          error={errors.password}
        />
        <InputTextField
          placeholder="Confirm password"
          type="password"
          name="passwordCheck"
          register={register({
            required: 'Please provide your password again',
            validate: (value) => value === getValues().password || 'Passords do not match',
          })}
          error={errors.passwordCheck}
        />
        <button type="submit" disabled={!formState.isValid}>Register</button>
      </form>
      {success && (
        <div className={message.success}>
          <p>User created successfully</p>
          <a href="/login">Go to login</a>
        </div>
      )}
    </div>
  );
}

export const RegisterForm = observer(RegisterComponent);
