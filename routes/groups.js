const router = require("express").Router();
const verify = require("./verifyToken");
const { Group } = require("../models/index");

router.get("/", verify, async (req, res) => {
  try {
    const groups = await Group.find({ _user: req.user._id });
    res.json(groups);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", verify, async (req, res) => {
  if (!req.user) return res.status(400).send({ message: "error posting group" });
  const group = new Group({
    name: req.body.name,
    _user: req.user._id
  });

  try {
    const savedGroup = await group.save();
    res.send(savedGroup);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
