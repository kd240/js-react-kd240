import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { PrivateRoute } from './containers/PrivateRoute';
import { Landing } from './containers/Landing';
import { Login } from './containers/Login';
import { Register } from './containers/Register';


export function App() {
  const { session, setSession } = useLocalStorage('session', '');

  return (
    <Router>
      <Route exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
