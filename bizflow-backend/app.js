const express = require("express");

const app = express();
const db = require("./database/db");
const cors = require("cors");

//FOR BILL CREATION
const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');


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

app.post('/api/bills', (req, res) => {
  const { customerName, items, total } = req.body;

  const doc = new PDFDocument();
  const fileName = `bill_${Date.now()}.pdf`;
  const filePath = path.join(__dirname, 'bills', fileName);

  // Create the "bills" folder if it doesn't exist
  if (!fs.existsSync(path.join(__dirname, 'bills'))) {
    fs.mkdirSync(path.join(__dirname, 'bills'));
  }

  // Pipe the PDF into a file
  doc.pipe(fs.createWriteStream(filePath));

  // Company Header
  doc
    .fontSize(20)
    .text('Company Name', { align: 'center' })
    .fontSize(12)
    .text('Address: Area, City, State, ZIP', { align: 'center' })
    .text('Phone: +91 987654321 | Email: support@company.com', { align: 'center' })
    .moveDown();

  // Bill Title
  doc
    .fontSize(18)
    .text('Invoice', { align: 'center', underline: true })
    .moveDown();

  // Customer Details
  doc
    .fontSize(12)
    .text(`Customer Name: ${customerName}`)
    .text(`Date: ${new Date().toLocaleDateString()}`)
    .moveDown();

  // Table Header
  doc
    .fontSize(12)
    .text('Item', 50, doc.y, { width: 200, continued: true })
    .text('Price', 250, doc.y, { width: 100, align: 'right', continued: true })
    .text('Quantity', 350, doc.y, { width: 100, align: 'right', continued: true })
    .text('Total', 450, doc.y, { width: 100, align: 'right' })
    .moveDown(0.5);

  // Horizontal Line
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

  // Table Rows
  items.forEach((item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseFloat(item.quantity) || 0;
    const itemTotal = price * quantity;

    doc
      .fontSize(12)
      .text(item.name, 50, doc.y, { width: 200, continued: true })
      .text(price.toFixed(2), 250, doc.y, { width: 100, align: 'right', continued: true })
      .text(quantity, 350, doc.y, { width: 100, align: 'right', continued: true })
      .text(itemTotal.toFixed(2), 450, doc.y, { width: 100, align: 'right' })
      .moveDown();
  });

  // Horizontal Line
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown();

  // Total Amount
  doc
    .fontSize(14)
    .text('Total Amount: ₹' + total.toFixed(2), { align: 'right' })
    .moveDown();

  // Footer
  doc
    .fontSize(10)
    .text('Thank you for your business!', { align: 'center' })
    .text('This is a system-generated invoice.', { align: 'center' });

  // Finalize the PDF
  doc.end();

  // Respond with the file URL
  res.json({ message: 'Bill created successfully', url: `/bills/${fileName}` });
});

app.use('/bills', express.static(path.join(__dirname, 'bills')));


module.exports = app;
