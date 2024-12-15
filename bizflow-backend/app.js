const express = require("express");
const app = express();
const db = require("./database/db");
const cors = require("cors");
const { addTransaction, getTransactions } = require("./controllers/authController");

app.use(cors());
app.use(express.json());

// Transaction routes
app.get("/api/auth/transactions", getTransactions); // Fetch all transactions
app.post("/api/auth/transactions", addTransaction); // Add a new transaction

// SKU items routes
app.get("/api/sku-items", (req, res) => {
  db.query("SELECT * FROM sku_items", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch SKU items" });
    }
    res.json(results);
  });
});

app.post("/api/sku-items", (req, res) => {
  const { name, quantity, price } = req.body;
  const query = "INSERT INTO sku_items (name, quantity, price) VALUES (?, ?, ?)";
  db.query(query, [name, quantity, price], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to add SKU item" });
    }
    res.status(201).json({ id: results.insertId, name, quantity, price });
  });
});

app.put("/api/sku-items/:id", (req, res) => {
  const { id } = req.params;
  const { quantity, price } = req.body;
  const query = "UPDATE sku_items SET quantity = ?, price = ? WHERE id = ?";
  db.query(query, [quantity, price, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update SKU item" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "SKU item not found" });
    }
    res.json({ message: "SKU item updated successfully" });
  });
});

module.exports = app;
