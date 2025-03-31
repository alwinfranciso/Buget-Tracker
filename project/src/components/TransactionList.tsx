import React, { useState } from 'react';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { Transaction, currencies } from '../types';
import { formatCurrency } from '../utils/currency';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  type: 'expense' | 'income';
}

export function TransactionList({ transactions, onDeleteTransaction, type }: TransactionListProps) {
  const [displayCurrency, setDisplayCurrency] = useState('USD');
  const filteredTransactions = transactions.filter(t => t.type === type);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-end">
          <label htmlFor="displayCurrency" className="mr-2 text-sm font-medium text-gray-700">
            Display Currency:
          </label>
          <select
            id="displayCurrency"
            value={displayCurrency}
            onChange={(e) => setDisplayCurrency(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          >
            {currencies.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.code} - {curr.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(transaction.date), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.category}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                  type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency(transaction.amount, transaction.currency)}
                  {transaction.currency !== displayCurrency && (
                    <span className="ml-2 text-gray-500 text-xs">
                      ({formatCurrency(transaction.amount, displayCurrency)})
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}