import React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { useKeyPressEvent } from 'react-use';

import { logOut } from '../services/user';
import { appContext } from '../state/appContext';

import styles from './Header.module.scss';

function HeaderContainer({ history }) {
  const { appState } = React.useContext(appContext);
  useKeyPressEvent('u', () => history.push('/user'));

  const handleLogout = action(function() {
    logOut(appState);
  });

  function goToLanding() {
    history.push('/');
  }

  return (
    <div className={styles.header} role="presentation" onClick={goToLanding}>
      <p>Hi, {appState.firstName}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export const Header = observer(HeaderContainer);
