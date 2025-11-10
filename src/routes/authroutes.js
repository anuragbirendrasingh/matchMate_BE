const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {validateSignUpData }= require("../utils/validation");

router.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password, age, gender } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    // console.log(error.stack);
    
    // res.status(400).json({ message: error.message,stack : error.stack});
    res.status(400).json({mess : error.message})
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const existingUser = await User.findOne({ emailId }).select("+password");
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isValidPassword) {
      // craete a jwt token           //hiding the data  // secret key only anurag ("server")knows
      const token = await jwt.sign(
        { _id: existingUser._id.toString() },
        "Anu@123",
        { expiresIn: "1d" }
      );
      // console.log(token);

      //add the token to the cookie and send the response back to the user
      res.cookie("token", token);
      res.status(200).json({
        message: "User successfully signed in",
      });
    } else {
      throw new Error("Password is not correct");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/logout" ,async (req,res)=>{
      res.cookie('token',null,{
        expires : new Date(Date.now()),
      })
      res.send('User Logged Out Successfully');
})

module.exports = router;