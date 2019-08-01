import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import styles from './Error404.module.scss';

function Error404Component() {
  return (
    <div className={styles.error404}>
      <h1>Error 404</h1>
      <p>Page you are looking for cannot be found!<br /> Please go to landing!</p>
      <Link to="/"><button>Go to landing</button></Link>
    </div>
  );
}

export const Error404 = observer(Error404Component);
