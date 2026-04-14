const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bankName: { type: String, required: true },
  stock: {
    'A+': { type: Number, default: 0 },
    'A-': { type: Number, default: 0 },
    'B+': { type: Number, default: 0 },
    'B-': { type: Number, default: 0 },
    'AB+': { type: Number, default: 0 },
    'AB-': { type: Number, default: 0 },
    'O+': { type: Number, default: 0 },
    'O-': { type: Number, default: 0 },
  },
  status: { type: String, enum: ['Normal', 'Critical'], default: 'Normal' },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', InventorySchema);
