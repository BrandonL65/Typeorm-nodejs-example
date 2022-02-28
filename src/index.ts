import { createConnection } from "typeorm";

import { User } from "./entity/User";

const starting = async () => {
  const connection = await createConnection();

  const newUser = new User();
  const userRepository = connection.getRepository(User);

  newUser.age = "26";
  newUser.name = "john";

  await userRepository.save(newUser);

  const foundUser = await userRepository.find({
    where: [{ name: newUser.name }],
  });

  console.log(`User created and found, `, foundUser);
};

starting();
