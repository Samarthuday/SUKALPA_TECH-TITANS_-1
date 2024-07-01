const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u'); // Replace with your Stripe secret key
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const authenticateUser = require('../middleware/authenticateUser'); // Custom middleware to authenticate user

// Route to handle registration
router.post('/', authenticateUser, async (req, res) => {
  const { eventId, ticketType } = req.body;
  const userId = req.user._id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const newRegistration = new Registration({
      user: userId,
      event: eventId,
      ticketType
    });

    await newRegistration.save();

    // Update event's attendees count
    await Event.findByIdAndUpdate(eventId, { $inc: { attendeesCount: 1 } });

    res.status(200).json({ message: 'Registration successful', registration: newRegistration });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Route to handle payment
router.post('/payment', authenticateUser, async (req, res) => {
  const { token, amount } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source: token.id,
      description: 'Event Registration Fee'
    });
    res.status(200).json({ message: 'Payment successful', charge });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
});

module.exports = router;
