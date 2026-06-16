import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardStats from './components/DashboardStats';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

const API_URL = 'http://localhost:5000/api/expenses';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(API_URL);
      setExpenses(res.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const res = await axios.post(API_URL, expenseData);
      setExpenses([res.data, ...expenses]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Expense Tracker</h1>
        <p>Keep track of your spending effortlessly</p>
      </header>
      
      {loading ? (
        <div className="empty-state">Loading your expenses...</div>
      ) : (
        <div className="dashboard-grid">
          <div className="sidebar">
            <DashboardStats expenses={expenses} />
            <ExpenseForm onAddExpense={addExpense} />
          </div>
          <div className="main-content">
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
