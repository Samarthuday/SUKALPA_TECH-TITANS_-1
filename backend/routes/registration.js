const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u'); // Replace with your Stripe secret key
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const authenticateUser = require('../middleware/authenticateUser'); // Custom middleware to authenticate user

// Route to handle registration
router.post('/', async (req, res) => {
  const { eventId, numberOfPeople, firstName, lastName } = req.body;
  console.log(`${eventId}\n${numberOfPeople}\n${firstName}\n${lastName}`);
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const newRegistration = new Registration({
      count: numberOfPeople,
      event: eventId,
      name: firstName,
      email: (Math.random() + 1).toString(36).substring(7),
    });

    await newRegistration.save();

    // Update event's attendees count
    await Event.findByIdAndUpdate(eventId, { $inc: { attendeesCount: 1 } });

    res.status(200).json({ message: 'Registration successful', registration: newRegistration });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Route to handle payment
router.post('/payment', async (req, res) => {
  const { token, amount } = req.body;
  console.log(`${token}\n${amount}`);
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
