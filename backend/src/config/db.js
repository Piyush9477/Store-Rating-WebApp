const mysql = require("mysql2/promise");
const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
)

sequelize.authenticate()
  .then(() => console.log("MySQL Connected Successfully"))
  .catch(err => console.error("Error connecting to DB:", err));

module.exports = sequelize;