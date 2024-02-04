// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './SignupForm';
import HomePage from './HomePage';
import Billing from './Billing';
import Profile from './Profile';
import Inventory from './Inventory';
import Notification from './Notification';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm onLogin={handleLogin} />} />
        {isLoggedIn ? (
          <>
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/Billing" element={<Billing />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Inventory" element={<Inventory />} />
            <Route path="/Notification" element={<Notification />} />
          </>
        ) : (
          <Route path="/" element={<Navigate to="/SignupForm" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
