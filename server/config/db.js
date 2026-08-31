const { Pool } = require('pg');
require('dotenv').config();

let pool = null;
let isFallback = true;

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('neon') ? { rejectUnauthorized: false } : false
    });
    
    // Test the connection synchronously/on startup
    pool.query('SELECT NOW()', (err, res) => {
      if (err) {
        console.warn('⚠️ WARNING: PostgreSQL connection failed. Falling back to In-Memory Datastore.');
        isFallback = true;
      } else {
        console.log('✅ Connected to PostgreSQL successfully.');
        isFallback = false;
      }
    });
  } catch (error) {
    console.warn('⚠️ WARNING: Failed to initialize PostgreSQL pool. Falling back to In-Memory Datastore.');
    isFallback = true;
  }
} else {
  console.log('ℹ️ No DATABASE_URL found in environment. Running in In-Memory Fallback Mode.');
  isFallback = true;
}

module.exports = {
  query: (text, params) => {
    if (isFallback || !pool) {
      // In fallback mode, queries directly via pg pool won't execute.
      // Controllers will route requests through our memory services instead.
      throw new Error('Database is in fallback mode. Use memory services instead.');
    }
    return pool.query(text, params);
  },
  getIsFallback: () => isFallback,
  setFallback: (val) => { isFallback = val; },
  pool
};
