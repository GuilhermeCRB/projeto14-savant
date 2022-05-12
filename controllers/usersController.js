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
    const user = req.body;
    const { email } = user

    try {
        const isThereUser = await db.collection("users").findOne({ email });
        if (!isThereUser) return res.status(404).send("User was not found!");
        const { _id, name } = isThereUser;

        const key = process.env.JWT_KEY
        const config = { expiresIn: 600 };
        const token = jwt.sign(isThereUser, key, config);

        await db.collection("sessions").insertOne({ userId: _id, token });
        res.status(200).send({ token, userId: _id, userName: name });
    } catch (e) {
        res.status(500).send(e);
    }
}