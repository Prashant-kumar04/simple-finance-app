const Wallet = require('../models/Wallet');

exports.createWallet = async (req, res) => {
  try {
    const { name, balance = 0, currency = 'INR' } = req.body;
    const wallet = new Wallet({ userId: req.user.id, name, balance, currency });
    await wallet.save();
    res.status(201).json(wallet);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find({ userId: req.user.id });
    res.json(wallets);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
    res.json(wallet);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
    res.json({ message: 'Wallet deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
