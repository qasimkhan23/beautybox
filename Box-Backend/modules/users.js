const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 255,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  profileImage: {
    type: String,
    default: "1588161921892.jpg",
  },
});
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      profileImage: this.profileImage,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};
userSchema.methods.getUserId = function() {
  return this._id;
};

const User = mongoose.model("User", userSchema);

const ValidateUser = (user) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required(),
    email: Joi.string()
      .min(3)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required(),
  };
  return Joi.validate(user, schema);
};

module.exports.User = User;
module.exports.Validate = ValidateUser;
