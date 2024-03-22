import React, { useState, useEffect } from 'react';
import HamburgerMenu from './HamburgerMenu';

const NotificationPage = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        // Fetch data from API when component mounts
        fetch('http://localhost:8080/api/v1/admin/check-inventory')
            .then((response) => response.json())
            .then((data) => {
                // Assuming the API returns an array of grocery items
                setProductData(data);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }, []);

    // Display items in rows of three
    const displayItemsInRows = () => {
        const rows = [];
        for (let i = 0; i < productData.length; i += 3) {
            const items = productData.slice(i, i + 3);
            const row = (
                <div className="flex justify-start mb-4" key={i}>
                    {items.map((item) => (
                        <div key={item.id} className="bg-first-color p-4 rounded-md mr-4">
                            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                            <p className="text-gray-700 mb-2">Quantity: {item.quantity}</p>
                            <p className="text-gray-700">Price per Unit: ₹{item.price}</p>
                            <p className="text-gray-700">Range: {item.range}</p>
                        </div>
                    ))}
                </div>
            );
            rows.push(row);
        }
        return rows;
    };

    return (
        <div>
            <HamburgerMenu />
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6">Notification</h2>

                {/* Display Product Notifications */}
                {productData.length > 0 ? (
                    displayItemsInRows()
                ) : (
                    <p className="text-gray-700">No items are less than 10 units.</p>
                )}
            </div>
        </div>
    );
};

export default NotificationPage;