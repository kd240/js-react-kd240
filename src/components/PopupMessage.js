import React from 'react';
import { observer } from 'mobx-react';

import styles from './PopupMessage.module.scss';

export const PopupMessageTypes = {
  ERROR: 'error',
  SUCCESS: 'success',
};

function PopupMessageComponent({
  type,
  handleClose,
  message,
}) {

  return (
    <div className={styles[type]}>
      <span onClick={handleClose}>&#x2716;</span> {/* eslint-disable-line */}
      <p>{message}</p>
    </div>
  );
}

export const PopupMessage = observer(PopupMessageComponent);
