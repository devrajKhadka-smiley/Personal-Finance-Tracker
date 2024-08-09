import React, { useEffect, useState } from 'react';
import { useFinance } from '../Context/TransactionContext';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import '../App.css';

const EditTransaction = () => {
  const { id } = useParams(); // Get the transaction ID from URL parameters
  const { transactions, editTransaction } = useFinance();
  const [transaction, setTransaction] = useState(null);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const tx = transactions.find(t => t.id === id);
    if (tx) {
      setTransaction(tx);
      setType(tx.type);
      setDescription(tx.description);
      setAmount(tx.amount);
      setSource(tx.source);
    }
  }, [id, transactions]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTransaction = { type, description, amount: parseFloat(amount), source };
    editTransaction(id, updatedTransaction);
    navigate('/'); // Redirect to home page after editing
  };

  if (!transaction) return <p>Loading...</p>;

  return (
    <div className="edit-transaction-container">
      <h2>Edit Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-control"
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="source">Source:</label>
          <select
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="form-control"
          >
            <option value="Salary">Salary</option>
            <option value="Bonus">Bonus</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Update Transaction</button>
      </form>
    </div>
  );
};

export default EditTransaction;
