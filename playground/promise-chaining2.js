require("../src/db/mongoose");
const Task = require("../src/models/task");

/* 
{
  "_id" : ObjectId("5f13037caab5786ca8f29cdf"),
  "completed" : false,
  "description" : "Finish nodejs course",
  "__v" : 0
}
*/

Task.findByIdAndDelete("5f13037caab5786ca8f29cdf").then((task) => { 
  console.log(task)
  return Task.countDocuments({completed: false}) 
}).then((result) => {
  console.log(result)
}).catch((e) => {
  console.log(e);
})

