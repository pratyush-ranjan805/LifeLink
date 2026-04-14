const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  location: { type: String, required: true },
  latitude: { type: Number },
  longitude: { type: Number },
  lastDonated: { type: Date },
  donationCount: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'pending', 'inactive'], default: 'active' }
});

module.exports = mongoose.model('Donor', DonorSchema);
