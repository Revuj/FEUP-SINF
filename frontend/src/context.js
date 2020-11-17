import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  accessToken: null,
  setAccessToken: () => {},
});

export { AuthContext };
