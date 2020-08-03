const request = require("supertest");
const Task = require("../src/models/task");
const app = require("../src/app");
const {   setupDatabase,
  userOneId,
  userOne,
  userTwo,
  userTwoId,
  taskOne,
  taskTwo,
  taskThree,} = require("./fixtures/db")

beforeEach(setupDatabase);

test("Should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "From my test"
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
})

test("Should return the correct amount of tasks given a user", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200)
  
    expect(response.body.length).toBe(2)
})

test("User two should not be able to delete user one's task", async () => {
  const response = await request(app)
    .delete(`tasks/${taskTwo._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .expect(401)

  const task = await Task.findById(taskTwo._id)
  expect(task).toEqual(taskTwo)
})


/* router.delete('/users/:id', auth, async (req, res) => {
  try {
      const task = await Task.findByIdAndDelete(req.params.id)
      res.send(task)
  } catch (e) {
      res.status(500).send(e.message)
  }
})
 */
/* test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  const user = await User.findById(userOneId);
  expect(user).toBeNull;

})
 */
