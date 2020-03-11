const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoute = require('./routes/auth');

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to scalar db")
);

app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    exposedHeaders: ["auth-token"]
  })
);
app.use(express.json());
app.use('/api/user', authRoute);

app.listen(4000, () => console.log('scalar server running'));