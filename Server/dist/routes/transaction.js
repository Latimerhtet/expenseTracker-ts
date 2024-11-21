import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { addIncome, addExpense } from "../Controllers/Transaction.js";
const router = express.Router();
router.post("/addIncome", isAuth, addIncome);
router.post("/addExpense", isAuth, addExpense);
export default router;
