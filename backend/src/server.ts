import "reflect-metadata";
import "express-async-errors";
import cors from "cors";

import path from "node:path";
import express from "express";
import AppDataSource from "./database/connection";
import routes from "./interfaces/routes/routes";
import { errorHandler } from "./core/errors/handler";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
}).catch((err) => {
    console.error("Error during Data Source initialization", err);
    throw new Error("Error during Data Source initialization");
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  '/uploads',
  express.static(path.join(__dirname, '..', 'uploads'))
);
app.use(errorHandler)

app.listen(3333);