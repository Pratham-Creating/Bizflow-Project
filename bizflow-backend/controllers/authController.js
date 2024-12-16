const db = require("../database/db");

// Add a new transaction with inventory validation
exports.addTransaction = (req, res) => {
  const { item, quantity, date, amount } = req.body;

  if (!item || !quantity || !date || !amount) {
    return res.status(400).json({ error: "All fields are required: item, quantity, date, amount" });
  }

  // Start by fetching the item's current quantity from the inventory
  const fetchItemQuery = "SELECT id, quantity FROM sku_items WHERE name = ?";
  db.query(fetchItemQuery, [item], (fetchErr, fetchResults) => {
    if (fetchErr) {
      console.error("Error fetching item from inventory:", fetchErr);
      return res.status(500).json({ error: "Failed to process transaction" });
    }

    if (fetchResults.length === 0) {
      return res.status(404).json({ error: "Item not found in inventory" });
    }

    const currentQuantity = fetchResults[0].quantity;
    const itemId = fetchResults[0].id;

    // Check if there's sufficient stock
    if (currentQuantity < quantity) {
      return res.status(400).json({ error: "Insufficient stock available" });
    }

    // Deduct the sold quantity from inventory
    const updateInventoryQuery = "UPDATE sku_items SET quantity = quantity - ? WHERE id = ?";
    db.query(updateInventoryQuery, [quantity, itemId], (updateErr) => {
      if (updateErr) {
        console.error("Error updating inventory:", updateErr);
        return res.status(500).json({ error: "Failed to update inventory" });
      }

      // Add the transaction record
      const addTransactionQuery = "INSERT INTO transactions (item_name, quantity, date, amount) VALUES (?, ?, ?, ?)";
      db.query(addTransactionQuery, [item, quantity, date, amount], (addErr, result) => {
        if (addErr) {
          console.error("Error adding transaction:", addErr);
          return res.status(500).json({ error: "Failed to record transaction" });
        }

        res.status(201).json({ id: result.insertId, item, quantity, date, amount });
      });
    });
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
