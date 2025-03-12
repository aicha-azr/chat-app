const express = require('express');
const authentication = require('../controllers/authcontroller');
const { authenticateToken } = require('../middleware/authenticateToken');
const router = express.Router();
router.post('/login', authentication.signIn);
router.post('/signup', authentication.signUp);
router.post('/logout',authenticateToken, authentication.signOut);
module.exports = router;