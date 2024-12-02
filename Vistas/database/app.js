// app.js
const pool = require('./database'); // Import the pool from database.js
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload'); // Si usas carga de archivos
const rutas = require('./rutas'); // Archivo donde está tu código de rutas


const app = express();
const PORT = 3000; // Cambia si necesitas otro puerto


// Example query function
async function fetchUsers() {
  try {
    const res = await pool.query('SELECT * FROM users');
    console.log(res.rows);  // Log the rows of data
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
}

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


app.use('/api', rutas);


app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
      console.log(r.route.path);
  } 
});



// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
// Call the function
fetchUsers()
    .then(() => console.log('Prueba de conexión a la base de datos exitosa'))
    .catch(err => console.error('Error en la conexión inicial a la base de datos:', err));

   
   
  