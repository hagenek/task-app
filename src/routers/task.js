const Task = require("../models/task");
const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

// GET /tasks with option query string completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req,res) => {

  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true"
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":")
    sort[parts[0]] = (parts[1] === "desc") ? -1 : 1 
  }

  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate()
    res.send(req.user.tasks);
  } catch (error) {
    res.send(error);
  }

});


router.get("/tasks/:id", auth,  async (req,res) => {

  try {
  const _id = req.params.id;
  if (_id.length !== 24) return res.status(400).send("User ID must be 24 characters long");

  const task = await Task.findOne({_id, owner: req.user._id});

  if (!task) return res.status(404).send();
  return res.send(task);

  } catch (error) {
    return res.status(500).send()
}
})

router.post("/tasks", auth, async (req, res) => {

  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    const savedTask = await task.save();
    res.status(201).send(savedTask);
  } catch (error) {
    return res.status(400).send(error)
  }
})


router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
      const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

      if (!task) {
          return res.status(404).send()
      }

      updates.forEach((update) => task[update] = req.body[update])
      await task.save()
      res.send(task)
  } catch (e) {
      res.status(400).send(e)
  }
})  

router.delete('/users/:id', auth, async (req, res) => {
  try {
      const task = await Task.findByIdAndDelete(req.params.id)

      if (!task) {
        return res.status(404).send()
      }
      res.send(task)
  } catch (e) {
      res.status(500).send(e.message)
  }
})



/* router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

try {
  const _id = req.params.id.trim()
  await req.user.populate("tasks").execPopulate();
  console.log("_id: ",_id)
  console.log("_id type", typeof(_id))
  //console.log(req.user.tasks);
  const task = await req.user.tasks.find(o => {
    const objId = o._id.toString();
    return objId === _id})
  updates.forEach((update) => task[update] = req.body[update])
  await task.save();

  if (!task) {
    return res.status(404).send("Could not find the task by that ID")
  } 
      res.send(task);

  } catch (error) {
    res.status(400).send(error);
  }

})
 
 */

router.delete("/tasks/:id", auth, async (req,res) => {
  try {
    const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});

    if (!task) {
      return res.status(404).send()
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
}); 

module.exports = router;