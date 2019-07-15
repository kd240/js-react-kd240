import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSessionStorage, useLocalStorage } from 'react-use';

import '../styles/header.css';

export function Header() {
  const [sessionS, setSessionS] = useSessionStorage('session', '');
  const [sessionL, setSessionL] = useLocalStorage('session', '');
  
  function getName() {
    if (sessionL) {
      return sessionL.user.first_name;
    } else if (sessionS) {
      return sessionS.user.first_name;
    } return '';
  }
  
  function handleLogout() {
    setSessionL('');
    setSessionS('');
  }

  return (
    <div className="header-wrapper">
      {(sessionL || sessionS) ? (
        <div>
          <p>Hi, {getName()}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Redirect to='/login' />
      )}
    </div>
  );
}
