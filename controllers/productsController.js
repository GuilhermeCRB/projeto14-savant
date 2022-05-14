import db from "../db.js";

import chalk from "chalk";

export async function getProducts(req, res){
    const title = req.query.title;
    const genre = req.query.genre;

    try{
        
        if(!title && !genre){
            const products = await db.collection('products').find().toArray();

            res.status(200).send(products);
        }

        if(title){
            const product = await db.collection('products').find({ title: title.replaceAll("-", " ")}).toArray();
            res.status(200).send(product);
        }
        if(genre){
            const products = await db.collection('products').find({genre}).toArray();

            res.status(200).send(products);
        }
    }
    catch(e){
        console.log(chalk.red.bold(`\nWARNING: getting products failed! \nError: \n`), e);
        res.status(500).send(e);
    }
}