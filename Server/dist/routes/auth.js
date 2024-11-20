import express from "express";
import { register, login, checkStatus } from "../Controllers/auth.js";
import { body } from "express-validator";
import { isAuth } from "../middlewares/isAuth.js";
const router = express.Router();
router.post("/register", [
    body("name")
        .isLength({ min: 5 })
        .withMessage("Username must be at least five characters."),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
        .isLength({ min: 4 })
        .withMessage("Password must be at least four characters"),
], register);
router.post("/login", body("email").isEmail().withMessage("Invalid email"), body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least four characters"), login);
router.get("/status", isAuth, checkStatus);
export default router;
