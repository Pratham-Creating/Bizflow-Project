// app.js
const express = require("express");
const app = express();
const db = require("./database/db"); // Your DB connection
const cors = require("cors");

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // To parse JSON requests

// Transaction routes
// GET request to fetch all transactions
app.get("/api/auth/transactions", (req, res) => {
  db.query("SELECT * FROM transactions", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching transactions" });
    }
    res.json(results);
  });
});

// POST request to add a new transaction
app.post("/api/auth/transactions", (req, res) => {
  const { date, amount } = req.body;

  if (!date || !amount) {
    return res.status(400).json({ error: "Date and amount are required" });
  }

  const query = "INSERT INTO transactions (date, amount) VALUES (?, ?)";
  db.query(query, [date, amount], (err, result) => {
    if (err) {
      console.error("Error adding transaction:", err); // Logging any error
      return res.status(500).json({ error: "Error adding transaction" });
    }
    res.status(201).json({ message: "Transaction added successfully", id: result.insertId });
  });
});


//GET request to fetch all sku itmes
app.get('/api/sku-items', (req, res) => {
  const query = 'SELECT * FROM sku_items';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});



//POST request to add sku itmes
app.post('/api/sku-items', (req, res) => {
  const { name, quantity, price } = req.body;
  const query = 'INSERT INTO sku_items (name, quantity, price) VALUES (?, ?, ?)';
  db.query(query, [name, quantity, price], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: results.insertId, name, quantity, price });
  });
});



app.put('/api/sku-items/:id', (req, res) => {
  const { id } = req.params;
  const { quantity, price } = req.body;

  const query = 'UPDATE sku_items SET quantity = ?, price = ? WHERE id = ?';
  db.query(query, [quantity, price, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "SKU item not found" });
    }
    res.json({ id, quantity, price });
  });
});

// POST request to save transaction
app.post('/api/transactions', (req, res) => {
  const { item, quantity, date, amount } = req.body;
  
  const query = 'INSERT INTO transactions (item, quantity, date, amount) VALUES (?, ?, ?, ?)';
  db.query(query, [item, quantity, date, amount], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Transaction recorded successfully" });
  });
});

// Update the quantity of an SKU item
app.put('/api/sku-items/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  // Update the SKU item in the database
  db.query('UPDATE sku_items SET quantity = ? WHERE id = ?', [quantity, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update SKU item' });
    }
    res.status(200).json({ message: 'SKU item updated successfully' });
  });
});


module.exports = app;
