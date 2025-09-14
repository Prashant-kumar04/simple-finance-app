const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String }, // Stock, Crypto, FD
  name: { type: String, required: true },
  units: { type: Number },
  buyPrice: { type: Number },
  currentPrice: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Investment', investmentSchema);
