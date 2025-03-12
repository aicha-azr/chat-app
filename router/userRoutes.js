const express = require('express');
const users = require('../controllers/usersControllers');
const { authenticateToken } = require('../middleware/authenticateToken');
const router = express.Router();
router.get('/',authenticateToken, users.getUsers);
router.get('/:id',authenticateToken,users.getOne);
router.put('/:id',authenticateToken,users.updateOne);
module.exports = router;