const mysql = require("mysql2");
const db = mysql.(process.env.DATABASE_URL);

module.exports = db;
