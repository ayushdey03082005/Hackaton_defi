// import React, { useState } from 'react';

import { useState } from "react";

const LendingPage = () => {
  const [asset, setAsset] = useState('ICP');
  const [amount, setAmount] = useState(0);
  const [earnings, setEarnings] = useState(0);

  const handleDeposit = () => {
    const interestRate = 0.05;
    const estimatedEarnings = amount * interestRate;
    setEarnings(estimatedEarnings);
    alert('Deposit Successful');
  };

  const handleWithdraw = () => {
    setAmount(0);
    setEarnings(0);
    alert('Withdraw Successful');
  };

  return (
    <div className="lending-page">
      <h2>Lend Your Assets</h2>
      <div className="wallet-connect">Wallet Connected: <strong>Your Wallet Address</strong></div>
      <div className="deposit-withdraw-panel">
        <div>
          <label>Select Asset:</label>
          <select value={asset} onChange={(e) => setAsset(e.target.value)}>
            <option value="ICP">ICP</option>
            <option value="cycles">Cycles</option>
          </select>
        </div>
        <div>
          <label>Deposit Amount:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </div>
        <div>
          <button onClick={handleDeposit}>Deposit</button>
          <button onClick={handleWithdraw}>Withdraw</button>
        </div>
        <div className="estimated-earnings">
          <p>Fixed Interest Rate: 5% per year</p>
          <p>Estimated Earnings: {earnings}</p>
        </div>
      </div>
    </div>
  );
}

export default LendingPage;