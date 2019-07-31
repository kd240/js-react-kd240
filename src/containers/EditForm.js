import React from 'react';
import { observer } from 'mobx-react';
import useForm from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

import { InputTextField } from '../components/InputTextField';
import { PopupMessage } from '../components/PopupMessage';

import styles from './EditForm.module.scss';

function EditFormComponent({ reference, onSubmit, userData, message }) {
  const {
    register, handleSubmit, errors, getValues, setValue,
  } = useForm();
  const [imgSrc, setImgSrc] = React.useState(userData.image_url ||
      'http://monumentfamilydentistry.com/wp-content/uploads/2015/11/user-placeholder.png');

  function onDrop(files) {
    setImgSrc(URL.createObjectURL(files[0]));
    setValue('selectPhoto', files[0]);
  }

  React.useEffect(() => {
    register({ name: 'selectPhoto' });
  }, [register]);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
  });

  return (
    <div className={styles.editForm}>
      <form ref={reference} onSubmit={handleSubmit(onSubmit)}>
        <h1>Edit profile</h1>
        <div className={styles.dropdown} {...getRootProps()}>
          <img alt="Profile" src={imgSrc} />
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
            register={register({ required: 'This field is required' })}
            id="firstName"
            name="firstName"
            defaultValue={userData.first_name}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last name</label>
          <InputTextField
            error={errors.lastName}
            register={register({ required: 'This field is required' })}
            id="lastName"
            name="lastName"
            defaultValue={userData.last_name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <InputTextField
            error={errors.email}
            register={register({ required: 'This field is required' })}
            id="email"
            name="email"
            defaultValue={userData.email}
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
        {message.show && <PopupMessage type={message.type} message={message.message} handleClose={message.onClose} />}
      </form>
    </div>
  );
}

export const EditForm = observer(EditFormComponent);
