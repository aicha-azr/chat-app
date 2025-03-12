const express = require('express');
const router = express.Router();
const Messages = require('../controllers/messageControllers');
const { authenticateToken } = require('../middleware/authenticateToken');
router.get('/',authenticateToken, Messages.getMessages);
router.get('/:id',authenticateToken, Messages.getOne);
router.post('/',authenticateToken, Messages.addOne);
module.exports = router;