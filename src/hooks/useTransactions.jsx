import { useFinance } from "../Context/TransactionContext";

const useTransactionActions = () => {  // Renamed custom hook
  const { transactions, addTransaction, deleteTransaction, editTransaction } =
    useFinance();  // Use the correct imported hook

  return { transactions, addTransaction, deleteTransaction, editTransaction };
};

export default useTransactionActions;  // Corrected export statement
