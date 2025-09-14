const Investment = require('../models/Investment');

exports.createInvestment = async (req, res) => {
  try {
    const inv = new Investment({ userId: req.user.id, ...req.body });
    await inv.save();
    res.status(201).json(inv);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getInvestments = async (req, res) => {
  try {
    const invs = await Investment.find({ userId: req.user.id });
    res.json(invs);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateInvestment = async (req, res) => {
  try {
    const inv = await Investment.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!inv) return res.status(404).json({ message: 'Investment not found' });
    res.json(inv);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteInvestment = async (req, res) => {
  try {
    const inv = await Investment.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!inv) return res.status(404).json({ message: 'Investment not found' });
    res.json({ message: 'Investment deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
