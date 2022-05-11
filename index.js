import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

import db from "./db.js";

const app = express();
dotenv.config();

app.use(json());
app.use(cors());

const { PORT } = process.env;
app.listen(PORT, () => console.log(chalk.white.bold.bgGreenBright(`\n Application is running on port ${PORT}... \n`)));