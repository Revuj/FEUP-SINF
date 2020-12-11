import { React, useState, useEffect, Fragment } from 'react';
import { firebase } from './firebase/config';
import { AuthContext } from './context';

import Router from './Router';

import './styles/App.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const login = () => {
    setLoggedIn(true);
  };
  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <Fragment>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          login: login,
          logout: logout,
        }}
      >
      <Router />
      </AuthContext.Provider>
    </Fragment>
  );
}

export default App;
