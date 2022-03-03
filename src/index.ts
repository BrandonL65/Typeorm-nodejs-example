import { createConnection } from "typeorm";
import "reflect-metadata";
import app from "./server";

const start = async () => {
  await createConnection();

  app.listen(process.env.SERVER_PORT, () => {
    console.log("Server started");
  });
};

start();
