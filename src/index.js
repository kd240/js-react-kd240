import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useLocalStorage } from 'react-use';
import './style.css';
import { async } from 'q';

function HelloWorld() {
  const [session, setSession] = useLocalStorage('session', "");
  const [loggedIn, setLoggedIn] = useState(session);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edit, setEdit] = useState(false);
  const [editFName, setEditFName] = useState(loggedIn ? session.user.first_name : "");
  const [editLName, setEditLName] = useState(loggedIn ? session.user.last_name : "");
  const [editEmail, setEditEmail] = useState(loggedIn ? session.user.email : "");
  const [editPassword, setEditPassword] = useState("");
  const [editPasswordA, setEditPasswordA] = useState("");
  const [addBooking, setAddBooking] = useState(false);
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchFlights() {
      const options = {
        "headers": {
          "Authorization": session.token,
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      };
      await fetch('https://flighter-hw7.herokuapp.com/api/flights', options)
        .then(res => res.ok ? res.json() : new Error("Failed!"))
        .then(res => {
          setFlights(res.flights);
        })
        .catch(err => console.error(err));
    }
    fetchFlights()
  }, []);

  async function logIn() {
    const options = {
      "method": "POST",
      "body": JSON.stringify({
        "session": {
          "email": email,
          "password": password
        }
      }),
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    };
    await fetch('https://flighter-hw7.herokuapp.com/api/session', options)
      .then(res => res.ok ? res.json() : new Error("Failed!"))
      .then(res => {
        if (res.session) {
          setSession(res.session);
          setLoggedIn(true);
          setEditFName(session.user.first_name);
          setEditLName(session.user.last_name);
          setEditEmail(session.user.email);
        }
      })
      .catch(err => console.error(err));
  }

  function logOut() {
    window.localStorage.removeItem('session');
    window.location.reload()
  }

  async function editData() {
    if (editPassword !== editPasswordA) alert("Passwords don't match");
    else {
      const options = {
        "method": "PUT",
        "body": JSON.stringify({
          "user": {
            "email": editEmail,
            "first_name": editFName,
            "last_name": editLName,
            "password": editPassword
          }
        }),
        "headers": {
          "Authorization": session.token,
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      };
      await fetch(`https://flighter-hw7.herokuapp.com/api/users/${session.user.id}`, options)
        .then(res => res.ok ? res.json() : new Error("Failed!"))
        .then(res => {
          console.log(res);
          setSession({ "token": session.token, "user": res.user });
          alert("User updated!");
        })
        .catch(err => console.error(err));
    }
  }

  async function getBookings(){
    const options = {
      "method": "GET",
      "headers": {
        "Authorization": session.token,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    };
    await fetch('https://flighter-hw7.herokuapp.com/api/bookings', options)
      .then(res => res.ok ? res.json() : new Error("Failed!"))
      .then(res => {
        console.log(res)
        if(res.bookings.length === 0) alert('No bookings!');
        setBookings(res.bookings);
      })
      .catch(err => console.error(err));
  }

  async function onClickAddBooking(id) {
    const options = {
      "method": "POST",
      "body": JSON.stringify({
        "booking": {
          "no_of_seats": document.getElementById(id).value,
          "flight_id": id
        }
      }),
      "headers": {
        "Authorization": session.token,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    };
    await fetch('https://flighter-hw7.herokuapp.com/api/bookings', options)
      .then(res => res.ok ? res.json() : new Error("Failed!"))
      .then(res => {
        console.log(res)
      })
      .catch(err => console.error(err));
    getBookings();
  }

  async function onClickRemoveBooking(id) {
    const options = {
      "method": "DELETE",
      "headers": {
        "Authorization": session.token,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    };
    await fetch(`https://flighter-hw7.herokuapp.com/api/bookings/${id}`, options)
      .then(res => res.ok ? res.json() : new Error("Failed!"))
      .then(res => {
        console.log(res)
        getBookings();
      })
      .catch(err => console.error(err));
    getBookings();
  }

  return (
    <div>
      {!loggedIn && (
        <div id="logIn">
          <input id="email" type="email" name="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
          <input id="password" type="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
          <button onClick={logIn}>Log in!</button>
        </div>
      )}
      {loggedIn && (
        <div id="wrapper">
          <div id="userInfo">
            <h1>Hi {session.user.first_name} {session.user.last_name}<span className="id">#{session.user.id} ({session.user.email})</span><button name="edit" onClick={() => setEdit(!edit)} title="Edit your setting"><img src="https://image.flaticon.com/icons/png/512/40/40031.png" height="25pt" /></button></h1>
            {edit && (
              <div id="edit">
                <div id="firstName">
                  <span>first name</span>
                  <input name="first_name" onChange={e => setEditFName(e.target.value)} value={editFName}></input>
                </div>
                <div id="lastName">
                  <span>last name</span>
                  <input name="last_name" onChange={e => setEditLName(e.target.value)} value={editLName}></input>
                </div>
                <div id="email">
                  <span>email</span>
                  <input type="email" name="email" onChange={e => setEditEmail(e.target.value)} value={editEmail}></input>
                </div>
                <div id="password">
                  <span>password</span>
                  <input type="password" name="first_name" onChange={e => setEditPassword(e.target.value)} value={editPassword}></input>
                </div>
                <div id="passwordAgain">
                  <span>password (again)</span>
                  <input type="password" name="first_name" onChange={e => setEditPasswordA(e.target.value)} value={editPasswordA}></input>
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
                  {bookings.map(booking => (
                    <li key={booking.id}>
                      {booking.flight.name} {/* <span className="showInfo">Show info</span> */} <span className="remove" onClick={onClickRemoveBooking.bind(this, booking.id)}>Remove booking</span>
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
                  {flights.map(flight => (
                    <li key={flight.id}>
                      {flight.name} <input placeholder="No. of seats" id={flight.id}></input> <span className="add" onClick={onClickAddBooking.bind(this, flight.id)}>Add flight</span>
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
