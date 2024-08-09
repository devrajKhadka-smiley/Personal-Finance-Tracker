// src/Context/TransactionContext.js
import { createContext, useContext, useState } from "react";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [settings, setSettings] = useState({ currency: "USD" });

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, { ...newTransaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const editTransaction = (id, updatedTransaction) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === id
          ? { ...transaction, ...updatedTransaction }
          : transaction
      )
    );
  };

  const updateSettings = (newSettings) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        settings,
        addTransaction,
        deleteTransaction,
        editTransaction,
        updateSettings,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export function useFinance() {
  return useContext(TransactionContext);
}
