const Task = require("../models/task");
const express = require("express");
const router = new express.Router();


router.get("/tasks", async (req,res) => {

  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }

});


router.get("/tasks/:id", async (req,res) => {

  try {
  const _id = req.params.id;
  if (_id.length !== 24) return res.status(400).send("User ID must be 24 characters long");

  const task = await Task.findById(_id);
  if (!task) return res.status(404).send();
  return res.send(task);

  } catch (error) {
    return res.status(500).send()
}
})




router.post("/tasks", async (req, res) => {

  if (req.body) {
  const task = new Task(req.body);
  } else {
    return res.status(400).send("Must provide valid object body")
  }

  try {
    const savedTask = await task.save();
    res.status(202).send(savedTask);
  } catch (error) {
    return res.status(400).send(error)
  }
})



router.patch("/tasks/:id", async (req,res) => {

  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"]

 const isValid = updates.every((key) => allowedUpdates.includes(key));
  if (!isValid) {
      return res.status(404).send({error: "Key which is not in model supplied"});
    }

  try {
  const _id = req.params.id
  const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});

  if (!task) {
    return res.status(404).send("Could not find the task by that ID")
  }

  res.send(task);

  } catch (error) {
    res.status(400).send(error);
  }

})


router.delete("/tasks/:id", async (req,res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send()
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
}); 

module.exports.taskRouter = router;