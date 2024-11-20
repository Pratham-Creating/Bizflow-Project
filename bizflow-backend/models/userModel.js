const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'); // Import sequelize instance

// Define the User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure username is unique
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure email is unique
        validate: {
            isEmail: true, // Email format validation
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, // Password must be provided
    }
}, {
    // Model options
    tableName: 'users', // Optional: specify the table name
    timestamps: true,   // Adds createdAt and updatedAt columns
});

// Export the User model
module.exports = User;
