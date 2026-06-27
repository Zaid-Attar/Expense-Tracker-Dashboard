import { useEffect } from 'react';
import { useExpenseStore } from '../store/expenseStore';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ExpenseList = () => {
  const { expenses, fetchExpenses, deleteExpense, isLoading } = useExpenseStore();

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteExpense(id);
        toast.success('Transaction deleted');
      } catch (error) {
        toast.error('Failed to delete transaction');
      }
    }
  };

  if (isLoading && expenses.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Transactions</h1>
        <div className="badge badge-primary badge-lg">{expenses.length} Total</div>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body p-0 sm:p-6">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th className="text-right">Amount</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-base-content/50">
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  expenses.map((exp) => (
                    <tr key={exp._id} className="hover">
                      <td className="whitespace-nowrap">
                        {new Date(exp.date).toLocaleDateString()}
                      </td>
                      <td className="font-medium">{exp.description}</td>
                      <td>
                        <span className="badge badge-ghost badge-sm">{exp.category}</span>
                      </td>
                      <td className={`text-right font-bold whitespace-nowrap ${exp.type === 'income' ? 'text-success' : 'text-error'}`}>
                        {exp.type === 'income' ? '+' : '-'}${exp.amount.toFixed(2)}
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => handleDelete(exp._id)}
                          className="btn btn-ghost btn-sm text-error hover:bg-error/20 rounded-full"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
