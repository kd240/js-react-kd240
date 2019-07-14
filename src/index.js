import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Landing } from './containers/Landing';
import { Login } from './containers/Login';
import { Register } from './containers/Register';
import { FligthDetails } from './containers/FligthDetails';
import { PrivateRoute } from './containers/PrivateRoute';
import { useSessionStorage, useLocalStorage } from 'react-use';


export function App() {
  const [sessionS, setSessionS ] = useSessionStorage('session', '');
  const [sessionL, setSessionL ] = useLocalStorage('session', '');
  const isLogged = sessionS || sessionL;

  return (
    <Router>
      <PrivateRoute isLogged={isLogged} exact path="/" Component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute isLoggeed={isLogged} path="/flight/:id" Component={FligthDetails} />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
