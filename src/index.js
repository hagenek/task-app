// Main app file
const app = require("./app")
const port = process.env.PORT 

app.get("/", (req, res) => {
  res.send("Able to respond")
})

app.listen(port, () => {
  console.log("Server is listening on port ", port)
})

// FILE UPLOAD SKELETON 

/* const multer = require("multer");
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("File must be a Word doc"))
    }  
    cb(undefined, true)

  }
})

app.post("/upload", upload.single("upload"),  (req, res) => {
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({error: error.message})
})  */

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