import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const response = await register(email, password, username);
    if (response.success) {
      navigate('/login');
    } else {
      setErrorMessage(response.msg ?? 'An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>

        {errorMessage && (
          <div className="bg-red-600 text-white p-2 mb-4 rounded">
            {errorMessage}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded focus:outline-none"
        />
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
          onClick={handleSignUp}
          className="w-full p-2 bg-blue-600 rounded hover:bg-blue-500 transition-colors"
        >
          Sign Up
        </button>

        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <button
            onClick={() => {
              setErrorMessage(null);
              navigate('/login');
            }}
            className="text-blue-400 hover:underline"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
