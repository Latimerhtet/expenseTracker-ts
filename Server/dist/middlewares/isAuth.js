import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const isAuth = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        console.log(token);
        if (!token) {
            throw new Error("Unauthorized User!");
        }
        const secret_key = process.env.SECRET_KEY;
        const verifiedToken = jwt.verify(token, secret_key);
        req.userId = verifiedToken.id;
        next();
    }
    catch (error) {
        return res.status(401).json({ isSuccess: false, message: error.message });
    }
};
