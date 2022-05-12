import db from "../db.js";

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

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

export async function signInUser(req, res) {
    const { user } = res.locals;
    const { _id, name } = res.locals.user;

    const key = process.env.JWT_KEY
    const config = { expiresIn: 600 };
    const token = jwt.sign(user, key, config);

    try {

        await db.collection("sessions").insertOne({ userId: _id, token });
        res.status(200).send({ token, userId: _id, userName: name });
    } catch (e) {
        res.status(500).send(e);
    }
}