import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret_key: jwt.Secret = "d438upwfj4938wf48djfo8r9";
type registerData = {
  name: string;
  email: string;
  password: string;
};
type loginData = {
  email: string;
  password: string;
};
const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
// Register account
export const register = async (req: Request, res: Response) => {
  try {
    const data: registerData = req.body;

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(data.password, salt);

    const addUser = await prisma.user.create({
      data: { name: data.name, email: data.email, password: hashedPassword },
    });
    console.log(addUser);
    res
      .status(201)
      .json({ isSuccess: true, message: "Account registered Successfully!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ isSuccess: false, message: "Error registering account" });
  }
};

// login account
export const login = async (req: Request, res: Response) => {
  try {
    const data: loginData = req.body;
    const loggingIn = await prisma.user.findUnique({
      where: { email: data.email },
    });
    console.log(loggingIn);
    if (!loggingIn) {
      res
        .status(401)
        .json({ isSuccess: false, message: "Invalid user credentials" });
    } else {
      const isValid = compareSync(data.password, loggingIn?.password);
      console.log(isValid);
      if (isValid) {
        const token = jwt.sign(
          { id: loggingIn.id, email: loggingIn.email },
          secret_key,
          { expiresIn: "2 days" }
        );
        console.log(token);
        res
          .status(201)
          .json({ isSuccess: true, message: "Login Successful!", token });
      } else if (!isValid) {
        console.log(isValid);
        res
          .status(401)
          .json({ isSuccess: false, message: "Invalid user credentials" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ isSuccess: false, message: "Error logging in" });
  }
};
