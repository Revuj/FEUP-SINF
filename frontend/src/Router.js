import { React, useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home'
import Overview from './components/Overview';
import Financial from './components/Financial';
import Sales from './components/Sales';
import Inventory from './components/Inventory';
import Procurement from './components/Procurement';
import Customer from './components/Customer/Customer';
import Supplier from './components/Supplier/Supplier';
import Product from './components/Product/Product';
import { AuthContext } from './context';


const PrivateRoute = ({ children, ...rest }) => {

    const loggedIn = localStorage.getItem('auth-token') || false;
  
    return (
      <Route {...rest} render={ function () {
        return loggedIn
          ? children
          : <Redirect to="/" />;
      }}
      />
    );
  };

const Router = () => {

    const loggedIn = localStorage.getItem('auth-token') || false;
  
    return (
      <BrowserRouter>
        <Switch>
          {/* General Routes */}
          <Route exact path="/">
            {loggedIn ? <Redirect to="/overview" /> : <Home />}
          </Route>
          <PrivateRoute exact path="/overview">
            <Overview />
          </PrivateRoute>
          <PrivateRoute exact path="/financial">
            <Financial />
          </PrivateRoute>
          <PrivateRoute exact path="/sales">
            <Sales />
          </PrivateRoute>
          <PrivateRoute exact path="/inventory">
            <Inventory />
          </PrivateRoute>
          <PrivateRoute exact path="/procurement">
            <Procurement />
          </PrivateRoute>
          <PrivateRoute exact path="/customer/:id">
            <Customer />
          </PrivateRoute>
          <PrivateRoute exact path="/supplier/:id">
            <Supplier />
          </PrivateRoute>
          <PrivateRoute exact path="/product/:id">
            <Product />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Router;
  