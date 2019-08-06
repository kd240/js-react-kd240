import React from 'react';
import { observer } from 'mobx-react';
import useForm from 'react-hook-form';

import { EditForm } from '../components/EditForm';

import styles from './EditUser.module.scss';

function EditContainer({
  reference, onSubmit, userData, message,
}) {
  const form = useForm();
  const [imgSrc, setImgSrc] = React.useState(userData.image_url ||
      'http://monumentfamilydentistry.com/wp-content/uploads/2015/11/user-placeholder.png');

  function onFileDrop(files) {
    setImgSrc(URL.createObjectURL(files[0]));
    form.setValue('selectPhoto', files[0]);
  }

  React.useEffect(() => {
    form.register({ name: 'selectPhoto' });
  }, [form]);

  return (
    <div className={styles.editForm}>
      <EditForm
        onDrop={onFileDrop}
        useForm={form}
        reference={reference}
        onSubmit={onSubmit}
        user={userData}
        userImg={imgSrc}
        message={message}
      />
    </div>
  );
}

export const EditUser = observer(EditContainer);
