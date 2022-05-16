import db from "../db.js";

import { ObjectId } from "mongodb";
import chalk from "chalk";

export async function postOrder(){
    const order = res.locals.user;
    try{
        await db.collection("orders").insertOne(order);

        res.status(200).send(ObjectId);
    }
    catch(e){
        console.log(chalk.red.bold(`\nWARNING: post order failed! \nError: \n`), e);
        res.status(500).send(e);
    }
}