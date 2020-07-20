const User = require("../models/user");
const express = require("express");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
  await user.save();
  res.status(201).send(user);
  } catch (e) {
    res.status(400).send(err)
  }
})

router.get("/users", async (req,res) => {

  try {
  const users = await User.find({}) 
  res.send(users);

  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/:id", async (req,res) => {
  
  try {

  const _id = req.params.id;
  if (_id.length !== 24) {
    res.status(400).send("User ID must be 24 characters long");
  }

  const user = await User.findById(_id);
  if (!user) {
    return res.status(404).send();
  }

} catch (error) {
  return res.status(500).send(error);
}
})

router.patch("/users/:id", async (req,res) => {

  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"]

  updates.forEach((key) => {
    if (!allowedUpdates.includes(key)) {
      return res.status(404).send({error: "Key which is not in model supplied"});
    }
  });

  try {
  const _id = req.params.id
  const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});

  if (!user) {
    return res.status(404).send("Could not find the user by that ID")
  }

  res.send(user);

  } catch (error) {
    res.status(400).send(error);
  }

})

router.delete("/users/:id", async (req,res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send()
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports.userRouter = router;