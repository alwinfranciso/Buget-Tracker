import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Expense } from '../types';
import { format } from 'date-fns';

interface ExpenseCalendarProps {
  expenses: Expense[];
}

export function ExpenseCalendar({ expenses }: ExpenseCalendarProps) {
  const events = expenses.map(expense => ({
    title: `$${expense.amount} - ${expense.description}`,
    date: expense.date,
    backgroundColor: getCategoryColor(expense.category),
    extendedProps: {
      category: expense.category
    }
  }));

  function getCategoryColor(category: string): string {
    const colors = {
      Food: '#ef4444',
      Transportation: '#3b82f6',
      Entertainment: '#f59e0b',
      Shopping: '#10b981',
      Bills: '#8b5cf6',
      Other: '#6b7280'
    };
    return colors[category as keyof typeof colors] || colors.Other;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth'
        }}
        eventDidMount={(info) => {
          info.el.title = `${info.event.extendedProps.category}: ${info.event.title}`;
        }}
      />
    </div>
  );
}