import express from "express";
import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transaction.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
// cors and body-parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// routes
app.use(authRoutes);
app.use("/user", transactionRoutes);
app.listen(5000, () => {
    console.log("Server running at port 5000 and testing!!");
});
