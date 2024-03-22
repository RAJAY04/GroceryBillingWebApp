import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    let content = { "usernameOrEmail" : username , "password" : password };
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/signin', {
        method: 'POST',
        body : JSON.stringify(content),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        onLogin();
        navigate('/HomePage');
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-d4ceb0">
      <div className="bg-first-color p-8 rounded-md w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-second-color">Login</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

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

        <div className="mb-4 text-center">
          <a href="http://localhost:3000/Signup" className="text-blue-500 hover:underline">Don't have an account? Sign up here</a>
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
