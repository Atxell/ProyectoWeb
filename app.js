const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();
const path = require("path");
const app = express();

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
  res.send("Bienvenido al servidor de VINIMATH");
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
      "SELECT * FROM usuarios WHERE correoelectronico = $1",
      [correoelectronico]
    );

    console.log("Respuesta de la base de datos:", userQuery.rows);

    if (userQuery.rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const user = userQuery.rows[0];
    // Comparar la contraseña con bcrypt
    const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);

    console.log("¿Contraseña válida?:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

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


// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
