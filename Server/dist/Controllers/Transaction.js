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
const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
export const addIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { incomeName, amount, date } = req.body;
        res.status(201).json({ isSuccess: true, id: req.userId });
    }
    catch (error) {
        res.status(200).json({ isSuccess: false });
    }
});
export const addExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { expenseName, amount, date } = req.body;
        console.log(expenseName);
    }
    catch (error) {
        res.status(200).json({ isSuccess: false });
    }
});
