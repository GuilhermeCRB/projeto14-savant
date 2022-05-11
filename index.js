import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

import usersRouter from "./routes/usersRouter.js";

const app = express();
dotenv.config();

app.use(json());
app.use(cors());

app.use(usersRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(chalk.white.bold.bgGreenBright(`\n Application is running on port ${port}... \n`)));