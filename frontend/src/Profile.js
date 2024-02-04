import React, { useState, useEffect } from 'react';

import HamburgerMenu from './HamburgerMenu';

const Profile = () => {
  const [userData, setUserData] = useState({}); // assuming the user data is an object

  useEffect(() => {
    // Mock API call
    // Replace the URL with your actual API endpoint
    fetch('https://api.example.com/user/profile')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns an object with user profile data
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []); // Execute the effect only once when the component mounts

  return (
    <div>
        <HamburgerMenu />
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Profile</h2>

      {/* Display User Profile Data */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <p className="mt-1 p-2 border rounded-md">{userData.name}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <p className="mt-1 p-2 border rounded-md">{userData.age}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Shop Name</label>
        <p className="mt-1 p-2 border rounded-md">{userData.shopName}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <p className="mt-1 p-2 border rounded-md">{userData.address}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <p className="mt-1 p-2 border rounded-md">{userData.email}</p>
      </div>
      </div>
    </div>
  );
};

export default Profile;
