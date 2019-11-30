const express = require("express");
const bcrypt = require("bcrypt");

const { Auth } = require("../middlewares/auth");
const router = express.Router();
const { User, Validate } = require("../modules/users");
const _ = require("lodash");

router.get("/me", Auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = Validate(req.body);

  console.log("loggoing error", error);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const result = await user.save();
  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(result, ["id", "name", "email"]));
});
module.exports = router;
