import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { firebase } from './firebase/config';
import { AuthContext } from './context';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Product from './components/Product/Product';
import Customer from './components/Customer/Customer';
import Supplier from './components/Supplier/Supplier';

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
    <Router>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          login: login,
          logout: logout,
        }}
      >
        {/* <Navbar /> */}
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/product" exact component={Product} />
        <Route path="/customer" exact component={Customer} />
        <Route path="/supplier" exact component={Supplier} />
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
