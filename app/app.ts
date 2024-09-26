import express, { Request, Response, NextFunction } from "express";
import { routes as authRoutes } from "./auth/routes";
import { sequelize, connectToDb } from "./utils/db";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to the server!");
});

app.use("/auth", authRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong!");
});
export default function start() {
	app.listen(PORT, async () => {
		console.log(`Server running on port ${PORT}`);
		await connectToDb();
	});
}