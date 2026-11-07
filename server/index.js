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
  const { artisanId, amount, supporterName, paymentMethod, txHash: clientTxHash, blockNumber: clientBlockNumber } = req.body;

  try {
    const txHash = clientTxHash || ('0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join(''));
    const blockNumber = clientBlockNumber || (19842100 + Math.floor(Math.random() * 50));

    // Lookup matching supporter user ID if available
    let supporterId = 'c1111111-1111-1111-1111-111111111111';
    if (supporterName) {
      const uRes = await pool.query(
        'SELECT id FROM users WHERE LOWER(full_name) LIKE LOWER($1) LIMIT 1',
        ['%' + supporterName.trim() + '%']
      );
      if (uRes.rows.length > 0) {
        supporterId = uRes.rows[0].id;
      }
    }

    // Lookup loan ID for the targeted artisan
    let targetLoanId = 'e1111111-1111-1111-1111-111111111111';
    if (artisanId) {
      const loanRes = await pool.query(
        'SELECT id FROM loan_requests WHERE artisan_id = $1 LIMIT 1',
        [artisanId]
      );
      if (loanRes.rows.length > 0) {
        targetLoanId = loanRes.rows[0].id;
      }
    }

    // Save contribution into PostgreSQL table with matching client txHash
    const result = await pool.query(`
      INSERT INTO contributions (loan_id, supporter_id, amount, payment_method, blockchain_tx_hash, block_number)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [targetLoanId, supporterId, Number(amount), paymentMethod || 'UPI', txHash, blockNumber]);

    // Also update loan_requests raised amount
    await pool.query(`
      UPDATE loan_requests 
      SET amount_raised = LEAST(goal_amount, amount_raised + $1) 
      WHERE id = $2
    `, [Number(amount), targetLoanId]).catch(err => console.warn('Could not update loan raised amount:', err.message));

    console.log(` Saved ₹${amount} contribution to PostgreSQL from ${supporterName || 'Supporter'}! TxHash: ${txHash}`);

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

// LOAN MANAGEMENT 
// 1. Artisan applies for a new micro-loan
app.post('/api/loans', async (req, res) => {
  const { artisanId, title, craftPurpose, goalAmount, tenureMonths } = req.body;

  if (!artisanId || !title || !goalAmount) {
    return res.status(400).json({ error: 'artisanId, title, and goalAmount are required' });
  }

  try {
    const result = await pool.query(`
      INSERT INTO loan_requests (
        artisan_id,
        title,
        craft_purpose,
        goal_amount,
        amount_raised,
        amount_repaid,
        tenure_months,
        interest_rate_percent,
        status
      )
      VALUES ($1, $2, $3, $4, 0.00, 0.00, $5, 0.00, 'ACTIVE')
      RETURNING *
    `, [
      artisanId,
      title,
      craftPurpose || 'Micro-loan for raw materials and workshop tools',
      Number(goalAmount),
      Number(tenureMonths) || 6
    ]);

    console.log(` New Loan Created in Supabase: "${title}" for ₹${goalAmount}`);

    res.status(201).json({
      success: true,
      message: 'Loan application submitted and activated in database!',
      loan: result.rows[0]
    });
  } catch (err) {
    console.error('Error creating loan:', err.message);
    res.status(500).json({ error: 'Failed to create loan application' });
  }
});

// 2. Fetch all loans with artisan details
app.get('/api/loans', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        lr.id AS "loanId",
        lr.title,
        lr.craft_purpose AS "craftPurpose",
        lr.goal_amount AS "goalAmount",
        lr.amount_raised AS "amountRaised",
        lr.amount_repaid AS "amountRepaid",
        lr.tenure_months AS "tenureMonths",
        lr.interest_rate_percent AS "interestRate",
        lr.status,
        lr.created_at AS "createdAt",
        u.full_name AS "artisanName",
        ap.craft_category AS "category",
        ap.village || ', ' || ap.state AS "location"
      FROM loan_requests lr
      JOIN artisan_profiles ap ON ap.id = lr.artisan_id
      JOIN users u ON u.id = ap.user_id
      ORDER BY lr.created_at DESC
    `);

    res.json({ success: true, count: result.rows.length, loans: result.rows });
  } catch (err) {
    console.error('Error fetching loans:', err.message);
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
});

// 3. Record a loan repayment installment
app.post('/api/repayments', async (req, res) => {
  const { loanId, installmentNumber, amount } = req.body;

  if (!loanId || !amount) {
    return res.status(400).json({ error: 'loanId and amount are required' });
  }

  try {
    const txHash = clientTxHash || ('0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join(''));

    // Insert into repayments table
    const result = await pool.query(`
      INSERT INTO repayments (loan_id, installment_number, amount, due_date, paid_date, blockchain_tx_hash, status)
      VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_TIMESTAMP, $4, 'PAID')
      RETURNING *
    `, [loanId, Number(installmentNumber) || 1, Number(amount), txHash]);

    // Update loan_requests amount_repaid
    await pool.query(`
      UPDATE loan_requests
      SET amount_repaid = amount_repaid + $1
      WHERE id = $2
    `, [Number(amount), loanId]);

    console.log(` Repayment of ₹${amount} recorded in Supabase for Loan #${loanId}!`);

    res.json({
      success: true,
      message: 'Repayment successfully recorded and balance updated!',
      repayment: result.rows[0]
    });
  } catch (err) {
    console.error('Error recording repayment:', err.message);
    res.status(500).json({ error: 'Failed to record repayment' });
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
