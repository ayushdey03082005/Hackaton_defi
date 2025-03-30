use candid::{CandidType, Deserialize};
use ic_cdk::export_candid;
use ic_cdk_macros::{init, query, update};
use std::collections::HashMap;

#[derive(Clone, CandidType, Deserialize)]
struct Loan {
    borrower: String,
    lender: String,
    amount: u64,
    collateral: u64,
    status: LoanStatus,
}

#[derive(Clone, CandidType, Deserialize, PartialEq)]
enum LoanStatus {
    Requested,
    Funded,
    PaidBack,
}

thread_local! {
    static LOANS: std::cell::RefCell<HashMap<String, Loan>> = std::cell::RefCell::new(HashMap::new());
}

/// Initializes the Loan dApp.
#[init]
fn init() {
    ic_cdk::println!("Loan dApp initialized.");
}

/// Allows a borrower to request a loan.
/// Returns `Ok(())` if the loan request is successfully created, or an error message otherwise.
#[update]
fn request_loan(borrower: String, amount: u64, collateral: u64) -> Result<(), String> {
    if amount == 0 || collateral == 0 {
        return Err("Amount and collateral must be greater than zero.".to_string());
    }

    let loan = Loan {
        borrower: borrower.clone(),
        lender: String::new(),
        amount,
        collateral,
        status: LoanStatus::Requested,
    };

    LOANS.with(|loans| {
        loans.borrow_mut().insert(borrower, loan);
    });

    Ok(())
}

/// Allows a lender to fund a loan for a specific borrower.
/// Returns `Ok(())` if the loan is successfully funded, or an error message otherwise.
#[update]
fn fund_loan(lender: String, borrower: String) -> Result<(), String> {
    LOANS.with(|loans| {
        let mut loans = loans.borrow_mut();
        if let Some(loan) = loans.get_mut(&borrower) {
            if loan.status != LoanStatus::Requested {
                return Err("Loan is not in the 'Requested' status.".to_string());
            }
            loan.lender = lender;
            loan.status = LoanStatus::Funded;
            Ok(())
        } else {
            Err("Loan not found for the specified borrower.".to_string())
        }
    })
}

/// Allows a borrower to pay back their loan.
/// Returns `Ok(())` if the loan is successfully paid back, or an error message otherwise.
#[update]
fn pay_back_loan(borrower: String) -> Result<(), String> {
    LOANS.with(|loans| {
        let mut loans = loans.borrow_mut();
        if let Some(loan) = loans.get_mut(&borrower) {
            if loan.status != LoanStatus::Funded {
                return Err("Loan is not in the 'Funded' status.".to_string());
            }
            loan.status = LoanStatus::PaidBack;
            Ok(())
        } else {
            Err("Loan not found for the specified borrower.".to_string())
        }
    })
}

/// Retrieves the loan details for a specific borrower.
/// Returns `Some(Loan)` if the loan exists, or `None` otherwise.
#[query]
fn get_loan(borrower: String) -> Option<Loan> {
    LOANS.with(|loans| loans.borrow().get(&borrower).cloned())
}

export_candid!();