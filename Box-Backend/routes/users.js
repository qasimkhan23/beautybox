const express = require("express");
const bcrypt = require("bcrypt");

const { Auth } = require("../middlewares/auth");
const router = express.Router();
const { User, Validate } = require("../modules/users");
const _ = require("lodash");
const multer = require("multer");
// const upload = multer({ dest: __dirname + "/uploads" });

var path = require("path");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "../src/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
var upload = multer({ storage: storage });

router.get("/me", Auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post(
  "/profileimage",
  [Auth, upload.single("avatar")],
  async (req, res) => {
    if (req.file) {
      let userProfile = await User.findByIdAndUpdate(
        { _id: req.user._id },
        {
          profileImage: req.file.filename,
        },
        { new: true }
      );
      res.send(_.pick(userProfile, ["id", "name", "email", "profileImage"]));
    } else throw "error";
  }
);

router.post("/articleimages", upload.array("photos", 12), function(req, res) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  if (req.files) {
    res.json(req.files);
  } else throw "error";
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
