require("dotenv").config();
const app = require("./app"); // Import the app where routes are defined
const db = require("./database/db"); // Your database connection

const PORT = process.env.PORT || 5000;

// Ensure database is connected before starting the server
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.stack);
    process.exit(1); // Exit the app if database connection fails
  } else {
    console.log("Connected to MySQL database.");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
});
