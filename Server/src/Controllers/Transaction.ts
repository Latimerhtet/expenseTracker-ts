import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

type ExpenseData = {
  expenseName: string;
  amount: number;
  date: string;
};

type IncomeData = {
  incomeName: string;
  amount: number;
  date: string;
};

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

export const addIncome = async (req: Request, res: Response) => {
  try {
    const { incomeName, amount, date }: IncomeData = req.body;

    res.status(201).json({ isSuccess: true, id: req.userId });
  } catch (error) {
    res.status(200).json({ isSuccess: false });
  }
};

export const addExpense = async (req: Request, res: Response) => {
  try {
    const { expenseName, amount, date }: ExpenseData = req.body;
    console.log(expenseName);
  } catch (error) {
    res.status(200).json({ isSuccess: false });
  }
};
