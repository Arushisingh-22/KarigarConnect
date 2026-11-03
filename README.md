# KarigarConnect — Empowering Artisans Through Opportunity

> **NOVEX Hackathon 2026 — Social Impact Category**  
> A blockchain-backed micro-lending platform directly connecting rural Indian artisans with conscious urban supporters. Eliminating exploitative middlemen and preserving India's living cultural heritage.

---

## 🎨 Theme & Exact Color Palette
- **Forest Green:** `#173B35` (Primary navigation, headers, accents)
- **Warm Cream:** `#F5EFE4` (Primary background, warmth)
- **Terracotta:** `#C7794A` (Primary CTA buttons, interactive elements)
- **Muted Gold:** `#D5B46A` (Badges, verified indicators, royal accents)
- **Dark Text:** `#263B36` (Typography, body)
- **White:** `#FFFFFF` (Cards, elevated panels)

---

## 🛠️ Technology Stack
- **Frontend:** React 18 (Vite)
- **Styling:** Tailwind CSS + Custom Responsive Design System
- **Animations:** Framer Motion (Page transitions, scroll reveals, stats spring counters, card lift)
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti
- **Backend API:** Node.js + Express.js (`server/index.js`)
- **Database Schema:** PostgreSQL (`server/schema.sql`)
- **Blockchain / Smart Contracts:** Ethereum Solidity (`contracts/KarigarLoanEscrow.sol`)
- **Authentication:** JWT simulation with 1-click dual role switching (Artisan vs Supporter)

---

## 🚀 Key Pages & Features
1. **Home Page (`/`)**:
   - Hero banner: *"Empowering Artisans. Connecting Opportunities."*
   - Floating live funding cards & blockchain status badges
   - Animated statistics counters (₹48.5L+ Disbursed, 99.2% Repayment Rate, 520+ Artisans, 0% Middlemen Cut)
   - Curated featured artisan cards
   - 5-step model overview
   - Live simulated Ethereum transaction stream
   - Testimonials & Call-to-action
2. **About Us (`/about`)**:
   - Problem statement & challenges (middlemen taking 60–80%, moneylenders at 36–48% APR)
   - KarigarConnect zero-middleman micro-lending solution
   - Before vs After comparison
   - Mission, Vision & Cultural Preservation
3. **Explore Artisans Marketplace (`/explore`)**:
   - Live search by artisan name, craft, or state
   - Craft category filters: Handloom, Pottery, Embroidery, Woodcraft, Handmade Jewellery, Traditional Crafts
   - Sorting by funding %, most backers, or smallest goal
   - Interactive artisan cards with progress indicators
4. **Artisan Detail Profile (`/artisan/:id`)**:
   - High-resolution craft gallery
   - Artisan story, family heritage & GI certification badge
   - Itemized Use of Funds breakdown (materials, tools, exhibition)
   - Flexible zero-interest repayment schedule
   - Direct "Fund This Artisan" trigger
5. **Funding Experience (`/funding`)**:
   - Interactive micro-capital allocation
   - Preset amounts (₹500, ₹1000, ₹2500, ₹5000) or custom input
   - Simulated payment rails (UPI / QR, Web3 Sepolia ETH, Netbanking)
   - Real-time impact calculator
   - Instant cryptographic transaction receipt & block confirmation
6. **How It Works (`/how-it-works`)**:
   - Interactive 5-step visual flow: Registration ➔ Verification ➔ Funding ➔ Blockchain Record ➔ Repayment & Growth
   - Lifecycle of a ₹10,000 Micro-Loan economic breakdown
7. **Blockchain Transparency (`/blockchain`)**:
   - Live interactive Block Explorer with search and filter
   - Smart contract code viewer for `KarigarLoanEscrow.sol` with 1-click copy
   - Real-time transaction feed
8. **Dual-Role Dashboard (`/dashboard`)**:
   - **Artisan View:** Profile completion score (94%), loan goal tracking, raw material inventory status, and interactive "Record Demo Repayment" button.
   - **Supporter View:** Total contributed, supported artisans portfolio, active loan repayments, and downloadable Certificate of Micro-Patronage.
9. **Impact (`/impact`)**:
   - 4 Major Strategic Pillars: Financial Inclusion, Artisan Business Growth, Social & Cultural Impact, Transparency & Trust
   - Projected outcomes for NOVEX Hackathon presentation (clearly identified as projections)
   - State-wise geographic craft map across India
10. **Auth Portal (`/login`)**:
    - Quick 1-click demo access for Hackathon judges (Lakshmi Devi as Artisan or Vikram Sen as Supporter).

---

## 💻 Running the Project Locally

### 1. Start the React Frontend:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. (Optional) Run the Express Backend Server:
```bash
npm run server
```
Runs the Express API on [http://localhost:5000](http://localhost:5000).

### 3. Build for Production:
```bash
npm run build
```
Creates an optimized production build in `dist/`.

---

© 2026 KarigarConnect. Built for NOVEX Hackathon 2026. Empowering Artisans Through Opportunity.
