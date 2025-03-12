const express = require('express');
const router = express.Router();
const { Conversations } = require('../controllers/conversationController');
const { authenticateToken } = require('../middleware/authenticateToken');
router.get('/',authenticateToken, Conversations.getAll);
router.get('/:id',authenticateToken, Conversations.getOne);
router.post('/',authenticateToken, Conversations.createOne);
module.exports = router;