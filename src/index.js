/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useLocalStorage, useSetState } from 'react-use';
import './style.css';

function HelloWorld() {
  const [session, setSession] = useLocalStorage('session', '');
  const [loggedIn, setLoggedIn] = useState(session);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edit, setEdit] = useSetState({
    enabled: false,
    firstName: (loggedIn ? session.user.first_name : ''),
    lastName: (loggedIn ? session.user.last_name : ''),
    email: (loggedIn ? session.user.email : ''),
    password: '',
    passwordCheck: '',
  });
  const [addBooking, setAddBooking] = useState(false);
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showBookingInfo, setShowBookingInfo] = useState(false);
  const [bookingInfoData, setBookingInfoData] = useState({});
  const [showFlightInfo, setShowFlightInfo] = useState(false);
  const [flightInfoData, setFlightInfoData] = useState({});

  useEffect(() => {
    async function fetchFlights() {
      const options = {
        headers: {
          Authorization: session.token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };
      await fetch('https://flighter-hw7.herokuapp.com/api/flights', options)
        .then((res) => (res.ok ? res.json() : new Error('Failed!')))
        .then((res) => {
          setFlights(res.flights);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (loggedIn) {
      fetchFlights();
    }
  }, [session]);

  async function logIn() {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        session: {
          email,
          password,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    await fetch('https://flighter-hw7.herokuapp.com/api/session', options)
      .then(async(res) => (res.ok ? res.json() : new Error('Failed!')))
      .then((res) => {
        if (res.session) {
          setSession(res.session);
          setLoggedIn(true);
          setEdit({
            firstName: res.session.user.first_name,
            lastName: res.session.user.last_name,
            email: res.session.user.email,
          });
        } else {
          alert('Incorrect email and/or password!');
        }
      })
      .catch((err) => console.error(err));
  }

  function logOut() {
    window.localStorage.removeItem('session');
    window.location.reload();
  }

  async function editData() {
    if (edit.password !== edit.passwordCheck) {
      alert('Passwords don\'t match');
    } else {
      const options = {
        method: 'PUT',
        body: JSON.stringify({
          user: {
            email: edit.email,
            first_name: edit.firstName,
            last_name: edit.lastName,
            password: edit.password,
          },
        }),
        headers: {
          Authorization: session.token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };
      await fetch(`https://flighter-hw7.herokuapp.com/api/users/${session.user.id}`, options)
        .then((res) => (res.ok ? res.json() : new Error('Failed!')))
        .then((res) => {
          setSession({ 
            token: session.token,
            user: res.user,
          });
          alert('User updated!');
        })
        .catch((err) => console.error(err));
    }
  }

  async function getBookings() {
    const options = {
      method: 'GET',
      headers: {
        Authorization: session.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    await fetch('https://flighter-hw7.herokuapp.com/api/bookings', options)
      .then((res) => (res.ok ? res.json() : new Error('Failed!')))
      .then((res) => {
        console.log(res);
        if (res.bookings.length === 0) {
          alert('No bookings!');
        }
        setBookings(res.bookings);
      })
      .catch((err) => console.error(err));
  }

  async function onClickAddBooking(id, noOfFreeSeats) {
    if (noOfFreeSeats < Number(document.getElementById(id).value)) {
      alert('Not enought seats available!');
      return;
    }
    const options = {
      method: 'POST',
      body: JSON.stringify({
        booking: {
          no_of_seats: document.getElementById(id).value,
          flight_id: id,
        },
      }),
      headers: {
        Authorization: session.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    await fetch('https://flighter-hw7.herokuapp.com/api/bookings', options)
      .then((res) => (res.ok ? res.json() : new Error('Failed!')))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
    getBookings();
  }

  async function onClickRemoveBooking(id) {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: session.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    await fetch(`https://flighter-hw7.herokuapp.com/api/bookings/${id}`, options)
      .then((res) => (res.ok ? res.json() : new Error('Failed!')))
      .then((res) => {
        console.log(res);
        getBookings();
      })
      .catch((err) => console.error(err));
    getBookings();
  }

  async function onClickShowBookingInfo(id) {
    const options = {
      method: 'GET',
      headers: {
        Authorization: session.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    await fetch(`https://flighter-hw7.herokuapp.com/api/bookings/${id}`, options)
      .then((res) => (res.ok ? res.json() : new Error('Failed!')))
      .then((res) => {
        setBookingInfoData(res.booking);
        setShowBookingInfo(true);
        console.log(res.booking);
      })
      .catch((err) => console.error(err));
  }

  async function onClickShowFlightInfo(id) {
    const options = {
      method: 'GET',
      headers: {
        Authorization: session.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    await fetch(`https://flighter-hw7.herokuapp.com/api/flights/${id}`, options)
      .then((res) => (res.ok ? res.json() : new Error('Failed!')))
      .then((res) => {
        console.log(res.flight);
        setFlightInfoData(res.flight);
        setShowFlightInfo(true);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div>
      {!loggedIn && (
        <div id="logIn">
          <input id="email" type="email" name="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input id="password" type="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={logIn}>Log in!</button>
        </div>
      )}
      {loggedIn && (
        <div id="wrapper">
          <div id="userInfo">
            <h1>Hi {session.user.first_name} {session.user.last_name}
              <span className="id">#{session.user.id} ({session.user.email})</span>
              <button name="edit" onClick={() => setEdit({enabled: !edit.enabled})} title="Edit your setting">
                <img alt="Settings" src="https://image.flaticon.com/icons/png/512/40/40031.png" height="25pt" />
              </button>
            </h1>
            {edit.enabled && (
              <div id="edit">
                <div id="firstName">
                  <span>first name</span>
                  <input name="first_name" onChange={(e) => setEdit({firstName: e.target.value})} value={edit.firstName} />
                </div>
                <div id="lastName">
                  <span>last name</span>
                  <input name="last_name" onChange={(e) => setEdit({lastName: e.target.value})} value={edit.lastName} />
                </div>
                <div id="email">
                  <span>email</span>
                  <input type="email" name="email" onChange={(e) => setEdit({email: e.target.value})} value={edit.email} />
                </div>
                <div id="password">
                  <span>password</span>
                  <input type="password" name="first_name" onChange={(e) => setEdit({password: e.target.value})} value={edit.password} />
                </div>
                <div id="passwordAgain">
                  <span>password (again)</span>
                  <input type="password" name="first_name" onChange={(e) => setEdit({passwordCheck: e.target.value})} value={edit.passwordCheck} />
                </div>
                <button onClick={editData}>Edit</button>
              </div>
            )}
          </div>
          <button onClick={logOut}>Log Out</button>
          <hr />
          <div id="booking">
            <h2>Bookings</h2>
            {bookings.length ? (
              <div>
                <ol>
                  {bookings.map((booking) => (
                    <li key={booking.id}>
                      {booking.flight.name}
                      <span className="showInfo" onClick={onClickShowBookingInfo.bind(this, booking.id)}> Show info </span>
                      <span className="remove" onClick={onClickRemoveBooking.bind(this, booking.id)}> Remove booking </span>
                      {showBookingInfo && bookingInfoData.id === booking.id && (
                        <ul>
                          <li>no_of_seats: {bookingInfoData.no_of_seats}</li>
                          <li>seat_price: {bookingInfoData.seat_price}</li>
                          <li>total_price: {bookingInfoData.total_price}</li>
                        </ul>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <button onClick={getBookings}>Get my bookings!</button>
            )}
            <div className="add" onClick={() => setAddBooking(!addBooking)}>Add booking</div>
            {addBooking && (
              <ul>
                {flights.map((flight) => (
                  <li key={flight.id}>
                    {flight.name} <input placeholder="No. of seats" id={flight.id} /> <span className="add" onClick={onClickAddBooking.bind(this, flight.id, (flight.no_of_seats - flight.no_of_booked_seats))}>Add booking</span> <span className="showInfo" onClick={onClickShowFlightInfo.bind(this, flight.id)}>Flight info</span>
                    {showFlightInfo && flightInfoData.id === flight.id && (
                      <ul>
                        <li>company name: {flightInfoData.company_name}#{flightInfoData.company_id}</li>
                        <li>base price: {flightInfoData.base_price}</li>
                        <li>flys at: {flightInfoData.flys_at}</li>
                        <li>lands at: {flightInfoData.lands_at}</li>
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <hr />
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'));
