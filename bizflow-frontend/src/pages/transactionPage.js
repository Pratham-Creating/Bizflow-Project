import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/transaction.css";

function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ date: "", amount: "" });

  // Fetch transactions from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/transactions")
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add a new transaction
  const addTransaction = () => {
    axios.post("http://localhost:5000/api/auth/transactions", formData)
      .then((response) => {
        // Add the new transaction directly to the state
        setTransactions([...transactions, response.data]);  
        
        // Reset form data
        setFormData({ date: "", amount: "" });
      })
      .catch((error) => console.error("Error adding transaction:", error));
  };
  

  return (
    <div className="transaction-page">
      <h1>Transaction Management</h1>
      <div className="form-container">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <button onClick={addTransaction}>Add Transaction</button>
      </div>
      <div className="transaction-list">
        <h2>Transactions</h2>
        <ul>
          {transactions.map((t) => (
            <li key={t.id}>
              {t.date}: ₹{t.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TransactionPage;
