import { Router } from "express";

const usersRouter = Router();

usersRouter.post("/sign-up", signUpUser);

export default usersRouter;