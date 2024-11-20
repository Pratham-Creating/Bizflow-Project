// Import required modules
const express = require('express');
const sequelize = require('./config/d'); // Sequelize configuration
const userRoutes = require('./routes/userRoutes'); // User routes
const User = require('./models/User');
const Sku = require('./models/Sku');
const Expense = require('./models/Expense');
const Inventory = require('./models/Inventory');
const Transaction = require('./models/Transaction');

// Initialize the express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Use user routes under the '/api' prefix
app.use('/api', userRoutes);

// Test the database connection and sync models
sequelize.sync()
    .then(() => {
        console.log('Database synced successfully!');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
