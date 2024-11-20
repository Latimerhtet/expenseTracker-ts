import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

type verifiedTokenType = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log(token);
    if (!token) {
      throw new Error("Unauthorized User!");
    }
    const secret_key: any = process.env.SECRET_KEY;
    const verifiedToken = jwt.verify(token, secret_key) as {
      id: string;
      email: string;
      iat: number;
      exp: number;
    };
    req.userId = verifiedToken.id;
    next();
  } catch (error: any) {
    return res.status(401).json({ isSuccess: false, message: error.message });
  }
};
