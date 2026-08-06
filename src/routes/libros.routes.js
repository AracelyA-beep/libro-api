const express = require('express');
const router = express.Router();
const {
  obtenerLibros,
  obtenerLibroPorId,
  crearLibro,
} = require('../controllers/libros.controller');

router.get('/', obtenerLibros);
router.get('/:id', obtenerLibroPorId);
router.post('/', crearLibro);

module.exports = router;