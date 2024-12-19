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
  const timestamp = Date.now(); // Use timestamp or a unique value for the filename
  const fileName = `bill_${timestamp}.pdf`; // Generate the filename
  const filePath = path.join(__dirname, 'bills', fileName); // Create the full file path

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

  // Save the filename and other details in the database
  const query = "INSERT INTO bills (customer_name, items, total_amount, url) VALUES (?, ?, ?, ?)";
  db.query(query, [customerName, JSON.stringify(items), total, `/bills/${fileName}`], (err, results) => {
    if (err) {
      console.error('Error saving bill to the database:', err);
      return res.status(500).json({ error: 'Failed to save the bill' });
    }

    // Respond with the bill URL
    res.json({ message: 'Bill created successfully', url: `/bills/${fileName}` });
  });
});


// Fetch previously created bills from the database
app.get('/api/bills', (req, res) => {
  const query = "SELECT id, customer_name, total_amount, url, created_at FROM bills ORDER BY created_at DESC";

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching bills:', err);
      return res.status(500).json({ error: 'Failed to fetch bills' });
    }

    // Format the response to include the correct URL for the bill PDF
    const bills = results.map(bill => ({
      id: bill.id,
      customer_name: bill.customer_name,
      total_amount: bill.total_amount,
      created_at: bill.created_at,
      url: bill.url // Include the URL stored in the database
    }));

    res.json(bills); // Return the bills with the URLs
  });
});
app.use('/bills', express.static(path.join(__dirname, 'bills')));



// Backend API for least-selling items
app.get('/api/least-selling-items', async (req, res) => {
  try {
    // SQL query to find the least selling items
    const query = `
      SELECT 
        item_name, 
        SUM(quantity) AS total_quantity
      FROM 
        transactions
      GROUP BY 
        item_name
      ORDER BY 
        total_quantity ASC
      LIMIT 5;
    `;

    console.log('Executing SQL query for least-selling items:', query); // Log the query

    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing least-selling items query:', err); // Log the error
        return res.status(500).json({ error: 'Error fetching least-selling items' });
      }

      console.log('Least-selling items result:', results); // Log the results
      res.json(results); // Send the result as the response
    });
  } catch (error) {
    console.error('Unexpected error fetching least-selling items:', error); // Log unexpected errors
    res.status(500).json({ error: 'Unexpected error fetching least-selling items' });
  }
});

// Backend API for top-selling items
app.get('/api/top-selling-items', async (req, res) => {
  try {
    // SQL query to find the top-selling items
    const query = `
      SELECT 
        item_name, 
        SUM(quantity) AS total_quantity
      FROM 
        transactions
      GROUP BY 
        item_name
      ORDER BY 
        total_quantity DESC
      LIMIT 5;
    `;

    console.log('Executing SQL query for top-selling items:', query); // Log the query

    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing top-selling items query:', err); // Log the error
        return res.status(500).json({ error: 'Error fetching top-selling items' });
      }

      console.log('Top-selling items result:', results); // Log the results
      res.json(results); // Send the result as the response
    });
  } catch (error) {
    console.error('Unexpected error fetching top-selling items:', error); // Log unexpected errors
    res.status(500).json({ error: 'Unexpected error fetching top-selling items' });
  }
});

// Backend API for sales trends
app.get('/api/sales-trends', async (req, res) => {
  try {
    // SQL query to get monthly sales trends
    const query = `
      SELECT 
        MONTH(date) AS month, 
        SUM(amount) AS total_sales
      FROM 
        transactions
      GROUP BY 
        MONTH(date)
      ORDER BY 
        month ASC;
    `;

    console.log('Executing SQL query for sales trends:', query); // Log the query

    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing sales trends query:', err); // Log the error
        return res.status(500).json({ error: 'Error fetching sales trends' });
      }

      // Map results to ensure numeric values for `total_sales`
      const processedResults = results.map(row => ({
        month: row.month,
        total_sales: Number(row.total_sales), // Convert `total_sales` to a number
      }));

      console.log('Sales trends result:', processedResults); // Log the processed results
      res.json(processedResults); // Send the result as the response
    });
  } catch (error) {
    console.error('Unexpected error fetching sales trends:', error); // Log unexpected errors
    res.status(500).json({ error: 'Unexpected error fetching sales trends' });
  }
});

//Backend API for low stock items
app.get('/api/low-stock-items', (req, res) => {
  try {
      // SQL query to fetch items with low stock (quantity < 10)
      const query = `
          SELECT name, quantity
          FROM sku_items
          WHERE quantity < 10
          ORDER BY quantity ASC;
      `;

      console.log('Executing SQL query for low-stock items:', query); // Log the query

      // Execute the query
      db.query(query, (err, results) => {
          if (err) {
              console.error('Error executing low-stock items query:', err); // Log any query errors
              return res.status(500).json({ error: 'Error fetching low-stock items' });
          }

          console.log('Low-stock items query result:', results); // Log the results
          res.status(200).json(results); // Respond with the results
      });
  } catch (error) {
      console.error('Unexpected error fetching low-stock items:', error); // Log unexpected errors
      res.status(500).json({ error: 'Unexpected error fetching low-stock items' });
  }
});


module.exports = app;
