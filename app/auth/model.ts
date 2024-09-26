import { sequelize } from "../utils/db";
import { DataTypes } from "sequelize";

export const User = sequelize.define("Users", {
	firstname: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastname: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique:true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isRoleValid(value: string) {
				const roles = ["student", "instructor"];
				if (!roles.includes(value)) {
					throw new Error(
						"Role must be either 'student' or 'instructor'",
					);
				}
			},
		},
	},
});

// sequelize.sync()
