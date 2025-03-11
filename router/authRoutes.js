const express = require('express');
const authentication = require('../controllers/authcontroller');
const router = express.Router();
router.post('/login', authentication.signIn);
router.post('/signup', authentication.signUp);
router.post('/logout', authentication.signOut);
module.exports = router;