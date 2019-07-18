import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Landing } from './containers/Landing';
import { Login } from './containers/LoginContainer';
import { FligthDetails } from './containers/FligthDetails';
import { PrivateRoute } from './containers/PrivateRoute';

import './styles/index.css';
import { appState } from './state/appState';
import { Register } from './containers/RegisterContainer';

export function AppComponent() {
  const isLogged = !!appState.sessionToken;

  return (
    <Router>
      <PrivateRoute isLogged={isLogged} exact path="/" Component={Landing} />
      <Route path="/login" component={Login} />
      <PrivateRoute isLogged={!isLogged} path="/register" Component={Register} />
      <PrivateRoute isLogged={isLogged} path="/flight/:id" Component={FligthDetails} />
    </Router>
  );
}

export const App = observer(AppComponent);

ReactDOM.render(<App />, document.getElementById('root'));
