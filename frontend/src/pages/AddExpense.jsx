import { useState } from 'react';
import { useExpenseStore } from '../store/expenseStore';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { PlusCircle } from 'lucide-react';

const AddExpense = () => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const { addExpense, isLoading } = useExpenseStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExpense({
        ...formData,
        amount: Number(formData.amount)
      });
      toast.success('Transaction added successfully!');
      navigate('/');
    } catch (error) {
      if (error.response?.status !== 429) {
        toast.error('Failed to add transaction');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="card bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
            <PlusCircle className="w-7 h-7 text-primary" />
            Add New Transaction
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <label className="cursor-pointer label flex-1 justify-center gap-2 bg-base-200 rounded-lg p-3 hover:bg-base-300 transition-colors">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  className="radio radio-error"
                  checked={formData.type === 'expense'}
                  onChange={handleChange}
                />
                <span className="label-text font-bold text-error">Expense</span>
              </label>
              <label className="cursor-pointer label flex-1 justify-center gap-2 bg-base-200 rounded-lg p-3 hover:bg-base-300 transition-colors">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  className="radio radio-success"
                  checked={formData.type === 'income'}
                  onChange={handleChange}
                />
                <span className="label-text font-bold text-success">Income</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g., Groceries, Salary, Rent"
                className="input input-bordered focus:input-primary"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Amount ($)</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  className="input input-bordered focus:input-primary"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select select-bordered focus:select-primary"
                  required
                >
                  <option value="" disabled>Select category</option>
                  {formData.type === 'expense' ? (
                    <>
                      <option value="Food & Dining">Food & Dining</option>
                      <option value="Game">Game</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Housing">Housing</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Other">Other</option>
                    </>
                  ) : (
                    <>
                      <option value="Salary">Salary</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Investments">Investments</option>
                      <option value="Other">Other</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input input-bordered focus:input-primary"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button 
                type="submit" 
                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Transaction'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
