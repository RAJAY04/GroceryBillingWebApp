import React, { useState, useEffect } from 'react';
import HamburgerMenu from './HamburgerMenu';

// Define base URL for API endpoints
// Define specific endpoints
const ADD_GROCERY_ITEMS =  'http://localhost:8080/api/v1/admin/addGrocery-items';
const REMOVE_GROCERY_ITEMS =  'http://localhost:8080/api/v1/admin/deleteGrocery-items/{itemId}';
const ADMIN_GET_GROCERY_ITEMS =  'http://localhost:8080/api/v1/admin/getGrocery-items';

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    // Fetch inventory data initially
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const response = await fetch(ADMIN_GET_GROCERY_ITEMS);
      if (response.ok) {
        const data = await response.json();
        setInventoryData(data);
      } else {
        console.error('Failed to fetch inventory data');
      }
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch(ADD_GROCERY_ITEMS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        // Product added successfully, fetch updated inventory data
        fetchInventoryData();

        // Reset modal state and new product state
        setShowAddProductModal(false);
        setNewProduct({
          name: '',
          quantity: 0,
          price: 0,
        });
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleRemoveProduct = async (itemId) => {
    try {
      const response = await fetch(REMOVE_GROCERY_ITEMS.replace('{itemId}', itemId), {
        method: 'DELETE',
      });

      if (response.ok) {
        // Fetch updated inventory data
        fetchInventoryData();
      } else {
        console.error('Failed to remove product');
      }
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <div>
      <HamburgerMenu />
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">Inventory</h2>

        {/* Display Inventory Items */}
        {inventoryData.map((product) => (
          <div key={product.id} className="bg-first-color p-8 rounded-md mb-4">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-2">Quantity: {product.quantity}</p>
            <p className="text-gray-700">Price per Unit: rs.{product.price}</p>
            <button
              onClick={() => handleRemoveProduct(product.id)}
              className="bg-red-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-red-600"
            >
              Remove Product
            </button>
          </div>
        ))}

        {/* Add Product Button */}
        <button
          onClick={() => setShowAddProductModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
        >
          + Add Product
        </button>

        {/* Add Product Modal */}
        {showAddProductModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-md w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-6 text-center">Add Product</h2>
              <div className="mb-4">
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Product Name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="productQuantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  id="productQuantity"
                  name="productQuantity"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value, 10) })}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Quantity"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                  Price per Unit
                </label>
                <input
                  type="number"
                  id="productPrice"
                  name="productPrice"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Price per Unit"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setShowAddProductModal(false);
                    setNewProduct({
                      name: '',
                      quantity: 0,
                      price: 0,
                    });
                  }}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
