import React from 'react';
import { Link } from 'react-router-dom';

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
          <Link to='/login'>
            <button>Login</button>
          </Link>
          <Link to='/register'>
            <button>Register</button>
          </Link>
        </div>
      )}
    </div>
  );
}
