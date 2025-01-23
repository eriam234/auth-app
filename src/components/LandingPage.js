import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LandingPage() {
  const { isAuthenticated, handleMetaMaskLogin, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/hello-world');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="landing-container">
      <h1>Welcome to Auth App</h1>
      {error && <div className="error-message">{error}</div>}
      <button
        onClick={handleMetaMaskLogin}
        className="auth-button metamask"
      >
        Sign in with MetaMask
      </button>
    </div>
  );
}