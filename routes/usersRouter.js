import { Router } from "express";
import { signInUser, signUpUser, updateStatus } from "../controllers/usersController.js";
import { signInValidation, validateSignUp, validateToken } from "../Middlewares/usersMiddleware.js";

const usersRouter = Router();

usersRouter.post("/sign-up", validateSignUp, signUpUser);
usersRouter.post("/sign-in", signInValidation, signInUser);
usersRouter.post("/status", validateToken, updateStatus);

export default usersRouter;