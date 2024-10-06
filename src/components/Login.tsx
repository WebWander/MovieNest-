import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { login, register } = useAuth();
  const [isSigningUp, setIsSigningUp] = useState<boolean>(() => {
    // Determine whether to show login or sign up based on the current path
    return window.location.pathname === '/signup';
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isSigningUp) {
        if (!username) {
          setErrorMessage('Please enter a username');
          return;
        }
        const response = await register(email, password, username);
        if (response.success) {
          navigate('/login');
        } else {
          setErrorMessage(response.msg ?? 'An error occurred. Please try again later.');
        }
      } else {
        const response = await login(email, password);
        if (response.success) {
          navigate('/');
        } else {
          setErrorMessage(response.msg ?? 'An error occurred. Please try again later.');
        }
      }
    } catch (error: any) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">{isSigningUp ? 'Sign Up' : 'Log In'}</h2>

        {errorMessage && (
          <div className="bg-red-600 text-white p-2 mb-4 rounded">
            {errorMessage}
          </div>
        )}

        {isSigningUp && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 rounded focus:outline-none"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded focus:outline-none"
        />
        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-blue-600 rounded hover:bg-blue-500 transition-colors"
        >
          {isSigningUp ? 'Sign Up' : 'Log In'}
        </button>

        <div className="mt-4 text-center">
          {isSigningUp ? (
            <>
              <span>Already have an account? </span>
              <button
                onClick={() => {
                  setIsSigningUp(false);
                  setErrorMessage(null);
                  navigate('/login'); // Update the URL to /login
                }}
                className="text-blue-400 hover:underline"
              >
                Log In
              </button>
            </>
          ) : (
            <>
              <span>Don't have an account? </span>
              <button
                onClick={() => {
                  setIsSigningUp(true);
                  setErrorMessage(null);
                  navigate('/signup'); 
                }}
                className="text-blue-400 hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
