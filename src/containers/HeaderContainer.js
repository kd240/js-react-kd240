import React from 'react';
import { observer } from 'mobx-react';
import { HeaderComponent } from '../components/HeaderComponent';
import { appState } from '../state/appState';

function Header() {

  function handleLogout() {
    appState.firstName = '';
    appState.sessionToken = '';
    localStorage.setItem('sessionToken', '');
    localStorage.setItem('sessionName', '');
  }

  return (
    <HeaderComponent
      handleLogout={handleLogout}
      firstName={appState.firstName}
    />
  )
}

export const HeaderContainer = observer(Header);
