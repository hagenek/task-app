const mongoose = require("mongoose");
const validator = require("validator");

const userScheme = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,  
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid")
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age mnust be a positive number")
      }
    }
  },
  password: {
    type: String,
    trim: true,
    minlength: 7,
    validate(value) {
      if (validator.contains(value.toLowerCase(), "password")) {
        throw new Error("Password cannot contain the word password")
      }
    },
  },
  });

module.exports = mongoose.model("users", userScheme);