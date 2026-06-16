import React from 'react';

const DashboardStats = ({ expenses }) => {
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="glass card stats-card">
      <h2>Total Expenses</h2>
      <div className="total">${total.toFixed(2)}</div>
    </div>
  );
};

export default DashboardStats;
