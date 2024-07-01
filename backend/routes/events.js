const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Create a new event
router.post('/', async (req, res) => {
  const { title, description, startTime, endTime, type } = req.body;
  try {
    const newEvent = new Event({ title, description, startTime, endTime, type });
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event', error: error.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get events', error: error.message });
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, startTime, endTime, type } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, { title, description, startTime, endTime, type }, { new: true });
    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event', error: error.message });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event', error: error.message });
  }
});

module.exports = router;
