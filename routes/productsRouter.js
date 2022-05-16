import { Router } from "express";

import { calcFreight, getProducts } from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/products", getProducts)
productsRouter.post("/freight", calcFreight)

export default productsRouter;