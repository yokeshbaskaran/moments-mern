const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split("")[0];

    if (token) {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);

      req.user = await User.findById(decoded.id);
      next();
    }
  } catch (error) {
    console.log("Token error!" + error);
  }
};

module.exports = authUser;
