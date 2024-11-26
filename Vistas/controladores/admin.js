const express = require('express');
const router = express.Router();
const pool = require('./db'); // Importar configuración de PostgreSQL

// Productos
router.post('/productos', async (req, res) => {
    const { nombre, cantidad, precio } = req.body;
    const imagen = req.file?.path;

    if (!nombre || !cantidad || !precio || !imagen) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO productos (nombre, cantidad, precio, imagen) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, cantidad, precio, imagen]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al agregar producto.' });
    }
});

router.get('/productos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener productos.' });
    }
});

router.put('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, cantidad, precio } = req.body;
    const imagen = req.file?.path;

    try {
        const result = await pool.query(
            'UPDATE productos SET nombre = $1, cantidad = $2, precio = $3, imagen = COALESCE($4, imagen) WHERE id = $5 RETURNING *',
            [nombre, cantidad, precio, imagen, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar producto.' });
    }
});

router.delete('/productos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar producto.' });
    }
});

// Categorías
router.post('/categorias', async (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO categorias (nombre, descripcion) VALUES ($1, $2) RETURNING *',
            [nombre, descripcion]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al agregar categoría.' });
    }
});

router.get('/categorias', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categorias');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener categorías.' });
    }
});

router.put('/categorias/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        const result = await pool.query(
            'UPDATE categorias SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *',
            [nombre, descripcion, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada.' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar categoría.' });
    }
});

router.delete('/categorias/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM categorias WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada.' });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar categoría.' });
    }
});

// Carrusel
router.post('/carrusel', async (req, res) => {
    const { titulo, descripcion } = req.body;
    const imagen = req.file?.path;

    if (!titulo || !descripcion || !imagen) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO carrusel (titulo, descripcion, imagen) VALUES ($1, $2, $3) RETURNING *',
            [titulo, descripcion, imagen]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al agregar elemento al carrusel.' });
    }
});

router.get('/carrusel', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM carrusel');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener elementos del carrusel.' });
    }
});

router.put('/carrusel/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;
    const imagen = req.file?.path;

    try {
        const result = await pool.query(
            'UPDATE carrusel SET titulo = $1, descripcion = $2, imagen = COALESCE($3, imagen) WHERE id = $4 RETURNING *',
            [titulo, descripcion, imagen, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Elemento del carrusel no encontrado.' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar elemento del carrusel.' });
    }
});

router.delete('/carrusel/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM carrusel WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Elemento del carrusel no encontrado.' });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar elemento del carrusel.' });
    }
});

module.exports = router;
