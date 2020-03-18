const router = require('express').Router();
// const User = require('../models/User');
const { User } = require('../models/index');
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { registerValidation, loginValidation } = require('../validation');

// REGISTER
router.post('/register', async (req, res) => {
  // validate data
  const { error } = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  // check if user exists in db
  const userExists = await User.findOne({ username: req.body.username });
  if(userExists) return res.status(400).send('User already exists');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.send({ savedUser });
  } catch(err) {
    res.status(400).send(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  const user = await User.findOne({ username: req.body.username });
  
  // if(!user) return res.status(400).send('Incorrect username or password');
  if(!user) return res.status(400).send('Incorrect username');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Incorrect password');

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

// GET A SINGLE USER
router.get("/:userId", verify, async (req, res) => {
  if(req.user._id !== req.params.userId) return res.status(400).send('Improper Authorization');

  try {
    const user = await User.findOne({ _id: req.params.userId }).populate('favorites');
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;