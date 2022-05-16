import db from "../db.js";

import { createClient } from "soap";
import { ObjectId } from "mongodb";
import chalk from "chalk";

export async function getProducts(req, res) {
    const productId = req.query.productId;
    const genre = req.query.genre;
    const title = req.query.title;

    try {

        if (!productId && !genre && !title) {
            const products = await db.collection('products').find().toArray();

            res.status(200).send(products);
        }

        if (productId) {
            const product = await db.collection('products').findOne({ _id: ObjectId(productId) });

            res.status(200).send(product);
        }

        if (genre) {
            console.log(genre)
            const products = await db.collection(`${genre}`).find().toArray();

            res.status(200).send(products);
        }

        if (title) {
            const product = await db.collection('products').find({ title: title }).toArray();

            res.status(200).send(product);
        }
    }
    catch (e) {
        console.log(chalk.red.bold(`\nWARNING: getting products failed! \nError: \n`), e);
        res.status(500).send(e);
    }
}

export async function calcFreight(req, res) {
    const URL = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl";
    const { CEP } = req.body;

    const args = {
        nCdEmpresa: '', sDsSenha: '', nCdServico: '04014', sCepOrigem: '05311900', sCepDestino: CEP,
        nVlPeso: '1', nCdFormato: '1', nVlComprimento: '30', nVlAltura: '5', nVlLargura: '20',
        nVlDiametro: '1', sCdMaoPropria: 'N', nVlValorDeclarado: '0', sCdAvisoRecebimento: 'N'
    };

    createClient(URL, (err, client) => {
        if (err) {
            console.log(err)
        } else {
            client.CalcPrecoPrazo(args, (err, result) => {
                res.send(result.CalcPrecoPrazoResult.Servicos.cServico);
            })
        }
    })
}