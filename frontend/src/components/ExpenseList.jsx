import React from 'react';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  if (expenses.length === 0) {
    return (
      <div className="glass card">
        <div className="empty-state">
          No expenses yet. Add one to get started!
        </div>
      </div>
    );
  }

  return (
    <div className="glass card">
      <h3>Recent Expenses</h3>
      <br />
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense._id} className="expense-item">
            <div className="expense-info">
              <div className="title">{expense.title}</div>
              <div className="date">
                {new Date(expense.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
            <div className="expense-actions">
              <div className="expense-amount">${expense.amount.toFixed(2)}</div>
              <button 
                onClick={() => onDeleteExpense(expense._id)} 
                className="btn-delete"
                title="Delete Expense"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
