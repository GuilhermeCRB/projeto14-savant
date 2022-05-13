import db from "../db.js";

export async function getProducts(req, res){
    const title = req.query.title;
    const gener = req.query.gener;

    try{
        
        if(!title && !gener){
            const products = await db.collection('products').find().toArray();

            res.status(200).send(products);
        }

        if(title){
            const product = await db.collection('products').find({ title: title.replaceAll("-", " ")}).toArray();
            res.status(200).send(product);
        }
        if(gener){
            const products = await db.collection('products').findAll({gener}).toArray();

            res.status(200).send(products);
        }
    }
    catch(err){
        console.log(chalk.red.bold(`\nWARNING: getting products failed! \nError: \n`), e);
        res.status(500).send(e);
    }
}