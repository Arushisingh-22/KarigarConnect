export const SMART_CONTRACT_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title KarigarLoanEscrow
 * @dev Autonomous zero-interest micro-lending smart contract for rural Indian artisans.
 * Part of KarigarConnect (NOVEX Hackathon 2026).
 */
contract KarigarLoanEscrow {
    enum LoanState { Proposed, Funded, Active, Completed, Defaulted }

    struct Loan {
        uint256 loanId;
        address payable artisanAddress;
        string artisanName;
        string craftCategory;
        uint256 goalAmountWei;
        uint256 raisedAmountWei;
        uint256 repaidAmountWei;
        uint256 tenureMonths;
        uint256 monthlyInstallmentWei;
        uint256 createdAt;
        uint256 fundedAt;
        LoanState state;
        uint256 backerCount;
    }

    struct Contribution {
        address backer;
        uint256 amountWei;
        uint256 timestamp;
    }

    address public immutable platformAdmin;
    uint256 public loanCounter;
    mapping(uint256 => Loan) public loans;
    mapping(uint256 => Contribution[]) public loanContributions;
    mapping(address => uint256[]) public supporterLoans;

    event LoanProposed(uint256 indexed loanId, address indexed artisan, uint256 goal);
    event ContributionReceived(uint256 indexed loanId, address indexed backer, uint256 amount);
    event LoanDisbursed(uint256 indexed loanId, address indexed artisan, uint256 amount);
    event RepaymentRecorded(uint256 indexed loanId, uint256 installmentNumber, uint256 amount);
    event LoanCompleted(uint256 indexed loanId);

    modifier onlyAdmin() {
        require(msg.sender == platformAdmin, "Not authorized");
        _;
    }

    constructor() {
        platformAdmin = msg.sender;
    }

    function createLoanRequest(
        string memory _name,
        string memory _craft,
        uint256 _goalWei,
        uint256 _tenureMonths
    ) external returns (uint256) {
        loanCounter++;
        uint256 installment = _goalWei / _tenureMonths;

        loans[loanCounter] = Loan({
            loanId: loanCounter,
            artisanAddress: payable(msg.sender),
            artisanName: _name,
            craftCategory: _craft,
            goalAmountWei: _goalWei,
            raisedAmountWei: 0,
            repaidAmountWei: 0,
            tenureMonths: _tenureMonths,
            monthlyInstallmentWei: installment,
            createdAt: block.timestamp,
            fundedAt: 0,
            state: LoanState.Proposed,
            backerCount: 0
        });

        emit LoanProposed(loanCounter, msg.sender, _goalWei);
        return loanCounter;
    }

    function fundLoan(uint256 _loanId) external payable {
        Loan storage loan = loans[_loanId];
        require(loan.state == LoanState.Proposed, "Loan not open for funding");
        require(msg.value > 0, "Contribution must be > 0");

        loan.raisedAmountWei += msg.value;
        loan.backerCount++;
        loanContributions[_loanId].push(Contribution(msg.sender, msg.value, block.timestamp));
        supporterLoans[msg.sender].push(_loanId);

        emit ContributionReceived(_loanId, msg.sender, msg.value);

        if (loan.raisedAmountWei >= loan.goalAmountWei) {
            loan.state = LoanState.Active;
            loan.fundedAt = block.timestamp;
            // Direct zero-commission disbursement to artisan wallet
            loan.artisanAddress.transfer(loan.raisedAmountWei);
            emit LoanDisbursed(_loanId, loan.artisanAddress, loan.raisedAmountWei);
        }
    }

    function submitRepayment(uint256 _loanId) external payable {
        Loan storage loan = loans[_loanId];
        require(msg.sender == loan.artisanAddress, "Only artisan can repay");
        require(loan.state == LoanState.Active, "Loan is not active");

        loan.repaidAmountWei += msg.value;
        emit RepaymentRecorded(_loanId, loan.repaidAmountWei / loan.monthlyInstallmentWei, msg.value);

        if (loan.repaidAmountWei >= loan.goalAmountWei) {
            loan.state = LoanState.Completed;
            emit LoanCompleted(_loanId);
        }
    }
}`;

export const INITIAL_TRANSACTIONS = [
  {
    txHash: '0x8f2a6b7d19c34e8f1b5d6a29e47f08b1a329d89c452e40749ba94df34de1b857',
    blockNumber: 19842103,
    timestamp: '2 mins ago',
    type: 'CONTRIBUTION',
    from: '0x3A21...79b4 (Vikram S.)',
    to: '0x71C...49bE (Lakshmi Devi)',
    amount: '₹2,500',
    cryptoEquivalent: '0.0084 ETH',
    craft: 'Chanderi Silk & Zari Weaving',
    status: 'Confirmed (12 Block Confirmations)',
    gasUsed: '21,432 Gwei'
  },
  {
    txHash: '0x4d12c8a901e47f2b6e5d8a30f1c9b2e8a719d34e8f1b5d6a29e47f08b1a329d8',
    blockNumber: 19842089,
    timestamp: '18 mins ago',
    type: 'REPAYMENT',
    from: '0x88A...12eC (Rameshwar Prajapati)',
    to: 'KarigarEscrow Contract',
    amount: '₹6,250',
    cryptoEquivalent: '0.0210 ETH',
    craft: 'Terracotta Clay Sculptures',
    status: 'Confirmed (45 Block Confirmations)',
    gasUsed: '34,120 Gwei'
  },
  {
    txHash: '0x992b1f84e3a1d9c7204859a1e0b5c4f284e91048b2a38148f918e827103a8f11',
    blockNumber: 19842065,
    timestamp: '42 mins ago',
    type: 'CONTRIBUTION',
    from: '0x5C89...99a1 (Ananya R.)',
    to: '0x39F...91dD (Fatima Begum)',
    amount: '₹5,000',
    cryptoEquivalent: '0.0168 ETH',
    craft: 'Chikankari & Zardozi Shadow Work',
    status: 'Confirmed (98 Block Confirmations)',
    gasUsed: '21,432 Gwei'
  },
  {
    txHash: '0x21c890ab43fe91a5829148d88c42b09a71239e083942ef3a992819cd8271a0b3',
    blockNumber: 19842021,
    timestamp: '1 hour ago',
    type: 'DISBURSEMENT',
    from: 'KarigarEscrow Contract',
    to: '0x94B...55aA (Kishanlal Suthar)',
    amount: '₹30,000',
    cryptoEquivalent: '0.1008 ETH',
    craft: 'Channapatna Wooden Toys',
    status: 'Confirmed (162 Block Confirmations)',
    gasUsed: '48,920 Gwei'
  },
  {
    txHash: '0x7e3a201b88df34928194a20b83e9182390a7821c9b2e8a719d34e8f1b5d6a29e',
    blockNumber: 19841972,
    timestamp: '2.5 hours ago',
    type: 'REPAYMENT',
    from: '0x45E...88fF (Subhash Chitrakar)',
    to: 'KarigarEscrow Contract',
    amount: '₹6,667',
    cryptoEquivalent: '0.0224 ETH',
    craft: 'Traditional Pattachitra',
    status: 'Confirmed (280 Block Confirmations)',
    gasUsed: '34,120 Gwei'
  }
];

export const BLOCKCHAIN_METRICS = {
  network: 'Ethereum Sepolia Testnet & Polygon PoS Bridge',
  contractAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  blockTime: '2.1s average',
  totalTxCount: 14208,
  consensusMechanism: 'Proof of Stake (Eco-Friendly <0.001 kWh/tx)',
  auditStatus: 'Audited & Verified (Zero Reentrancy & Escrow Invariant Checks Passed)'
};
