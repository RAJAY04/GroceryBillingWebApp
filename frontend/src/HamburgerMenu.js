import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HamburgerMenu = ({ onLogout }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Call the onLogout function passed as a prop
    if (onLogout) {
      onLogout();
    }
    navigate('/', { replace: true });
  };

  return (
    <div className="bg-ede7cf lg:flex-col md:flex-col sm:flex-row justify-between items-center p-4">
      <Link to="/HomePage" className="hover:bg-d4ceb0 hover:rounded-2xl flex items-center text-black md:inline lg:inline-block mb-4 lg:mr-4 m-4">
        <b>Home</b>
      </Link>

      <Link to="/Inventory" className="hover:bg-d4ceb0 hover:rounded-2xl flex items-center text-black md:inline lg:inline-block mb-4 lg:mr-4 m-4">
        <b>Inventory</b>
      </Link>

      <Link to="/Billing" className="hover:bg-d4ceb0 hover:rounded-2xl flex items-center text-black md:inline lg:inline-block mb-4 lg:mr-4 m-4">
        <b>Billing</b>
      </Link>

      <Link to="/Notification" className="hover:bg-d4ceb0 hover:rounded-2xl flex items-center text-black md:inline lg:inline-block mb-4 lg:mr-4 m-4">
        <b>Notification</b>
      </Link>

      {/* Transactions Button */}
      <Link to="/Transactions" className="hover:bg-d4ceb0 hover:rounded-2xl flex items-center text-black md:inline lg:inline-block mb-4 lg:mr-4 m-4">
        <b>Transactions</b>
      </Link>

      {/* Logout Button */}
      <button onClick={handleLogout} className="hover:bg-d4ceb0 hover:rounded-2xl flex items-center text-black md:inline lg:inline-block mb-4 lg:mr-4 m-4">
        <b>Logout</b>
      </button>

      <div id="google_translate_element"></div>
    </div>
  );
};

export default HamburgerMenu;
