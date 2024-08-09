// src/Navbar.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import './App.css';

// Importing pages
import HomePage from "./HomePage";  
import TransactionPage from "./AddTransaction";
import TransactionList from "./TransactionList";
import Reports from "./ReportsPage";
import Settings from "./SettingsPage";

function Navbar() {
  const location = useLocation();

  return (
    <>
      <div className="App">
        <header className="App-header">
          <nav>
            <div className="nav-left">
              <Link to="/"><span>Power +</span></Link>
            </div>
            <ul>
              <li className={location.pathname === "/" ? "active" : ""}>
                <Link to="/">Home</Link>
              </li>
              <li className={location.pathname === "/addTransactions" ? "active" : ""}>
                <Link to="/addTransactions">Add Transaction</Link>
              </li>
              <li className={location.pathname === "/transactionsLists" ? "active" : ""}>
                <Link to="/transactionsLists">Transaction List</Link>
              </li>
              <li className={location.pathname === "/reports" ? "active" : ""}>
                <Link to="/reports">Reports</Link>
              </li>
            </ul>
            <div className="nav-right">
              <Link to="/settings"><i className='bx bx-cog'></i></Link>
            </div>
          </nav>
        </header>
      </div>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addTransactions" element={<TransactionPage />} />
          <Route path="/transactionsLists" element={<TransactionList />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </>
  );
}

export default Navbar;
