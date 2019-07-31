import React from 'react';
import { observer } from 'mobx-react';
import { useDropzone } from 'react-dropzone';
import { InputTextField } from './InputTextField';
import { PopupMessage } from './PopupMessage';

import styles from './EditForm.module.scss';

function EditFormComponent({
  onDrop,
  useForm: {
    register, handleSubmit, errors, getValues,
  },
  reference,
  onSubmit,
  user,
  message,
  userImg,
}) {
  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
  });

  return (
    <form
      ref={reference}
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Edit profile</h1>
      <div className={styles.dropdown} {...getRootProps()}>
        <img alt="Profile" src={userImg} />
        <input
          id="selectPhoto"
          name="selectPhoto"
          {...getInputProps()}
          accept="image/*"
        />
        <label htmlFor="selectPhoto">Change photo</label>
      </div>
      <div>
        <label htmlFor="firstName">First name</label>
        <InputTextField
          error={errors.firstName}
          register={register({
            required: 'This field is required',
            validate: (value) => value.length >= 2 || 'Name too short',
          })}
          id="firstName"
          name="firstName"
          defaultValue={user.first_name}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last name</label>
        <InputTextField
          error={errors.lastName}
          register={register({ required: 'This field is required' })}
          id="lastName"
          name="lastName"
          defaultValue={user.last_name}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <InputTextField
          error={errors.email}
          register={register({ required: 'This field is required' })}
          id="email"
          name="email"
          defaultValue={user.email}
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
          register={register}
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
            validate: (value) =>
              value === getValues().newPassword || 'Passords do not match',
          })}
          type="password"
          id="newPasswordConfirm"
          name="newPasswordConfirm"
        />
      </div>
      <button type="submit">Save changes</button>
      {message.show && (
        <PopupMessage
          type={message.type}
          message={message.message}
          handleClose={message.onClose}
        />
      )}
    </form>
  );
}

export const EditForm = observer(EditFormComponent);
