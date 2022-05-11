import { Router } from "express";
import { signUpUser } from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.post("/sign-up", signUpUser);

export default usersRouter;