import { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    accessToken: null,
    walletAddress: null
  });
  const [error, setError] = useState(null);

  const loginOAuth = (token) => {
    setAuthState({
      isAuthenticated: true,
      accessToken: token,
      walletAddress: null
    });
  };

  const handleMetaMaskLogin = async () => {
    try {
      setError(null);
      
      if (!window.ethereum) {
        throw new Error('MetaMask not installed');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // Request signature for authentication
      const message = `Authenticate to Hello World App: ${Date.now()}`;
      const signature = await signer.signMessage(message);

      // Basic signature verification (should be server-side in production)
      const verifiedAddress = ethers.verifyMessage(message, signature);
      if (verifiedAddress.toLowerCase() !== address.toLowerCase()) {
        throw new Error('Signature verification failed');
      }

      setAuthState({
        isAuthenticated: true,
        accessToken: null,
        walletAddress: address
      });

    } catch (err) {
      setError(err.message);
      if (err.code === 4001) { // User rejected request
        setError('Login canceled by user');
      }
      throw err;
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
      walletAddress: null
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      error,
      loginOAuth,
      handleMetaMaskLogin,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);