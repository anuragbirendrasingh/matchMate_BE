const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("token does not exist");
    }
    const decodedObj = await jwt.verify(token, "Anu@123");
    const { _id } = decodedObj;
    const user = await User.findById(_id); //extracting the data of User from model
    if (!user) {
      throw new Error("User Does Not Exist");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error : " + err);
  }
};

module.exports = {
  userAuth,
};