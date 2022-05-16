import db from "../db.js";

import { ObjectId } from "mongodb";
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
    const now = Date.now();

    try {
        await db.collection("sessions").insertOne({ userId: _id, token, lastStatus: now });
        res.status(200).send({ token, userId: _id, userName: name });
    } catch (e) {
        res.status(500).send(e);
    }
}

export async function updateStatus(req, res) {
    const { token } = res.locals;

    const now = Date.now();

    try {
        const participantUpdated = await db.collection("sessions").updateOne(
            { token },
            {
                $set: {
                    lastStatus: now
                }
            }
        );

        res.status(200).send("Atualização de status concluída");
    } catch (e) {
        res.status(500).send(e);
    }
}

setInterval(checkUserStatus, 15000);

async function checkUserStatus() {
    const now = Date.now();

    try {
        const removedUsers = await db.collection("sessions").find({ lastStatus: { $lt: now - 10000 } }).toArray();
        removedUsers.forEach((removedParticipant) => {
            const id = removedParticipant._id;

            db.collection("sessions").updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        token: "", lastStatus: ""
                    }
                }
            );
        });

        console.log("\nRemoved paticipants: ", removedUsers, "\n")
    } catch (error) {
        res.status(500).send(error);
    };
}