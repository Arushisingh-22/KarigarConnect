// =========================================================
// KarigarConnect — Node.js & Express API Backend
// NOVEX Hackathon 2026
// =========================================================

import express from 'express';
import cors from 'cors';
import pool from './db.js';
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory demo data matching database schema
let artisans = [
  {
    id: 'artisan-1',
    name: 'Lakshmi Devi',
    location: 'Chanderi, Madhya Pradesh',
    craft: 'Chanderi Silk & Zari Weaving',
    category: 'Handloom',
    fundingGoal: 40000,
    amountRaised: 33500,
    backersCount: 29,
    status: 'ACTIVE'
  },
  {
    id: 'artisan-2',
    name: 'Rameshwar Prajapati',
    location: 'Gorakhpur, Uttar Pradesh',
    craft: 'Terracotta Clay Sculptures',
    category: 'Pottery',
    fundingGoal: 25000,
    amountRaised: 22000,
    backersCount: 22,
    status: 'ACTIVE'
  }
];

let transactions = [
  {
    txHash: '0x8f2a6b7d19c34e8f1b5d6a29e47f08b1a329d89c452e40749ba94df34de1b857',
    blockNumber: 19842103,
    type: 'CONTRIBUTION',
    amount: 2500,
    timestamp: new Date().toISOString()
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    project: 'KarigarConnect',
    hackathon: 'NOVEX Hackathon 2026',
    database: 'PostgreSQL (Demo Bridge Ready)',
    blockchain: 'Ethereum Sepolia Testnet'
  });
});

// Artisans endpoint
app.get('/api/artisans', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        ap.id,
        u.full_name AS name,
        u.avatar_url AS avatar,
        ap.craft_category AS category,
        ap.village || ', ' || ap.state AS location,
        ap.experience_years,
        ap.heritage_lineage,
        ap.verification_status,
        ap.bio_story,
        lr.id AS "loanId",
        lr.title AS "loanTitle",
        lr.goal_amount AS "fundingGoal",
        lr.amount_raised AS "amountRaised",
        lr.status AS "loanStatus"
      FROM artisan_profiles ap
      JOIN users u ON u.id = ap.user_id
      LEFT JOIN loan_requests lr ON lr.artisan_id = ap.id
      ORDER BY lr.amount_raised DESC
    `);

    res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).json({ error: 'Failed to fetch artisans from database' });
  }
});

// Contribute endpoint
app.post('/api/contribute', async (req, res) => {
  const { artisanId, amount, supporterName, paymentMethod } = req.body;

  try {
    const txHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
    const blockNumber = 19842100 + Math.floor(Math.random() * 50);

    // Save contribution into PostgreSQL table
    const result = await pool.query(`
      INSERT INTO contributions (loan_id, supporter_id, amount, payment_method, blockchain_tx_hash, block_number)
      VALUES (
        'e1111111-1111-1111-1111-111111111111', 
        'c1111111-1111-1111-1111-111111111111', 
        $1, 
        $2, 
        $3, 
        $4
      )
      RETURNING *
    `, [Number(amount), paymentMethod || 'UPI', txHash, blockNumber]);

    console.log(` Saved ₹${amount} contribution to PostgreSQL from ${supporterName || 'Supporter'}!`);

    res.json({
      success: true,
      message: 'Contribution successfully saved in PostgreSQL database!',
      contribution: result.rows[0]
    });
  } catch (err) {
    console.error('Database error on contribute:', err.message);
    res.status(500).json({ error: 'Failed to save to database' });
  }
});
// Register New User Endpoint
app.post('/api/auth/register', async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'Full name, email, and password are required' });
  }

  try {
    // Insert into Supabase users table
    const result = await pool.query(`
      INSERT INTO users (full_name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, full_name, email, role, created_at
    `, [fullName, email, password, role || 'SUPPORTER']);

    const newUser = result.rows[0];

    // Agar Artisan hai toh unka artisan profile record bhi create karo
    if (role === 'ARTISAN') {
      await pool.query(`
        INSERT INTO artisan_profiles (user_id, craft_category, village, district, state, experience_years, bio_story)
        VALUES ($1, 'Handicrafts', 'Village', 'District', 'State', 5, 'Traditional artisan preserving Indian heritage crafts.')
      `, [newUser.id]);
    }

    console.log(` New user registered in Supabase: ${fullName} (${email}) as ${role}`);

    res.status(201).json({
      success: true,
      message: 'Account created successfully in database!',
      user: {
        id: newUser.id,
        name: newUser.full_name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error('Registration error:', err.message);
    if (err.code === '23505') {
      return res.status(400).json({ error: 'This email is already registered' });
    }
    res.status(500).json({ error: 'Failed to create user account' });
  }
});
// Auth endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, role } = req.body;
  // Demo JWT simulation token
  const demoToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + btoa(JSON.stringify({
    email,
    role: role || 'SUPPORTER',
    iat: Math.floor(Date.now() / 1000)
  })) + '.simulatedSignature2026';

  res.json({
    success: true,
    token: demoToken,
    user: {
      email,
      name: role === 'ARTISAN' ? 'Lakshmi Devi' : 'Vikram Sen',
      role: role || 'SUPPORTER'
    }
  });
});

// Start server when executed directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`KarigarConnect Backend API running on http://localhost:${PORT}`);
  });
}

export default app;
