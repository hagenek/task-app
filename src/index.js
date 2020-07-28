// Main app file

const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task").taskRouter;
const auth = require("./middleware/auth")

const app = express();
const port = process.env.PORT || 3000



// FILE UPLOAD SKELETON
/* const multer = require("multer");
const upload = multer({
  dest: "images"
})

app.post("/upload", upload.single("upload"),  (req, res) => {
  res.send()
}) */

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is listening on port ", port)
})

/* const jwt = require("jsonwebtoken");

const f = async () => {
  const token = jwt.sign({_id: "abc123"}, "thisismynewcourse", {expiresIn: "1 seconds"})
  const data = jwt.verify(token, "thisismynewcourse");
} */

/* const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5c2e505a3253e18a43e612e6')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5f1ad12fdd56b6ca70a0554c')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()
 */


// Useful methods on the bcrypt object. 

/* const bcrypt = require("bcryptjs")

const myFunction = async () => {
  const password = "Blue666!";
  const hashedPassword = await bcrypt.hash(password, 8);

  console.log(password);
  console.log(hashedPassword);

  const isMatch = await bcrypt.compare("Blue666!", hashedPassword);
  console.log("It is a match:", isMatch)
}

myFunction();
 */