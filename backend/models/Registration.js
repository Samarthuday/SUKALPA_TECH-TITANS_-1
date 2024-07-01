const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  count: {type: Number, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String, required: true },
  email: { type: String, required: false, unique: false },
  ticketType: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', RegistrationSchema);
