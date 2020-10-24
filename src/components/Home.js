import React from 'react';
import Login from './Login';
import Koala from '../assets/koala.svg';
import '../styles/Home.css';

function Home() {
  return (
    <div id="home-page">
      <img id="logo" src={Koala} alt="koala logo" />
      <Login />
    </div>
  );
}

export default Home;
