import { React, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthContext } from './context';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

import './styles/App.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const login = () => {
    setLoggedIn(true);
  };
  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <AuthContext.Provider
        value={{ isLoggedIn, login: login, logout: logout }}
      >
        {/* <Navbar /> */}
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
