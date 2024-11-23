const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// POST route to handle adding transactions
router.post("/transactions", authController.addTransaction);

module.exports = router;
