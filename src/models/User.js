const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 15,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    emailId: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Please Enter Valid Email.." + value)
        }
      } 
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type : String ,
      required : true ,
      lowercase : true,
      enum : {
        values : ["male","female","others"],
        message : `{VALUE} is not of a gender type`
      }
    },

    skills: {
      type: [String],
      validate: {
        validator: function (skills) {
          return skills.length <= 15;
        },
        message: "You can't add more than 15 skills",
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/b/community-engagement-developer-presenting-new-blockchain-project-meetup-audience-gathered-around-showcasing-373244917.jpg",
             validate(value){
        if(!validator.isURL(value)){
          throw new Error("Please Enter Valid URl.." + value)
        }
      } 
    },
    bio: {
      type: String,
      default: "Please Update about Yourself..",
    },
  },
  { timestamps: true }
);

// const User = mongoose.model("User", userSchema);
// module.exports = User;

module.exports = mongoose.model("User", userSchema);