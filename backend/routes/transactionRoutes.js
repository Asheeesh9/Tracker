const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getAnalytics
} = require('../controllers/transactionController');

const router = express.Router();

router.use(authMiddleware);
router.get('/', getTransactions);
router.get('/analytics', getAnalytics);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;
