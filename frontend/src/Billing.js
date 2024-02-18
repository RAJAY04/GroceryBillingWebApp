import React, { useState, useEffect } from 'react';
import HamburgerMenu from './HamburgerMenu';

// Define specific endpoints
const ADMIN_GET_GROCERY_ITEMS = 'http://localhost:8080/api/v1/admin/getGrocery-items';
const BILL_ITEMS = 'http://localhost:8080/api/v1/admin/bill-items';

const Billing = () => {
  const [items, setItems] = useState([]);
  const [itemNumber, setItemNumber] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    // Fetch grocery items on component mount
    const fetchGroceryItems = async () => {
      try {
        const response = await fetch(ADMIN_GET_GROCERY_ITEMS);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching grocery items:', error);
      }
    };

    fetchGroceryItems();
  }, []);

  const addItem = async () => {
    // Find the item with the matching id
    const selectedItem = items.find(item => item.id === parseInt(itemNumber));

    if (selectedItem) {
      if (quantity <= selectedItem.quantity) {
        // Update selected items array
        const newItem = { itemId: selectedItem.id, itemName: selectedItem.name, price: selectedItem.price, quantity };
        setSelectedItems([...selectedItems, newItem]);

        // Update total price
        setTotalPrice(prevTotalPrice => prevTotalPrice + (quantity * selectedItem.price));

        // Display the table
        setIsTableVisible(true);
      } else {
        alert('Quantity exceeds available quantity');
      }
    } else {
      alert('Invalid Item Number');
    }
  };

  const confirmBill = async () => {
    try {
      // Make API call to confirm bill
      await fetch(BILL_ITEMS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedItems),
      });

      // Clear total price and selected items
      setTotalPrice(0);
      setSelectedItems([]);
      setIsTableVisible(false);
    } catch (error) {
      console.error('Error confirming bill:', error);
    }
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
        {isTableVisible && selectedItems.length > 0 && (
          <table className="w-full border second-color">
            <thead>
              <tr>
                <th className="border p-2">Item Name</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.itemName}</td>
                  <td className="border p-2">{item.price}</td>
                  <td className="border p-2">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Total */}
        <div className="mt-4 second-color">
          <strong>Total: Rs.{totalPrice}</strong>
        </div>

        {/* Confirm Bill Button */}
        <button onClick={confirmBill} className="bg-fourth-color text-white py-2 px-4 rounded-md mt-4">
          Confirm Bill
        </button>
      </div>
    </div>
  );
};

export default Billing;
