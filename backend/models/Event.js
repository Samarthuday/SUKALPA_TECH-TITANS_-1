const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true }, // in minutes
  location: { type: String, required: true },
  type: { type: String, enum: ['Session', 'Workshop', 'Keynote'], required: true },
  attendeesCount: { type: Number, default: 0 },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'EventOrganizer', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
