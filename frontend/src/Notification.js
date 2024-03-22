import React, { useState, useEffect } from 'react';
import HamburgerMenu from './HamburgerMenu';

const NotificationPage = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // Mock API call
    // Replace the URL with your actual API endpoint
    fetch('http://localhost:8080/api/v1/auth/signup')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns an array of products
        setProductData(data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  return (
    <div>
      <HamburgerMenu />
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">Notification</h2>

        {/* Display Product Notifications */}
        {productData.map((product) => {
          const isQuantityBelowRange = product.quantity < product.range;

          return (
            <div key={product.id} className={`bg-first-color p-8 rounded-md mb-4 ${isQuantityBelowRange ? 'border-red-500' : ''}`}>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className={`text-gray-700 mb-2 ${isQuantityBelowRange ? 'text-red-500' : ''}`}>Quantity: {product.quantity}</p>
              <p className="text-gray-700">Price per Unit: ${product.price}</p>
              <p className="text-gray-700">Range: {product.range}</p>
              {isQuantityBelowRange && (
                <div className="mt-2 p-2 bg-red-100 text-red-500 rounded-md">
                  <strong>Alert:</strong> Quantity is below the specified range!
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationPage;
