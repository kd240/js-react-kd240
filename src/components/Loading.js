import React from 'react';
import { observer } from 'mobx-react';

import styles from './Loading.module.scss'

function LoadingComponent() {
  return (
    <div className={styles.loading}>
      <div className={styles.circle} />
      <div className={styles.circle} />
      <div className={styles.circle} />
    </div>
  );
}

export const Loading = observer(LoadingComponent);
