const mongoose = require('mongoose');

const EmergencySchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hospitalName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  unitsNeeded: { type: Number, required: true },
  location: { type: String, required: true },
  latitude: { type: Number },
  longitude: { type: Number },
  urgency: { type: String, enum: ['CRITICAL', 'MODERATE', 'LOW'], required: true },
  status: { type: String, enum: ['active', 'resolved'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Emergency', EmergencySchema);
