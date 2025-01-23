import { useAuth } from '../contexts/AuthContext';

export default function LandingPage() {
  const { loginOAuth, loginWallet } = useAuth();

  const handleOAuth = () => {
    // TODO: Implement OAuth flow
    loginOAuth('dummy-token');
  };

  const handleMetaMask = async () => {
    try {
      if (!window.ethereum) throw new Error('Wallet not found');
      // TODO: Implement full wallet connection
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      loginWallet(accounts[0]);
    } catch (error) {
      console.error('Wallet error:', error);
    }
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Auth App</h1>
      <button onClick={handleOAuth}>Sign in with OAuth2</button>
      <button onClick={handleMetaMask}>Sign in with MetaMask</button>
    </div>
  );
}