const express = require('express');
const app = express();
require("dotenv").config();
const { supabase } = require('./config/supabase');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
