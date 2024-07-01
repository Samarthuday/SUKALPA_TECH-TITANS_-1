const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());
// Middleware
app.use(express.json()); // Body parser

// Define routes
app.use('/api', require('./routes/index'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/registration', require('./routes/registration'));
app.use('/api/events', require('./routes/events'));

app.use(express.static('frontend/public'))

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname,'..', 'frontend', 'public', 'login.html'));
})

app.get('/signup', (req, res) => {
    res.sendFile(path.resolve(__dirname,'..', 'frontend', 'public', 'signup.html'));
})


// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));