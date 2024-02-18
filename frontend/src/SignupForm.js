import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if username and password are filled
    if (!username || !password) {
      // Display an alert or handle the validation error as needed
      alert('Please fill in both username and password fields.');
      return;
    }

    // Perform login logic if needed

    // Trigger the login
    if (onLogin) {
      onLogin();
    }

    // Redirect to the home page after login
    navigate('/HomePage'); // Navigate to the child page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-d4ceb0">
      <div className="bg-first-color p-8 rounded-md w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-second-color">Login</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-third-color">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-fourth-color"
            placeholder="Your Username"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-third-color">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-fourth-color"
            placeholder="Your Password"
          />
        </div>

        <button
          onClick={handleLogin}
          className="bg-fourth-color text-first-color p-2 rounded-md w-full hover:bg-third-color"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
