import db from "../db.js";

import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

export async function signUpUser(req, res) {
    const { firstName, lastName, email, password } = res.locals.user;
    const SALT = 10;
    try {
        await db.collection("users").insertOne({ firstName, lastName, email, password: bcrypt.hashSync(password, SALT) });
        res.status(201).send("Successfully signed up!");
    } catch (e) {
        console.log(chalk.red.bold(`\nWARNING: sign up failed! \nError: \n`), e);
        res.status(500).send(e);
    }
}