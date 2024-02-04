import React, { useState, useEffect } from 'react';
import HamburgerMenu from './HamburgerMenu';

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: 0,
    price: 0,
    range: 0,
  });

  useEffect(() => {
    // Mock API call
    // Replace the URL with your actual API endpoint
    fetch('https://api.example.com/inventory')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns an array of inventory items
        setInventoryData(data);
      })
      .catch((error) => {
        console.error('Error fetching inventory data:', error);
      });
  }, []);

  const handleAddProduct = () => {
    // Mock API call to add a new product
    // Replace the URL with your actual API endpoint for adding products
    fetch('https://api.example.com/addProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then(() => {
        setInventoryData([...inventoryData, newProduct]);
        setShowAddProductModal(false);
        setNewProduct({
          name: '',
          quantity: 0,
          price: 0,
          range: 0,
        });
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };

  const handleUpdateProduct = (productId, updatedQuantity) => {
    // Mock API call to update the quantity of a product
    // Replace the URL with your actual API endpoint for updating product details
    fetch(`https://api.example.com/updateProduct/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: updatedQuantity,
      }),
    })
      .then(() => {
        // Update the local state with the updated quantity
        setInventoryData((prevData) =>
          prevData.map((product) =>
            product.id === productId
              ? { ...product, quantity: updatedQuantity }
              : product
          )
        );
      })
      .catch((error) => {
        console.error('Error updating product quantity:', error);
      });
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
            <p className="text-gray-700">Price per Unit: ${product.price}</p>
            <p className="text-gray-700">Range: {product.range}</p>
            <button
              onClick={() =>
                handleUpdateProduct(
                  product.id,
                  prompt('Enter updated quantity:')
                )
              }
              className="bg-third-color text-white py-2 px-4 rounded-md mt-2 hover:bg-fourth-color"
            >
              Update Quantity
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
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-fourth-color"
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
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-fourth-color"
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
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-fourth-color"
                  placeholder="Price per Unit"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="productRange" className="block text-sm font-medium text-gray-700">
                  Range
                </label>
                <input
                  type="number"
                  id="productRange"
                  name="productRange"
                  value={newProduct.range}
                  onChange={(e) => setNewProduct({ ...newProduct, range: parseInt(e.target.value, 10) })}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-fourth-color"
                  placeholder="Range"
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
                      range: 0,
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
