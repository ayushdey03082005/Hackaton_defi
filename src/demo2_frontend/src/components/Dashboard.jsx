// import React, { useEffect, useState } from 'react';

import { useEffect, useState } from "react";

const Dashboard = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket('ws://127.0.0.1:3030/ws');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { action, borrower, amount, collateral, status } = data;

      // Update loans based on the action received from the WebSocket
      setLoans((prevLoans) => {
        const updatedLoans = [...prevLoans];
        const loanIndex = updatedLoans.findIndex((loan) => loan.borrower === borrower);

        if (loanIndex >= 0) {
          updatedLoans[loanIndex] = { borrower, amount, collateral, status };
        } else {
          updatedLoans.push({ borrower, amount, collateral, status });
        }

        return updatedLoans;
      });
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="active-loans-summary">
        <h3>Active Loans Summary</h3>
        <p>Active Loans: {loans.filter(loan => loan.status === 'Funded').length}</p>
        <p>Earnings from Lending: ${loans.reduce((acc, loan) => acc + (loan.status === 'PaidBack' ? loan.amount : 0), 0)}</p>
      </div>
      <div className="transaction-history">
        <h3>Transaction History</h3>
        <ul>
          {loans.map((loan, index) => (
            <li key={index}>
              Borrower: {loan.borrower}, Amount: {loan.amount}, Collateral: {loan.collateral}, Status: {loan.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;