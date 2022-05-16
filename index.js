import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

import usersRouter from "./routes/usersRouter.js";
import productsRouter from "./routes/productsRouter.js"
import orderRouter from "./routes/orderRouter.js";

const app = express();
dotenv.config();

app.use(json());
app.use(cors());

app.use(usersRouter);
app.use(productsRouter);
app.use(orderRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(chalk.white.bold.bgGreenBright(`\n Application is running on port ${port}... \n`)));