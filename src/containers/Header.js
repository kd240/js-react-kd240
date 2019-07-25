import React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import { appContext } from '../state/appContext';

import styles from './Header.module.scss';

function HeaderContainer({ history }) {
  const { appState } = React.useContext(appContext);

  const handleLogout = action(function() {
    appState.firstName = '';
    appState.sessionToken = '';
    localStorage.setItem('sessionToken', '');
    localStorage.setItem('sessionName', '');
    localStorage.setItem('remember', '');
    sessionStorage.setItem('sessionToken', '');
    sessionStorage.setItem('sessionName', '');
    sessionStorage.setItem('loged', '');
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
