// import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import LendingPage from './components/LendingPage';
import BorrowingPage from './components/BorrowingPage';
import Dashboard from './components/Dashboard';
import { useAuth } from './StateManagement/useContext/useClient';
import { ConnectWallet } from "@nfid/identitykit/react";

const ConnectBtn = ({ onClick }) => (
  <button className="connect-wallet" onClick={onClick}>Connect Wallet</button>
  // <button
  //   onClick={onClick}
  //   className=" bg-white"
  // >
  //   <div className=" w-full h-full  rounded-xl flex items-center justify-center  ">
  //     Connect Wallet
  //   </div>
  // </button>
  
);
function App() {

  const { isAuthenticated,  principal , user, actor } = useAuth();
  console.log(actor ,"XYZ");
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submitHandler");
    actor.pay_back_loan();
  }
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
          
          {!isAuthenticated && (
          <div className="hidden font-posterama md:block">
            <ConnectWallet
              connectButtonComponent={ConnectBtn}
              className="rounded-full bg-black"
            />
          </div>
        )}
        {isAuthenticated && (
          <div className="hidden font-posterama md:block">
            <p className="text-white">Connected as: {user?.principal?.toText()}
          </p>
          </div>
        )}
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