import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useLocalStorage } from 'react-use';

function HelloWorld() {
  const [sessionId, setSessionId] = useLocalStorage('sessionId', "");
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function logIn(e) {
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
      if(res.session) {
        setSessionId(res.session);
        setLoggedIn(true);
      }
    })
    .catch(err => console.error(err));
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
        <p>Hi!</p>
      )}
    </div>
  );
}

ReactDOM.render(<HelloWorld />, document.getElementById('root'));
