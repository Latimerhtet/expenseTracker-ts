import express, { Router } from "express";
import { register, login } from "../Controllers/auth.js";
import { body } from "express-validator";
import { isAuth } from "../middlewares/isAuth.js";
import { addIncome, addExpense } from "../Controllers/Transaction.js";
const router: Router = express.Router();

router.post("/addIncome", isAuth as any, addIncome);
router.post("/addExpense", isAuth as any, addExpense);

export default router;
