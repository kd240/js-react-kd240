import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import { AppContext } from './state/AppContext';
import { PrivateRoute } from './containers/PrivateRoute';
import { Landing } from './containers/Landing';
import { Login } from './containers/Login';
import { Flight } from './containers/Flight';
import { Register } from './containers/RegisterContainer';
import { BookingModal } from './containers/BookingModal';

import './index.scss';

export function AppComponent() {
  
  const { AppState } = React.useContext(AppContext);

  (action(function() {
    if (localStorage.getItem('remember')) {
      AppState.sessionToken = localStorage.getItem('sessionToken');
      AppState.firstName = localStorage.getItem('sessionName');
    } else if (sessionStorage.getItem('loged')) {
      AppState.sessionToken = sessionStorage.getItem('sessionToken');
      AppState.firstName = sessionStorage.getItem('sessionName');
    }
  }))();
  
  const isLogged = AppState.sessionToken;

  return (
    <Router>
      <PrivateRoute isLogged={isLogged} exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute isLogged={isLogged} path="/flight/:id" component={Flight} />
      <PrivateRoute isLogged={isLogged} path="/flight/:id/book" component={BookingModal} />
    </Router>
  );
}

export const App = observer(AppComponent);

ReactDOM.render(<App />, document.getElementById('root'));
