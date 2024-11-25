const db = require("../database/db");

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
  const { name, quantity, price } = req.body;
  const query = "INSERT INTO sku_items (name, quantity, price) VALUES (?, ?, ?)";
  db.query(query, [name, quantity, price], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: results.insertId,
      name,
      quantity,
      price,
    });
  });
};

// Controller to update SKU item quantity and price
exports.updateSkuItem = (req, res) => {
  const { id } = req.params;
  const { quantity, price } = req.body;
  const query = "UPDATE sku_items SET quantity = ?, price = ? WHERE id = ?";
  db.query(query, [quantity, price, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "SKU item not found" });
    }
    res.json({ id, quantity, price });
  });
};
