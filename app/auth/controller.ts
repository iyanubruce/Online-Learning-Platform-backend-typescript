import bcryptjs from "bcryptjs";
import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { User } from "./model";
type SignupDetails = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password, role }: SignupDetails =
      req.body;
    if (!email || !password || !firstname || !lastname || !role) {
      return res.status(400).json({ message: "all feilds are required." });
    }
    const userExists = await User.findOne({
      where: {
        email: email,
      },
    });
    if (userExists) {
      res.status(400).json({ message: "user already exists" });
      return;
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = User.build({
      firstname: firstname,
      lastname: lastname,
      role: role,
      password: hashedPassword,
      email: email,
    });

    await newUser.save();

    return res.status(200).send(`User Created succesfully`);
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "An error occurred during signup" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const isPasswordValid = await bcryptjs.compare(
      password,
      user.dataValues.password,
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    const token = jwt.sign({ id: user.dataValues.id }, secret);
    const { password: hashedPassword, ...rest } = user.dataValues;
    const expiryDate = new Date(Date.now() + 3600000);

    return res
      .status(201)
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .json(rest);
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "An error occurred during login" });
  }
};
