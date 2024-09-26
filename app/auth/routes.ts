import { Router } from "express";
import { login, signup } from "./controller";
import { sign } from "crypto";
export const routes = Router();

routes.post("/login", login);
routes.post("/signup", signup);
