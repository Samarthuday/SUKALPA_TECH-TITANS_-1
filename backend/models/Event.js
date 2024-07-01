const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  type: { type: String, enum: ['Session', 'Workshop', 'Keynote'], required: true }
});

module.exports = mongoose.model('Event', EventSchema);
