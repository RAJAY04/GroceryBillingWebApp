import React, { useState, useEffect } from 'react';
import HamburgerMenu from './HamburgerMenu';

const DELETE_BILL_ENDPOINT = 'http://localhost:8080/api/v1/bills';
const GET_ALL_BILLS_ENDPOINT = 'http://localhost:8080/api/v1/bills';

const Transaction = () => {
  const [bills, setBills] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState('');

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await fetch(GET_ALL_BILLS_ENDPOINT);
      const data = await response.json();
      setBills(data);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  const deleteBill = async (id) => {
    try {
      await fetch(`${DELETE_BILL_ENDPOINT}/${id}`, {
        method: 'DELETE',
      });
      fetchBills(); // Refresh the bills after deletion
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  };

  const openPopup = (items) => {
    setShowPopup(true);
  
    // Split each item string into an array of values
    const formattedItems = items.map(item => {
      const [name, price, quantity] = item.split(' - ');
      return { name, price, quantity };
    });
  
    // Render the formatted items as a list
    const itemsList = formattedItems.map((item, index) => (
      <li key={index}>
        {item.name} - ${item.price} - {item.quantity}
      </li>
    ));
  
    setPopupContent(itemsList);
  };
  
  const closePopup = () => {
    setShowPopup(false);
    setPopupContent('');
  };

  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url(https://www.unicosmos.in/wp-content/uploads/2016/05/placeholder.gif)' }}>
      <HamburgerMenu />

      <div className="flex-auto p-8 bg-white bg-opacity-75">
        <h2 className="text-center md:text-center lg:text-left text-3xl font-bold mb-6 text-black">All Bills</h2>
        <table className="w-full mb-8">
          <thead>
            <tr>
              <th className="px-4 py-2 text-gray-500">Bill ID</th>
              <th className="px-4 py-2 text-gray-500">Customer Name</th>
              <th className="px-4 py-2 text-gray-500">Total Amount</th>
              <th className="px-4 py-2 text-gray-500">View Items</th>
              <th className="px-4 py-2 text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id}>
                <td className="border px-4 py-2">{bill.id}</td>
                <td className="border px-4 py-2">{bill.name}</td>
                <td className="border px-4 py-2">{bill.total}</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => openPopup(bill.items)}>
                    View Items
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => deleteBill(bill.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
    <div className="bg-white p-4 rounded-lg" style={{ width: '600px' }}>
      <h2 className="text-lg font-semibold mb-4">Items</h2>
      <ul>{popupContent}</ul>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-4" onClick={closePopup}>
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default Transaction;
