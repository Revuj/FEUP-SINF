import { React, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthContext } from './context';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

import './App.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const login = () => {
    setLoggedIn(true);
    console.log('login');
  };
  const logout = () => {
    setLoggedIn(false);
    console.log('logout');
  };

  return (
    <Router>
      <AuthContext.Provider
        value={{ isLoggedIn, login: login, logout: logout }}
      >
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
