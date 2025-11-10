const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Please Enter Your first & last Name");
  } else if (firstName.length < 2 || firstName.length > 15) {
    throw new Error("Please enter first name between 2-15 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("please enter valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter a strong password");
  }
};

isUpdateAllowed = (req) => {
  const updatesAllowed = [
    "firstName",
    "lastName",
    "age",
    "skills",
    "photoUrl",
    "bio",
  ];
  const updates = Object.keys(req.body);
  const isValidOpertaion = updates.every((updates) => {
    return updatesAllowed.includes(updates);
  });
  return isValidOpertaion;
};

module.exports = { validateSignUpData, isUpdateAllowed };