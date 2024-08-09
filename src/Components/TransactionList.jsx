// src/components/TransactionList.jsx
import React from 'react';
import { useFinance } from '../Context/TransactionContext';
import '../App.css';

const TransactionList = () => {
  const { transactions, deleteTransaction } = useFinance();

  return (
    <div className="transaction-list-container">
      <h2 className="transaction-list-title">Your Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        transactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-info">
              <p className="transaction-type">{transaction.type}</p>
              <p className="transaction-description">{transaction.description}</p>
              <p className="transaction-amount">${transaction.amount.toFixed(2)}</p>
            </div>
            <div className="transaction-actions">
              <button 
                className="action-button" 
                onClick={() => deleteTransaction(transaction.id)}
              >
                <i className="bx bx-trash" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;
