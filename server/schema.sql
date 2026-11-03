-- =========================================================
-- KarigarConnect — PostgreSQL Database Schema
-- Social Impact Micro-lending for Rural Indian Artisans
-- NOVEX Hackathon 2026
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Artisans and Urban Supporters)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) NOT NULL CHECK (role IN ('ARTISAN', 'SUPPORTER', 'ADMIN')),
    ethereum_address VARCHAR(42),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Artisan Profiles Table
CREATE TABLE artisan_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    craft_category VARCHAR(100) NOT NULL,
    village VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    experience_years INT NOT NULL,
    heritage_lineage VARCHAR(150),
    gi_tag_number VARCHAR(100),
    verification_status VARCHAR(30) DEFAULT 'VERIFIED' CHECK (verification_status IN ('PENDING', 'VERIFIED', 'REJECTED')),
    bio_story TEXT NOT NULL,
    workshop_images TEXT[],
    bank_account_verified BOOLEAN DEFAULT TRUE,
    upi_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Loan Requests Table
CREATE TABLE loan_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artisan_id UUID NOT NULL REFERENCES artisan_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    craft_purpose TEXT NOT NULL,
    goal_amount NUMERIC(12, 2) NOT NULL,
    amount_raised NUMERIC(12, 2) DEFAULT 0.00,
    amount_repaid NUMERIC(12, 2) DEFAULT 0.00,
    tenure_months INT NOT NULL,
    interest_rate_percent NUMERIC(5, 2) DEFAULT 0.00,
    status VARCHAR(30) DEFAULT 'ACTIVE' CHECK (status IN ('DRAFT', 'ACTIVE', 'FULLY_FUNDED', 'REPAID', 'DEFAULTED')),
    smart_contract_loan_id INT,
    smart_contract_address VARCHAR(42),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    funded_at TIMESTAMP WITH TIME ZONE
);

-- 4. Contributions (Micro-loans from Supporters)
CREATE TABLE contributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    loan_id UUID NOT NULL REFERENCES loan_requests(id) ON DELETE CASCADE,
    supporter_id UUID NOT NULL REFERENCES users(id),
    amount NUMERIC(12, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'UPI' CHECK (payment_method IN ('UPI', 'ETH', 'CARD', 'NETBANKING')),
    blockchain_tx_hash VARCHAR(66),
    block_number BIGINT,
    status VARCHAR(30) DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Repayment Schedule & Installments
CREATE TABLE repayments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    loan_id UUID NOT NULL REFERENCES loan_requests(id) ON DELETE CASCADE,
    installment_number INT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    due_date DATE NOT NULL,
    paid_date TIMESTAMP WITH TIME ZONE,
    blockchain_tx_hash VARCHAR(66),
    status VARCHAR(30) DEFAULT 'PAID' CHECK (status IN ('PENDING', 'PAID', 'GRACE_PERIOD')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Blockchain Ledger Audit Log
CREATE TABLE blockchain_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tx_hash VARCHAR(66) UNIQUE NOT NULL,
    block_number BIGINT NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    from_address VARCHAR(42) NOT NULL,
    to_address VARCHAR(42) NOT NULL,
    amount_inr NUMERIC(12, 2),
    amount_eth NUMERIC(18, 8),
    gas_fee_gwei NUMERIC(12, 2),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indices for rapid querying
CREATE INDEX idx_artisans_category ON artisan_profiles(craft_category);
CREATE INDEX idx_artisans_state ON artisan_profiles(state);
CREATE INDEX idx_loans_status ON loan_requests(status);
CREATE INDEX idx_contributions_supporter ON contributions(supporter_id);
CREATE INDEX idx_blockchain_tx ON blockchain_audit_logs(tx_hash);
