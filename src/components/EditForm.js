import React from 'react';
import { observer } from 'mobx-react';
import useForm from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

import { InputTextField } from '../components/InputTextField';

function EditFormComponent({ onSubmit }) {
  const {
    register, handleSubmit, errors, getValues,
  } = useForm();

  const { getInputProps, getRootProps } = useDropzone();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Edit profile</h1>
      <div {...getRootProps}>
        <p>DropdownArea</p>
        <input id="selectPhoto" name="selectPhoto" {...getInputProps} />
        <label htmlFor="selectPhoto">Change photo</label>
      </div>
      <div>
        <label htmlFor="firstName">First name</label>
        <InputTextField
          error={errors.firstName}
          register={register({ required: 'This field is required' })}
          id="firstName"
          name="firstName"
        />
      </div>
      <div>
        <label htmlFor="lastName">Last name</label>
        <InputTextField
          error={errors.lastName}
          register={register({ required: 'This field is required' })}
          id="lastName"
          name="lastName"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <InputTextField
          error={errors.email}
          register={register({ required: 'This field is required' })}
          id="email"
          name="email"
        />
      </div>
      <div>
        <label htmlFor="oldPassword">Old password</label>
        <InputTextField
          error={errors.oldPassword}
          register={register({ required: 'This field is required' })}
          type="password"
          id="oldPassword"
          name="oldPassword"
        />
      </div>
      <div>
        <label htmlFor="newPassword">New password</label>
        <InputTextField
          error={errors.newPassword}
          register={register({ required: 'This field is required' })}
          type="password"
          id="newPassword"
          name="newPassword"
        />
      </div>
      <div>
        <label htmlFor="newPasswordConfirm">Confirm password</label>
        <InputTextField
          error={errors.newPasswordConfirm}
          register={register({
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passords do not match',
          })}
          type="password"
          id="newPasswordConfirm"
          name="newPasswordConfirm"
        />
      </div>
      <button type="submit">Save changes</button>
    </form>
  );
}

export const EditForm = observer(EditFormComponent);
