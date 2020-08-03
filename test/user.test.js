const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const User = require("../src/models/user");
const mongoose = require("mongoose");

const userOneId = new mongoose.types.ObjectId();

const userOne =  {
  _id: userOneId,
  name: "Mike",
  email: "mike@example.com",
  password: "56what!!",
  tokens: [{
    token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
  }]
}


beforeEach(async () =>  {
  await User.deleteMany();
  await new User(userOne).save();
})

test("Should signup a new user", async () => {
  await request(app).post("/users").send({
    name: "Georg",
    email: "georges@ek.com",
    password: "ilovebadbitches"
  }).expect(201);
})

test("Should login existing user", async () => {
  await request(app).post("/users/login").send({
    email: userOne.email,
    password: userOne.password,
  }).expect(200)
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





