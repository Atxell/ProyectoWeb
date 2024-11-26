// app.js
const pool = require('./database'); // Import the pool from database.js

// Example query function
async function fetchUsers() {
  try {
    const res = await pool.query('SELECT * FROM users');
    console.log(res.rows);  // Log the rows of data
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
}

// Call the function
fetchUsers();
