const express = require('express');
const router = express.Router();

// Ruta para el registro de usuarios
router.post('/register', async (req, res) => {
    try {
        // Desestructuración de los datos del cuerpo de la solicitud
        const { username, nombre, apellidos, email, password, direccion, pais, estado, ciudad, codigoPostal } = req.body;

        // Validación básica de los campos obligatorios
        if (!username || !nombre || !apellidos || !email || !password || !direccion || !pais || !estado || !ciudad || !codigoPostal) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        // Simulación de guardado en la base de datos
        console.log('Usuario registrado:', {
            username, nombre, apellidos, email, password, direccion, pais, estado, ciudad, codigoPostal
        });

        // Respuesta exitosa
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
