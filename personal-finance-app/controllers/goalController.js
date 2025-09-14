const Goal = require('../models/Goal');

exports.createGoal = async (req, res) => {
  try {
    const { title, targetAmount, deadline } = req.body;
    const goal = new Goal({ userId: req.user.id, title, targetAmount, deadline });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id });
    res.json(goals);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json(goal);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json({ message: 'Goal deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
