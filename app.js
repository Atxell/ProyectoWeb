const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();
const path = require("path");
const app = express();
// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'ProyectoWeb')));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Requerido para conexiones a Azure.
  },
});

app.use(bodyParser.json());

app.use(require("cors")());
app.use(express.static(path.join(__dirname, 'Vistas')));
app.use(express.static(path.join(__dirname, 'Vistas/js')));


// Middleware para procesar JSON en el body de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mostrar algo con solo el puerto xd
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "vistas", "vistausuarioLOGIN.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "vistas", "login.html"));
});

// Ruta de login
app.post("/login", async (req, res) => {
  const { correoelectronico, contraseña } = req.body;

  try {
    // Consulta al usuario por su correo

    console.log("Datos recibidos del cliente:", { correoelectronico, contraseña });

    const userQuery = await pool.query(
      "SELECT * FROM usuarios WHERE correoelectronico = $1 AND contraseña = $2",
      [correoelectronico, contraseña]
    );

    console.log("Respuesta de la base de datos:", userQuery.rows);

    if (userQuery.rows.length === 0) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    const user = userQuery.rows[0];
    // Comparar la contraseña con bcrypt
  

    

    // Generar el token JWT
    const token = jwt.sign(
      { id: user.idusuario, rol: user.rol }, // Puedes incluir más datos en el token
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, nombre: user.nombre, rol: user.rol });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});


app.post("/perfil/editar", async (req, res) => {
  const { nombre, correoelectronico, numerotelefono, contrasena } = req.body;

  // Validar datos
  if (!nombre || !correoelectronico || !numerotelefono || !contrasena) {
      return res.status(400).json({ exito: false, mensaje: "Todos los campos son obligatorios." });
  }

  try {
      // Actualizar en la base de datos
      const query = `
          UPDATE usuarios
          SET nombre = $1, correoelectronico = $2, numerotelefono = $3, "contraseña" = $4
          WHERE idusuario = $2
      `;
      await pool.query(query, [nombre, correoelectronico, numerotelefono, contrasena]);

      res.json({ exito: true, mensaje: "Datos actualizados correctamente." });
  } catch (error) {
      console.error("Error al actualizar datos:", error);
      res.status(500).json({ exito: false, mensaje: "Error al actualizar los datos." });
  }
});


//ruta insertar producto
app.post("/producto/insertar", async (req, res) => {
  const { nombre, correoelectronico, numerotelefono, contrasena } = req.body;

  // Validar datos
  if (!nombre || !correoelectronico || !numerotelefono || !contrasena) {
      return res.status(400).json({ exito: false, mensaje: "Todos los campos son obligatorios." });
  }

  try {
      // Actualizar en la base de datos
      const query = `
          UPDATE usuarios
          SET nombre = $1, correoelectronico = $2, numerotelefono = $3, "contraseña" = $4
          WHERE idusuario = $2
      `;
      await pool.query(query, [nombre, correoelectronico, numerotelefono, contrasena]);

      res.json({ exito: true, mensaje: "Datos actualizados correctamente." });
  } catch (error) {
      console.error("Error al actualizar datos:", error);
      res.status(500).json({ exito: false, mensaje: "Error al actualizar los datos." });
  }
});



//ruta llenar categoria POST
/*
app.post("/categoria/llenar", async (req, res) => {

  // Validar datos

  try {
      // select
      const query = `
          select categoria from categorias;
      `;
      await pool.query(query, [categoria]);
      res.json(query.rows);

  } catch (error) {
      console.error("Error al consultar datos:", error);
      res.status(500).json({ exito: false, mensaje: "Error al consultar los datos." });
  }
});
*/

//ruta llenar categoria GET
app.get("/categoria/llenar", async (req, res) => {
  try {
    const resultado = await pool.query('SELECT categoria, idcategoria FROM categorias'); // Cambia "categorias" a tu tabla
    res.json(resultado.rows);
    
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});



//insertar productos
app.post('/insertar/producto', async (req, res) => {
  const { nombre, cantidad, precio, categoria } = req.body; // Asegúrate de enviar "categoria" en el cuerpo de la solicitud

  try {
    const query = 'INSERT INTO productos (nombredelproducto, cantidad, precio, idcategoria) VALUES ($1, $2, $3, $4) RETURNING *';
    const valores = [nombre, cantidad, precio, categoria];

    const resultado = await pool.query(query, valores);
    res.status(201).json({ mensaje: 'valores de producto insertados con éxito', data: resultado.rows[0] });
  } catch (error) {
    console.error('Error al insertar datos:', error);
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});


//llenar tabla de productos
app.get("/producto/llenar", async (req, res) => {
  try {
    const resultado = await pool.query('SELECT nombredelproducto, cantidad, precio, idcategoria FROM productos'); // 
    res.json(resultado.rows);
    
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});


//llenar tabla de categorias
app.get("/categoria/llenar", async (req, res) => {
  try {
    const resultado = await pool.query('SELECT categoria, descripcion FROM categorias'); // 
    res.json(resultado.rows);
    
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});



// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
