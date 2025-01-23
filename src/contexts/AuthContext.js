import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    accessToken: null,
    walletAddress: null
  });

  const loginOAuth = (token) => {
    setAuthState({
      isAuthenticated: true,
      accessToken: token,
      walletAddress: null
    });
  };

  const loginWallet = (address) => {
    setAuthState({
      isAuthenticated: true,
      accessToken: null,
      walletAddress: address
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
      walletAddress: null
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, loginOAuth, loginWallet, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);