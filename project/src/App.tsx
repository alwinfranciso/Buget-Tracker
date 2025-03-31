import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { ExpenseChart } from './components/ExpenseChart';
import { ExpenseSummary } from './components/ExpenseSummary';
import { ExpenseCalendar } from './components/ExpenseCalendar';
import { MonthlyComparison } from './components/MonthlyComparison';
import { Transaction } from './types';
import { Wallet } from 'lucide-react';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: crypto.randomUUID(),
    };
    setTransactions([...transactions, transaction]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const expenses = transactions.filter(t => t.type === 'expense');
  const incomes = transactions.filter(t => t.type === 'income');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            <ExpenseSummary expenses={expenses} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ExpenseChart expenses={expenses} />
              <MonthlyComparison expenses={expenses} />
            </div>
          </>
        );
      case 'expenses':
        return (
          <div className="space-y-8">
            <TransactionForm type="expense" onAddTransaction={handleAddTransaction} />
            <TransactionList 
              transactions={transactions} 
              onDeleteTransaction={handleDeleteTransaction}
              type="expense"
            />
          </div>
        );
      case 'income':
        return (
          <div className="space-y-8">
            <TransactionForm type="income" onAddTransaction={handleAddTransaction} />
            <TransactionList 
              transactions={transactions} 
              onDeleteTransaction={handleDeleteTransaction}
              type="income"
            />
          </div>
        );
      case 'calendar':
        return <ExpenseCalendar expenses={expenses} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Wallet className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Finance Tracker</h1>
            <p className="mt-2 text-gray-600">Manage your expenses and income with ease</p>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;