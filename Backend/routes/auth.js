const express = require("express");
const config = require("config");
const bcrypt = require("bcrypt");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { User } = require("../modules/users");
const _ = require("lodash");
router.post("/", async (req, res) => {
  const { error } = Validate(req.body);

  console.log("loggoing error", error);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid username or password");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid username or password");

  const token = user.generateAuthToken();
  res.send(token);
});
const Validate = req => {
  const schema = {
    email: Joi.string()
      .min(3)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  };
  return Joi.validate(req, schema);
};
module.exports = router;
