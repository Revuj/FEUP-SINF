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

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(() => {
      console.log(user);
      history.push('/');
    });
    authContext.login();
  };

  const signInWithEmailAndPassword = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        console.log(user);
        history.push('/dashboard');
      });
    authContext.login();
  };

  return (
    <div id="login-container">
      <span id="login-left">
        <h2 id="welcome-message">Welcome Back</h2>
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
          <button
            className="primary-button gray-background"
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>
        </div>
      </span>
      <span id="login-right">
        <h1 id="login-koala" className="clear-text">
          Koala
        </h1>
      </span>
    </div>
  );
}

export default Login;
