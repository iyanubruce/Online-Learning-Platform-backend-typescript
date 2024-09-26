import { Router } from "express";
import { login, signup } from "./controller";
export const routes = Router();

routes.post("/login", login);
routes.post("/signup", signup);
