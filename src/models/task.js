const mongoose = require("mongoose");

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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
}, {
  timestamps: true
});

// Ready function to add middleware.

/* taskScheme.pre("save", async function (next) {
  const task = this;

  if (task.isModified("description")) {
    console.log("This line executed before the update was saved")
  }

  next();
})
 */

const Task = mongoose.model("Task", taskScheme);
module.exports = Task;