import { stripHtml } from "string-strip-html";
import joi from "joi";
import chalk from "chalk";

import db from "../db.js";

export async function validateSignUp(req, res, next) {
    const user = req.body;

    const userSchema = joi.object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9@$!%*#?&\-\.\,]{8,}$'))
    });

    const validation = userSchema.validate(user);
    if (validation.error) return res.status(422).send(validation.error);

    const sanitizedUser = {
        ...user,
        firstName: stripHtml(user.firstName).result,
        lastName: stripHtml(user.lastName).result,
        email: stripHtml(user.email).result,
        password: stripHtml(user.password).result
    }

    try {
        const isThereUser = await db.collection("users").findOne({ email: sanitizedUser.email });
        if (isThereUser) return res.status(409).send("E-mail is already in use, please try a different one!");

        res.locals.user = sanitizedUser;

        next();
    } catch (e) {
        console.log(chalk.red.bold(`\nWARNING: search for email in database failed! \nError: \n`), e);
        res.status(500).send(e);
    }
}

export async function signInValidation(req, res, next){
    const user = req.body;

    const userSchema = joi.object({
        email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: joi.string().required()
    });

    const validation = userSchema.validate(user);
    if (validation.error) return res.status(422).send(validation.error.details);

    next();
}