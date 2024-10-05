import express from "express";
import authRoutes from "./routes/auth.js";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.use(authRoutes);
app.listen(5333, () => {
    console.log("Server running at port 5333 and testing!!");
});
