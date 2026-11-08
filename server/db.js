import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Verified Supabase cloud connection string (URL-encoded password: Karigar%4020206)
const DEFAULT_DATABASE_URL = 'postgresql://postgres.edqpwquiqwlhdqocirql:Karigar%4020206@aws-0-ap-south-1.pooler.supabase.com:5432/postgres';

const connectionString = process.env.DATABASE_URL || DEFAULT_DATABASE_URL;

const pool = new pg.Pool({
  connectionString,
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
