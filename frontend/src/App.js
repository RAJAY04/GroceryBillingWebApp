// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importing js-cookie library
import SignupForm from './SignupForm';
import HomePage from './HomePage';
import Billing from './Billing';
import Profile from './Profile';
import Inventory from './Inventory';
import Notification from './Notification';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Function to handle user login
  const handleLogin = () => {
    setLoggedIn(true);
    Cookies.set('isLoggedIn', 'true', { expires: 1 }); // Set isLoggedIn cookie with expiry of 1 day
  };

  // Function to handle user logout
  const handleLogout = () => {
    setLoggedIn(false);
    Cookies.remove('isLoggedIn'); // Remove isLoggedIn cookie
  };

  // Effect to check isLoggedIn cookie on component mount
  useEffect(() => {
    const isLoggedInCookie = Cookies.get('isLoggedIn');
    if (isLoggedInCookie === 'true') {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm onLogin={handleLogin} />} />
        <Route path="/HomePage" element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/" replace />} />
        <Route path="/Billing" element={<Billing />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Notification" element={<Notification />} />
      </Routes>
    </Router>
  );
};

export default App;
