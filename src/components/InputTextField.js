import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import styles from './InputTextField.module.scss';

function InputTextFieldComponent({
  placeholder,
  type,
  name,
  value,
  onChange,
  error,
}) {

  return (
    <Fragment>
      <input
        className={styles.input}
        placeholder={placeholder || ''}
        type={type || 'text'}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && (
        <div className={styles.error}>
          <p>
            {error}
          </p>
        </div>
      )}
    </Fragment>
  );
}

export const InputTextField = observer(InputTextFieldComponent);
