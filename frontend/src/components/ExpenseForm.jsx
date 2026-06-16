import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !amount) {
      alert('Please add a title and amount');
      return;
    }

    onAddExpense({
      title,
      amount: parseFloat(amount)
    });

    setTitle('');
    setAmount('');
  };

  return (
    <div className="glass card">
      <h3>Add New Expense</h3>
      <br />
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Expense Name</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Groceries"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount ($)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 50.00"
            step="0.01"
            min="0.01"
          />
        </div>
        <button type="submit" className="btn-primary">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
