import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Expense } from '../types';
import { format, startOfMonth, endOfMonth, isSameMonth, subMonths } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyComparisonProps {
  expenses: Expense[];
}

export function MonthlyComparison({ expenses }: MonthlyComparisonProps) {
  const currentDate = new Date();
  const previousMonth = subMonths(currentDate, 1);

  const currentMonthExpenses = expenses.filter(expense => 
    isSameMonth(new Date(expense.date), currentDate)
  );

  const previousMonthExpenses = expenses.filter(expense => 
    isSameMonth(new Date(expense.date), previousMonth)
  );

  const currentMonthTotal = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const previousMonthTotal = previousMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const percentageChange = previousMonthTotal !== 0 
    ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100 
    : 100;

  const data = {
    labels: [format(previousMonth, 'MMMM'), format(currentDate, 'MMMM')],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: [previousMonthTotal, currentMonthTotal],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Expense Comparison',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `$${value.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-500">Previous Month</p>
            <p className="text-xl font-bold text-gray-900">${previousMonthTotal.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-500">Current Month</p>
            <p className="text-xl font-bold text-gray-900">${currentMonthTotal.toFixed(2)}</p>
          </div>
          <div className={`p-4 rounded-lg ${percentageChange > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
            <p className="text-sm text-gray-500">Change</p>
            <p className={`text-xl font-bold ${percentageChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
      <Line options={options} data={data} />
    </div>
  );
}