// Main app file
const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task").taskRouter;
const auth = require("./middleware/auth")
const app = express();
const port = process.env.PORT 

// FILE UPLOAD SKELETON 

const multer = require("multer");
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
}) 

app.get("/", (req, res) => {
  res.send("Able to respond")
})

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app