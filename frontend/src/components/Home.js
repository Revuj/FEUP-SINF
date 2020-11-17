import React from 'react';
import Login from './Login';
import Koala from '../assets/honey.svg';
import '../styles/Home.css';

function Home() {
  return (
    <div id="home-page">
      <span>
        <img id="logo" src={Koala} alt="koala logo" />
        <h2 id="title">Bee</h2>
      </span>
      <Login />
    </div>
  );
}

export default Home;
