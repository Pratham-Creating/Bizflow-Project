const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/db");

// Login user
exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length === 0)
      return res.status(400).json({ message: "Invalid credentials" });

    const user = results[0];

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  });
};

// Add a transaction
exports.addTransaction = (req, res) => {
  const { date, amount } = req.body;

  if (!date || !amount) {
    return res.status(400).json({ error: "Date and amount are required" });
  }

  const query = "INSERT INTO transactions (date, amount) VALUES (?, ?)";
  db.query(query, [date, amount], (err, result) => {
    if (err) {
      console.error("Error inserting transaction:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ id: result.insertId, date, amount });
  });
};
