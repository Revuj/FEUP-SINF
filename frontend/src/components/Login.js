import { React, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { firebase, auth } from '../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuthContext } from '../context';

import '../styles/Login.css';

function Login() {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const [user] = useAuthState(auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signInWithEmailAndPassword = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(async () => {
        //console.log(user);
        authContext.login();
        localStorage.setItem('auth-token', 'TOKEN');
        history.push('/overview');
      });
  };

  return (
    <div id="login-container">
      <span id="login-left">
        <h2 id="welcome-message">Welcome</h2>
        <div>
          <p className="login-field">Email</p>
          <input
            className="login-input"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <p className="login-field">Password</p>
          <input
            className="login-input"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button
            className="primary-button blue-background clear-text"
            onClick={() => {
              signInWithEmailAndPassword();
            }}
          >
            Login
          </button>
        </div>
      </span>
    </div>
  );
}

export default Login;
