const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,  
  },
  email: {
    type: String,
    unique: true,
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
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
  }, {
    timestamps: true
  });

  userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner"
  })


/**
 * @return {String} token in jwt format
 */

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, "goggenbaby");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}



/**
 * 
 * @param {String} email 
 * @param {String} password 
 */

userSchema.statics.findByCredentials = async function (email, password) {

  const user = await User.findOne({email});
  if (!user) {
    throw new Error("Unable to login")
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login")
  }

  return (user);
}; 

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
}; 

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }

    next();
  })

  // Delete user tasks when user is removed

  userSchema.pre("remove", async function (next) {
    const user = this;

    await Task.deleteMany({owner: user._id})

    next()
  })

const User = mongoose.model("User", userSchema);

module.exports = User;