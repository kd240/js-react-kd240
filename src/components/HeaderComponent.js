import React from 'react';

import '../styles/header.css';

export function HeaderComponent({ handleLogout, firstName }) {
  return (
    <div className="header-wrapper">
      <p>Hi, {firstName}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

