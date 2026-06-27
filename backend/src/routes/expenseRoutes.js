import express from 'express';
import { getExpenses, createExpense, deleteExpense, getDashboardSummary } from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All expense routes are protected

router.route('/')
  .get(getExpenses)
  .post(createExpense);

router.route('/summary')
  .get(getDashboardSummary);

router.route('/:id')
  .delete(deleteExpense);

export default router;
