import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import LendingPage from './components/LendingPage';
import BorrowingPage from './components/BorrowingPage';
import Dashboard from './components/Dashboard';

function App() {
  
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Loan dApp</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/lend">Lend</Link></li>
              <li><Link to="/borrow">Borrow</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </nav>
          <button className="connect-wallet">Connect Wallet</button>
        </header>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/lend" element={<LendingPage />} />
          <Route path="/borrow" element={<BorrowingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;