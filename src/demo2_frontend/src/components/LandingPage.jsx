// import React from 'react';
// import { Link } from 'react-router-dom';

import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h2>Welcome to the Loan dApp</h2>
      <div className="overview-panel">
        <p>Total Value Locked (TVL): $1,000,000</p>
        <p>Active Loans: 100</p>
      </div>
      <div className="quick-actions">
        <Link to="/lend" className="action-button">Lend Now</Link>
        <Link to="/borrow" className="action-button">Borrow Now</Link>
      </div>
    </div>
  );
}

export default LandingPage;