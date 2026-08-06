const db = require('../config/db');

// Obtener todos los libros
const obtenerLibros = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM libros ORDER BY id ASC'
    );
    res.status(200).json({
      ok: true,
      cantidad: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener los libros',
      error: error.message,
    });
  }
};

// Obtener un libro por ID
const obtenerLibroPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM libros WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Libro no encontrado',
      });
    }
    res.status(200).json({ ok: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al buscar el libro',
      error: error.message,
    });
  }
};

// Crear un nuevo libro
const crearLibro = async (req, res) => {
  const { titulo, autor, anio_publicacion, genero } = req.body;

  if (!titulo || !autor) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Los campos titulo y autor son obligatorios',
    });
  }

  try {
    const result = await db.query(
      'INSERT INTO libros (titulo, autor, anio_publicacion, genero) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, autor, anio_publicacion || null, genero || null]
    );
    res.status(201).json({
      ok: true,
      mensaje: 'Libro creado exitosamente',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear el libro',
      error: error.message,
    });
  }
};

module.exports = {
  obtenerLibros,
  obtenerLibroPorId,
  crearLibro,
};