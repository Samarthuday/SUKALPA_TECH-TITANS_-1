
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
const EventOrganizer = require('../models/EventOrganizer');

dotenv.config();


// POST /api/signup
router.post('/signup', async (req, res) => {
    const { username, email, password, isEventOrganizer } = req.body;
  
    try {
      // Check if user already exists
      let existingAccount = await User.findOne({ email });
    if (!existingAccount && isEventOrganizer) {
      existingAccount = await EventOrganizer.findOne({ email });
    }
    if (existingAccount) {
      return res.status(400).json({ msg: 'Account already exists' });
    }

     // Create new user or organizer
     let newAccount;
     if (isEventOrganizer) {
       newAccount = new EventOrganizer({ username, email, password });
     } else {
       newAccount = new User({ username, email, password });
     }
     const salt = await bcrypt.genSalt(10);
     newAccount.password = await bcrypt.hash(password, salt);
 
     // Save account to database
     await newAccount.save();
 
     // Create and return JWT token
     const payload = {
       user: {
         id: newAccount.id,
         isEventOrganizer
       }
     };
  
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
        user = await EventOrganizer.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and return JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;