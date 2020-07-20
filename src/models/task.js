const mongoose = require("mongoose");
const validator = require("validator");

const taskScheme = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,  
  },
  completed: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = mongoose.model("tasks", taskScheme);