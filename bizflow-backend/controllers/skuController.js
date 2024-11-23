const db = require("../database/db"); // Assuming you're using MySQL or another database

// Controller to fetch all SKU items
exports.getSkuItems = (req, res) => {
  const query = "SELECT * FROM sku_items";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
  
};

// Controller to add a new SKU item
exports.addSkuItem = (req, res) => {
  const { name, quantity } = req.body;
  const query = "INSERT INTO sku_items (name, quantity) VALUES (?, ?)";
  db.query(query, [name, quantity], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: results.insertId,
      name,
      quantity,
    });
  });
};

// Controller to update SKU item quantity
exports.updateSkuItemQuantity = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const query = "UPDATE sku_items SET quantity = ? WHERE id = ?";
  db.query(query, [quantity, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "SKU item not found" });
    }
    res.json({ id, quantity });
  });
};
