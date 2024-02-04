// SignupForm.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Get form input values
    const fullName = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const shopName = document.getElementById('shopName').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;

    // Check if required fields are filled
    if (!fullName || !age || !shopName || !address || !email) {
      // Display an alert or handle the validation error as needed
      alert('Please fill in all required fields.');
      return;
    }

    // Perform signup logic if needed

    // Trigger the login
    if (onLogin) {
      onLogin();
    }

    // Redirect to the home page after signup
    navigate('/HomePage'); // Navigate to the child page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-d4ceb0">
      <div className="bg-first-color p-8 rounded-md w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-second-color">Sign Up</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-third-color">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-fourth-color"
            placeholder="Your Full Name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-third-color">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-fourth-color"
            placeholder="Your Age"
            min="18"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="shopName" className="block text-sm font-medium text-third-color">
            Shop Name
          </label>
          <input
            type="text"
            id="shopName"
            name="shopName"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-fourth-color"
            placeholder="Your Shop Name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-third-color">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows="3"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-fourth-color"
            placeholder="Your Address"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-third-color">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-fourth-color"
            placeholder="Your Email"
          />
        </div>
        <button
          onClick={handleSignUp}
          className="bg-fourth-color text-first-color p-2 rounded-md w-full hover:bg-third-color"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
