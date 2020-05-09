require('dotenv').config();
var mysql = require('mysql');
var pool = mysql.createPool({
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  connectionLimit : 5,
});

module.exports = { pool };
