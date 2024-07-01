const express = require('express');
const router = express.Router();

// Include other route files
router.use('/auth', require('./auth'));
// Add more routes as needed

module.exports = router;