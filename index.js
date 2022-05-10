import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();

app.use(json());
app.use(cors());

const { PORT } = process.env;
app.listen(PORT, () => console.log(chalk.white.bold.bgGreenBright(`\n Application is running on port ${PORT}... \n`)));