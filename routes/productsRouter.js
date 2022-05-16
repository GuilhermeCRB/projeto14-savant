import { Router } from "express";

import { calcShipping, getProducts } from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/products", getProducts)
productsRouter.post("/shipping", calcShipping)

export default productsRouter;