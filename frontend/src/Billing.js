// Billing.js
import React, { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';

const Billing = () => {
  const [items, setItems] = useState([]);
  const [itemNumber, setItemNumber] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  const addItem = () => {
    const newItem = { itemName: `Item ${itemNumber}`, itemNumber, quantity, price };
    setItems([...items, newItem]);

    // Reset input fields
    setItemNumber('');
    setQuantity(1);
    setPrice(0);
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const confirmBillApiCall = () => {
    console.log('Bill confirmed. API call should be implemented here.');
  };

  return (
    <div>
      <HamburgerMenu />
      <div className="p-8 first-color">
        <h2 className="text-3xl font-bold mb-6">Billing</h2>

        {/* Item Entry */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Item Number</label>
          <input
            type="text"
            value={itemNumber}
            onChange={(e) => setItemNumber(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Quantity Entry */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Add Item Button */}
        <button onClick={addItem} className="bg-fourth-color text-white py-2 px-4 rounded-md mb-4">
          Add Item
        </button>

        {/* Items Table */}
        <table className="w-full border second-color">
          <thead>
            <tr>
              <th className="border p-2">Item Name</th>
              <th className="border p-2">Item Number</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.itemName}</td>
                <td className="border p-2">{item.itemNumber}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.price}</td>
                <td className="border p-2">
                  <button onClick={() => removeItem(index)} className="text-red-500">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="mt-4 second-color">
          <strong>Total: Rs.{calculateTotal()}</strong>
        </div>

        {/* Confirm Bill Button */}
        <button onClick={confirmBillApiCall} className="bg-fourth-color text-white py-2 px-4 rounded-md mt-4">
          Confirm Bill
        </button>
      </div>
    </div>
  );
};

export default Billing;
