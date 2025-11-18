const { Pool } = require('pg');
require('dotenv').config();



const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // only for development; use `true` in production with proper certs
  },
});

pool.on('connect', () => {
  console.log(`[${new Date().toISOString()}] 📡 PostgreSQL client connected`);
});

pool.on('remove', () => {
  console.log(`[${new Date().toISOString()}] 🔌 Client removed (disconnected) from pool`);
});

pool.on('error', (err) => {
  console.error(`[${new Date().toISOString()}] ❌ Unexpected error on idle client`, err);
});



module.exports = pool;
