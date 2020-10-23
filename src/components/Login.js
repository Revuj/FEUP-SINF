import { React, useState, useContext } from 'react';
import { firebase, auth } from '../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuthContext } from '../context';

function Login() {
  const authContext = useContext(AuthContext);

  const [user] = useAuthState(auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(() => console.log(user));
    authContext.login();
  };

  const signInWithEmailAndPassword = () => {
    firebase.auth().signInWithEmailAndPassword(username, password);
    authContext.login();
  };

  const signOut = () => {
    auth.signOut();
    authContext.logout();
  };

  return (
    <div>
      {user ? (
        <>
          <h1>Atão manu {user.displayName} tás fixe?</h1>
          <button onClick={signOut}>Rua crlh!</button>
        </>
      ) : (
        <>
          <h1>Bota aí os teus dados oh maninho 🔪</h1>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
          <div>
            <input
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button
              onClick={() => {
                signInWithEmailAndPassword();
              }}
            >
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
