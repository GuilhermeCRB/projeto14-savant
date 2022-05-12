import { Router } from "express";
import { signInUser, signUpUser } from "../controllers/usersController.js";
import { validateSignUp } from "../Middlewares/usersMiddleware.js";

const usersRouter = Router();

usersRouter.post("/sign-up", validateSignUp, signUpUser);
usersRouter.post("/sign-in", signInUser);

export default usersRouter;