import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/inventory.css";

function InventoryPage() {
  const [skuItems, setSkuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [updatedQuantity, setUpdatedQuantity] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch SKU items from the backend
  const fetchSkuItems = () => {
    axios.get("http://localhost:5000/api/sku-items")
      .then((response) => setSkuItems(response.data))
      .catch((error) => console.error("Error fetching SKU items:", error));
  };

  useEffect(() => {
    fetchSkuItems();
  }, []);

  // Handle selecting an item from the list
  const handleItemSelect = (e) => {
    const itemName = e.target.value;
    setSelectedItem(itemName);

    const item = skuItems.find((item) => item.name === itemName);
    if (item) {
      setUpdatedQuantity(item.quantity);
      setUpdatedPrice(item.price);
    }
  };

  // Handle updating the quantity and price of the selected item
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    if (!selectedItem || updatedQuantity === "" || updatedPrice === "") {
      alert("Please select an item and specify both quantity and price.");
      return;
    }

    const itemToUpdate = skuItems.find((item) => item.name === selectedItem);
    if (itemToUpdate) {
      setIsLoading(true);
      try {
        // Send update request to backend
        await axios.put(`http://localhost:5000/api/sku-items/${itemToUpdate.id}`, { 
          quantity: updatedQuantity, 
          price: updatedPrice 
        });
        
        // Fetch updated data after successful update
        fetchSkuItems();
        alert("Item updated successfully!");
      } catch (error) {
        console.error("Error updating SKU item:", error);
        alert("Failed to update the item. Please try again.");
      } finally {
        setIsLoading(false);
        setUpdatedQuantity("");
        setUpdatedPrice("");
        setSelectedItem("");
      }
    }
  };

  return (
    <div className="inventory-container">
      <h1>Inventory Management</h1>

      <form className="inventory-form" onSubmit={handleUpdateItem}>
        <div className="form-group">
          <label htmlFor="itemSelect">Select Item:</label>
          <select
            id="itemSelect"
            value={selectedItem}
            onChange={handleItemSelect}
          >
            <option value="">--Select Item--</option>
            {skuItems.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name} (Qty: {item.quantity}, ₹{item.price})
              </option>
            ))}
          </select>
        </div>

        {selectedItem && (
          <>
            <div className="form-group">
              <label htmlFor="updatedQuantity">Update Quantity:</label>
              <input
                type="number"
                id="updatedQuantity"
                value={updatedQuantity}
                onChange={(e) => setUpdatedQuantity(e.target.value)}
                placeholder="Enter updated quantity"
              />
            </div>

            <div className="form-group">
              <label htmlFor="updatedPrice">Update Price (₹):</label>
              <input
                type="number"
                id="updatedPrice"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
                placeholder="Enter updated price"
              />
            </div>
          </>
        )}

        <button type="submit" className="update-button" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Item"}
        </button>
      </form>

      <h2>SKU List</h2>
      {skuItems.length > 0 ? (
        <table className="sku-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {skuItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in inventory.</p>
      )}
    </div>
  );
}

export default InventoryPage;
