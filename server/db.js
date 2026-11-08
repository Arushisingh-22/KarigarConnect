import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// CRITICAL: Prevent unhandled ECONNRESET on idle client sockets from crashing Node.js
pool.on('error', (err) => {
  console.warn('ℹ️ PostgreSQL pool idle client notice:', err.message);
});

pool.query('SELECT NOW()')
  .then(() => console.log(' Connected to PostgreSQL database'))
  .catch(err => console.error(' Database connection failed:', err.message));

export default pool;
