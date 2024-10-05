var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret_key = "d438upwfj4938wf48djfo8r9";
const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
// Register account
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const salt = genSaltSync(10);
        const hashedPassword = hashSync(data.password, salt);
        const addUser = yield prisma.user.create({
            data: { name: data.name, email: data.email, password: hashedPassword },
        });
        console.log(addUser);
        res
            .status(201)
            .json({ isSuccess: true, message: "Account registered Successfully!" });
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ isSuccess: false, message: "Error registering account" });
    }
});
// login account
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const loggingIn = yield prisma.user.findUnique({
            where: { email: data.email },
        });
        console.log(loggingIn);
        if (!loggingIn) {
            res
                .status(401)
                .json({ isSuccess: false, message: "Invalid user credentials" });
        }
        else {
            const isValid = compareSync(data.password, loggingIn === null || loggingIn === void 0 ? void 0 : loggingIn.password);
            console.log(isValid);
            if (isValid) {
                const token = jwt.sign({ id: loggingIn.id, email: loggingIn.email }, secret_key, { expiresIn: "2 days" });
                console.log(token);
                res
                    .status(201)
                    .json({ isSuccess: true, message: "Login Successful!", token });
            }
            else if (!isValid) {
                console.log(isValid);
                res
                    .status(401)
                    .json({ isSuccess: false, message: "Invalid user credentials" });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ isSuccess: false, message: "Error logging in" });
    }
});
