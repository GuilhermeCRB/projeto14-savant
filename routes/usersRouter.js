import { Router } from "express";
import { signUpUser } from "../controllers/usersController.js";
import { validateSignUp } from "../Middlewares/usersMiddleware.js";

const usersRouter = Router();

usersRouter.post("/sign-up", validateSignUp, signUpUser);

export default usersRouter;