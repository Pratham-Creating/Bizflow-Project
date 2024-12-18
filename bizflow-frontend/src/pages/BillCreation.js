import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BillCreation.css'; // Import the CSS file

const BillCreation = () => {
    const [customerName, setCustomerName] = useState('');
    const [items, setItems] = useState([{ name: '', price: '', quantity: '' }]);
    const [total, setTotal] = useState(0);
    const [skuItems, setSkuItems] = useState([]); // Store SKU items
    const [isLoading, setIsLoading] = useState(true); // Loading state for SKU items

    // Fetch SKU items from the backend
    const fetchSkuItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/sku-items');
            setSkuItems(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching SKU items:', error);
        }
    };

    useEffect(() => {
        fetchSkuItems();
    }, []);

    const handleAddItem = () => {
        setItems([...items, { name: '', price: '', quantity: '' }]);
    };

    const handleRemoveItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        calculateTotal(updatedItems);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setItems(updatedItems);
        calculateTotal(updatedItems);
    };

    const handleItemSelect = (index, selectedItemName) => {
        const selectedItem = skuItems.find((item) => item.name === selectedItemName);
        if (selectedItem) {
            const updatedItems = [...items];
            updatedItems[index] = {
                name: selectedItem.name,
                price: selectedItem.price,
                quantity: '',
            };
            setItems(updatedItems);
            calculateTotal(updatedItems);
        }
    };

    const calculateTotal = (updatedItems) => {
        const totalAmount = updatedItems.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseFloat(item.quantity) || 0;
            return sum + price * quantity;
        }, 0);
        setTotal(totalAmount);
    };

    const handleSubmit = async () => {
        const billData = { customerName, items, total };
        try {
            const response = await axios.post('http://localhost:5000/api/bills', billData);
            const { url } = response.data;

            // Reset the form
            setCustomerName('');
            setItems([{ name: '', price: '', quantity: '' }]);
            setTotal(0);

            // Alert the user and redirect to the bill
            alert('Bill created successfully!');
            window.location.href = `http://localhost:5000${url}`; // Redirect to the bill
        } catch (error) {
            console.error(error);
            alert('Error creating the bill');
        }
    };

    return (
        <div className="bill-creation-container">
            <h1>Bill Creation</h1>
            <label>
                Customer Name:
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                />
            </label>
            <h2>Items</h2>
            {items.map((item, index) => (
                <div className="item-row" key={index}>
                    <select
                        value={item.name}
                        onChange={(e) => handleItemSelect(index, e.target.value)}
                    >
                        <option value="">--Select Item--</option>
                        {skuItems.map((skuItem) => (
                            <option key={skuItem.id} value={skuItem.name}>
                                {skuItem.name} (₹{skuItem.price})
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    />
                    <button onClick={() => handleRemoveItem(index)}>Remove</button>
                </div>
            ))}
            <button className="add-item-button" onClick={handleAddItem}>
                Add Item
            </button>
            <h2>Total: ₹{total}</h2>
            <button className="submit-button" onClick={handleSubmit}>
                Create Bill
            </button>
        </div>
    );
};

export default BillCreation;
