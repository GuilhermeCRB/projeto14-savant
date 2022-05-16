import db from "../db.js";

import { ObjectId } from "mongodb";
import chalk from "chalk";

export async function getProducts(req, res){
    const productId = req.query.productId;
    const genre = req.query.genre;
    const title = req.query.title;

    try{
        
        if(!productId && !genre && !title){
            const products = await db.collection('products').find().toArray();

            res.status(200).send(products);
        }
        
        if(productId){
            const product = await db.collection('products').findOne({ _id: ObjectId(productId) });
            
            res.status(200).send(product);
        }
        if(genre){
            console.log(genre)
            const products = await db.collection(`${genre}`).find().toArray();

            res.status(200).send(products);
        }
        if(title){
            const product = await db.collection('products').find({title: title}).toArray();

            res.status(200).send(product);
        }
    }
    catch(e){
        console.log(chalk.red.bold(`\nWARNING: getting products failed! \nError: \n`), e);
        res.status(500).send(e);
    }
}