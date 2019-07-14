import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSessionStorage, useLocalStorage } from 'react-use';
import { Landing } from './containers/Landing';
import { Login } from './containers/Login';
import { Register } from './containers/Register';
import { FligthDetails } from './containers/FligthDetails';
import { PrivateRoute } from './containers/PrivateRoute';

export function App() {
  const [sessionS] = useSessionStorage('session', '');
  const [sessionL] = useLocalStorage('session', '');
  const isLogged = Boolean(sessionS || sessionL);

  return (
    <Router>
      <PrivateRoute isLogged={isLogged} exact path="/" Component={Landing} />
      <Route path="/login" component={Login} />
      <PrivateRoute isLogged={!isLogged} path="/register" Component={Register} />
      <PrivateRoute isLogged={isLogged} path="/flight/:id" Component={FligthDetails} />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
