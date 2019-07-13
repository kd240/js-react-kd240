import React from 'react';

export function Header() {
  const isUserLoggedIn = JSON.parse(localStorage.session).token;
  const firstName = isUserLoggedIn ? JSON.parse(localStorage.session).user.first_name : '';
  
  return (
    <div className="wrapper">
      {isUserLoggedIn ? (
        <div>
          <p>Hi, {firstName}</p>
          <button>Logout</button>
        </div>
      ) : (
        <div>
          <button>Login</button>
          <button>Register</button>
        </div>
      )}
    </div>
  );
}
