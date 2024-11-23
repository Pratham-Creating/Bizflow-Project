const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const skuController = require("../controllers/skuController"); // Add SKU controller

// POST route to handle adding transactions
router.post("/transactions", authController.addTransaction);

// GET route to fetch SKU items
router.get("/sku-items", skuController.getSkuItems);

// POST route to add a new SKU item
router.post("/sku-items", skuController.addSkuItem);

// PUT route to update SKU item quantity
router.put("/sku-items/:id", skuController.updateSkuItemQuantity);

module.exports = router;

