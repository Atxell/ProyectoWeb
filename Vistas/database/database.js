const { Pool } = require('pg');

// Create a pool for database connections
const pool = new Pool({
  user: 'root',       // Your database username
  host: 'administrador',           // Database host (or remote host)
  database: 'vinmathBD',   // Database name
  password: '12345',   // Your password
  port: 5432,                  // Default PostgreSQL port
});

// Connection test function
async function testConnection() {
       try {
         const res = await pool.query('SELECT NOW()');  // Simple query to test connection
         console.log('Database connected successfully:', res.rows[0]);
       } catch (err) {
         console.error('Database connection error:', err.stack);
       }
     }
     
// Test the connection when the app starts
testConnection();

// Check connection and log success or failure
pool.on('connect', () => {
       console.log('Database connected successfully');
     });
     
pool.on('error', (err, client) => {
       console.error('Unexpected error on idle client', err);
       process.exit(-1);  // Exit the process in case of a critical error
     });

// Export the pool for use in your application
module.exports = pool;
