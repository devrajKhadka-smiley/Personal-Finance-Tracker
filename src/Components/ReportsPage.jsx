import React from "react";
import { useFinance } from "../Context/TransactionContext";
import '../App.css'; // Ensure you have styles defined here or include your styles directly

const ReportsPage = () => {
  const { transactions, settings } = useFinance();
  const currencySymbol = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    CNY: "CN¥",
    INR: "₹",
    NPR: "N₹"
    // Add more currency symbols as needed
  };

  const formatAmount = (amount) => {
    return `${currencySymbol[settings.currency] || '$'}${amount.toFixed(2)}`;
  };

  // Calculate total income
  const totalIncome = transactions
    .filter(transaction => transaction.type === "Income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Calculate total expenses
  const totalExpenses = transactions
    .filter(transaction => transaction.type === "Expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Calculate net balance
  const netBalance = totalIncome - totalExpenses;

  // Group transactions by source and type
  const transactionsBySource = transactions.reduce((acc, transaction) => {
    const { source, amount, type } = transaction;
    if (!acc[source]) {
      acc[source] = { Income: 0, Expense: 0 };
    }
    acc[source][type] += amount;
    return acc;
  }, {});

  return (
    <div className="reports-page-container">
      <div className="reports-content">
        <div className="reports-summary">
          <h2 className="reports-title">Financial Reports</h2>
          <div className="report-summary">
            <div className="report-item">
              <strong>Total Income:</strong> {formatAmount(totalIncome)}
            </div>
            <div className="report-item">
              <strong>Total Expenses:</strong> {formatAmount(totalExpenses)}
            </div>
            <div className="report-item">
              <strong>Net Balance:</strong> {formatAmount(netBalance)}
            </div>
          </div>
        </div>

        <div className="transactions-by-source">
          <h3 className="transactions-by-source-title">Transactions by Source</h3>
          <ul className="transactions-by-source-list">
            {Object.keys(transactionsBySource).map(source => (
              <li key={source} className="source-item">
                <div className="source-details">
                  <strong>{source}:</strong>
                  <div className="transaction-types">
                    <span className={`type-tag income-tag`}>Income: {formatAmount(transactionsBySource[source].Income)}</span>
                    <span className={`type-tag expense-tag`}>Expense: {formatAmount(transactionsBySource[source].Expense)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
