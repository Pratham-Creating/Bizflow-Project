const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // Default MySQL user
  password: '',         // Password for MySQL (update if required)
  database: 'bizflow',  // The database you created
});

// Export the connection
module.exports = db;
