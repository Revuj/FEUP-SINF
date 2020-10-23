import React from 'react';
import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Test</h1>
      </header>
    </div>
  );
}

export default App;
