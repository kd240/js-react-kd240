import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export function PrivateRoute({ isLogged, Component, ...rest }) {
  function render(props) {
    return isLogged ? <Component {...props} /> : <Redirect to="/login" />;
  }
  return <Route {...rest} render={render} />;
}
