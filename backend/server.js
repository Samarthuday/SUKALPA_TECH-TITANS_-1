const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/registration', require('./routes/registration'));
app.use('/api/events', require('./routes/events'));

app.use(express.static('frontend/public'))

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname,'..', 'frontend', 'public', 'login.html'));
})

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
