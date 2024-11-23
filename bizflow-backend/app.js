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
  const { name, quantity } = req.body;
  const query = 'INSERT INTO sku_items (name, quantity) VALUES (?, ?)';
  db.query(query, [name, quantity], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: results.insertId, name, quantity });
  });
});


app.put('/api/sku-items/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const query = 'UPDATE sku_items SET quantity = ? WHERE id = ?';
  db.query(query, [quantity, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, quantity });
  });
});



module.exports = app;
