import React from 'react';
import { observer } from 'mobx-react';

import styles from './InputTextField.module.scss';

function InputTextFieldComponent({
  register,
  error,
  ...rest
}) {

  return (
    <div className={styles.userInput}>
      <input
        autoComplete="off"
        valid={error ? 'no' : 'yes'}
        ref={register}
        {...rest}
      />
      {error && (
        <p className={styles.error}>
          {error.message}
        </p>
      )}
    </div>
  );
}

export const InputTextField = observer(InputTextFieldComponent);
