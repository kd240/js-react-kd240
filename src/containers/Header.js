import React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import { AppContext } from '../state/appContext';

function HeaderContainer() {

  const { AppState } = React.useContext(AppContext);

  const handleLogout = action(function() {
    AppState.firstName = '';
    AppState.sessionToken = '';
    localStorage.setItem('sessionToken', '');
    localStorage.setItem('sessionName', '');
    localStorage.setItem('remember', '');
    sessionStorage.setItem('sessionToken', '');
    sessionStorage.setItem('sessionName', '');
    sessionStorage.setItem('loged', '');
  });

  return (
    <div className="header-wrapper">
      <p>Hi, {AppState.firstName}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export const Header = observer(HeaderContainer);
