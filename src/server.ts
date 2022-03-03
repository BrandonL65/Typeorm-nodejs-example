const express = require("express");
const app = express();
import { getConnection, getRepository } from "typeorm";
import { User } from "./entity/User";

app.use(express.json());

app.get("/users", async (req, res) => {
  const userRepo = getRepository(User);
  const allUsers = await userRepo
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .getMany();
  res.json({ users: allUsers });
});

app.post("/user", async (req, res) => {
  const userRepo = getRepository(User);
  const { name, age } = req.body;
  const newUser = new User();
  newUser.name = name;
  newUser.age = age;

  try {
    let savedUser = await userRepo.save(newUser);
    res.send(savedUser);
  } catch (error) {
    throw new Error(`error`);
  }
});

export default app;
