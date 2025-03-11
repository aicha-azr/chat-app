const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
app.use(express.json());
app.use(cors());
const { supabase } = require('./config/supabase');
const authRoutes = require('./router/authRoutes');

app.use('/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
