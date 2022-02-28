import { createConnection } from "typeorm";
import "reflect-metadata";
import { User } from "./entity/User";

const starting = async () => {
  const connection = await createConnection();

  const newUser = new User();
  const userRepository = connection.getRepository(User);

  newUser.age = "26";
  newUser.name = "example";

  await userRepository.save(newUser);

  const foundUser = await userRepository
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.name = :name", { name: newUser.name })
    .getOne();

  console.log(`User created and found, `, foundUser);

  foundUser.age = "27";

  await userRepository.save(foundUser);

  const updatedUser = await userRepository
    .createQueryBuilder("user")
    .where("user.name = :name", { name: foundUser.name })
    .getMany();

  console.log("user found after updating", updatedUser);
};

starting();
