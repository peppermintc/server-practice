// get the client
const mysql = require('mysql2/promise');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tjqj251',
    database: 'john',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

module.exports = {
    connectionPool: pool,
};
