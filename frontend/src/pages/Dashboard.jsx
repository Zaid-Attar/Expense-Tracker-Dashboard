import { useEffect } from 'react';
import { useExpenseStore } from '../store/expenseStore';
import { useAuthStore } from '../store/authStore';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router';

const Dashboard = () => {
  const { summary, fetchSummary, expenses, fetchExpenses } = useExpenseStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchSummary();
    fetchExpenses();
  }, [fetchSummary, fetchExpenses]);

  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-base-content/70 mt-1">Here is your financial overview.</p>
        </div>
        <Link to="/add" className="btn btn-primary shadow-lg hover:shadow-primary/50 hover:-translate-y-1 transition-all">
          + Add Transaction
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300 hover:border-primary/50 transition-colors">
          <div className="card-body flex-row items-center justify-between">
            <div>
              <p className="text-sm text-base-content/70 font-semibold mb-1">Total Balance</p>
              <h2 className={`text-3xl font-bold ${summary.balance >= 0 ? 'text-primary' : 'text-error'}`}>
                ${summary.balance.toFixed(2)}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Income Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300 hover:border-success/50 transition-colors">
          <div className="card-body flex-row items-center justify-between">
            <div>
              <p className="text-sm text-base-content/70 font-semibold mb-1">Total Income</p>
              <h2 className="text-3xl font-bold text-success">
                +${summary.totalIncome.toFixed(2)}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center text-success">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300 hover:border-error/50 transition-colors">
          <div className="card-body flex-row items-center justify-between">
            <div>
              <p className="text-sm text-base-content/70 font-semibold mb-1">Total Expenses</p>
              <h2 className="text-3xl font-bold text-error">
                -${summary.totalExpenses.toFixed(2)}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-error/20 flex items-center justify-center text-error">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Preview */}
      <div className="card bg-base-100 shadow-xl border border-base-300 mt-8">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-xl">Recent Transactions</h2>
            <Link to="/expenses" className="btn btn-sm btn-ghost text-primary">View All</Link>
          </div>
          
          {recentExpenses.length === 0 ? (
            <div className="text-center py-8 text-base-content/50">
              No transactions yet. Add one to get started!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th className="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentExpenses.map((exp) => (
                    <tr key={exp._id} className="hover">
                      <td className="font-medium">{exp.description}</td>
                      <td>
                        <span className="badge badge-ghost badge-sm">{exp.category}</span>
                      </td>
                      <td>{new Date(exp.date).toLocaleDateString()}</td>
                      <td className={`text-right font-bold ${exp.type === 'income' ? 'text-success' : 'text-error'}`}>
                        {exp.type === 'income' ? '+' : '-'}${exp.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
