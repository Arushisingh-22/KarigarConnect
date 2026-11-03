// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title KarigarLoanEscrow
 * @dev Autonomous zero-interest micro-lending smart contract for rural Indian artisans.
 * NOVEX Hackathon 2026.
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
}
