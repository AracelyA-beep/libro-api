const express = require('express');
const cors = require('cors');
require('dotenv').config();

const healthRoutes = require('./routes/health.routes');
const librosRoutes = require('./routes/libros.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/', healthRoutes);
app.use('/api/libros', librosRoutes);

// Ruta de prueba raíz
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de Gestión de Libros',
    version: '1.0.0',
    endpoints: {
      salud: 'GET /health',
      listarLibros: 'GET /api/libros',
      buscarLibro: 'GET /api/libros/:id',
      crearLibro: 'POST /api/libros',
    },
  });
});

// Manejador de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ ok: false, mensaje: 'Ruta no encontrada' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;