const { User } = require("../modules/users");
const getUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id).select("-password");

    req.userInfo = user;
    next();
  } catch (ex) {
    res.status(400).send("error getting user info");
  }
};
module.exports.getUser = getUser;
