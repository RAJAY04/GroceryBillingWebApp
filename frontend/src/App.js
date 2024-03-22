import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importing js-cookie library
import SignupForm from './SignupForm';
import HomePage from './HomePage';
import Billing from './Billing';
import Inventory from './Inventory';
import Notification from './Notification';
import SignupPage from './SignupPage';
import Transactions from './Transactions'; // Import Transactions component

const App = () => {
  // Initialize isLoggedIn state based on the presence of the isLoggedIn cookie
  const [isLoggedIn, setLoggedIn] = useState(!!Cookies.get('isLoggedIn'));

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm onLogin={handleLogin} />} />
        <Route path="/Signup" element={<SignupPage />} />
        <Route
          path="/HomePage"
          element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/Billing"
          element={isLoggedIn ? <Billing onLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/Inventory"
          element={isLoggedIn ? <Inventory onLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/Notification"
          element={isLoggedIn ? <Notification onLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
        {/* Add Transactions Route */}
        <Route
          path="/Transactions"
          element={isLoggedIn ? <Transactions /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
