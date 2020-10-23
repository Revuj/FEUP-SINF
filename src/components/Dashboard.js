import { React, useContext } from 'react';
import { AuthContext } from '../context';

function Dashboard() {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <h1>Que bonito crlh 🎨</h1>
      {console.log(authContext)}
      {authContext.isLoggedIn ? (
        <h2>Bem vindo mano loggado 🚬</h2>
      ) : (
        <h2>Já te disse pa dar login crlh 🔫</h2>
      )}
    </div>
  );
}

export default Dashboard;
