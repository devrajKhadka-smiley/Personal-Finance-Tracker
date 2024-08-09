import React, { useState } from "react";
import { useFinance } from "../Context/TransactionContext";
import 'boxicons/css/boxicons.min.css';
import exampleImage from '../Assets/hello.jpg';
import '../App.css';

const HomePage = () => {
  const { settings, transactions } = useFinance();
  const [showBalance, setShowBalance] = useState(true);

  const totalIncome = transactions
    .filter(transaction => transaction.type === "Income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenses = transactions
    .filter(transaction => transaction.type === "Expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  const handleToggleBalance = () => {
    setShowBalance(prevState => !prevState);
  };

  return (
    <div className="home-page">
      <div className="home-page-left">
        <h1>Welcome to Your Personal Finance Tracker{settings.name ? `, ${settings.name}` : ''}!</h1>
        <p className="intro-text">
          Manage your finances with ease and stay on top of your budget, savings, and spending. Our tracker helps you monitor your income, expenses, and overall financial health in one convenient place.
        </p>
        <div className="balance-info">
          <h2>Your Net Balance</h2>
          <div className="balance-container">
            <p className="balance-value">
              {showBalance ? `$${netBalance.toFixed(2)}` : '****'}
            </p>
            <button
              onClick={handleToggleBalance}
              className="toggle-button"
            >
              <i className={`bx ${showBalance ? 'bx-hide' : 'bx-show'}`} />
            </button>
          </div>
        </div>
        <div className="custom-tags">
          <span className="tag">Finance</span>
          <span className="tag">Budget</span>
          <span className="tag">Savings</span>
        </div>
      </div>
      <div className="home-page-right">
        <img src={exampleImage} alt="Finance Illustration" className="illustration" />
      </div>
      <div className="water-flow"></div>
    </div>
  );
};

export default HomePage;
