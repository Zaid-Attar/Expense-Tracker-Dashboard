import Expense from '../models/Expense.js';

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json({ success: true, count: expenses.length, data: expenses });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export const createExpense = async (req, res) => {
  try {
    const { amount, category, description, type, date } = req.body;

    const expense = await Expense.create({
      user: req.user.id,
      amount,
      category,
      description,
      type,
      date: date || Date.now()
    });

    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ success: false, error: 'No transaction found' });
    }

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    await expense.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export const getDashboardSummary = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });

    let totalIncome = 0;
    let totalExpenses = 0;

    expenses.forEach(item => {
      if (item.type === 'income') {
        totalIncome += item.amount;
      } else {
        totalExpenses += item.amount;
      }
    });

    const balance = totalIncome - totalExpenses;

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        balance
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
