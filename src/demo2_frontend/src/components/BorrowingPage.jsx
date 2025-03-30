// import React, { useState } from 'react';

import { useState } from "react";


const BorrowingPage = () => {
  const [amount, setAmount] = useState(0);
  const [collateral, setCollateral] = useState(0);
  const [repayment, setRepayment] = useState(0);

  const handleCalculate = () => {
    const ltvRatio = 1.5; // 150%
    const interestRate = 0.05; // 5%
    const requiredCollateral = amount * ltvRatio;
    const totalRepayment = amount + (amount * interestRate);
    setCollateral(requiredCollateral);
    setRepayment(totalRepayment);
  };

  return (
    <div className="borrowing-page">
      <h2>Borrow Assets</h2>
      <div>
        <label>Loan Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} onBlur={handleCalculate} />
      </div>
      <div>
        <label>Required Collateral:</label>
        <input type="number" value={collateral} readOnly />
      </div>
      <div className="repayment-section">
        <h3>Repayment Details</h3>
        <p>Borrowed Amount: {amount}</p>
        <p>Interest (5%): {amount * 0.05}</p>
        <p>Total Repayment Amount: {repayment}</p>
        <button onClick={() => alert('Repayment Successful')}>Repay Loan</button>
      </div>
    </div>
  );
}

export default BorrowingPage;