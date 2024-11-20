import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { addIncome } from "../Controllers/Transaction.js";
const router = express.Router();
router.post("/addTransaction", isAuth, addIncome);
export default router;
