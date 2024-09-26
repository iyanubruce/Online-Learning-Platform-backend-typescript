import { Sequelize } from "sequelize";

// const dbAdmin = process.env.DB_ADMIN
// const dbPassword = process.env.DB_PASSWORD
// if (!dbAdmin || !dbPassword) {
// 	throw new Error("DB_ADMIN or DB_PASSWORD is not defined in the environment variables");
// }
const sequelize = new Sequelize("LearningPlatform", `root`, `0813369`, {
	dialect: "mysql",
	host: "localhost",
});

const connectToDb = async () => {
	try {
		await sequelize.authenticate();
		console.log(`successfully connected to db`);
	} catch (err) {
		console.log(err);
	}
};

export { sequelize, connectToDb };
