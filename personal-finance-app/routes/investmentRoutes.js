const express = require('express');
const protect = require('../middleware/authMiddleware');
const { createInvestment, getInvestments, updateInvestment, deleteInvestment } = require('../controllers/investmentController');

const router = express.Router();

router.post('/', protect, createInvestment);
router.get('/', protect, getInvestments);
router.put('/:id', protect, updateInvestment);
router.delete('/:id', protect, deleteInvestment);

module.exports = router;
