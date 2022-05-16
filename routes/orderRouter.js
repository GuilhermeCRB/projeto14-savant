import { Router } from "express";
import { postOrder } from "../controllers/orderController.js";
import { validadeOrder } from "../Middlewares/orderMiddleware.js";

const orderRouter = Router();

orderRouter.post("/orders", validadeOrder, postOrder);

export default orderRouter;