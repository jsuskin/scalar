const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// const PORT = process.env.PORT || 4000;
app.set("port", process.env.PORT || 4000);

const authRoute = require('./routes/auth');
const favoriteRoute = require('./routes/favorites');
const groupRoute = require('./routes/groups');

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
app.use('/api/favorites', favoriteRoute);
app.use('/api/groups', groupRoute);

// app.listen(PORT, () => console.log('scalar server running'));


app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
});