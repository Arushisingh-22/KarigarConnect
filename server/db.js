import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query('SELECT NOW()')
  .then(() => console.log(' Connected to PostgreSQL database'))
  .catch(err => console.error(' Database connection failed:', err.message));

export default pool;