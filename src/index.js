// Main app file

const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user").userRouter;
const taskRouter = require("./routers/task").taskRouter;


const app = express();
const port = process.env.PORT || 3000

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
  console.log("Server is listening on port ", port)
});

