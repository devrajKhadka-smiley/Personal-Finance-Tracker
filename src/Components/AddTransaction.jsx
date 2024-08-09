import React, { useRef, useState } from "react";
import { useFinance } from "../Context/TransactionContext";
import 'boxicons/css/boxicons.min.css';
import '../App.css';

const AddTransaction = ({ editMode, transactionToEdit, onEditComplete }) => {
  const { addTransaction, editTransaction } = useFinance();
  const [type, setType] = useState(editMode ? transactionToEdit.type : "Income");
  const [source, setSource] = useState(editMode ? transactionToEdit.source : "");
  const [successMessage, setSuccessMessage] = useState("");

  const descriptionRef = useRef(editMode ? transactionToEdit.description : "");
  const amountRef = useRef(editMode ? transactionToEdit.amount : "");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTransaction = {
      type,
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      source,
    };

    if (editMode) {
      editTransaction(transactionToEdit.id, newTransaction);
    } else {
      addTransaction(newTransaction);
    }

    setSuccessMessage(editMode ? "Transaction updated successfully!" : "Transaction added successfully!");

    // Clear form fields
    descriptionRef.current.value = "";
    amountRef.current.value = "";
    setType("Income");
    setSource("");
    
    // Call onEditComplete if provided (for editing)
    if (onEditComplete) {
      onEditComplete();
    }
  };

  return (
    <div className="add-transaction-container">
      <h2 className="form-title">{editMode ? "Edit Transaction" : "Add Transaction"}</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="transaction-form">
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
            ref={descriptionRef}
            className="form-control"
            placeholder="e.g., Salary, Rent"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            ref={amountRef}
            className="form-control"
            placeholder="e.g., 100.00"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="source">Source:</label>
          <select
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="form-control"
            required
          >
            <option value="">Select a source</option>
            <option value="Salary">Salary</option>
            <option value="Investment">Investment</option>
            <option value="Side Job">Side Job</option>
            <option value="Freelance">Freelance</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          <i className="bx bx-save"></i> {editMode ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
