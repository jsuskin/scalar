const router = require("express").Router();
const verify = require('./verifyToken');
const { Favorite } = require('../models/index')

router.get("/", verify, async (req, res) => {
  try {
    const favs = await Favorite.find({ _user: req.user._id });
    res.json(favs);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", verify, async (req, res) => {
  // const user = await User.findOne({ _id: req.user._id });

  if(!req.user) return res.status(400).send({message: 'error posting favorite'});
  const favorite = new Favorite({
    name: req.body.name,
    notes: req.body.notes,
    _user: req.user._id
  });

  try {
    const savedFav = await favorite.save();
    res.send(savedFav);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
