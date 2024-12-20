import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/transaction.css";
import { useNavigate } from "react-router-dom";

function TransactionPage() {
  const [skuItems, setSkuItems] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [groupedTransactions, setGroupedTransactions] = useState({});
  const [selectedItem, setSelectedItem] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [amountCredited, setAmountCredited] = useState(0);
  const [paymentOption, setPaymentOption] = useState("Cash");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch SKU items and transactions
    const fetchData = async () => {
      try {
        const [skuResponse, transactionsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/sku-items"),
          axios.get("http://localhost:5000/api/auth/transactions"),
        ]);
        setSkuItems(skuResponse.data);
        setTransactions(transactionsResponse.data);
        groupTransactionsByMonth(transactionsResponse.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const groupTransactionsByMonth = (transactions) => {
    const grouped = transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).toLocaleString("default", { month: "long" });
      acc[month] = acc[month] || [];
      acc[month].push(transaction);
      return acc;
    }, {});
    setGroupedTransactions(grouped);
  };

  const handleItemSelect = (e) => {
    const itemName = e.target.value;
    setSelectedItem(itemName);
    const item = skuItems.find((item) => item.name === itemName);
    if (item) setAmountCredited(item.price);
  };

  const handleQuantityChange = (e) => {
    setQuantitySold(e.target.value);
    const item = skuItems.find((item) => item.name === selectedItem);
    if (item) setAmountCredited(item.price * e.target.value);
  };

  const handlePaymentOptionChange = (e) => {
    setPaymentOption(e.target.value);
  };

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();

    if (!selectedItem || !quantitySold) {
      alert("Please select an item and enter quantity.");
      return;
    }

    if (paymentOption === "UPI") {
      // Redirect to UPI payment page
      navigate("/upi-payment", {
        state: {
          amount: amountCredited,
          transactionDetails: {
            item: selectedItem,
            quantity: Number(quantitySold),
            date: new Date().toISOString().split("T")[0],
          },
        },
      });
      return;
    }

    // For Cash transactions, process normally
    const newTransaction = {
      item: selectedItem,
      quantity: Number(quantitySold),
      date: new Date().toISOString().split("T")[0],
      amount: amountCredited,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/transactions",
        newTransaction
      );
      setTransactions((prevTransactions) => {
        const updatedTransactions = [response.data, ...prevTransactions];
        groupTransactionsByMonth(updatedTransactions);
        return updatedTransactions;
      });
      alert("Transaction recorded successfully!");
      setSelectedItem("");
      setQuantitySold("");
      setAmountCredited(0);

      // Update SKU items
      const skuResponse = await axios.get("http://localhost:5000/api/sku-items");
      setSkuItems(skuResponse.data);
    } catch (err) {
      console.error("Error recording transaction:", err);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="transaction-container">
      <header className="header">
        <h1>📊 Manage Transactions</h1>
      </header>

      <form className="transaction-form" onSubmit={handleTransactionSubmit}>
        <div className="form-group">
          <label htmlFor="itemSelect">Select Item Sold:</label>
          <select id="itemSelect" value={selectedItem} onChange={handleItemSelect}>
            <option value="">--Select Item--</option>
            {skuItems.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name} (₹{item.price})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantitySold">Enter Quantity Sold:</label>
          <input
            type="number"
            id="quantitySold"
            value={quantitySold}
            onChange={handleQuantityChange}
            placeholder="Enter quantity"
          />
        </div>

        <div className="form-group">
          <label>Amount Credited: <strong>₹{amountCredited}</strong></label>
        </div>

        <div className="form-group">
          <label htmlFor="paymentOption">Payment Method:</label>
          <select id="paymentOption" value={paymentOption} onChange={handlePaymentOptionChange}>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Submit Transaction
        </button>
      </form>

      <h2>Transaction History</h2>
      {Object.keys(groupedTransactions).map((month) => (
        <div key={month} className="transaction-month">
          <h3>{month}</h3>
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {groupedTransactions[month].map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.item_name || "N/A"}</td>
                  <td>{transaction.quantity || "N/A"}</td>
                  <td>{formatDate(transaction.date)}</td>
                  <td>₹{transaction.amount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default TransactionPage;
