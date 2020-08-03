const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const { userOneId, userOne, setupDatabase }= require("./fixtures/db")

beforeEach(setupDatabase)

test("Should signup a new user", async () => {
  const response = await request(app).post("/users").send({
    name: "Georg",
    email: "georges@ek.com",
    password: "iloveoov"
  }).expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //Assertions about the response

  expect(response.body).toMatchObject({
    user: {
      name: "Georg",
      email: "georges@ek.com",
    },
    token: user.tokens[0].token
  })
  expect(user.password).not.toBe("ilovebadbitches")
})

test("Should login existing user", async () => {
  const response = await request(app).post("/users/login").send({
    email: userOne.email,
    password: userOne.password,
  }).expect(200)

  const dbUser =  await User.findById(response.body.user._id)
  const dbToken = dbUser.tokens[1].token;
  // const dbToken = await dbUser.tokens[1].token;
  const responseToken = response.body.token;
  expect(dbToken).toBe(response.body.token);
})

test("Should not login existing user with wrong email", async () => {
  await request(app).post("/users/login").send({
    email: "mika@example.com",
    password: userOne.password,
  }).expect(400)
})

test("Should not login existing user with wrong password", async () => {
  await request(app).post("/users/login").send({
    email: userOne.email,
    password: "thispasswordiswrong",
  }).expect(400)
})

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test("Should get not get profile for unauthenticated user", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(401)
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  const user = await User.findById(userOneId);
  expect(user).toBeNull;

})
test("Should not delete profile for unauthenticated user", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .expect(401)
})

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200)
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));

})

test("Should update valid user fields", async () => {

  const response = await request(app)
    .patch(`/users/me/`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "Nick"})
    .expect(200) 

  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Nick");
})

test("Should not update invalid user fields", async () => {

  const response = await request(app)
    .patch(`/users/me/`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "Trondheim"})
    .expect(400) 

  expect(response.body.location).toBeNull;
})







