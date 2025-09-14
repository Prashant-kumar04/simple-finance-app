const express = require('express');
const protect = require('../middleware/authMiddleware');
const { createWallet, getWallets, updateWallet, deleteWallet } = require('../controllers/walletController');

const router = express.Router();

router.post('/', protect, createWallet);
router.get('/', protect, getWallets);
router.put('/:id', protect, updateWallet);
router.delete('/:id', protect, deleteWallet);

module.exports = router;
