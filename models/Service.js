const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceType: {
    type: String,
    enum: ['domicile', 'birth-certificate', 'death-certificate', 'marriage-certificate', 'driving-license'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'approved', 'rejected'],
    default: 'pending'
  },
  documents: [{ type: String }],
  estimatedCompletion: { type: Date },
  remarks: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
