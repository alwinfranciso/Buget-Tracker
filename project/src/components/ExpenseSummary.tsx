import React from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { Expense } from '../types';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  const mostRecentExpense = expenses.length > 0 
    ? new Date(Math.max(...expenses.map(e => new Date(e.date).getTime()))).toLocaleDateString()
    : 'No expenses';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-full">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Expenses</p>
            <p className="text-lg font-semibold text-gray-900">${totalExpenses.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-3 bg-green-100 rounded-full">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Average Expense</p>
            <p className="text-lg font-semibold text-gray-900">${averageExpense.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-3 bg-purple-100 rounded-full">
            <Calendar className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Last Expense</p>
            <p className="text-lg font-semibold text-gray-900">{mostRecentExpense}</p>
          </div>
        </div>
      </div>
    </div>
  );
}