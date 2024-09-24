import { Router } from "express";
import { login, signup } from "./controller.js";
import { sign } from "crypto";
export const routes = Router();

routes.get("/login", login);
routes.get("/signup", signup);
