const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const EventOrganizer = require('../models/EventOrganizer');
const authenticateOrganizer = require('../middleware/authenticateOrganizer'); // Custom middleware to authenticate organizer

// Create a new event
router.post('/', async (req, res) => {
  const { title, description, startTime, endTime, location, price, type } = req.body;
  
  try {
    const newEvent = new Event({
      name: title,
      description,
      location,
      date: startTime,
      duration: endTime,
      type,
      price
    });
    
    await newEvent.save();
    

    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.log(error);
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

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const events = await Event.findById(id);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get events', error: error.message });
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, date, duration, location, price } = req.body;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.organizer.toString() !== req.organizer._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    event.title = title;
    event.description = description;
    event.date = date;
    event.duration = duration;
    event.location = location;
    event.price = price;

    const updatedEvent = await event.save();
    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event', error: error.message });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.organizer.toString() !== req.organizer._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await Event.findByIdAndDelete(id);
    
    // Update organizer's eventsOrganized field
    await EventOrganizer.findByIdAndUpdate(req.organizer._id, { $pull: { eventsOrganized: id } });

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event', error: error.message });
  }
});

// Get trending events and organizers
router.get('/trending', async (req, res) => {
  try {
    // Define the criteria for trending events
    const trendingEvents = await Event.find().sort({ attendees: -1 }).limit(10).populate('organizer', 'name email');
    
    // Define the criteria for trending organizers
    const trendingOrganizers = await EventOrganizer.find().sort({ eventsOrganized: -1 }).limit(10);

    res.status(200).json({ trendingEvents, trendingOrganizers });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get trending events and organizers', error: error.message });
  }
});

module.exports = router;
