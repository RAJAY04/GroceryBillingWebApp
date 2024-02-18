import React, { useState, useEffect } from 'react';
import HamburgerMenu from './HamburgerMenu';

// Define specific endpoints
const ADD_GROCERY_ITEMS = 'http://localhost:8080/api/v1/admin/addGrocery-items';
const REMOVE_GROCERY_ITEMS = 'http://localhost:8080/api/v1/admin/deleteGrocery-items/{itemId}';
const ADMIN_GET_GROCERY_ITEMS = 'http://localhost:8080/api/v1/admin/getGrocery-items';
const UPDATE_GROCERY_ITEMS = 'http://localhost:8080/api/v1/admin/updateGrocery-items/{itemId}';

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: 0,
    price: 0,
  });
  const [updateProduct, setUpdateProduct] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedQuantity, setUpdatedQuantity] = useState(0);
  const [updatedPrice, setUpdatedPrice] = useState(0);

  useEffect(() => {
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
        fetchInventoryData();
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
        fetchInventoryData();
      } else {
        console.error('Failed to remove product');
      }
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      if (!updateProduct || !updateProduct.id) {
        console.error('No product selected for update');
        return;
      }

      const response = await fetch(UPDATE_GROCERY_ITEMS.replace('{itemId}', updateProduct.id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedName,
          quantity: updatedQuantity,
          price: updatedPrice,
        }),
      });

      if (response.ok) {
        // Product updated successfully, fetch updated inventory data
        fetchInventoryData();

        // Reset modal state and updateProduct state
        setShowAddProductModal(false);
        setUpdateProduct(null);
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <HamburgerMenu />
      <div className="p-8">
        <h2 className="text-3xl font-bold">Inventory</h2>

        <button
                  onClick={() => setShowAddProductModal(true)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 mb-4 hover:bg-blue-600"
                >
                  + Add Product
                </button>

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
            <button
              onClick={() => setUpdateProduct(product)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2 ml-2 hover:bg-blue-600"
            >
              Update Product
            </button>
          </div>
        ))}



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

        {updateProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-md w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-6 text-center">Update Product</h2>
              <div className="mb-4">
                <label htmlFor="updatedName" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="updatedName"
                  name="updatedName"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="updatedQuantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  id="updatedQuantity"
                  name="updatedQuantity"
                  value={updatedQuantity}
                  onChange={(e) => setUpdatedQuantity(parseInt(e.target.value, 10))}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Quantity"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="updatedPrice" className="block text-sm font-medium text-gray-700">
                  Price per Unit
                </label>
                <input
                  type="number"
                  id="updatedPrice"
                  name="updatedPrice"
                  value={updatedPrice}
                  onChange={(e) => setUpdatedPrice(parseFloat(e.target.value))}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Price per Unit"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setShowAddProductModal(false);
                    setUpdateProduct(null);
                  }}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProduct}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                  Update Product
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
