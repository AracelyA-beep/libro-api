const { Pool } = require('pg');
require('dotenv').config();

// Configuración compatible con Vercel (Neon) y Local
const poolConfig = process.env.DATABASE_URL 
  ? { connectionString: process.env.DATABASE_URL } // Para Vercel/Neon
  : { // Para tu entorno local
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
    };

// Forzar SSL en producción (Vercel)
if (process.env.NODE_ENV === 'production') {
  poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  console.error('Error inesperado en el pool de conexión:', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};