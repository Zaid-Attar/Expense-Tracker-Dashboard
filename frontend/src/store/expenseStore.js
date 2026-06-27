import { create } from 'zustand';
import axios from 'axios';

export const useExpenseStore = create((set, get) => ({
  expenses: [],
  summary: { totalIncome: 0, totalExpenses: 0, balance: 0 },
  isLoading: false,
  error: null,

  getAuthHeaders: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    };
  },

  fetchExpenses: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get('/api/expenses', get().getAuthHeaders());
      set({ expenses: res.data.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.error || 'Failed to fetch expenses', isLoading: false });
    }
  },

  fetchSummary: async () => {
    try {
      const res = await axios.get('/api/expenses/summary', get().getAuthHeaders());
      set({ summary: res.data.data });
    } catch (error) {
      console.error(error);
    }
  },

  addExpense: async (expenseData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post('/api/expenses', expenseData, get().getAuthHeaders());
      set((state) => ({ 
        expenses: [res.data.data, ...state.expenses],
        isLoading: false 
      }));
      get().fetchSummary();
      return res.data;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Failed to add expense', isLoading: false });
      throw error;
    }
  },

  deleteExpense: async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`, get().getAuthHeaders());
      set((state) => ({
        expenses: state.expenses.filter((exp) => exp._id !== id)
      }));
      get().fetchSummary();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}));
