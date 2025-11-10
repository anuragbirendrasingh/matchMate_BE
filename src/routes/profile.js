const express = require("express");
const { userAuth } = require("../middleware/auth");
const User = require("../models/User");
const profileRouter = express.Router();
const { isUpdateAllowed } = require("../utils/validation");

profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

profileRouter.patch("/update", userAuth, async (req, res) => {
  try {
    if (!isUpdateAllowed(req)) {
      return res
        .status(400)
        .json({
          error:
            "Invalid updates! Only fields like firstName, lastName, age, skills, photoUrl, and bio are allowed",
        });
    }
    const userid = req.user._id;
    const updates = req.body;
    if (updates.skills && updates.skills.length > 15) {
      throw new Error("You Can't add more attributes");
    }

    const user = await User.findByIdAndUpdate(userid, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "user updated successfully",
      user,
    });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = profileRouter;