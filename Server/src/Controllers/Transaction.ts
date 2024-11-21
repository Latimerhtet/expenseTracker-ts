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

type incomeRequestDataType = {
  userId: string;
  data: IncomeData;
};
type expenseRequestDataType = {
  userId: string;
  data: ExpenseData;
};

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

export const addIncome = async (req: Request, res: Response) => {
  try {
    const { userId, data }: incomeRequestDataType = req.body;
    const transactionDoc = await prisma.transaction.create({
      data: {
        name: data.incomeName,
        amount: data.amount,
        type: "income",
        userId,
      },
    });
    if (!transactionDoc) {
      throw new Error("Income cannot be added this time. Try Again!");
    }
    res
      .status(201)
      .json({
        isSuccess: true,
        id: req.userId,
        message: "Transaction added Successfully!",
      });
  } catch (error: any) {
    res.status(200).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

export const addExpense = async (req: Request, res: Response) => {
  try {
    const { userId, data }: expenseRequestDataType = req.body;
    const transactionDoc = await prisma.transaction.create({
      data: {
        name: data.expenseName,
        amount: data.amount,
        type: "expense",
        userId,
      },
    });
    if (!transactionDoc) {
      throw new Error("Expense can not be added this time. Try again!");
    }
    res
      .status(201)
      .json({
        isSuccess: true,
        id: req.userId,
        message: "Transaction added Successfully!",
      });
  } catch (error: any) {
    res.status(200).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
