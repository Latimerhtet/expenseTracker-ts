import express, { Router } from "express";
import { register, login } from "../Controllers/auth.js";
import { body } from "express-validator";
import { isAuth } from "../middlewares/isAuth.js";
import { addIncome, addExpense } from "../Controllers/Transaction.js";
const router: Router = express.Router();

router.post("/addTransaction", isAuth as any, addIncome);

export default router;
