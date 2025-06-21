/*
Create and export a MySQL connection pool using dotenv variables:
- DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
Use mysql2/promise for async/await compatibility and PlanetScale SSL support.
*/

const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
