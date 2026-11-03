// =========================================================
// KarigarConnect — Node.js & Express API Backend
// NOVEX Hackathon 2026
// =========================================================

import express from 'express';
import cors from 'cors';

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
app.get('/api/artisans', (req, res) => {
  res.json({ success: true, count: artisans.length, data: artisans });
});

// Contribute endpoint
app.post('/api/contribute', (req, res) => {
  const { artisanId, amount, supporterName, paymentMethod } = req.body;
  if (!artisanId || !amount) {
    return res.status(400).json({ error: 'artisanId and amount are required' });
  }

  const txHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
  const newTx = {
    txHash,
    blockNumber: 19842100 + Math.floor(Math.random() * 50),
    type: 'CONTRIBUTION',
    artisanId,
    supporterName: supporterName || 'Anonymous Supporter',
    amount: Number(amount),
    paymentMethod: paymentMethod || 'UPI',
    timestamp: new Date().toISOString()
  };

  transactions.unshift(newTx);
  res.json({
    success: true,
    message: 'Demo contribution successfully registered on blockchain ledger',
    transaction: newTx
  });
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
