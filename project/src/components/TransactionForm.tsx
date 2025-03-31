import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { ExpenseCategory, IncomeCategory, TransactionType, currencies } from '../types';

interface TransactionFormProps {
  type: TransactionType;
  onAddTransaction: (transaction: {
    type: TransactionType;
    description: string;
    amount: number;
    category: string;
    date: string;
    currency: string;
  }) => void;
}

const expenseCategories: ExpenseCategory[] = [
  'Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills',
  'Healthcare', 'Education', 'Gifts', 'Travel', 'Other'
];

const incomeCategories: IncomeCategory[] = [
  'Salary', 'Freelance', 'Investments', 'Gifts', 'Rental', 'Other'
];

export function TransactionForm({ type, onAddTransaction }: TransactionFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(type === 'expense' ? 'Other' : 'Salary');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [currency, setCurrency] = useState('USD');

  const categories = type === 'expense' ? expenseCategories : incomeCategories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAddTransaction({
      type,
      description,
      amount: parseFloat(amount),
      category,
      date,
      currency,
    });

    setDescription('');
    setAmount('');
    setCategory(type === 'expense' ? 'Other' : 'Salary');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Add {type === 'expense' ? 'Expense' : 'Income'}
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
              Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.code} - {curr.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            type === 'expense' 
              ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
              : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
          } focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add {type === 'expense' ? 'Expense' : 'Income'}
        </button>
      </div>
    </form>
  );
}