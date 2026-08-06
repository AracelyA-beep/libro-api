const db = require('../config/db');

const checkHealth = async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.status(200).json({
      status: 'ok',
      service: 'libros-api',
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      service: 'libros-api',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message,
    });
  }
};

module.exports = { checkHealth };