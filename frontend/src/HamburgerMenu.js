import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBoxOpen, faMoneyBill, faBell, faSignOutAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const HamburgerMenu = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
        navigate('/', { replace: true });
    };

    return (
        <div className="relative">
            <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-blue-700 lg:flex-col md:flex-col sm:flex-row justify-between items-center p-4">
                {/* Home */}
                <Link to="/HomePage" className="hover:bg-purple-700 hover:rounded-2xl flex items-center text-white md:inline lg:inline-block mb-4 lg:mr-4 m-4">
                    <FontAwesomeIcon icon={faHome} className="text-white text-2xl" />
                    <span className="ml-2">Home</span>
                </Link>

                {/* Inventory */}
                <Link to="/Inventory" className="hover:bg-purple-700 hover:rounded-2xl flex items-center text-white md:inline lg:inline-block mb-4 lg:mr-4 m-4">
                    <FontAwesomeIcon icon={faBoxOpen} className="text-white text-2xl" />
                    <span className="ml-2">Inventory</span>
                </Link>

                {/* Billing */}
                <Link to="/Billing" className="hover:bg-purple-700 hover:rounded-2xl flex items-center text-white md:inline lg:inline-block mb-4 lg:mr-4 m-4">
                    <FontAwesomeIcon icon={faMoneyBill} className="text-white text-2xl" />
                    <span className="ml-2">Billing</span>
                </Link>

                {/* Notification */}
                <Link to="/Notification" className="hover:bg-purple-700 hover:rounded-2xl flex items-center text-white md:inline lg:inline-block mb-4 lg:mr-4 m-4">
                    <FontAwesomeIcon icon={faBell} className="text-white text-2xl" />
                    <span className="ml-2">Notification</span>
                </Link>

                {/* Transactions */}
                <Link to="/Transactions" className="hover:bg-purple-700 hover:rounded-2xl flex items-center text-white md:inline lg:inline-block mb-4 lg:mr-4 m-4">
                    <FontAwesomeIcon icon={faShoppingCart} className="text-white text-2xl" />
                    <span className="ml-2">Transactions</span>
                </Link>

                {/* Logout */}
                <button onClick={handleLogout} className="hover:bg-purple-700 hover:rounded-2xl flex items-center text-white md:inline lg:inline-block mb-4 lg:mr-4 m-4">
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-white text-2xl" />
                    <span className="ml-2">Logout</span>
                </button>
            </div>
            <div id="google_translate_element" className="absolute top-0 right-0 m-4"></div>
        </div>
    );
};

export default HamburgerMenu;
