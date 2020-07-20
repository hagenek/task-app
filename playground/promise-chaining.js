require("../src/db/mongoose");
const User = require("../src/models/user");
const Task = require("../src/models/task");

// 5f12fe27dbcea069947d5960

/* User.findByIdAndUpdate("5f12fe3ed1d14d7b3c35c4a5", 
{age: 1}).then((user) => { 
  console.log(user)
  return User.countDocuments({age: 1}) 
}).then((result) => {
  console.log(result)
}).catch((e) => {
  console.log(e);
})
 */
/* const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, {age});
  const count = await User.countDocuments({age});
  return count;
}

updateAgeAndCount("5f12fe3ed1d14d7b3c35c4a5", 2).then((arr) => {
  console.log(arr);
}).catch((e) => {
  console.log(e);
});
 */
const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({completed: false})
  return count;
}

deleteTaskAndCount("5f131cd7535d6367e861bc65")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  })

