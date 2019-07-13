import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { Landing } from './containers/Landing';
import { Login } from './containers/Login';
import { Register } from './containers/Register';
import { FligthDetails } from './containers/FligthDetails';


export function App() {
  const { session, setSession } = useLocalStorage('session', '');

  return (
    <Router>
      <Route exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/flight/:id" component={FligthDetails} />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
