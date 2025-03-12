const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
app.use(express.json());
app.use(cors());
const { supabase } = require('./config/supabase');
const authRoutes = require('./router/authRoutes');
const usersRoutes = require('./router/userRoutes');
const conversationRoutes = require('./router/conversationRoutes');
const messageRoutes = require('./router/messageRoutes');
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/conversations', conversationRoutes);
app.use('/messages', messageRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
