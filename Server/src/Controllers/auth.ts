import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import { validationResult } from "express-validator";
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ isSuccess: false, message: errors.array()[0].msg });
  }
  const { password, name, email }: registerData = req.body;
  try {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    const addUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    console.log(addUser);
    return res
      .status(201)
      .json({ isSuccess: true, message: "Account registered Successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ isSuccess: false, message: "Error registering account" });
  }
};

// login account
export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(409)
      .json({ isSuccess: false, message: errors.array()[0].msg });
  }
  const data: loginData = req.body;
  try {
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

      if (!isValid) {
        res
          .status(401)
          .json({ isSuccess: false, message: "Invalid user credentials" });
      }
      const token = jwt.sign(
        { id: loggingIn.id, email: loggingIn.email },
        secret_key,
        { expiresIn: "2 days" }
      );

      res
        .status(201)
        .json({ isSuccess: true, message: "Login Successful!", token });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ isSuccess: false, message: "Error logging in" });
  }
};

export const checkStatus = async (req: Request, res: Response) => {
  try {
    const userDoc = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { email: true, name: true, id: true },
    });
    if (!userDoc) {
      throw new Error("User is Unauthorized!");
    }
    return res.json({
      isSuccess: true,
      message: "User is authorized",
      user: userDoc,
    });
  } catch (error: any) {
    return res.json({ isSuccess: false, message: error.message });
  }
};
