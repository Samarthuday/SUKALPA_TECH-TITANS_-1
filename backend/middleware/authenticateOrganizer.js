const jwt = require('jsonwebtoken');
const EventOrganizer = require('../models/EventOrganizer');

const authenticateOrganizer = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const organizer = await EventOrganizer.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!organizer) {
      throw new Error();
    }

    req.token = token;
    req.organizer = organizer;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = authenticateOrganizer;
