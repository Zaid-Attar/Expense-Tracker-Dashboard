import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: false,
  error: null,

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post('/api/auth/register', userData);
      localStorage.setItem('user', JSON.stringify(res.data.data));
      set({ user: res.data.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.error || 'Registration failed', isLoading: false });
      throw error;
    }
  },

  login: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post('/api/auth/login', userData);
      localStorage.setItem('user', JSON.stringify(res.data.data));
      set({ user: res.data.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.error || 'Login failed', isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  }
}));
