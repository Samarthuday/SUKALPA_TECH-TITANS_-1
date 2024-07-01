const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const stripe = require('stripe')('your-stripe-secret-key'); // Replace with your Stripe secret key

// Route to handle registration
router.post('/', async (req, res) => {
  const { name, email, ticketType } = req.body;
  try {
    const newRegistration = new Registration({ name, email, ticketType });
    await newRegistration.save();
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Route to handle payment
router.post('/payment', async (req, res) => {
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
