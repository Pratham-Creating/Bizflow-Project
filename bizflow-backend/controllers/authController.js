const db = require("../database/db");

// Add a new transaction
exports.addTransaction = (req, res) => {
  const { item, quantity, date, amount } = req.body;

  if (!item || !quantity || !date || !amount) {
    return res.status(400).json({ error: "All fields are required: item, quantity, date, amount" });
  }

  const query = "INSERT INTO transactions (item_name, quantity, date, amount) VALUES (?, ?, ?, ?)";
  db.query(query, [item, quantity, date, amount], (err, result) => {
    if (err) {
      console.error("Error adding transaction:", err);
      return res.status(500).json({ error: "Failed to record transaction" });
    }
    res.status(201).json({ id: result.insertId, item, quantity, date, amount });
  });
};

// Fetch all transactions
exports.getTransactions = (req, res) => {
  const query = "SELECT * FROM transactions";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      return res.status(500).json({ error: "Failed to fetch transactions" });
    }
    res.status(200).json(results);
  });
};
