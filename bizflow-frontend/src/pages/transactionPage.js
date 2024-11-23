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

  // Handle adding a debit transaction
  const addDebitTransaction = () => {
    const debitTransaction = { ...formData, amount: -Math.abs(formData.amount) };
    axios.post("http://localhost:5000/api/auth/transactions", debitTransaction)
      .then((response) => {
        setTransactions((prevTransactions) => [response.data, ...prevTransactions]);
        setFormData({ date: "", amount: "" });
      })
      .catch((error) => console.error("Error adding debit transaction:", error));
  };

  // Handle adding a credit transaction
  const addCreditTransaction = () => {
    const creditTransaction = { ...formData, amount: Math.abs(formData.amount) };
    axios.post("http://localhost:5000/api/auth/transactions", creditTransaction)
      .then((response) => {
        setTransactions((prevTransactions) => [response.data, ...prevTransactions]);
        setFormData({ date: "", amount: "" });
      })
      .catch((error) => console.error("Error adding credit transaction:", error));
  };

  // Format the date to show only YYYY-MM-DD
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB"); // Returns date in format dd/mm/yyyy
  };

  // Group transactions by year and month with full month name (e.g. November 2024)
  const groupByYearMonth = () => {
    return transactions.reduce((acc, transaction) => {
      const transactionDate = new Date(transaction.date);
      const yearMonth = transactionDate.toLocaleString('default', {
        month: 'long',
        year: 'numeric'
      });

      if (!acc[yearMonth]) {
        acc[yearMonth] = [];
      }

      acc[yearMonth].push(transaction);
      return acc;
    }, {});
  };

  // Get total amount for each group (including positive and negative amounts)
  const getTotalAmount = (transactions) => {
    return transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0).toFixed(2);
  };

  const groupedTransactions = groupByYearMonth();

  return (
    <div className="transaction-page">
      <h1>Transaction Management</h1>
      
      {/* Form to add new transaction */}
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
        <div className="button-container">
          <button onClick={addDebitTransaction} className="debit-button">Debit</button>
          <button onClick={addCreditTransaction} className="credit-button">Credit</button>
        </div>
      </div>

      {/* Displaying transactions grouped by year and month */}
      {Object.keys(groupedTransactions).map((yearMonth) => {
        const transactionsInMonth = groupedTransactions[yearMonth];
        const totalAmount = getTotalAmount(transactionsInMonth);

        return (
          <div key={yearMonth} className="month-section">
            <h2>{yearMonth}</h2>  {/* Displaying formatted date: "November 2024" */}

            <ul className="transaction-list">
              {transactionsInMonth.map((t) => (
                <li key={t.id}>
                  <span>{formatDate(t.date)}</span>
                  <span className={parseFloat(t.amount) < 0 ? "negative" : ""}>
                    ₹{t.amount}
                  </span>
                </li>
              ))}
            </ul>

            <div className="total-amount">
              <strong>Total: ₹{totalAmount}</strong>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TransactionPage;
