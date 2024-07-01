const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/ems', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
